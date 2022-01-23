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
         //  return role on GET
         $users = DB::table('users')->select('id', 'name', 'email')->get();
         foreach( $users as $user ) {
            $user -> rol_id = DB::table('rol_user')->where('user_id', $user->id)->value('rol_id');
         };
         return response()->json($users, 200);
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
         $user = User::where('id', $result['id'])->update([
            'name'=>$result['name'],
            'email'=>$result['email'],
         ]);
         DB::commit();
         // also update or create role
         if ($result['rol_id'] != null){
            DB::table('rol_user')->updateOrInsert(
               ['user_id' => $result['id']],
               [
                  'user_id' => $result['id'],
                  'rol_id' => $result['rol_id']
               ]
            );
         }
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

}
