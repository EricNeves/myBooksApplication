<?php

namespace App\Routes;

class Router
{
    public static function routes() : array
    {
        return [
            '/'                  => 'HomeService@index',

            '/users'             => 'UserService@index',
            '/users/create'      => 'UserService@store',
            '/users/update'      => 'UserService@update',
            '/users/auth'        => 'UserService@auth',

            '/books'             => 'BookService@index',
            '/books/create'      => 'BookService@store',
            '/books/image/{id}'  => 'BookService@image',
            '/books/{id}/list'   => 'BookService@listByID',
            '/books/{id}/update' => 'BookService@update',
            '/books/{id}/remove' => 'BookService@remove'
        ];
    }
}