<?php
session_start();
require_once "define.php";

spl_autoload_register(function ($className){
	$ctrlPath = CTRL_DIR."{$className}.controller.php";
	if(file_exists($ctrlPath)){
		require_once $ctrlPath;
	}
});
spl_autoload_register(function ($className){
	$className = str_replace('Model','',$className);
	$modelPath = MODELS_DIR."{$className}.model.php";
	if(file_exists($modelPath)){
		require_once $modelPath;
	}
});
spl_autoload_register(function ($className){
	$viewPath = VIEWS_DIR."{$className}.php";
	if(file_exists($viewPath)){
		require_once $viewPath;
	}
});
spl_autoload_register(function ($className){
	$classPath = ROOT_DIR."/workspace/front/core/{$className}.class.php";
	if(file_exists($classPath)) require_once $classPath;
});

$Languager = new Languager();
if(isset($_GET['lang'])){
	$lang = $_GET['lang'];
	if(($lang != 'ru') && ($lang != 'en')){
		$lang = 'ru';
	}
}else{
	$lang= 'ru';
}

$langId = $Languager->getLangId($lang);
