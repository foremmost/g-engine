<?
include_once "define.php";
include_once ROOT_DIR."/workspace/front/core/migrate.class.php";
$Migrate = new Migrate();
$migrate = $Migrate->doMigrate();
echo "<h1>{$migrate}</h1>";