<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\rol;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class rolController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(rol::get(),200);
       } else {
          $rol = rol::findOrFail($id);
          $attach = [];
          return response()->json(["rol"=>$rol, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(rol::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $rol = new rol();
          $lastrol = rol::orderBy('id')->get()->last();
          if($lastrol) {
             $rol->id = $lastrol->id + 1;
          } else {
             $rol->id = 1;
          }
          $rol->name = $result['name'];
          $rol->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($rol,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $rol = rol::where('id',$result['id'])->update([
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($rol,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(rol::destroy($id),200);
    }

    function backup(Request $data)
    {
       $rols = rol::get();
       $toReturn = [];
       foreach( $rols as $rol) {
          $attach = [];
          array_push($toReturn, ["rol"=>$rol, "attach"=>$attach]);
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
         $result = $row['rol'];
         $exist = rol::where('id',$result['id'])->first();
         if ($exist) {
           rol::where('id', $result['id'])->update([
             'name' => $result['name'],
           ]);
         } else {
          $rol = new rol();
          $rol->id = $result['id'];
          $rol->name = $result['name'];
          $rol->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
