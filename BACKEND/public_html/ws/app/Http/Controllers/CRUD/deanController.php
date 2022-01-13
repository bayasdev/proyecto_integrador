<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\dean;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class deanController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(dean::get(),200);
       } else {
          $dean = dean::findOrFail($id);
          $attach = [];
          return response()->json(["dean"=>$dean, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(dean::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $dean = new dean();
          $lastdean = dean::orderBy('id')->get()->last();
          if($lastdean) {
             $dean->id = $lastdean->id + 1;
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
          $dean = dean::where('id',$result['id'])->update([
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
       $id = $data['id'];
       return response()->json(dean::destroy($id),200);
    }

    function backup(Request $data)
    {
       $deans = dean::get();
       $toReturn = [];
       foreach( $deans as $dean) {
          $attach = [];
          array_push($toReturn, ["dean"=>$dean, "attach"=>$attach]);
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
         $result = $row['dean'];
         $exist = dean::where('id',$result['id'])->first();
         if ($exist) {
           dean::where('id', $result['id'])->update([
             'identification' => $result['identification'],
             'name' => $result['name'],
           ]);
         } else {
          $dean = new dean();
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
      return response()->json('Carga Completa',200);
    }
}
