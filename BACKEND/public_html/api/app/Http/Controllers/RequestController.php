<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Request as Petition;
use App\Models\RequestAttachment;

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
            'user_id' => 'required|integer',
            'request_type_id' => 'required|integer',
            'parameters' => 'required|json',
            'attachment_id' => 'required|array',
            'subject_id' => 'required|array'
        ]);
        // insert into main table
        // new requests have 'voucher pendiente' status
        $petition = Petition::create([
            'name' => $request->name,
            'user_id' => $request->user_id,
            'request_type_id' => $request->request_type_id,
            'request_status_id' => 1,
            'parameters' => $request->parameters
        ]);
        // insert into pivot table
        $petition->attachments()->attach($request->attachment_id);
        $petition->subjects()->attach($request->subject_id);
        return response()->json($petition, 201);
    }
    
    public function update($id, Request $request)
    {
        $petition = Petition::findOrFail($id);
        // students can't edit requests so don't update pivot tables
        $petition->update($request->all());
        return response()->json($petition, 200);
    }
    
    public function delete($id)
    {
        $attachments = Petition::findOrFail($id)->attachments;
        foreach ($attachments as $attachment){
            // need to remove all linked files from storage first
            Storage::disk('attachments')->delete($attachment->file_path);
            // also remove the attachment model
            RequestAttachment::findOrFail($attachment->id)->delete();
        }
        // finally remove model and pivots
        Petition::findOrFail($id)->delete();
        return response()->json(['message' => 'Eliminado correctamente'], 200);
    }
}
