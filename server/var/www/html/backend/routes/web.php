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

    // common
    $router->group(['middleware' => ['auth:99']], function () use ($router){
        
        // allow user to change its email and password
        $router->put('update-profile/{id}', ['uses' => 'UserController@updateProfile']);

        //  RequestAttachments
        $router->get('request-attachments',  ['uses' => 'RequestAttachmentController@showAllRequestAttachments']);
        $router->get('request-attachments/{id}', ['uses' => 'RequestAttachmentController@showOneRequestAttachment']);
        $router->post('request-attachments', ['uses' => 'RequestAttachmentController@create']);
        $router->delete('request-attachments/{id}', ['uses' => 'RequestAttachmentController@delete']);

        //  Requests
        $router->get('requests',  ['uses' => 'RequestController@showAllRequests']);
        $router->get('requests/{id}', ['uses' => 'RequestController@showOneRequest']);
        $router->post('requests', ['uses' => 'RequestController@create']);
        $router->delete('requests/{id}', ['uses' => 'RequestController@delete']);
        $router->put('requests/{id}', ['uses' => 'RequestController@update']);

        // retrieve subjects by career
        $router->get('careers/{id}/subjects',  ['uses' => 'SubjectController@showAllByCareer']);
        $router->get('careers',  ['uses' => 'CareerController@showAllCareers']);

        // student
        $router->get('students/{id}/requests', ['uses' => 'RequestController@showAllByStudent']);
    });

    // administration
    $router->group(['middleware' => ['auth:1']], function () use ($router){
        
        // User
        $router->get('users',  ['uses' => 'UserController@showAllUsers']);
        $router->get('users/{id}', ['uses' => 'UserController@showOneUser']);
        $router->post('users',  ['uses' => 'UserController@create']);
        $router->delete('users/{id}', ['uses' => 'UserController@delete']);
        $router->put('users/{id}', ['uses' => 'UserController@update']);

        // Dean
        $router->get('deans',  ['uses' => 'UserController@showAllDeans']);

        // Director
        $router->get('directors',  ['uses' => 'UserController@showAllDirectors']);

        // Accountant
        $router->get('accountants',  ['uses' => 'UserController@showAllAccountants']);

        // Student
        $router->get('students',  ['uses' => 'UserController@showAllStudents']);

        // Faculty
        $router->get('faculties',  ['uses' => 'FacultyController@showAllFaculties']);
        $router->get('faculties/{id}', ['uses' => 'FacultyController@showOneFaculty']);
        $router->post('faculties', ['uses' => 'FacultyController@create']);
        $router->delete('faculties/{id}', ['uses' => 'FacultyController@delete']);
        $router->put('faculties/{id}', ['uses' => 'FacultyController@update']);

        //  Careers
        // $router->get('careers',  ['uses' => 'CareerController@showAllCareers']);
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
    });
});