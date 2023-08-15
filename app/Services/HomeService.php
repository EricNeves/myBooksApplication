<?php 

namespace App\Services;

use App\Http\Request;
use App\Http\Response;

class HomeService
{
  public function index(Request $request, Response $response)
  {
    $response::json(200, [
      'msg'    => 'Welcome to the API',
      'github' => 'https://github.com/ericneves'
    ]);
  }
}