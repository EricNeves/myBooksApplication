<?php

/**
 * @author Eric Neves <ericnevesr@gmail.com>
 * @github: github.com/ericneves
 */

/**
 * @Headers
 */

error_reporting(0);

header("Access-Control-Allow-Origin: http://localhost:3030");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header('Content-type: application/json');

require_once __DIR__ . '/vendor/autoload.php';

use App\Core\Core;

date_default_timezone_set('America/Sao_Paulo');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

Core::run();