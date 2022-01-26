<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'identification' => 'required|unique:users',
            'role_id' => 'integer'
        ]);
        $new_password = Str::random(16);
        $request->request->add(['attempts' => 0]);
        if(!isset($request->role_id)){
            $request->request->add(['role_id' => 5]);
        }
        $request->request->add(['password' => Hash::make($new_password)]);
        $user = User::create($request->all());
        $message = 'Su contraseña de acceso al sistema es: '.$new_password;
        $subject = 'Te damos la bienvenida al '.env('MAIL_FROM_NAME');
        $this->send_mail('mail', $request->email, $request->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        
        return response()->json(['message' => 'Cuenta creada correctamente, por favor revise su correo electrónico'], 201);
    }
    
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Correo y/o contraseña incorrectos'], 401);
        } else if ($user->attempts >= 3) {
            return response()->json(['message' => 'Su cuenta ha sido bloqueada por superar el límite de intentos fallidos'], 401);
        } else if (Hash::check($request->password, $user->password)) {
            $token = $this->jwt($user, 1, 60);
            $response = User::where('id', $user->id)->update([
                'attempts'=>0
            ]);
            return response()->json(['token' => $token], 200);
        } else {
            // increase attempts
            User::where('id', $user->id)->update([
                'attempts'=>$user->attempts + 1
            ]);
            return response()->json(['message' => 'Credenciales Incorrectas, intento fallido registrado'], 401);
        }
    }
    
    public function passwordRecoveryRequest(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Ocurrió un error'], 400);
        }
        $token_recovery = $this->jwt($user, 2, 5);
        $enlace = env('FRONT_URL').'password-recovery/?r='.$token_recovery;
        $message = $enlace;
        $subject = 'Solicitud de Restablecimiento de Contraseña';
        $this->send_mail('recovery_confirm_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        return response()->json(['message' => 'Solicitud recibida, por favor revise su correo electrónico'], 200);
    }
    
    public function passwordRecovery(Request $request)
    {
        $token = $request->get('r');
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $remaining = $decoded->expiration_time - time();
            if ($remaining <= 0) {
                return response()->json(['message' => 'Token caducado'], 400);
            }
            $new_password = Str::random(16);
            User::where('id', $decoded->id)->update([
                'password' => Hash::make($new_password)
            ]);
            return response()->json(['message' => $new_password], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error'], 400);
        }
    }
    
    protected function jwt(User $user, $type, $lifetime) {
        // 1 login
        // 2 recovery
        if ($type == 1) {
            $payload = [
                'id' => $user->id,
                'identification' => $user->identification,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role_id,
                'creation_time' => time(),
                'expiration_time' => time() + $lifetime*60
            ];
        } else if ($type == 2) {
            $payload = [
                'id' => $user->id,
                'creation_time' => time(),
                'expiration_time' => time() + $lifetime*60
            ];
        }
        return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
    }
    
    protected function send_mail($template, $to, $toAlias, $subject, $body, $fromMail,$fromAlias) {
        $data = ['name'=>$toAlias, 'body'=>$body, 'appName'=>env('APP_NAME')];
        try {
            $response = Mail::send($template, $data, function($message) use ($to, $toAlias, $subject, $fromMail,$fromAlias) {
                $message->to($to)->subject($subject);
                $message->from($fromMail,$fromAlias);
            });
            $response = 'Realizado!';
        } catch (Exception $e) {
            $response = $e->getMessage();
        }
        return $response;
    }
    
}
