<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use App\Models\RequestAttachment;

class RequestAttachmentController extends Controller
{
    public function showAllRequestAttachments()
    {
        $attachments = RequestAttachment::all();
        foreach ($attachments as $attachment) {
            $attachment->file_content = Storage::disk('attachments')->get($attachment->file_path);
        }
        return response()->json($attachments, 200);
    }
    
    public function showOneRequestAttachment($id)
    {
        $response = RequestAttachment::find($id);
        // get file from storage
        $content = Storage::disk('attachments')->get($response->file_path);
        // return DB values plus file in base64
        $response->file_content = $content;
        return response()->json($response, 200);
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'file_name' => 'required|string',
            'file_type' => 'required|string',
            'file_content' => 'required',
            'attachment_type' => 'required|integer|between:1,2'
        ]);
        // handle file upload to storage
        // generate unique name for file
        $file_path = uniqid($request->file_name);
        // save base64 to storage
        Storage::disk('attachments')->put($file_path, $request->file_content);
        // need to insert file_path
        RequestAttachment::create([
            'file_name' => $request->file_name,
            'file_path' => $file_path,
            'file_type' => $request->file_type,
            'attachment_type' => $request->attachment_type
        ]);
        return response()->json(['message' => 'Archivo creado correctamente'], 201);
    }
    
    public function delete($id)
    {
        // delete file from storage first
        Storage::disk('attachments')->delete(RequestAttachment::where('id', $id)->value('file_path'));
        // then delete db registry
        RequestAttachment::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
