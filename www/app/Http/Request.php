<?php

namespace App\Http;

class Request
{
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function body()
    {
        $method = self::method();

        $jsonBody = json_decode(file_get_contents('php://input', true));

        $data = match ($method) {
            'GET'     => $_GET,
            'POST'    => $jsonBody,
            'PUT'     => $jsonBody,
            'DELETE'  => $jsonBody
        };

        return $data;
    }
}