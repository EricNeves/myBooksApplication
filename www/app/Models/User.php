<?php

namespace App\Models;

use App\Models\Database;

class User extends Database
{
    public static function fetch(int|string $id): array
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT id, name, email FROM users WHERE id = ?");
            $stm->execute([$id]);

            if ($stm->rowCount() > 0) {
                $user = $stm->fetchAll(\PDO::FETCH_ASSOC);

                return $user;
            } else {
                return [];
            }
        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: users'];
        }
    }

    public static function store(string $name, string $email, string $password): array
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare(
                "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)"
            );
            $stm->execute([$name, $email, $password, date('Y-m-d H:m:s')]);

            return $pdo->lastInsertId();

        } catch (\Throwable $err) {
            $error = match ($err->getCode()) {
                '23505' => ['error' => 'Email already exists!'],
                default => ['error' => 'Sorry, something went wrong! Table: users']
            };

            return $error;
        }
    }

    public static function login(string $email, string $password) : mixed
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stm->execute([$email]);

            if (!$stm->rowCount() > 0) {
                return false;
            }

            $user = $stm->fetch(\PDO::FETCH_ASSOC);

            if (!password_verify($password, $user['password'])) {
                return false;
            }

            return $user['id'];

        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: users'];
        }
    }

    public static function update(string $name, string $password, int|string $id) : mixed
    {
        $pdo = self::getConnection();

        try {
            $stm = $pdo->prepare("UPDATE users SET name = ?, password = ? WHERE id = ?");
            $stm->execute([$name, $password, $id]);

            if ($stm->rowCount() > 0) {
                return true;
            } else {
                return false;
            }

        } catch (\Throwable $err) {
            return ['error' => 'Sorry, something went wrong! Table: users'];
        }
    }
}