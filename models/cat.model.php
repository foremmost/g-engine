<?php
require_once MODELS_DIR.'/model.php';
require_once CORE_DIR.'/categorier.class.php';

class catModel extends Model{
	function getData(){
		#$category = Categorier::getCategoriesToFront($catId);
		return [
			'title'=> 'Category Page'
		];
	}
}
