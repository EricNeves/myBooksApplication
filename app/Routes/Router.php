<?php

namespace App\Routes;

class Router
{
  public static function routes()
  {
    return [
      '/'             => 'HomeService@index',

      '/users'        => 'UserService@index',
      '/users/create' => 'UserService@store',
      '/users/update' => 'UserService@update',
      '/users/auth'   => 'UserService@auth'
    ];
  }
}