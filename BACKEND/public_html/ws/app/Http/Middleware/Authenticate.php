<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Exception;
use App\Models\Profile\User;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\DB;
use stdClass;

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
        $token = $request->header('api_token');
        if(!$token) {
            return response()->json([
                'error' => 'Token requerido.'
            ], 401);
        }
        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
            $timeRemaining = $credentials->expiration_time - time();
            $user_id = $credentials->subject;
            $user = User::where('id',$user_id)->first();
            $rols = DB::select('SELECT * FROM rols
                                        INNER JOIN rol_user ON rol_user.rol_id = rols.id
                                        WHERE rol_user.user_id = :user_id;', ['user_id'=>$user_id]);
            if (!$rols) {
                $rols = [];
            }
            $user->rols = $rols;
            $request->user = $user;
            if ($timeRemaining <= 0) {
                return response()->json([
                    'error' => 'Token expirado.'
                ], 400);
            }
        } catch(ExpiredException $e) {
            return response()->json([
                'error' => 'Token expirado.'
            ], 400);
        } catch(Exception $e) {
            return response()->json([
                'error' => 'Token invalido.'
            ], 400);
        }
        return $next($request);
    }
}
