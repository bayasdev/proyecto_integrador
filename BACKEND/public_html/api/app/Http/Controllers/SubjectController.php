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

    public function showAllByCareer($id)
    {
        return response()->json(Subject::where('career_id', $id)->get());
    }

    
    public function showOneSubject($id)
    {
        return response()->json(Subject::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'code' => 'required|string',
            'credits' => 'required|integer',
            'career_id' => 'required|integer'
        ]);
        $subject = Subject::create($request->all());
        return response()->json($subject, 201);
    }
    
    public function update($id, Request $request)
    {
        $subject = Subject::findOrFail($id);
        $subject->update($request->all());
        
        return response()->json($subject, 200);
    }
    
    public function delete($id)
    {
        Subject::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
