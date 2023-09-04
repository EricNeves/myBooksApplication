<?php

namespace App\Http;

class Response
{
    public static function json(int $status, mixed $data): void
    {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_SLASHES);
    }
}