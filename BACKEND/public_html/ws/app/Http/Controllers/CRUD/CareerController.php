<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Career;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CareerController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Career::get(),200);
       } else {
          $career = Career::findOrFail($id);
          $attach = [];
          return response()->json(["Career"=>$career, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Career::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $career = new Career();
          $lastCareer = Career::orderBy('id')->get()->last();
          if($lastCareer) {
             $career->id = $lastCareer->id + 1;
          } else {
             $career->id = 1;
          }
          $career->name = $result['name'];
          $career->faculty_id = $result['faculty_id'];
          $career->director_id = $result['director_id'];
          $career->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($career,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $career = Career::where('id',$result['id'])->update([
             'name' => $result['name'],
             'faculty_id' => $result['faculty_id'],
             'director_id' => $result['director_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($career,200);
    }

    function delete(Request $data)
    {
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Career::destroy($id),200);
    }

    function backup(Request $data)
    {
       $careers = Career::get();
       $toReturn = [];
       foreach( $careers as $career) {
          $attach = [];
          array_push($toReturn, ["Career"=>$career, "attach"=>$attach]);
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
         $result = $row['Career'];
         $exist = Career::where('id',$result['id'])->first();
         if ($exist) {
           Career::where('id', $result['id'])->update([
             'name' => $result['name'],
             'faculty_id' => $result['faculty_id'],
             'director_id' => $result['director_id'],
           ]);
         } else {
          $career = new Career();
          $career->id = $result['id'];
          $career->name = $result['name'];
          $career->faculty_id = $result['faculty_id'];
          $career->director_id = $result['director_id'];
          $career->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}