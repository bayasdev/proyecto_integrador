<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\carreer;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class carreerController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(carreer::get(),200);
       } else {
          $carreer = carreer::findOrFail($id);
          $attach = [];
          return response()->json(["carreer"=>$carreer, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(carreer::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $carreer = new carreer();
          $lastcarreer = carreer::orderBy('id')->get()->last();
          if($lastcarreer) {
             $carreer->id = $lastcarreer->id + 1;
          } else {
             $carreer->id = 1;
          }
          $carreer->name = $result['name'];
          $carreer->faculty_id = $result['faculty_id'];
          $carreer->director_id = $result['director_id'];
          $carreer->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($carreer,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $carreer = carreer::where('id',$result['id'])->update([
             'name' => $result['name'],
             'faculty_id' => $result['faculty_id'],
             'director_id' => $result['director_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($carreer,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(carreer::destroy($id),200);
    }

    function backup(Request $data)
    {
       $carreers = carreer::get();
       $toReturn = [];
       foreach( $carreers as $carreer) {
          $attach = [];
          array_push($toReturn, ["carreer"=>$carreer, "attach"=>$attach]);
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
         $result = $row['carreer'];
         $exist = carreer::where('id',$result['id'])->first();
         if ($exist) {
           carreer::where('id', $result['id'])->update([
             'name' => $result['name'],
             'faculty_id' => $result['faculty_id'],
             'director_id' => $result['director_id'],
           ]);
         } else {
          $carreer = new carreer();
          $carreer->id = $result['id'];
          $carreer->name = $result['name'];
          $carreer->faculty_id = $result['faculty_id'];
          $carreer->director_id = $result['director_id'];
          $carreer->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
