<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'identification' => 'required|min:10|max:10|unique:users',
            'role_id' => 'required',
        ]);
        $user = User::create($request->all());
        return response()->json($user, 201);
    }
    
    public function update($id, Request $request)
    {
        $request->request->add(['attempts' => 0]);
        $user = User::findOrFail($id);
        if(isset($request->password)){
            $request->request->add(['password' => Hash::make($request->password)]);
        }
        $user->update($request->all());
        return response()->json($user, 200);
    }
    
    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}