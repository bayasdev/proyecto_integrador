<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\PetitionAttachment;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PetitionAttachmentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(PetitionAttachment::get(),200);
       } else {
          $petitionattachment = PetitionAttachment::findOrFail($id);
          $attach = [];
          return response()->json(["PetitionAttachment"=>$petitionattachment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(PetitionAttachment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petitionattachment = new PetitionAttachment();
          $lastPetitionAttachment = PetitionAttachment::orderBy('id')->get()->last();
          if($lastPetitionAttachment) {
             $petitionattachment->id = $lastPetitionAttachment->id + 1;
          } else {
             $petitionattachment->id = 1;
          }
          $petitionattachment->request_attachment_file_type = $result['request_attachment_file_type'];
          $petitionattachment->request_attachment_file_name = $result['request_attachment_file_name'];
          $petitionattachment->request_attachment_file = $result['request_attachment_file'];
          $petitionattachment->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petitionattachment,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petitionattachment = PetitionAttachment::where('id',$result['id'])->update([
             'request_attachment_file_type' => $result['request_attachment_file_type'],
             'request_attachment_file_name' => $result['request_attachment_file_name'],
             'request_attachment_file' => $result['request_attachment_file'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petitionattachment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(PetitionAttachment::destroy($id),200);
    }

    function backup(Request $data)
    {
       $petitionattachments = PetitionAttachment::get();
       $toReturn = [];
       foreach( $petitionattachments as $petitionattachment) {
          $attach = [];
          array_push($toReturn, ["PetitionAttachment"=>$petitionattachment, "attach"=>$attach]);
       }
       return response()->json($toReturn,200);
    }

    function masiveLoad(Request $data)
    {
      $incomming = $data->json()->all();
      $masiveData = $incomming['data'];
      try{
       DB::beginTransaction();
       foreach($masiveData as $row) {
         $result = $row['PetitionAttachment'];
         $exist = PetitionAttachment::where('id',$result['id'])->first();
         if ($exist) {
           PetitionAttachment::where('id', $result['id'])->update([
             'request_attachment_file_type' => $result['request_attachment_file_type'],
             'request_attachment_file_name' => $result['request_attachment_file_name'],
             'request_attachment_file' => $result['request_attachment_file'],
           ]);
         } else {
          $petitionattachment = new PetitionAttachment();
          $petitionattachment->id = $result['id'];
          $petitionattachment->request_attachment_file_type = $result['request_attachment_file_type'];
          $petitionattachment->request_attachment_file_name = $result['request_attachment_file_name'];
          $petitionattachment->request_attachment_file = $result['request_attachment_file'];
          $petitionattachment->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}