<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Rol;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RolController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Rol::get(),200);
       } else {
          $rol = Rol::findOrFail($id);
          $attach = [];
          return response()->json(["Rol"=>$rol, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Rol::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $rol = new Rol();
          $lastRol = Rol::orderBy('id')->get()->last();
          if($lastRol) {
             $rol->id = $lastRol->id + 1;
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
          $rol = Rol::where('id',$result['id'])->update([
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
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Rol::destroy($id),200);
    }

    function backup(Request $data)
    {
       $rols = Rol::get();
       $toReturn = [];
       foreach( $rols as $rol) {
          $attach = [];
          array_push($toReturn, ["Rol"=>$rol, "attach"=>$attach]);
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
         $result = $row['Rol'];
         $exist = Rol::where('id',$result['id'])->first();
         if ($exist) {
           Rol::where('id', $result['id'])->update([
             'name' => $result['name'],
           ]);
         } else {
          $rol = new Rol();
          $rol->id = $result['id'];
          $rol->name = $result['name'];
          $rol->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}