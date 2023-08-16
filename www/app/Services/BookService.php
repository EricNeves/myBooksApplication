<?php

namespace App\Services;

use App\Http\Request;
use App\Http\Response;
use App\Http\Authorization;
use App\Utils\Validator;
use App\Utils\JWT;
use App\Models\Book;
use App\Utils\ResizeImage;

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

        $book = Book::fetchByID(1, $user->id);

        if (empty($book)) {
            return $response::json(404, ['error' => 'Book not found!']);
        }

        return $response::json(200, [
            'result' => $book
        ]);
    }

    public function store(Request $request, Response $response)
    {
        if ($request::method() != 'POST') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        $body = $request::body();

        $result = ResizeImage::resize($body->image, 500);

        return $response::json(200, $result);
    }

    public function update() {}

    public function remove() {}
}