<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Director;

class DirectorController extends Controller
{
    public function showAllDirectors()
    {
        return response()->json(Director::all());
    }
    
    public function showOneDirector($id)
    {
        return response()->json(Director::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'identification' => 'required|min:10|max:10|unique:directors'
        ]);
        $role = Director::create($request->all());
        return response()->json($role, 201);
    }
    
    public function update($id, Request $request)
    {
        $role = Director::findOrFail($id);
        $role->update($request->all());
        
        return response()->json($role, 200);
    }
    
    public function delete($id)
    {
        Director::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
