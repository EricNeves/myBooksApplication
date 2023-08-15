<?php

namespace App\Core;

use App\Routes\Router;
use App\Http\Request;
use App\Http\Response;

class Core extends Router
{
    public static function run()
    {
        $url = '/';

        $routerFound = false;

        isset($_GET['url']) ? $url .= $_GET['url'] : $url;

        ($url != '/') ? $url = rtrim($url, '/') : $url;

        $prefixService = '\App\\Services\\';

        foreach (self::routes() as $path => $service) {

            $pattern = '#^' . preg_replace('/{id}/', '([\w-]+)', $path) . '$#';

            if (preg_match($pattern, $url, $matches)) {

                array_shift($matches);

                $routerFound = true;

                [$currentService, $action] = explode('@', $service);

                $extendService = $prefixService . $currentService;

                $service = new $extendService();

                $service->$action(new Request, new Response, $matches);
            }
        }

        if (!$routerFound) {
            $service = new \App\Services\NotFoundService();
            $service->index(new Request, new Response);
        }
    }
}