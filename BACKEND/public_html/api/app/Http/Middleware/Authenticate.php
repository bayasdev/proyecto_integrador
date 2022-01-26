<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Exception;
use App\Models\User;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        // if ($this->auth->guard($guard)->guest()) {
        //     return response('Unauthorized.', 401);
        // }

        // return $next($request);

        $token = $request->header('api_token');
        if(!$token) {
            return response(['message' => 'No autorizado'], 401);
        }
        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $remaining = $decoded->expiration_time - time();
            if ($remaining <= 0) {
                return response(['message' => 'Token expirado'], 400);
            }
            $user = User::where('id',$decoded->id)->first();
            $request->user = $user;
        } catch(ExpiredException $e) {
            return response(['message' => 'Token expirado'], 401);
        } catch (SignatureInvalidException $e) {
            return response(['message' => 'Token no válido'], 401);
        } catch(Exception $e) {
            return response(['message' => 'No autorizado'], 401);
        }
        return $next($request);
    }
}