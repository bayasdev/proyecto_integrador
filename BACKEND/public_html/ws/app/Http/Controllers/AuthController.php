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
    $enlace = env('APP_URL').'password_recovery/?r='.$token_recovery;
    $message = $enlace;
    $subject = 'Solicitud de Cambio de Contraseña';
    $resp = $this->send_mail('recovery_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    return response()->json('Solicitud recibida. Por favor revise su correo electrónico para confirmar.', 200);
  }

  function passwordRecovery(Request $data)
  {
    $token = $data['r'];
    $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
    $timeRemaining = $credentials->expiration_time - time();
    if ($timeRemaining <= 0) {
        return response()->json('Token expirado.', 400);
    }
    try{
      $new_password = Str::random(10);
      DB::beginTransaction();
      $status = User::find($credentials->subject)->update([
        'password'=>Crypt::encrypt($new_password),
      ]);
      DB::commit();
      if(!$status){
        return response()->json('Ocurrió un error',400);
      }
    } catch (Exception $e) {
      return response()->json('Ocurrió un error',400);
    }
    $message = 'Tu nueva contraseña es ' . $new_password;
    $subject = 'Recuperación de Contraseña';
    $user = User::where('id', $credentials->subject)->first();
    $resp = $this->send_mail('mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    response()->json($resp,200);
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
      ]);
      DB::commit();
    } catch (Exception $e) {
      return response()->json('Credenciales Incorrectos', 400);
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
      $user->name = $result['name'];
      $user->email = $email;
      $user->password = Crypt::encrypt($new_password);
      $user->api_token = Str::random(64);
      $user->save();
      DB::commit();
      $message = 'Tu nueva contraseña es ' . $new_password;
      $subject = 'Te damos la bienvenida a ' . env('MAIL_FROM_NAME');
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
        return response()->json('Credenciales Incorrectos', 400);
      }
      if ($password === Crypt::decrypt($user->password)) {
        $token = $this->jwt($user, 60);
        $response = User::where('id',$user->id)->update([
          'api_token'=>$token,
        ]);
        return response()->json([
            'token' => $token,
            'user' => $user,
            'id' => $user->id
        ], 200);
      }
      return response()->json('Credenciales Incorrectos', 400);
  }

  protected function jwt(User $user, $lifetime) {
    $payload = [
        'subject' => $user->id,
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
