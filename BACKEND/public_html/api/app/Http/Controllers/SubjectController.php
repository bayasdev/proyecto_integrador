<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function showAllSubjects()
    {
        return response()->json(Subject::all());
    }
    
    public function showOneSubject($id)
    {
        return response()->json(Subject::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'code' => 'required',
            'credits' => 'required|integer',
            'career_id' => 'required|integer'
        ]);
        $role = Subject::create($request->all());
        return response()->json($role, 201);
    }
    
    public function update($id, Request $request)
    {
        $role = Subject::findOrFail($id);
        $role->update($request->all());
        
        return response()->json($role, 200);
    }
    
    public function delete($id)
    {
        Subject::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
