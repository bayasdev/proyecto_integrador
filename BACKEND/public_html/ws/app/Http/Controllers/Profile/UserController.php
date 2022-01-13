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
}
