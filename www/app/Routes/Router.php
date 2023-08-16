<?php

namespace App\Routes;

class Router
{
    public static function routes()
    {
        return [
            '/'                  => 'HomeService@index',

            '/users'             => 'UserService@index',
            '/users/create'      => 'UserService@store',
            '/users/update'      => 'UserService@update',
            '/users/auth'        => 'UserService@auth',

            '/books'             => 'BookService@index',
            '/books/create'      => 'BookService@store',
            '/books/{id}/list'   => 'BookService@listByID',
            '/books/{id}/update' => 'BookService@update',
            '/books/{id}/remove' => 'BookService@remove'
        ];
    }
}