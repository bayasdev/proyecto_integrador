<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestStatus;

class RequestStatusController extends Controller
{
    public function showAllRequestStatuses()
    {
        return response()->json(RequestStatus::all());
    }
    
    public function showOneRequestStatus($id)
    {
        return response()->json(RequestStatus::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $request_status = RequestStatus::create($request->all());
        return response()->json($request_status, 201);
    }
    
    public function update($id, Request $request)
    {
        $request_status = RequestStatus::findOrFail($id);
        $request_status->update($request->all());
        
        return response()->json($request_status, 200);
    }
    
    public function delete($id)
    {
        RequestStatus::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
