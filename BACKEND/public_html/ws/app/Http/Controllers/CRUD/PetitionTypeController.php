<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\PetitionType;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PetitionTypeController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(PetitionType::get(),200);
       } else {
          $petitiontype = PetitionType::findOrFail($id);
          $attach = [];
          return response()->json(["PetitionType"=>$petitiontype, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(PetitionType::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petitiontype = new PetitionType();
          $lastPetitionType = PetitionType::orderBy('id')->get()->last();
          if($lastPetitionType) {
             $petitiontype->id = $lastPetitionType->id + 1;
          } else {
             $petitiontype->id = 1;
          }
          $petitiontype->name = $result['name'];
          $petitiontype->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petitiontype,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petitiontype = PetitionType::where('id',$result['id'])->update([
             'name' => $result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petitiontype,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(PetitionType::destroy($id),200);
    }

    function backup(Request $data)
    {
       $petitiontypes = PetitionType::get();
       $toReturn = [];
       foreach( $petitiontypes as $petitiontype) {
          $attach = [];
          array_push($toReturn, ["PetitionType"=>$petitiontype, "attach"=>$attach]);
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
         $result = $row['PetitionType'];
         $exist = PetitionType::where('id',$result['id'])->first();
         if ($exist) {
           PetitionType::where('id', $result['id'])->update([
             'name' => $result['name'],
           ]);
         } else {
          $petitiontype = new PetitionType();
          $petitiontype->id = $result['id'];
          $petitiontype->name = $result['name'];
          $petitiontype->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}