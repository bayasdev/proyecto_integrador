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
   return 'API SMCAR operativa';
});

// Authentication

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

// Check token on middleware
$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);

   //CRUD User
   // $router->post('/user', ['uses' => 'Profile\UserController@post']);
   $router->get('/user', ['uses' => 'Profile\UserController@get']);
   $router->get('/user/paginate', ['uses' => 'Profile\UserController@paginate']);
   $router->put('/user', ['uses' => 'Profile\UserController@put']);
   $router->delete('/user', ['uses' => 'Profile\UserController@delete']);

   //CRUD Subject
   $router->post('/subject', ['uses' => 'CRUD\SubjectController@post']);
   $router->get('/subject', ['uses' => 'CRUD\SubjectController@get']);
   $router->get('/subject/paginate', ['uses' => 'CRUD\SubjectController@paginate']);
   $router->get('/subject/backup', ['uses' => 'CRUD\SubjectController@backup']);
   $router->put('/subject', ['uses' => 'CRUD\SubjectController@put']);
   $router->delete('/subject', ['uses' => 'CRUD\SubjectController@delete']);
   $router->post('/subject/masive_load', ['uses' => 'CRUD\SubjectController@masiveLoad']);

   //CRUD Career
   $router->post('/career', ['uses' => 'CRUD\CareerController@post']);
   $router->get('/career', ['uses' => 'CRUD\CareerController@get']);
   $router->get('/career/paginate', ['uses' => 'CRUD\CareerController@paginate']);
   $router->get('/career/backup', ['uses' => 'CRUD\CareerController@backup']);
   $router->put('/career', ['uses' => 'CRUD\CareerController@put']);
   $router->delete('/career', ['uses' => 'CRUD\CareerController@delete']);
   $router->post('/career/masive_load', ['uses' => 'CRUD\CareerController@masiveLoad']);

   //CRUD Petition
   $router->post('/petition', ['uses' => 'CRUD\PetitionController@post']);
   $router->get('/petition', ['uses' => 'CRUD\PetitionController@get']);
   $router->get('/petition/paginate', ['uses' => 'CRUD\PetitionController@paginate']);
   $router->get('/petition/backup', ['uses' => 'CRUD\PetitionController@backup']);
   $router->put('/petition', ['uses' => 'CRUD\PetitionController@put']);
   $router->delete('/petition', ['uses' => 'CRUD\PetitionController@delete']);
   $router->post('/petition/masive_load', ['uses' => 'CRUD\PetitionController@masiveLoad']);

   //CRUD Faculty
   $router->post('/faculty', ['uses' => 'CRUD\FacultyController@post']);
   $router->get('/faculty', ['uses' => 'CRUD\FacultyController@get']);
   $router->get('/faculty/paginate', ['uses' => 'CRUD\FacultyController@paginate']);
   $router->get('/faculty/backup', ['uses' => 'CRUD\FacultyController@backup']);
   $router->put('/faculty', ['uses' => 'CRUD\FacultyController@put']);
   $router->delete('/faculty', ['uses' => 'CRUD\FacultyController@delete']);
   $router->post('/faculty/masive_load', ['uses' => 'CRUD\FacultyController@masiveLoad']);

   //CRUD Director
   $router->post('/director', ['uses' => 'CRUD\DirectorController@post']);
   $router->get('/director', ['uses' => 'CRUD\DirectorController@get']);
   $router->get('/director/paginate', ['uses' => 'CRUD\DirectorController@paginate']);
   $router->get('/director/backup', ['uses' => 'CRUD\DirectorController@backup']);
   $router->put('/director', ['uses' => 'CRUD\DirectorController@put']);
   $router->delete('/director', ['uses' => 'CRUD\DirectorController@delete']);
   $router->post('/director/masive_load', ['uses' => 'CRUD\DirectorController@masiveLoad']);

   //CRUD Dean
   $router->post('/dean', ['uses' => 'CRUD\DeanController@post']);
   $router->get('/dean', ['uses' => 'CRUD\DeanController@get']);
   $router->get('/dean/paginate', ['uses' => 'CRUD\DeanController@paginate']);
   $router->get('/dean/backup', ['uses' => 'CRUD\DeanController@backup']);
   $router->put('/dean', ['uses' => 'CRUD\DeanController@put']);
   $router->delete('/dean', ['uses' => 'CRUD\DeanController@delete']);
   $router->post('/dean/masive_load', ['uses' => 'CRUD\DeanController@masiveLoad']);

   //CRUD Role
   $router->post('/role', ['uses' => 'CRUD\RoleController@post']);
   $router->get('/role', ['uses' => 'CRUD\RoleController@get']);
   $router->get('/role/paginate', ['uses' => 'CRUD\RoleController@paginate']);
   $router->get('/role/backup', ['uses' => 'CRUD\RoleController@backup']);
   $router->put('/role', ['uses' => 'CRUD\RoleController@put']);
   $router->delete('/role', ['uses' => 'CRUD\RoleController@delete']);
   $router->post('/role/masive_load', ['uses' => 'CRUD\RoleController@masiveLoad']);

   //CRUD PetitionType
   $router->post('/petitiontype', ['uses' => 'CRUD\PetitionTypeController@post']);
   $router->get('/petitiontype', ['uses' => 'CRUD\PetitionTypeController@get']);
   $router->get('/petitiontype/paginate', ['uses' => 'CRUD\PetitionTypeController@paginate']);
   $router->get('/petitiontype/backup', ['uses' => 'CRUD\PetitionTypeController@backup']);
   $router->put('/petitiontype', ['uses' => 'CRUD\PetitionTypeController@put']);
   $router->delete('/petitiontype', ['uses' => 'CRUD\PetitionTypeController@delete']);
   $router->post('/petitiontype/masive_load', ['uses' => 'CRUD\PetitionTypeController@masiveLoad']);

   //CRUD PetitionAttachment
   $router->post('/petitionattachment', ['uses' => 'CRUD\PetitionAttachmentController@post']);
   $router->get('/petitionattachment', ['uses' => 'CRUD\PetitionAttachmentController@get']);
   $router->get('/petitionattachment/paginate', ['uses' => 'CRUD\PetitionAttachmentController@paginate']);
   $router->get('/petitionattachment/backup', ['uses' => 'CRUD\PetitionAttachmentController@backup']);
   $router->put('/petitionattachment', ['uses' => 'CRUD\PetitionAttachmentController@put']);
   $router->delete('/petitionattachment', ['uses' => 'CRUD\PetitionAttachmentController@delete']);
   $router->post('/petitionattachment/masive_load', ['uses' => 'CRUD\PetitionAttachmentController@masiveLoad']);
});
