<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Director;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DirectorController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Director::get(),200);
       } else {
          $director = Director::findOrFail($id);
          $attach = [];
          return response()->json(["Director"=>$director, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Director::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $director = new Director();
          $lastDirector = Director::orderBy('id')->get()->last();
          if($lastDirector) {
             $director->id = $lastDirector->id + 1;
          } else {
             $director->id = 1;
          }
          $director->identification = $result['identification'];
          $director->name = $result['name'];
          $director->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($director,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $director = Director::where('id',$result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($director,200);
    }

    function delete(Request $data)
    {
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Rol::destroy($id),200);
    }

    function backup(Request $data)
    {
       $directors = Director::get();
       $toReturn = [];
       foreach( $directors as $director) {
          $attach = [];
          array_push($toReturn, ["Director"=>$director, "attach"=>$attach]);
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
         $result = $row['Director'];
         $exist = Director::where('id',$result['id'])->first();
         if ($exist) {
           Director::where('id', $result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
           ]);
         } else {
          $director = new Director();
          $director->id = $result['id'];
          $director->identification = $result['identification'];
          $director->name = $result['name'];
          $director->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}