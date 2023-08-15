<?php 

namespace App\Models;

use App\Models\Database;

class User extends Database
{
  public static function fetch()
  {
    $pdo = self::getConnection();

    try {
      $stm = $pdo->query("SELECT * FROM users");
      
      if ($stm->rowCount() > 0) {
        $user = $stm->fetchAll(\PDO::FETCH_ASSOC);

        return $user;
      } else {
        return [];
      }
    } catch (\Throwable $err) {
      return ['error' => $err->getMessage()];
    }
  }
}