<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Subject;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SubjectController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Subject::get(),200);
       } else {
          $subject = Subject::findOrFail($id);
          $attach = [];
          return response()->json(["Subject"=>$subject, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Subject::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $subject = new Subject();
          $lastSubject = Subject::orderBy('id')->get()->last();
          if($lastSubject) {
             $subject->id = $lastSubject->id + 1;
          } else {
             $subject->id = 1;
          }
          $subject->code = $result['code'];
          $subject->name = $result['name'];
          $subject->credits = $result['credits'];
          $subject->career_id = $result['career_id'];
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
          $subject = Subject::where('id',$result['id'])->update([
             'code' => $result['code'],
             'name' => $result['name'],
             'credits' => $result['credits'],
             'career_id' => $result['career_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($subject,200);
    }

    function delete(Request $data)
    {
      $result = $data->json()->all();
      $id = $result['id'];
      return response()->json(Subject::destroy($id),200);
    }

    function backup(Request $data)
    {
       $subjects = Subject::get();
       $toReturn = [];
       foreach( $subjects as $subject) {
          $attach = [];
          array_push($toReturn, ["Subject"=>$subject, "attach"=>$attach]);
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
         $result = $row['Subject'];
         $exist = Subject::where('id',$result['id'])->first();
         if ($exist) {
           Subject::where('id', $result['id'])->update([
             'code' => $result['code'],
             'name' => $result['name'],
             'credits' => $result['credits'],
             'career_id' => $result['career_id'],
           ]);
         } else {
          $subject = new Subject();
          $subject->id = $result['id'];
          $subject->code = $result['code'];
          $subject->name = $result['name'];
          $subject->credits = $result['credits'];
          $subject->career_id = $result['career_id'];
          $subject->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}