<?php 

namespace App\Services;

use App\Http\Request;
use App\Http\Response;

class NotFoundService 
{
  public function index(Request $request, Response $response)
  {
    $response::json(404, ['error' => 'Endpoint Not Found']);
  }
}