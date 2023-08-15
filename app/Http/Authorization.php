<?php

namespace App\Http;

class Authorization 
{
    public static function getToken()
    {
        $header = getallheaders();

        if (!isset($header['Authorization'])) {
            return false;
        }

        $authorization = $header['Authorization'] ?? $header['authorization'];

        $token = explode(' ', $authorization);

        if ($token[0] !== 'Bearer') {
            return false;
        }

        return $token[1];
    }
}