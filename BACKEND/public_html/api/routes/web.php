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
    $router->group(['middleware' => ['auth']], function () use ($router){
        // CRUD User
        $router->get('users',  ['uses' => 'UserController@showAllUsers']);
        $router->get('users/{id}', ['uses' => 'UserController@showOneUser']);    
        $router->delete('users/{id}', ['uses' => 'UserController@delete']);
        $router->put('users/{id}', ['uses' => 'UserController@update']);

        // CRUD Role
        $router->get('roles',  ['uses' => 'RoleController@showAllRoles']);
        $router->get('roles/{id}', ['uses' => 'RoleController@showOneRole']);    
        $router->delete('roles/{id}', ['uses' => 'RoleController@delete']);
        $router->put('roles/{id}', ['uses' => 'RoleController@update']);
    });
});