<?php

namespace App\Http;

class Response
{
    public static function json($status, $data)
    {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_SLASHES);
    }
}