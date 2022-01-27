<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestAttachment as Petition;

class RequestAttachmentController extends Controller
{
    public function showAllRequestAttachments()
    {
        return response()->json(Petition::all());
    }
    
    public function showOneRequestAttachment($id)
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
        $request_attachment = Petition::create($request->all());
        return response()->json($request_attachment, 201);
    }
    
    public function update($id, Request $request)
    {
        $request_attachment = Petition::findOrFail($id);
        $request_attachment->update($request->all());
        
        return response()->json($request_attachment, 200);
    }
    
    public function delete($id)
    {
        Petition::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
