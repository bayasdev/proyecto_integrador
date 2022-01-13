<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class requestController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(request::get(),200);
       } else {
          $request = request::findOrFail($id);
          $attach = [];
          $request_attachments_on_request = $request->requestAttachments()->get();
          array_push($attach, ["request_attachments_on_request"=>$request_attachments_on_request]);
          return response()->json(["request"=>$request, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(request::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $request = new request();
          $lastrequest = request::orderBy('id')->get()->last();
          if($lastrequest) {
             $request->id = $lastrequest->id + 1;
          } else {
             $request->id = 1;
          }
          $request->parameters = $result['parameters'];
          $request->request_type_id = $result['request_type_id'];
          $request->save();
          $request_attachments_on_request = $result['request_attachments_on_request'];
          foreach( $request_attachments_on_request as $request_attachment) {
             $request->requestAttachments()->attach($request_attachment['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($request,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $request = request::where('id',$result['id'])->update([
             'parameters' => $result['parameters'],
             'request_type_id' => $result['request_type_id'],
          ]);
          $request = request::where('id',$result['id'])->first();
          $request_attachments_on_request = $result['request_attachments_on_request'];
          $request_attachments_on_request_old = $request->requestAttachments()->get();
          foreach( $request_attachments_on_request_old as $request_attachment_old ) {
             $delete = true;
             foreach( $request_attachments_on_request as $request_attachment ) {
                if ( $request_attachment_old->id === $request_attachment['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $request->requestAttachments()->detach($request_attachment_old->id);
             }
          }
          foreach( $request_attachments_on_request as $request_attachment ) {
             $add = true;
             foreach( $request_attachments_on_request_old as $request_attachment_old) {
                if ( $request_attachment_old->id === $request_attachment['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $request->requestAttachments()->attach($request_attachment['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($request,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(request::destroy($id),200);
    }

    function backup(Request $data)
    {
       $requests = request::get();
       $toReturn = [];
       foreach( $requests as $request) {
          $attach = [];
          $request_attachments_on_request = $request->requestAttachments()->get();
          array_push($attach, ["request_attachments_on_request"=>$request_attachments_on_request]);
          array_push($toReturn, ["request"=>$request, "attach"=>$attach]);
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
         $result = $row['request'];
         $exist = request::where('id',$result['id'])->first();
         if ($exist) {
           request::where('id', $result['id'])->update([
             'parameters' => $result['parameters'],
             'request_type_id' => $result['request_type_id'],
           ]);
         } else {
          $request = new request();
          $request->id = $result['id'];
          $request->parameters = $result['parameters'];
          $request->request_type_id = $result['request_type_id'];
          $request->save();
         }
         $request = request::where('id',$result['id'])->first();
         $request_attachments_on_request = [];
         foreach($row['attach'] as $attach){
            $request_attachments_on_request = $attach['request_attachments_on_request'];
         }
         $request_attachments_on_request_old = $request->requestAttachments()->get();
         foreach( $request_attachments_on_request_old as $request_attachment_old ) {
            $delete = true;
            foreach( $request_attachments_on_request as $request_attachment ) {
               if ( $request_attachment_old->id === $request_attachment['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $request->requestAttachments()->detach($request_attachment_old->id);
            }
         }
         foreach( $request_attachments_on_request as $request_attachment ) {
            $add = true;
            foreach( $request_attachments_on_request_old as $request_attachment_old) {
               if ( $request_attachment_old->id === $request_attachment['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $request->requestAttachments()->attach($request_attachment['id']);
            }
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
