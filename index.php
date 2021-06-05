<?
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once "loader.php";
//
require_once "routes.php";
require_once "router.class.php";

$Router = new Router();
$Router->init();
#Router::showRoutes();


#print_r(Router::getRoute('home'));

