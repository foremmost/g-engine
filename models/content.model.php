<?php
require_once MODELS_DIR.'/model.php';
class contentModel extends Model{
	public static $services;
	public static $partners;
	function getData(){
		self::$services = Contenter::getAllFront('144');
		self::$partners = Contenter::getAllFront('146');
		return [
			'favicon'=>'/uploads/favicon.png',
			'title'=>'Content',
			'lang'=>'en'
		];
	}
}
