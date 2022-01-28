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
        $faculty = Faculty::create($request->all());
        return response()->json($faculty, 201);
    }
    
    public function update($id, Request $request)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->update($request->all());
        
        return response()->json($faculty, 200);
    }
    
    public function delete($id)
    {
        Faculty::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
