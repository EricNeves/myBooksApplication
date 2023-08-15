<?php 

namespace App\Services;

use App\Http\Request;
use App\Http\Response;
use App\Models\User;

class UserService
{
  public function index(Request $request, Response $response)
  {
    return $response::json(200, [
      'data' => User::fetch()
    ]);
  }

  public function store(Request $request, Response $response)
  {
    
  }
}