<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\subject;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class subjectController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(subject::get(),200);
       } else {
          $subject = subject::findOrFail($id);
          $attach = [];
          return response()->json(["subject"=>$subject, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(subject::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $subject = new subject();
          $lastsubject = subject::orderBy('id')->get()->last();
          if($lastsubject) {
             $subject->id = $lastsubject->id + 1;
          } else {
             $subject->id = 1;
          }
          $subject->code = $result['code'];
          $subject->name = $result['name'];
          $subject->credits = $result['credits'];
          $subject->carreer_id = $result['carreer_id'];
          $subject->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($subject,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $subject = subject::where('id',$result['id'])->update([
             'code' => $result['code'],
             'name' => $result['name'],
             'credits' => $result['credits'],
             'carreer_id' => $result['carreer_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($subject,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(subject::destroy($id),200);
    }

    function backup(Request $data)
    {
       $subjects = subject::get();
       $toReturn = [];
       foreach( $subjects as $subject) {
          $attach = [];
          array_push($toReturn, ["subject"=>$subject, "attach"=>$attach]);
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
         $result = $row['subject'];
         $exist = subject::where('id',$result['id'])->first();
         if ($exist) {
           subject::where('id', $result['id'])->update([
             'code' => $result['code'],
             'name' => $result['name'],
             'credits' => $result['credits'],
             'carreer_id' => $result['carreer_id'],
           ]);
         } else {
          $subject = new subject();
          $subject->id = $result['id'];
          $subject->code = $result['code'];
          $subject->name = $result['name'];
          $subject->credits = $result['credits'];
          $subject->carreer_id = $result['carreer_id'];
          $subject->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Carga Completa',200);
    }
}
