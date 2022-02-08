<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Models\Request as Petition;
use App\Models\RequestAttachment;
use App\Models\User;
use App\Models\Faculty;
use App\Models\Career;
use Exception;

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

    public function showAllByStudent($id)
    {
        $petitions = Petition::where('student_id', $id)->get();
        return response()->json($petitions);
    }

    public function showAllActiveByStudent($id)
    {
        $petitions = Petition::where('student_id', $id)->whereNotIn('request_status', [3, 5, 7])->get();
        return response()->json($petitions);
    }

    public function showAllPendingPayment()
    {
        $petitions = Petition::where('request_status', 1)->get();
        return response()->json($petitions);
    }

    public function showAllByDirector($id)
    {
        $career = Career::where('director_id', $id)->value('id');
        $petitions = Petition::where('career_id', $career)->get();
        return response()->json($petitions);
    }

    public function showAllActiveByDirector($id)
    {
        $career = Career::where('director_id', $id)->value('id');
        $petitions = Petition::where('career_id', $career)->where('request_status', 2)->get();
        return response()->json($petitions);
    }

    public function showAllByDean($id)
    {
        $faculty = Faculty::where('dean_id', $id)->value('id');
        $career = Career::where('faculty_id', $faculty)->value('id');
        $petitions = Petition::where('career_id', $career)->where('request_type', 2)->get();
        return response()->json($petitions);
    }

    public function showAllActiveByDean($id)
    {
        $faculty = Faculty::where('dean_id', $id)->value('id');
        $career = Career::where('faculty_id', $faculty)->value('id');
        $petitions = Petition::where('career_id', $career)->where('request_type', 2)->where('request_status', 4)->get();
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
        $petition->director_id = $petition->careers()->value('director_id');
        $petition->director_name = User::where('id', $petition->director_id)->value('name');
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
        
        // send email to all accountants
        $subject = 'Solicitud nueva';
        $student = $petition->students()->value('name');
        if ($petition->request_type == 1){
            $type = 'Modificación de Carga Académica';
        } else {
            $type = 'Retiro en Asignatura';
        }
        $career = $petition->careers()->value('name');
        $content = $petition->parameters['student_message'];
        $accountants = User::where('role', 4)->get();
        foreach ($accountants as $accountant) {
            $this->send_mail_notify('notification', $accountant->email, $accountant->name, $subject, $petition->id, $type, $student, $career, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        }
        
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

        // handle email sending logic

        // this code is horrible
        // don't blame me >:(
        
        $statuses = [
            'Pago Pendiente',
            'Pago Aprobado',
            'Pago Rechazado',
            'Aprobado por Director',
            'Rechazado por Director',
            'Aprobado por Decano',
            'Rechazado por Decano'
        ];
        
        // notify director
        if ($petition->request_status == 2) {
            $subject = 'Solicitud nueva';
            $student = $petition->students()->value('name');
            if ($petition->request_type == 1){
                $type = 'Modificación de Carga Académica';
            } else {
                $type = 'Retiro en Asignatura';
            }
            $career = $petition->careers()->value('name');
            $content = $petition->parameters['student_message'];
            $director = User::where('id', $petition->careers()->value('director_id'))->first();
            $this->send_mail_notify('notification', $director->email, $director->name, $subject, $petition->id, $type, $student, $career, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        }

        // notify dean
        if ($petition->request_status == 4 && $petition->request_type == 2) {
            $subject = 'Solicitud nueva';
            $student = $petition->students()->value('name');
            $type = 'Retiro en Asignatura';
            $career = $petition->careers()->value('name');
            $content = $petition->parameters['student_message'];
            $dean = User::where('id', Faculty::where('id', $petition->careers()->value('faculty_id'))->value('dean_id'))->first();
            $this->send_mail_notify('notification', $dean->email, $dean->name, $subject, $petition->id, $type, $student, $career, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        }

        // now notify the student

        // accountant
        if ($petition->request_status == 2 || $petition->request_status == 3) {
            $subject = 'Solicitud actualizada';
            $status = $statuses[($petition->request_status)-1];
            $career = $petition->careers()->value('name');
            $content = $petition->parameters['accountant_message'];
            $this->send_mail_update('update', $petition->students()->value('email'), $petition->students()->value('name'), $subject, $petition->id, $status, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        }
        // director
        if ($petition->request_status == 4 || $petition->request_status == 5) {
            $subject = 'Solicitud actualizada';
            $status = $statuses[($petition->request_status)-1];
            $career = $petition->careers()->value('name');
            $content = $petition->parameters['director_message'];
            $this->send_mail_update('update', $petition->students()->value('email'), $petition->students()->value('name'), $subject, $petition->id, $status, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        }
        // dean
        if ($petition->request_status == 6 || $petition->request_status == 7) {
            $subject = 'Solicitud actualizada';
            $status = $statuses[($petition->request_status)-1];
            $career = $petition->careers()->value('name');
            $content = $petition->parameters['dean_message'];
            $this->send_mail_update('update', $petition->students()->value('email'), $petition->students()->value('name'), $subject, $petition->id, $status, $content, env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
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
    
    protected function send_mail_update($template, $to, $toAlias, $subject, $id, $status, $content, $fromMail, $fromAlias) {
        $data = ['name'=>$toAlias, 'id'=>$id, 'status'=>$status, 'content'=>$content, 'appName'=>env('APP_NAME')];
        Mail::send($template, $data, function($message) use ($to, $toAlias, $subject, $fromMail, $fromAlias) {
            $message->to($to)->subject($subject);
            $message->from($fromMail, $fromAlias);
        });
    }

    protected function send_mail_notify($template, $to, $toAlias, $subject, $id, $type, $student, $career, $content, $fromMail, $fromAlias) {
        $data = ['name'=>$toAlias, 'id'=>$id, 'type'=>$type, 'student'=>$student, 'career'=>$career, 'content'=>$content, 'appName'=>env('APP_NAME')];
        Mail::send($template, $data, function($message) use ($to, $toAlias, $subject, $fromMail, $fromAlias) {
            $message->to($to)->subject($subject);
            $message->from($fromMail, $fromAlias);
        });
    }
    
}
