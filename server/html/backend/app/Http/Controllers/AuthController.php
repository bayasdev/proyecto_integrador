<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Carbon\Carbon;
use Exception;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'identification' => 'required|string|min:10|max:10|unique:users',
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
        ]);
        // generate new password
        $new_password = Str::random(16);
        User::create([
            'identification' => $request->identification,
            'name' => $request->name,
            'email' => $request->email,
            'role' => 5, // new user is student
            'password' => Hash::make($new_password),
            'attempts' => 0
        ]);
        // send mail
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
            return response()->json(['message' => 'Correo y/o contraseña incorrectos, intento fallido registrado'], 401);
        // if counter >=3 account is locked
        } else if ($user->attempts >= 3) {
            return response()->json(['message' => 'Su cuenta ha sido bloqueada por superar el límite de intentos fallidos'], 401);
        } else if (Hash::check($request->password, $user->password)) {
            // generate session token
            $token = $this->jwt($user, 1, 60);
            // reset counter and update last login
            User::where('id', $user->id)->update([
                'attempts' => 0,
                'last_login' => Carbon::now()->toDateTimeString()
            ]);
            return response()->json(['token' => $token], 200);
        } else {
            // increase attempts counter
            User::where('id', $user->id)->update([
                'attempts' => $user->attempts + 1
            ]);
            return response()->json(['message' => 'Correo y/o contraseña incorrectos, intento fallido registrado'], 401);
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
        // generate recovery token
        $token_recovery = $this->jwt($user, 2, 2);
        // send email
        $enlace = env('FRONT_URL').'password-recovery/?r='.$token_recovery;
        $message = $enlace;
        $subject = 'Solicitud de Restablecimiento de Contraseña'; 
        $this->send_mail('recovery_confirm_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        return response()->json(['message' => 'Solicitud recibida, por favor revise su correo electrónico'], 200);
    }
    
    public function passwordRecovery(Request $request)
    {
        $token = $request->get('r');
        // check token 
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            // set new password and reset counter
            $new_password = Str::random(16);
            User::where('id', $decoded->sub)->update([
                'attempts' => 0,
                'password' => Hash::make($new_password)
            ]);
            // send email
            $message = 'Su nueva contraseña de acceso al sistema es: '.$new_password;
            $subject = 'Recuperación de Contraseña';
            $user = User::where('id', $decoded->sub)->first();
            $this->send_mail('recovery_mail', $user->email, $user->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            return response()->json(['message' => 'Contraseña restablecida, por favor revise su correo electrónico'], 200);
        } catch(ExpiredException $e) {
            return response(['message' => 'Token expirado'], 401);
        } catch (SignatureInvalidException $e) {
            return response(['message' => 'Token no válido'], 401);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error'], 400);
        }
    }
    
    protected function jwt(User $user, $type, $lifetime) {
        // generates JWT tokens
        // 1 session
        // 2 recovery
        if ($type == 1) {
            $payload = [
                'sub' => $user->id,
                'exp' => time() + $lifetime*60,
                'identification' => $user->identification,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ];
        } else if ($type == 2) {
            $payload = [
                'sub' => $user->id,
                'exp' => time() + $lifetime*60
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
