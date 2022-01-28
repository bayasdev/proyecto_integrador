<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Role::get(),200);
       } else {
          $role = Role::findOrFail($id);
          $attach = [];
          return response()->json(["Role"=>$role, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Role::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $role = new Role();
          $lastRole = Role::orderBy('id')->get()->last();
          if($lastRole) {
             $role->id = $lastRole->id + 1;
          } else {
             $role->id = 1;
          }
          $role->name = $result['name'];
          $role->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($role,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $role = Role::where('id',$result['id'])->update([
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($role,200);
    }

    function delete(Request $data)
    {
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Role::destroy($id),200);
    }

    function backup(Request $data)
    {
       $roles = Role::get();
       $toReturn = [];
       foreach( $roles as $role) {
          $attach = [];
          array_push($toReturn, ["Role"=>$role, "attach"=>$attach]);
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
         $result = $row['Role'];
         $exist = Role::where('id',$result['id'])->first();
         if ($exist) {
           Role::where('id', $result['id'])->update([
             'name' => $result['name'],
           ]);
         } else {
          $role = new Role();
          $role->id = $result['id'];
          $role->name = $result['name'];
          $role->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}