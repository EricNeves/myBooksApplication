<?php

namespace App\Services;

use App\Http\Request;
use App\Http\Response;
use App\Models\User;
use App\Utils\Validator;
use App\Utils\JWT;
use App\Http\Authorization;

class UserService
{
    private $isAuthenticated;

    public function __construct()
    {
        $jwt = Authorization::getToken();

        $isValidJWT = JWT::validate($jwt);

        if (!$isValidJWT)
            $this->isAuthenticated = false;

        $this->isAuthenticated = $isValidJWT;
    }

    public function index(Request $request, Response $response)
    {
        if ($request::method() != 'GET') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        return $response::json(200, [
            'data' => User::fetch($user->id)
        ]);
    }

    public function store(Request $request, Response $response)
    {
        if ($request::method() != 'POST') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        $body = $request::body();

        $validate = Validator::validateSignUp($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(200, $validate);
        }

        $store = User::store(
            $validate['name'],
            $validate['email'],
            password_hash($validate['password'], PASSWORD_DEFAULT)
        );

        if (is_array($store)) {
            return $response::json(400, $store);
        }

        return $response::json(201, [
            'success' => 'User created successfully'
        ]);
    }

    public function auth(Request $request, Response $response)
    {
        if ($request::method() != 'POST') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        $body = $request::body();

        $validate = Validator::validateLogin($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(400, $validate);
        }

        $auth = User::login($body->email, $body->password);

        if (isset($auth['error'])) {
            return $response::json(400, $auth);
        }

        if (!$auth) {
            return $response::json(405, ['error' => 'Invalid email or password!']);
        }

        return $response::json(200, [
            'status' => 'Authenticated',
            'jwt' => JWT::generate(['id' => $auth])
        ]);
    }

    public function update(Request $request, Response $response)
    {
        if ($request::method() != 'PUT') {
            return $response::json(405, [
                'error' => 'Method not allowed'
            ]);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        $body = $request::body();

        $validate = Validator::validateUpdateUser($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(400, $validate);
        }

        $update_user = User::update($validate['name'], $user->id);

        if (!$update_user) {
            return $response::json(400, [
                'error' => 'Sorry, something went wrong!'
            ]);

        } else if (isset($update_user['error'])) {
            return $response::json(400, [
                'error' => $update_user['error']
            ]);
        }

        return $response::json(202, [
            'success' => 'User updated successfully!'
        ]);
    }
}