<?php

namespace App\Utils;

class JWT
{
    public static function generate($data)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode($data);

        $header_encoded = self::base64url_encode($header);
        $payload_encoded = self::base64url_encode($payload);

        $signature = self::signature($header_encoded, $payload_encoded);

        $jwt = "$header_encoded.$payload_encoded.$signature";

        return $jwt;
    }

    public static function validate($token)
    {
        $token = explode('.', $token);

        if (count($token) < 3) {
            return false;
        }

        $signature = self::signature($token[0], $token[1]);

        if ($signature != $token[2]) {
            return false;
        }

        return json_decode(self::base64url_decode($token[1]));
    }

    private static function signature($header, $payload)
    {
        $signature = hash_hmac("SHA256", "$header.$payload", $_ENV['JWT_SECRET_KEY'], true);
        return self::base64url_encode($signature);
    }

    private static function base64url_encode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64url_decode($token)
    {
        $padding = strlen($token) % 4;

        if ($padding !== 0) {
            $token .= str_repeat('=', 4 - $padding);
        }

        $token = strtr($token, '-_', '+/');

        return base64_decode($token);
    }
}