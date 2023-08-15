<?php

namespace App\Models;

class Database
{
    protected static function getConnection()
    {
        try {
            $pdo = new \PDO(
                "pgsql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']}",
                $_ENV['DB_USER'], $_ENV['DB_PASS']
            );

            return $pdo;
        } catch (\Throwable $error) {
            return ['error' => [$error->getMessage(), $error->getFile()]];
        }
    }
}