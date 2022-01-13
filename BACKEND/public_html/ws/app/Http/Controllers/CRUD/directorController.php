<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\director;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class directorController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(director::get(),200);
       } else {
          $director = director::findOrFail($id);
          $attach = [];
          return response()->json(["director"=>$director, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(director::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $director = new director();
          $lastdirector = director::orderBy('id')->get()->last();
          if($lastdirector) {
             $director->id = $lastdirector->id + 1;
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
          $director = director::where('id',$result['id'])->update([
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
       $id = $data['id'];
       return response()->json(director::destroy($id),200);
    }

    function backup(Request $data)
    {
       $directors = director::get();
       $toReturn = [];
       foreach( $directors as $director) {
          $attach = [];
          array_push($toReturn, ["director"=>$director, "attach"=>$attach]);
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
         $result = $row['director'];
         $exist = director::where('id',$result['id'])->first();
         if ($exist) {
           director::where('id', $result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
           ]);
         } else {
          $director = new director();
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
      return response()->json('Carga Completa',200);
    }
}
