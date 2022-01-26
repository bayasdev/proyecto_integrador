<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
            'identification' => 'required|unique:users',
            'role_id' => 'required',
        ]);
        $user = User::create($request->all());
        return response()->json($user, 201);
    }
    
    public function update($id, Request $request)
    {
        $this->validate($request, [
            'email' => 'unique:users',
            'identification' => 'unique:users',
        ]);
        $request->request->add(['attempts' => 0]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user, 200);
    }
    
    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
