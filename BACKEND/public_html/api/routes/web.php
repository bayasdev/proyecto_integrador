<?php

/** @var \Laravel\Lumen\Routing\Router $router */

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
    return 'SMCAR REST API v2';
});

$router->group(['prefix' => 'api/v2'], function () use ($router) {
    // auth
    $router->post('register', ['uses' => 'AuthController@register']);
    $router->post('login', ['uses' => 'AuthController@login']);
    $router->post('recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
    $router->get('recovery', ['uses' => 'AuthController@passwordRecovery']);

    // Roles
    // 1 Administrador
    // 2 Decano
    // 3 Director de Carrera
    // 4 Contabilidad
    // 5 Estudiante
    // 99 cualquiera

    $router->group(['middleware' => ['auth:99']], function () use ($router){
        // Allow to update User profile
        $router->put('users/{id}', ['uses' => 'UserController@update']);

        //  RequestAttachments
        $router->get('request_attachments',  ['uses' => 'RequestAttachmentController@showAllRequestAttachments']);
        $router->get('request_attachments/{id}', ['uses' => 'RequestAttachmentController@showOneRequestAttachment']);
        $router->post('request_attachments', ['uses' => 'RequestAttachmentController@create']);
        $router->delete('request_attachments/{id}', ['uses' => 'RequestAttachmentController@delete']);

        //  Requests
        $router->get('requests',  ['uses' => 'RequestController@showAllRequests']);
        $router->get('requests/{id}', ['uses' => 'RequestController@showOneRequest']);
        $router->post('requests', ['uses' => 'RequestController@create']);
        $router->delete('requests/{id}', ['uses' => 'RequestController@delete']);
        $router->put('requests/{id}', ['uses' => 'RequestController@update']);
    });

    $router->group(['middleware' => ['auth:1']], function () use ($router){
        
        //  User
        $router->get('users',  ['uses' => 'UserController@showAllUsers']);
        $router->get('users/{id}', ['uses' => 'UserController@showOneUser']);    
        $router->delete('users/{id}', ['uses' => 'UserController@delete']);

        //  Role
        $router->get('roles',  ['uses' => 'RoleController@showAllRoles']);
        $router->get('roles/{id}', ['uses' => 'RoleController@showOneRole']);
        $router->post('roles',  ['uses' => 'RoleController@create']);
        $router->delete('roles/{id}', ['uses' => 'RoleController@delete']);
        $router->put('roles/{id}', ['uses' => 'RoleController@update']);

        //  Dean
        $router->get('deans',  ['uses' => 'DeanController@showAllDeans']);
        $router->get('deans/{id}', ['uses' => 'DeanController@showOneDean']);
        $router->post('deans', ['uses' => 'DeanController@create']);
        $router->delete('deans/{id}', ['uses' => 'DeanController@delete']);
        $router->put('deans/{id}', ['uses' => 'DeanController@update']);

        //  Faculty
        $router->get('faculties',  ['uses' => 'FacultyController@showAllFaculties']);
        $router->get('faculties/{id}', ['uses' => 'FacultyController@showOneFaculty']);
        $router->post('faculties', ['uses' => 'FacultyController@create']);
        $router->delete('faculties/{id}', ['uses' => 'FacultyController@delete']);
        $router->put('faculties/{id}', ['uses' => 'FacultyController@update']);

        //  Director
        $router->get('directors',  ['uses' => 'DirectorController@showAllDirectors']);
        $router->get('directors/{id}', ['uses' => 'DirectorController@showOneDirector']);
        $router->post('directors', ['uses' => 'DirectorController@create']);
        $router->delete('directors/{id}', ['uses' => 'DirectorController@delete']);
        $router->put('directors/{id}', ['uses' => 'DirectorController@update']);

        //  Careers
        $router->get('careers',  ['uses' => 'CareerController@showAllCareers']);
        $router->get('careers/{id}', ['uses' => 'CareerController@showOneCareer']);
        $router->post('careers', ['uses' => 'CareerController@create']);
        $router->delete('careers/{id}', ['uses' => 'CareerController@delete']);
        $router->put('careers/{id}', ['uses' => 'CareerController@update']);

        //  Subjects
        $router->get('subjects',  ['uses' => 'SubjectController@showAllSubjects']);
        $router->get('subjects/{id}', ['uses' => 'SubjectController@showOneSubject']);
        $router->post('subjects', ['uses' => 'SubjectController@create']);
        $router->delete('subjects/{id}', ['uses' => 'SubjectController@delete']);
        $router->put('subjects/{id}', ['uses' => 'SubjectController@update']);

        //  RequestTypes
        $router->get('request_types',  ['uses' => 'RequestTypeController@showAllRequestTypes']);
        $router->get('request_types/{id}', ['uses' => 'RequestTypeController@showOneRequestType']);
        $router->post('request_types', ['uses' => 'RequestTypeController@create']);
        $router->delete('request_types/{id}', ['uses' => 'RequestTypeController@delete']);
        $router->put('request_types/{id}', ['uses' => 'RequestTypeController@update']);

        //  RequestStatuses
        $router->get('request_statuses',  ['uses' => 'RequestStatusController@showAllRequestStatuses']);
        $router->get('request_statuses/{id}', ['uses' => 'RequestStatusController@showOneRequestStatus']);
        $router->post('request_statuses', ['uses' => 'RequestStatusController@create']);
        $router->delete('request_statuses/{id}', ['uses' => 'RequestStatusController@delete']);
        $router->put('request_statuses/{id}', ['uses' => 'RequestStatusController@update']);
    });
});