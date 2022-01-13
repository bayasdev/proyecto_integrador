<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\faculty;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class facultyController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(faculty::get(),200);
       } else {
          $faculty = faculty::findOrFail($id);
          $attach = [];
          return response()->json(["faculty"=>$faculty, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(faculty::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $faculty = new faculty();
          $lastfaculty = faculty::orderBy('id')->get()->last();
          if($lastfaculty) {
             $faculty->id = $lastfaculty->id + 1;
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
          $faculty = faculty::where('id',$result['id'])->update([
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
       return response()->json(faculty::destroy($id),200);
    }

    function backup(Request $data)
    {
       $faculties = faculty::get();
       $toReturn = [];
       foreach( $faculties as $faculty) {
          $attach = [];
          array_push($toReturn, ["faculty"=>$faculty, "attach"=>$attach]);
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
         $result = $row['faculty'];
         $exist = faculty::where('id',$result['id'])->first();
         if ($exist) {
           faculty::where('id', $result['id'])->update([
             'name' => $result['name'],
             'dean_id' => $result['dean_id'],
           ]);
         } else {
          $faculty = new faculty();
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
      return response()->json('Carga Completa',200);
    }
}
