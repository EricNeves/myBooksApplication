<?php

/**
 * @author Eric Neves <ericnevesr@gmail.com>
 * @github: github.com/ericneves
 */

/**
 * @Headers
 */

error_reporting(0);

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

require_once __DIR__ . '/vendor/autoload.php';

use App\Core\Core;

date_default_timezone_set('America/Sao_Paulo');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

Core::run();