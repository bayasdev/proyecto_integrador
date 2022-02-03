<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Career;

class CareerController extends Controller
{
    public function showAllCareers()
    {
        return response()->json(Career::all());
    }
    
    public function showOneCareer($id)
    {
        return response()->json(Career::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'director_id' => 'required|integer',
            'faculty_id' => 'required|integer'
        ]);
        $career = Career::create($request->all());
        return response()->json($career, 201);
    }
    
    public function update($id, Request $request)
    {
        $career = Career::findOrFail($id);
        $career->update($request->all());
        
        return response()->json($career, 200);
    }
    
    public function delete($id)
    {
        Career::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
