<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\requestAttachment;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class requestAttachmentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(requestAttachment::get(),200);
       } else {
          $requestattachment = requestAttachment::findOrFail($id);
          $attach = [];
          return response()->json(["requestAttachment"=>$requestattachment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(requestAttachment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $requestattachment = new requestAttachment();
          $lastrequestAttachment = requestAttachment::orderBy('id')->get()->last();
          if($lastrequestAttachment) {
             $requestattachment->id = $lastrequestAttachment->id + 1;
          } else {
             $requestattachment->id = 1;
          }
          $requestattachment->request_attachment_file_type = $result['request_attachment_file_type'];
          $requestattachment->request_attachment_file_name = $result['request_attachment_file_name'];
          $requestattachment->request_attachment_file = $result['request_attachment_file'];
          $requestattachment->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($requestattachment,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $requestattachment = requestAttachment::where('id',$result['id'])->update([
             'request_attachment_file_type' => $result['request_attachment_file_type'],
             'request_attachment_file_name' => $result['request_attachment_file_name'],
             'request_attachment_file' => $result['request_attachment_file'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($requestattachment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(requestAttachment::destroy($id),200);
    }

    function backup(Request $data)
    {
       $requestattachments = requestAttachment::get();
       $toReturn = [];
       foreach( $requestattachments as $requestattachment) {
          $attach = [];
          array_push($toReturn, ["requestAttachment"=>$requestattachment, "attach"=>$attach]);
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
         $result = $row['requestAttachment'];
         $exist = requestAttachment::where('id',$result['id'])->first();
         if ($exist) {
           requestAttachment::where('id', $result['id'])->update([
             'request_attachment_file_type' => $result['request_attachment_file_type'],
             'request_attachment_file_name' => $result['request_attachment_file_name'],
             'request_attachment_file' => $result['request_attachment_file'],
           ]);
         } else {
          $requestattachment = new requestAttachment();
          $requestattachment->id = $result['id'];
          $requestattachment->request_attachment_file_type = $result['request_attachment_file_type'];
          $requestattachment->request_attachment_file_name = $result['request_attachment_file_name'];
          $requestattachment->request_attachment_file = $result['request_attachment_file'];
          $requestattachment->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
