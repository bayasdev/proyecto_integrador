<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Http\Request;
Use Exception;
use App\Models\Petition;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PetitionController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Petition::get(),200);
       } else {
          $petition = Petition::findOrFail($id);
          $attach = [];
          $petition_attachments_on_petition = $petition->PetitionAttachments()->get();
          array_push($attach, ["petition_attachments_on_petition"=>$petition_attachments_on_petition]);
          $subjects_on_petition = $petition->Subjects()->get();
          array_push($attach, ["subjects_on_petition"=>$subjects_on_petition]);
          return response()->json(["Petition"=>$petition, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Petition::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petition = new Petition();
          $lastPetition = Petition::orderBy('id')->get()->last();
          if($lastPetition) {
             $petition->id = $lastPetition->id + 1;
          } else {
             $petition->id = 1;
          }
          $petition->parameters = $result['parameters'];
          $petition->petition_type_id = $result['petition_type_id'];
          $petition->save();
          $petition_attachments_on_petition = $result['petition_attachments_on_petition'];
          foreach( $petition_attachments_on_petition as $petition_attachment) {
             $petition->PetitionAttachments()->attach($petition_attachment['id']);
          }
          $subjects_on_petition = $result['subjects_on_petition'];
          foreach( $subjects_on_petition as $subject) {
             $petition->Subjects()->attach($subject['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petition,200);
    }

    function put(Request $data)
    {
       try{
          $result = $data->json()->all();
          DB::beginTransaction();
          $petition = Petition::where('id',$result['id'])->update([
             'parameters' => $result['parameters'],
             'petition_type_id' => $result['petition_type_id'],
          ]);
          $petition = Petition::where('id',$result['id'])->first();
          $petition_attachments_on_petition = $result['petition_attachments_on_petition'];
          $petition_attachments_on_petition_old = $petition->PetitionAttachments()->get();
          foreach( $petition_attachments_on_petition_old as $petition_attachment_old ) {
             $delete = true;
             foreach( $petition_attachments_on_petition as $petition_attachment ) {
                if ( $petition_attachment_old->id === $petition_attachment['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $petition->PetitionAttachments()->detach($petition_attachment_old->id);
             }
          }
          foreach( $petition_attachments_on_petition as $petition_attachment ) {
             $add = true;
             foreach( $petition_attachments_on_petition_old as $petition_attachment_old) {
                if ( $petition_attachment_old->id === $petition_attachment['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $petition->PetitionAttachments()->attach($petition_attachment['id']);
             }
          }
          $petition = Petition::where('id',$result['id'])->first();
          $subjects_on_petition = $result['subjects_on_petition'];
          $subjects_on_petition_old = $petition->Subjects()->get();
          foreach( $subjects_on_petition_old as $subject_old ) {
             $delete = true;
             foreach( $subjects_on_petition as $subject ) {
                if ( $subject_old->id === $subject['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $petition->Subjects()->detach($subject_old->id);
             }
          }
          foreach( $subjects_on_petition as $subject ) {
             $add = true;
             foreach( $subjects_on_petition_old as $subject_old) {
                if ( $subject_old->id === $subject['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $petition->Subjects()->attach($subject['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($petition,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return response()->json(Petition::destroy($id),200);
    }

    function backup(Request $data)
    {
       $petitions = Petition::get();
       $toReturn = [];
       foreach( $petitions as $petition) {
          $attach = [];
          $petition_attachments_on_petition = $petition->PetitionAttachments()->get();
          array_push($attach, ["petition_attachments_on_petition"=>$petition_attachments_on_petition]);
          $subjects_on_petition = $petition->Subjects()->get();
          array_push($attach, ["subjects_on_petition"=>$subjects_on_petition]);
          array_push($toReturn, ["Petition"=>$petition, "attach"=>$attach]);
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
         $result = $row['Petition'];
         $exist = Petition::where('id',$result['id'])->first();
         if ($exist) {
           Petition::where('id', $result['id'])->update([
             'parameters' => $result['parameters'],
             'petition_type_id' => $result['petition_type_id'],
           ]);
         } else {
          $petition = new Petition();
          $petition->id = $result['id'];
          $petition->parameters = $result['parameters'];
          $petition->petition_type_id = $result['petition_type_id'];
          $petition->save();
         }
         $petition = Petition::where('id',$result['id'])->first();
         $petition_attachments_on_petition = [];
         foreach($row['attach'] as $attach){
            $petition_attachments_on_petition = $attach['petition_attachments_on_petition'];
         }
         $petition_attachments_on_petition_old = $petition->PetitionAttachments()->get();
         foreach( $petition_attachments_on_petition_old as $petition_attachment_old ) {
            $delete = true;
            foreach( $petition_attachments_on_petition as $petition_attachment ) {
               if ( $petition_attachment_old->id === $petition_attachment['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $petition->PetitionAttachments()->detach($petition_attachment_old->id);
            }
         }
         foreach( $petition_attachments_on_petition as $petition_attachment ) {
            $add = true;
            foreach( $petition_attachments_on_petition_old as $petition_attachment_old) {
               if ( $petition_attachment_old->id === $petition_attachment['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $petition->PetitionAttachments()->attach($petition_attachment['id']);
            }
         }
         $petition = Petition::where('id',$result['id'])->first();
         $subjects_on_petition = [];
         foreach($row['attach'] as $attach){
            $subjects_on_petition = $attach['subjects_on_petition'];
         }
         $subjects_on_petition_old = $petition->Subjects()->get();
         foreach( $subjects_on_petition_old as $subject_old ) {
            $delete = true;
            foreach( $subjects_on_petition as $subject ) {
               if ( $subject_old->id === $subject['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $petition->Subjects()->detach($subject_old->id);
            }
         }
         foreach( $subjects_on_petition as $subject ) {
            $add = true;
            foreach( $subjects_on_petition_old as $subject_old) {
               if ( $subject_old->id === $subject['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $petition->Subjects()->attach($subject['id']);
            }
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}