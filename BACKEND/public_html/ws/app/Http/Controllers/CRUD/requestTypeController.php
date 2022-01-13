<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\requestType;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class requestTypeController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(requestType::get(),200);
       } else {
          $requesttype = requestType::findOrFail($id);
          $attach = [];
          return response()->json(["requestType"=>$requesttype, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(requestType::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $requesttype = new requestType();
          $lastrequestType = requestType::orderBy('id')->get()->last();
          if($lastrequestType) {
             $requesttype->id = $lastrequestType->id + 1;
          } else {
             $requesttype->id = 1;
          }
          $requesttype->name = $result['name'];
          $requesttype->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($requesttype,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $requesttype = requestType::where('id',$result['id'])->update([
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($requesttype,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(requestType::destroy($id),200);
    }

    function backup(Request $data)
    {
       $requesttypes = requestType::get();
       $toReturn = [];
       foreach( $requesttypes as $requesttype) {
          $attach = [];
          array_push($toReturn, ["requestType"=>$requesttype, "attach"=>$attach]);
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
         $result = $row['requestType'];
         $exist = requestType::where('id',$result['id'])->first();
         if ($exist) {
           requestType::where('id', $result['id'])->update([
             'name' => $result['name'],
           ]);
         } else {
          $requesttype = new requestType();
          $requesttype->id = $result['id'];
          $requesttype->name = $result['name'];
          $requesttype->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
