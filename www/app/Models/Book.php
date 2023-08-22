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

    public static function fetchImageByID($book_id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT image FROM images WHERE book_id = ?");
            $stm->execute([$book_id]);

            $book = $stm->fetch(\PDO::FETCH_ASSOC);
            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function create($title, $description, $image, $user_id)
    {
        $pdo = self::getConnection();

        try {
            $pdo->beginTransaction();

            $stm = $pdo->prepare("
                INSERT INTO books (title, description, created_at, user_id) VALUES (?, ?, ?, ?) 
            ");
            $book_added = $stm->execute([$title, $description, date('Y-m-d H:m:s'), $user_id]);

            $stm_book = $pdo->prepare("
                INSERT INTO images (image, created_at, book_id, user_id) VALUES (?, ?, ?, ?)
            ");
            $image_added = $stm_book->execute([$image, date('Y-m-d H:m:s'), $pdo->lastInsertId(), $user_id]);

            $pdo->commit();

            if ($book_added && $image_added) {
                return true;
            } else {
                return false;
            }
        } catch (\Throwable $err) {
            $pdo->rollBack();
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function fetchBookByID($id, $user_id)
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM books WHERE id = ? AND user_id = ?");
            $stm->execute([$id, $user_id]);

            $book = $stm->fetch(\PDO::FETCH_ASSOC);

            return $book;
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function update($title, $description, $image, $book_id, $user_id)
    {
        $pdo = self::getConnection();

        try {

            $pdo->beginTransaction();

            $stm = $pdo->prepare("UPDATE books SET title = ?, description = ? WHERE id = ? AND user_id = ?");
            $stm->execute([$title, $description, $book_id, $user_id]);

            $stm_image = $pdo->prepare("UPDATE images SET image = ? WHERE book_id = ? AND user_id = ?");
            $stm_image->execute([$image, $book_id, $user_id]);

            $pdo->commit();

            if ($stm->rowCount() > 0 && $stm_image->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

    public static function remove($book_id, $user_id)
    {
        $pdo = self::getConnection();

        try {
            $pdo->beginTransaction();

            $stm_image = $pdo->prepare("DELETE FROM images WHERE book_id = ? AND user_id = ?");
            $stm_image->execute([$book_id, $user_id]);

            $stm = $pdo->prepare("DELETE FROM books WHERE id = ? AND user_id = ?");
            $stm->execute([$book_id, $user_id]);

            $pdo->commit();

            if ($stm->rowCount() > 0 && $stm_image->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: books'];
        }
    }

}