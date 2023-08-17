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

        if (!$books) {
            return $response::json(400, ['data' => []]);
        } 

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

        $validate = Validator::validateFieldsBook($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(400, $validate);
        }

        $image = ResizeImage::resize($validate['image'], 400);

        if (array_key_exists('error', $image)) {
            return $response::json(400, $image);
        }

        $create_book = Book::create(
            $validate['title'], $validate['description'], $image['image'], $user->id
        );

        if (!$create_book) {
            return $response::json(400, [
                'error' => 'Sorry, something wemt wrong!' 
            ]);
        } else if (isset($create_book['error'])) {
            return $response::json(400, [
                'error' => 'Sorry, something wemt wrong!' 
            ]);
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

    public function update(Request $request, Response $response, $id) 
    {
        if ($request::method() != 'PUT') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        $body = $request::body();

        $validate = Validator::validateFieldsBook($body);

        if (array_key_exists('error', $validate)) {
            return $response::json(400, $validate);
        }

        $image = ResizeImage::resize($validate['image'], 400);

        if (array_key_exists('error', $image)) {
            return $response::json(400, $image);
        }

        $update_book = Book::update(
            $validate['title'],
            $validate['description'],
            $image['image'],
            $id[0],
            $user->id
        );

        if (!$update_book) {
            return $response::json(400, ['error' => "Book not found!"]);
        } else if (isset($update_book['error'])){
            return $response::json(400, ['error' => $update_book['error']]);
        }

        return $response::json(202, [
            'success' => 'Book updated successfully!'
        ]);
    }

    public function remove(Request $request, Response $response, $id) 
    {
        if ($request::method() != 'DELETE') {
            return $response::json(405, ['error' => 'Method not allowed']);
        }

        if (!$this->isAuthenticated) {
            return $response::json(401, [
                'error' => 'Unauthorized, verify: Bearer + Token JWT'
            ]);
        }

        $user = $this->isAuthenticated;

        $delete_book = Book::remove((int) $id[0], $user->id);

        if (!$delete_book) {
            return $response::json(400, ['error' => "Book not found!"]);
        } else if (isset($delete_book['error'])){
            return $response::json(400, ['error' => $delete_book['error']]);
        }

        return $response::json(200, [
            'success' => 'Book deleted successfully!'
        ]);
    }
}