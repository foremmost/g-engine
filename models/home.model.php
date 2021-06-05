<?php
require_once MODELS_DIR.'/model.php';
require_once CORE_DIR.'/contenter.class.php';

class homeModel extends Model{
	public static $services;
	public static $partners;
	function getData($params){
		self::$services = Contenter::getAllFront('144');
		self::$partners = Contenter::getAllFront('146');
		return [
			'favicon'=>'/uploads/favicon.png',
			'title'=>'Home',
			'lang'=>'en'
		];
	}
}
