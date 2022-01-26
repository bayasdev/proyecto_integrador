<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;

class FacultyController extends Controller
{
    public function showAllFaculties()
    {
        return response()->json(Faculty::all());
    }
    
    public function showOneFaculty($id)
    {
        return response()->json(Faculty::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'dean_id' => 'required|integer'
        ]);
        $role = Faculty::create($request->all());
        return response()->json($role, 201);
    }
    
    public function update($id, Request $request)
    {
        $role = Faculty::findOrFail($id);
        $role->update($request->all());
        
        return response()->json($role, 200);
    }
    
    public function delete($id)
    {
        Faculty::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
