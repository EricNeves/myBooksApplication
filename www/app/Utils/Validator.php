<?php

namespace App\Utils;

class Validator
{
    public static function validateSignUp($body)
    {
        if ($body == null) {
            return ['error' => 'Name|Email|Password is required!'];
        } else if (!isset($body->name) || empty($body->name)) {
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

    public static function validateUpdateUser($body)
    {
        if ($body == null) {
            return ['error' => 'Name|Password is required!'];
        } else if (!isset($body->name) || empty($body->name)) {
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

    public static function validateLogin($body)
    {
        if ($body == null) {
            return ['error' => 'Email|Password is required!'];
        } else if (!isset($body->email) || empty($body->email)) {
            return ['error' => 'Name field is required!'];

        } else if (!isset($body->password) || empty($body->password)) {
            return ['error' => 'Password field is required!'];

        } else {
            return [
                'name' => $body->email,
                'password' => $body->password
            ];
        }
    }

    public static function validateCreateBook($body)
    {
        if ($body == null) {
            return ['error' => 'Title|Description|Image is required!'];
        } else if (!isset($body->title) || empty($body->title)) {
            return ['error' => 'Title field is required!'];

        } else if (!isset($body->description) || empty($body->description)) {
            return ['error' => 'Description field is required!'];

        } else if (!isset($body->image) || empty($body->image)) {
            return ['error' => 'Image field is required!'];

        } else {
            return [
                'title' => $body->title,
                'description' => $body->description,
                'image' => $body->image
            ];
        }
    }
}