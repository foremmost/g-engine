<?php
require_once MODELS_DIR.'/model.php';

class goodsModel extends Model{
	public static $category;
	public static $images;
	public static $props;
	function getData($query){
		$goodsId  = $query['id'];
		if(!empty($goodsId)){
			$item = Goodser::getFull($goodsId);
		}
		if(!empty($item)){
			self::$images = $item['images'];
			self::$props = $item['props'];
			self::$category = Categorier::getCategoriesToFront($item['c_id']);
		}
		return $item;
	}
}
