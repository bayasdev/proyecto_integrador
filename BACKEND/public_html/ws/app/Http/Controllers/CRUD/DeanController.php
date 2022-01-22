<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Dean;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeanController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Dean::get(),200);
       } else {
          $dean = Dean::findOrFail($id);
          $attach = [];
          return response()->json(["Dean"=>$dean, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Dean::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $dean = new Dean();
          $lastDean = Dean::orderBy('id')->get()->last();
          if($lastDean) {
             $dean->id = $lastDean->id + 1;
          } else {
             $dean->id = 1;
          }
          $dean->identification = $result['identification'];
          $dean->name = $result['name'];
          $dean->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($dean,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $dean = Dean::where('id',$result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($dean,200);
    }

    function delete(Request $data)
    {
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Rol::destroy($id),200);
    }

    function backup(Request $data)
    {
       $deans = Dean::get();
       $toReturn = [];
       foreach( $deans as $dean) {
          $attach = [];
          array_push($toReturn, ["Dean"=>$dean, "attach"=>$attach]);
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
         $result = $row['Dean'];
         $exist = Dean::where('id',$result['id'])->first();
         if ($exist) {
           Dean::where('id', $result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
           ]);
         } else {
          $dean = new Dean();
          $dean->id = $result['id'];
          $dean->identification = $result['identification'];
          $dean->name = $result['name'];
          $dean->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}