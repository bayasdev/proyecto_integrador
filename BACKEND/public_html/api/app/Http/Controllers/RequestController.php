<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as Petition;

class RequestController extends Controller
{
    public function showAllRequests()
    {
        return response()->json(Petition::all());
    }
    
    public function showOneRequest($id)
    {
        return response()->json(Petition::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'user_id' => 'required|integer',
            'request_type_id' => 'required|integer'
        ]);
        $petition = Petition::create($request->all());
        return response()->json($petition, 201);
    }
    
    public function update($id, Request $request)
    {
        $petition = Petition::findOrFail($id);
        $petition->update($request->all());
        
        return response()->json($petition, 200);
    }
    
    public function delete($id)
    {
        Petition::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
