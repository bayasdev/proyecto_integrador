<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;
Use Exception;
use App\Http\Controllers\Controller;
use App\Models\Profile\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(User::get(),200);
       } else {
          return response()->json(User::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
          return response()->json(User::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $user = new User();
          $user->name = $result['name'];
          $user->email = $result['email'];
          $user->password = Crypt::encrypt(Str::random(32));
          $user->api_token = Str::random(32);
          $user->save();
          DB::commit();
          return response()->json($user,200);
       } catch (Exception $e) {
          return response()->json($e,400);
       }
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $user = User::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'email'=>$result['email'],
          ]);
          DB::commit();
          return response()->json($user,200);
       } catch (Exception $e) {
          return response()->json($e,400);
       }
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return response()->json(User::destroy($id), 200);
    }

   //  CRUD for User <-> Role relationship
   
   function create_user_role(Request $data)
   {
      $id = $data['id'];
      $rol_id = $data['rol_id'];
      if ($id == null || $rol_id == null){
         return response()->json('Error', 400);
      } else {
         try {
            if(DB::table('rol_user')->where('user_id', $id)->first()){
               return response()->json('El usuario ya tiene un rol asignado', 400);
            } else {
               return response()->json(DB::table('rol_user')->insert(['user_id'=>$id,'rol_id'=>$rol_id]), 200);
            }
         } catch (Exception $e) {
            return response()->json('Error', 400);
         }
      }
   }

   function get_user_role(Request $data)
   {
      $id = $data['id'];
      if ($id == null){
         return response()->json('Error', 400);
      } else {
         return response()->json(DB::table('rol_user')->select('user_id', 'rol_id')->where('user_id', $id)->first(), 200);
      }
   }

   function update_user_role(Request $data)
   {
      $id = $data['id'];
      $rol_id = $data['rol_id'];
      if ($id == null || $rol_id == null){
         return response()->json('Error', 400);
      } else {
         try {
            return response()->json(DB::table('rol_user')->where('user_id', $id)->update(['rol_id'=>$rol_id]), 200);
         } catch (Exception $e) {
            return response()->json('Error', 400);
         }
      }
   }

   function delete_user_role(Request $data)
   {
      $id = $data['id'];
      if ($id == null){
         return response()->json('Error', 400);
      } else {
         try {
            return response()->json(DB::table('rol_user')->where('user_id', $id)->delete(), 200);
         } catch (Exception $e) {
            return response()->json('Error', 400);
         }
      }
   }
}
