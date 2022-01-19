<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);


   //ProyectoIntegrador

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'Profile\ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'Profile\ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'Profile\ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'Profile\ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'Profile\ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'Profile\UserController@post']);
   $router->get('/user', ['uses' => 'Profile\UserController@get']);
   $router->get('/user/paginate', ['uses' => 'Profile\UserController@paginate']);
   $router->put('/user', ['uses' => 'Profile\UserController@put']);
   $router->delete('/user', ['uses' => 'Profile\UserController@delete']);

   //CRUD request
   $router->post('/request', ['uses' => 'CRUD\requestController@post']);
   $router->get('/request', ['uses' => 'CRUD\requestController@get']);
   $router->get('/request/paginate', ['uses' => 'CRUD\requestController@paginate']);
   $router->get('/request/backup', ['uses' => 'CRUD\requestController@backup']);
   $router->put('/request', ['uses' => 'CRUD\requestController@put']);
   $router->delete('/request', ['uses' => 'CRUD\requestController@delete']);
   $router->post('/request/masive_load', ['uses' => 'CRUD\requestController@masiveLoad']);

   //CRUD subject
   $router->post('/subject', ['uses' => 'CRUD\subjectController@post']);
   $router->get('/subject', ['uses' => 'CRUD\subjectController@get']);
   $router->get('/subject/paginate', ['uses' => 'CRUD\subjectController@paginate']);
   $router->get('/subject/backup', ['uses' => 'CRUD\subjectController@backup']);
   $router->put('/subject', ['uses' => 'CRUD\subjectController@put']);
   $router->delete('/subject', ['uses' => 'CRUD\subjectController@delete']);
   $router->post('/subject/masive_load', ['uses' => 'CRUD\subjectController@masiveLoad']);

   //CRUD carreer
   $router->post('/carreer', ['uses' => 'CRUD\carreerController@post']);
   $router->get('/carreer', ['uses' => 'CRUD\carreerController@get']);
   $router->get('/carreer/paginate', ['uses' => 'CRUD\carreerController@paginate']);
   $router->get('/carreer/backup', ['uses' => 'CRUD\carreerController@backup']);
   $router->put('/carreer', ['uses' => 'CRUD\carreerController@put']);
   $router->delete('/carreer', ['uses' => 'CRUD\carreerController@delete']);
   $router->post('/carreer/masive_load', ['uses' => 'CRUD\carreerController@masiveLoad']);

   //CRUD faculty
   $router->post('/faculty', ['uses' => 'CRUD\facultyController@post']);
   $router->get('/faculty', ['uses' => 'CRUD\facultyController@get']);
   $router->get('/faculty/paginate', ['uses' => 'CRUD\facultyController@paginate']);
   $router->get('/faculty/backup', ['uses' => 'CRUD\facultyController@backup']);
   $router->put('/faculty', ['uses' => 'CRUD\facultyController@put']);
   $router->delete('/faculty', ['uses' => 'CRUD\facultyController@delete']);
   $router->post('/faculty/masive_load', ['uses' => 'CRUD\facultyController@masiveLoad']);

   //CRUD director
   $router->post('/director', ['uses' => 'CRUD\directorController@post']);
   $router->get('/director', ['uses' => 'CRUD\directorController@get']);
   $router->get('/director/paginate', ['uses' => 'CRUD\directorController@paginate']);
   $router->get('/director/backup', ['uses' => 'CRUD\directorController@backup']);
   $router->put('/director', ['uses' => 'CRUD\directorController@put']);
   $router->delete('/director', ['uses' => 'CRUD\directorController@delete']);
   $router->post('/director/masive_load', ['uses' => 'CRUD\directorController@masiveLoad']);

   //CRUD dean
   $router->post('/dean', ['uses' => 'CRUD\deanController@post']);
   $router->get('/dean', ['uses' => 'CRUD\deanController@get']);
   $router->get('/dean/paginate', ['uses' => 'CRUD\deanController@paginate']);
   $router->get('/dean/backup', ['uses' => 'CRUD\deanController@backup']);
   $router->put('/dean', ['uses' => 'CRUD\deanController@put']);
   $router->delete('/dean', ['uses' => 'CRUD\deanController@delete']);
   $router->post('/dean/masive_load', ['uses' => 'CRUD\deanController@masiveLoad']);

   //CRUD rol
   $router->post('/rol', ['uses' => 'CRUD\rolController@post']);
   $router->get('/rol', ['uses' => 'CRUD\rolController@get']);
   $router->get('/rol/paginate', ['uses' => 'CRUD\rolController@paginate']);
   $router->get('/rol/backup', ['uses' => 'CRUD\rolController@backup']);
   $router->put('/rol', ['uses' => 'CRUD\rolController@put']);
   $router->delete('/rol', ['uses' => 'CRUD\rolController@delete']);
   $router->post('/rol/masive_load', ['uses' => 'CRUD\rolController@masiveLoad']);

   //CRUD requestType
   $router->post('/requesttype', ['uses' => 'CRUD\requestTypeController@post']);
   $router->get('/requesttype', ['uses' => 'CRUD\requestTypeController@get']);
   $router->get('/requesttype/paginate', ['uses' => 'CRUD\requestTypeController@paginate']);
   $router->get('/requesttype/backup', ['uses' => 'CRUD\requestTypeController@backup']);
   $router->put('/requesttype', ['uses' => 'CRUD\requestTypeController@put']);
   $router->delete('/requesttype', ['uses' => 'CRUD\requestTypeController@delete']);
   $router->post('/requesttype/masive_load', ['uses' => 'CRUD\requestTypeController@masiveLoad']);

   //CRUD requestAttachment
   $router->post('/requestattachment', ['uses' => 'CRUD\requestAttachmentController@post']);
   $router->get('/requestattachment', ['uses' => 'CRUD\requestAttachmentController@get']);
   $router->get('/requestattachment/paginate', ['uses' => 'CRUD\requestAttachmentController@paginate']);
   $router->get('/requestattachment/backup', ['uses' => 'CRUD\requestAttachmentController@backup']);
   $router->put('/requestattachment', ['uses' => 'CRUD\requestAttachmentController@put']);
   $router->delete('/requestattachment', ['uses' => 'CRUD\requestAttachmentController@delete']);
   $router->post('/requestattachment/masive_load', ['uses' => 'CRUD\requestAttachmentController@masiveLoad']);
});
