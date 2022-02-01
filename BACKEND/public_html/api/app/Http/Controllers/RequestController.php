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
        // types
        // 1 modificación de carga
        // 2 retiro en asignatura

        // statuses
        // 1 pago pendiente
        // 2 pago aprobado
        // 3 pago rechazado
        // 4 aprobado por director
        // 5 rechazado por director
        // 6 aprobado por decano
        // 7 rechazado por decano

        $this->validate($request, [
            'student_id' => 'required|integer',
            'career_id' => 'required|integer',
            'request_type' => 'required|integer|between:1,2',
            'parameters' => 'required|json',
            'attachment_id' => 'required|integer',
            'subject_id' => 'required|array'
        ]);
        // insert into main table
        // new requests have 'voucher pendiente' status
        $petition = Petition::create([
            'student_id' => $request->student_id,
            'career_id' => $request->career_id,
            'request_type' => $request->request_type,
            'request_status' => 1,
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
