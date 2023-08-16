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

        $books = Book::fetch($user->id);

        foreach ($books as $book) {
            $allBooks = $book;
            $allBooks['url'] = $_ENV['BASE_URL']."books/image/{$book['id']}";
            $returnBooks[] = $allBooks;
        }

        return $response::json(200, ['data' => $returnBooks]);
    }

    public function store(Request $request, Response $response)
    {
        if ($request::method() != 'POST') {
            return $response::json(405, ['error' => 'Method not allowed!']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT!'
            ]);
        }

        $user = $this->isAuthenticated;

        $body = $request::body();

        $validate = Validator::validateCreateBook($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(400, $validate);
        }

        $result = ResizeImage::resize($validate['image'], 400);

        if (array_key_exists('error', $result)) {
            return $response::json(400, $result);
        }

        $create_book = Book::create(
            $validate['title'], $validate['description'], $result['image'], $user->id
        );

        if (!$create_book) {
            return $response::json(400, ['error' => [
                'Sorry, something wemt wrong!',
                $create_book
            ]]);
        }

        return $response::json(201, [
            'success' => 'Book created successfully!'
        ]);
    }

    public function image(Request $request, Response $response, $id)
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

        $book_id = (int) ($id[0]);

        $image_book = Book::fetchImageByID($book_id, $user->id);

        $image = stream_get_contents($image_book['image']);

        $base64Image = preg_replace('#^data:image/[^;]+;base64,#', '', $image);

        header('Content-type: image/png');

        echo base64_decode($base64Image);
    }

    public function listByID(Request $request, Response $response, $id) {
        if ($request::method() != 'GET') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        $book = Book::fetchBookByID($id[0], $user->id);

        if (empty($book)) {
            return $response::json(404, ['error' => 'Book not found!']);
        }

        $result = [
            'id'          => $book['id'],
            'title'       => $book['title'],
            'description' => $book['description'],
            'created_at'  => $book['created_at'],
            'image'       => $_ENV['BASE_URL']."books/image/{$book['id']}",
            'user_id'     => $book['user_id']
        ];

        return $response::json(200, [
            'data' => $result
        ]);
    }

    public function update() {}

    public function remove() {}
}