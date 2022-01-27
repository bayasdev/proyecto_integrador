<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function showAllRoles()
    {
        return response()->json(Role::all());
    }
    
    public function showOneRole($id)
    {
        return response()->json(Role::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $role = Role::create($request->all());
        return response()->json($role, 201);
    }
    
    public function update($id, Request $request)
    {
        $role = Role::findOrFail($id);
        $role->update($request->all());
        
        return response()->json($role, 200);
    }
    
    public function delete($id)
    {
        Role::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
