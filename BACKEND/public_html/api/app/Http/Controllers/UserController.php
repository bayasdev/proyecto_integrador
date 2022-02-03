<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Exception;
use App\Models\User;

class UserController extends Controller
{
    public function showAllUsers()
    {
        return response()->json(User::all());
    }
    
    public function showOneUser($id)
    {
        return response()->json(User::find($id));
    }

    public function showAllDeans()
    {
        return response()->json(User::where('role', 2)->get());
    }

    public function showAllDirectors()
    {
        return response()->json(User::where('role', 3)->get());
    }

    public function showAllAccountants()
    {
        return response()->json(User::where('role', 4)->get());
    }

    public function showAllStudents()
    {
        return response()->json(User::where('role', 5)->get());
    }
    
    public function create(Request $request)
    {
        // create users from admin dashboard
        $this->validate($request, [
            'identification' => 'required|string|min:10|max:10|unique:users',
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'role' => 'required|integer|between:1,5'
        ]);
        // generate new password
        $new_password = Str::random(16);
        $user = User::create([
            'identification' => $request->identification,
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($new_password),
            'attempts' => 0
        ]);
        // send mail
        $message = 'Su contraseña de acceso al sistema es: '.$new_password;
        $subject = 'Te damos la bienvenida al '.env('MAIL_FROM_NAME');
        $this->send_mail('mail', $request->email, $request->name, $subject, $message, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        return response()->json($user, 201);
    }
    
    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user, 200);
    }

    public function updateProfile($id, Request $request)
    {
        // allow user to change its email and password
        $user = User::findOrFail($id);
        // hash the password if provided
        if(isset($request->password) && $request->password != ''){
            $user->update([
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
        } else {
            $user->update([
                'email' => $request->email
            ]);
        }
        return response()->json(['message' => 'Perfil actualizado, por favor vuelva a iniciar sesión'], 200);
    }
    
    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
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
