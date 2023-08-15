<?php

namespace App\Utils;

class Validator
{
    public static function validateSignUp($body)
    {
        if (!isset($body->name) || empty($body->name)) {
            return ['error' => 'Name field is required!'];

        } else if (!isset($body->email) || empty($body->email)) {
            return ['error' => 'Email field is required!'];

        } else if (!filter_var($body->email, FILTER_VALIDATE_EMAIL)) {
            return ['error' => 'Email valid is required!'];

        } else if (!isset($body->password) || empty($body->password)) {
            return ['error' => 'Password field is required!'];

        } else {
            return [
                'name' => $body->name,
                'email' => $body->email,
                'password' => $body->password
            ];
        }
    }

    public static function validateUpdate($body)
    {
        if (!isset($body->name) || empty($body->name)) {
            return ['error' => 'Name field is required!'];

        } else if (!isset($body->password) || empty($body->password)) {
            return ['error' => 'Password field is required!'];

        } else {
            return [
                'name' => $body->name,
                'password' => $body->password
            ];
        }
    }
}