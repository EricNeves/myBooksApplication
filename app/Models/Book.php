<?php

namespace App\Models;

use App\Models\Database;

class Book extends Database
{
    public static function fetch($id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM books WHERE user_id = ?");
            $stm->execute([$id]);

            $book = $stm->fetchAll(\PDO::FETCH_ASSOC);
            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function fetchByID($id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM books WHERE id = ?");
            $stm->execute([$id]);

            $book = $stm->fetchAll(\PDO::FETCH_ASSOC);

            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function update($id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM books WHERE id = ?");
            $stm->execute([$id]);

            $book = $stm->fetchAll(\PDO::FETCH_ASSOC);

            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function remove($id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM books WHERE id = ?");
            $stm->execute([$id]);

            $book = $stm->fetchAll(\PDO::FETCH_ASSOC);

            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }
    
}