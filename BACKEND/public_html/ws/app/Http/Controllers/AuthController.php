<?php

namespace App\Http\Controllers;

use Validator;
use App\Http\Controllers\Controller;
use Exception;
use App\Models\Profile\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
  function passwordRecoveryRequest(Request $data) {
    $result = $data->json()->all();
    $email = $result['email'];
    $user = User::where('email', $email)->first();
    if(!$user){
      return response()->json('Ocurrió un error',400);
    }
    $token_recovery = $this->jwt($user, 2);
    $enlace = env('FRONT_URL').'password-recovery/?r='.$token_recovery;
    $message = $enlace;
    $subject = 'Solicitud de Restablecimiento de Contraseña';
    $resp = $this->send_mail('recovery_confirm_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    return response()->json('Solicitud recibida. Por favor revise su correo electrónico para confirmar.', 200);
  }
  
  function passwordRecovery(Request $data)
  {
    $token = $data['r'];
    try{
      $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
      $timeRemaining = $credentials->expiration_time - time();
      if ($timeRemaining <= 0) {
        return response()->json('Token expirado.', 400);
      }
      $new_password = Str::random(10);
      DB::beginTransaction();
      $status = User::find($credentials->subject)->update([
        'password'=>Crypt::encrypt($new_password),
        'attempts'=>0
      ]);
      DB::commit();
      if(!$status){
        return response()->json('Acceso denegado.', 400);
      }
    } catch (Exception $e) {
      return response()->json('Acceso denegado.', 400);
    }
    $message = 'Su nueva contraseña de acceso al sistema es: '.$new_password;
    $subject = 'Recuperación de Contraseña';
    $user = User::where('id', $credentials->subject)->first();
    $resp = $this->send_mail('recovery_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    return response()->json('Contraseña restablecida correctamente. Por favor revise su Correo Electrónico.', 200);
  }
  
  function passwordChange(Request $data)
  {
    $result = $data->json()->all();
    $token = $data->header('api_token');
    $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
    $id = $credentials->subject;
    $new_password = $result['new_password'];
    try{
      DB::beginTransaction();
      $user = User::find($id)->update([
        'password'=>Crypt::encrypt($new_password),
        'attempts'=>0
      ]);
      DB::commit();
    } catch (Exception $e) {
      return response()->json('Credenciales Incorrectas', 400);
    }
    return response()->json('Contraseña Actualizada Correctamente',200);
  }
  
  function register(Request $data)
  {
    try{
      $new_password = Str::random(10);
      $result = $data->json()->all();
      $email = $result['email'];
      $preview_user = User::where('email', $email)->first();
      if ($preview_user) {
        return response()->json('El correo electrónico proporcionado ya tiene una cuenta en el sistema.',400);
      }
      DB::beginTransaction();
      $user = new User();
      $lastUser = User::orderBy('id')->get()->last();
      if($lastUser) {
        $user->id = $lastUser->id + 1;
      } else {
        $user->id = 1;
      }
      $user->identification = $result['identification'];
      $user->name = $result['name'];
      $user->email = $email;
      if(isset($result['role_id'])){
        $user->role_id = $result['role_id'];
      } else {
        // self registered users have "Estudiante" role
        $user->role_id = 5;
      }
      $user->password = Crypt::encrypt($new_password);
      $user->attempts = 0;
      $user->api_token = Str::random(64);
      $user->save();
      DB::commit();
      $message = 'Su contraseña de acceso al sistema es: '.$new_password;
      $subject = 'Te damos la bienvenida al '.env('MAIL_FROM_NAME');
      $resp = $this->send_mail('mail', $email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
      return response()->json('Cuenta creada correctamente. Por favor revise su correo electrónico',200);
    } catch (Exception $e) {
      return response()->json($e,400);
    }
    return response()->json($user,200);
  }
  
  function login(Request $data)
  {
    $result = $data->json()->all();
    $email = $result['email'];
    $password = $result['password'];
    $user = User::where('email', $email)->first();
    if (!$user) {
      return response()->json('Credenciales Incorrectas', 400);
    } else if ($user->attempts >= 3) {
      return response()->json('Su Cuenta está Bloqueada por superar el límite de intentos fallidos', 400);
    } else if ($password === Crypt::decrypt($user->password)) {
      $token = $this->jwt($user, 60);
      $response = User::where('id',$user->id)->update([
        'api_token'=>$token,
        'attempts'=>0
      ]);
      return response()->json([
        'token' => $token,
        'user' => [
          'id' => $user->id,
          'identification' => $user->identification,
          'name' => $user->name,
          'email' => $user->email,
        ],
      ], 200);
    } else {
      // increase attempts
      User::where('id',$user->id)->update([
        'attempts'=>$user->attempts + 1
      ]);
      return response()->json('Credenciales Incorrectas, intento fallido registrado', 400);
    }
  }
  
  protected function jwt(User $user, $lifetime) {
    $payload = [
      'subject' => $user->id,
      'role' => $user->role_id,
      'creation_time' => time(),
      'expiration_time' => time() + $lifetime*60
    ];
    return JWT::encode($payload, env('JWT_SECRET'));
  }
  
  protected function send_mail($template, $to, $toAlias, $subject, $body, $fromMail,$fromAlias) {
    $data = ['name'=>$toAlias, 'body'=>$body, 'appName'=>env('MAIL_FROM_NAME')];
    try {
      $response = Mail::send($template, $data, function($message) use ($to, $toAlias, $subject, $fromMail,$fromAlias) {
        $message->to($to, $toAlias)->subject($subject);
        $message->from($fromMail,$fromAlias);
      });
      $response = 'Realizado!';
    } catch (Exception $e) {
      $response = $e->getMessage();
    }
    return $response;
  }
}
