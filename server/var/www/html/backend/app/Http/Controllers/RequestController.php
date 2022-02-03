<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Request as Petition;
use App\Models\RequestAttachment;
use App\Models\User;
use App\Models\Faculty;

class RequestController extends Controller
{
    
    public function showAllRequests()
    {
        $petitions = Petition::all();
        // for frontend
        foreach ($petitions as $petition) {
            $petition->student_name = $petition->students()->value('name');
            $petition->career_name = $petition->careers()->value('name');
        }
        return response()->json($petitions);
    }
    
    public function showOneRequest($id)
    {
        $petition = Petition::find($id);
        // additional parameters for frontend logic
        // get Student
        $petition->student_name = $petition->students()->value('name');
        $petition->student_identification = $petition->students()->value('identification');
        // get career name
        $petition->career_name = $petition->careers()->value('name');
        // get Director
        $petition->directord_id = $petition->careers()->value('director_id');
        $petition->director_name = User::where('id', $petition->directord_id)->value('name');
        // get Dean only if type 2
        if ($petition->request_type == 2) {
            $petition->dean_id = Faculty::where('id', $petition->careers()->value('faculty_id'))->value('dean_id');
            $petition->dean_name = User::where('id', $petition->dean_id)->value('name');
        }
        // pivot tables
        $petition->subjects = $petition->subjects()->get();
        $petition->attachments = $petition->attachments()->get();
        return response()->json($petition);
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
        // new requests have 'pago pendiente' status
        $petition = Petition::create([
            'student_id' => $request->student_id,
            'career_id' => $request->career_id,
            'request_type' => $request->request_type,
            'request_status' => 1,
            'parameters' => json_decode($request->parameters)
        ]);
        // insert into pivot table
        $petition->attachments()->attach($request->attachment_id);
        $petition->subjects()->attach($request->subject_id);
        
        return response()->json($petition, 201);
    }
    
    public function update($id, Request $request)
    {
        $this->validate($request, [
            'request_status' => 'required|integer|between:1,7',
            'parameters' => 'required|json',
            'attachment_id' => 'integer'
        ]);
        $petition = Petition::findOrFail($id);
        $petition->update([
            'request_status' => $request->request_status,
            'parameters' => json_decode($request->parameters)
        ]);
        if (isset($request->attachment_id)){
            $petition->attachments()->attach($request->attachment_id);
        }
        return response()->json($petition);
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
