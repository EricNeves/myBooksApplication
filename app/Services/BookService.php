<?php

namespace App\Services;

use App\Http\Request;
use App\Http\Response;
use App\Http\Authorization;
use App\Utils\Validator;
use App\Utils\JWT;
use App\Models\Book;

class BookService
{
    private $isAuthenticated;

    public function __construct() 
    {
        $jwt = Authorization::getToken();

        $isValidJWT = JWT::validate($jwt);

        if (!$isValidJWT) $this->isAuthenticated = false;

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
            'result' => Book::fetch($user->id)
        ]);
    }

    public function listByID(Request $request, Response $response) {
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
            'result' => Book::fetchByID(1)
        ]);
    }

    public function update() {}

    public function remove() {}
}