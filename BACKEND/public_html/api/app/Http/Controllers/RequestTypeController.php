<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestType;

class RequestTypeController extends Controller
{
    public function showAllRequestTypes()
    {
        return response()->json(RequestType::all());
    }
    
    public function showOneRequestType($id)
    {
        return response()->json(RequestType::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $request_type = RequestType::create($request->all());
        return response()->json($request_type, 201);
    }
    
    public function update($id, Request $request)
    {
        $request_type = RequestType::findOrFail($id);
        $request_type->update($request->all());
        
        return response()->json($request_type, 200);
    }
    
    public function delete($id)
    {
        RequestType::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
