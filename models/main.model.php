<?php
require_once MODELS_DIR.'/model.php';
class mainModel extends Model{
		function getData($params=[]){
			return [
				'uId'=> $_COOKIE['u_id']
			];
		}
}
