<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Faculty;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FacultyController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Faculty::get(),200);
       } else {
          $faculty = Faculty::findOrFail($id);
          $attach = [];
          return response()->json(["Faculty"=>$faculty, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Faculty::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $faculty = new Faculty();
          $lastFaculty = Faculty::orderBy('id')->get()->last();
          if($lastFaculty) {
             $faculty->id = $lastFaculty->id + 1;
          } else {
             $faculty->id = 1;
          }
          $faculty->name = $result['name'];
          $faculty->dean_id = $result['dean_id'];
          $faculty->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($faculty,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $faculty = Faculty::where('id',$result['id'])->update([
             'name' => $result['name'],
             'dean_id' => $result['dean_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($faculty,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(Faculty::destroy($id),200);
    }

    function backup(Request $data)
    {
       $faculties = Faculty::get();
       $toReturn = [];
       foreach( $faculties as $faculty) {
          $attach = [];
          array_push($toReturn, ["Faculty"=>$faculty, "attach"=>$attach]);
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
         $result = $row['Faculty'];
         $exist = Faculty::where('id',$result['id'])->first();
         if ($exist) {
           Faculty::where('id', $result['id'])->update([
             'name' => $result['name'],
             'dean_id' => $result['dean_id'],
           ]);
         } else {
          $faculty = new Faculty();
          $faculty->id = $result['id'];
          $faculty->name = $result['name'];
          $faculty->dean_id = $result['dean_id'];
          $faculty->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}