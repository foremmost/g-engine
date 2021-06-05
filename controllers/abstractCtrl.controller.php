<?php
#namespace Controllers;
require_once ROOT_DIR."/define.php";
require_once ROOT_DIR."/router.class.php";
abstract class abstractCtrl{
	protected $model;
	protected $query;
	const componentName = '';
/*	function __get($property){
		if(!key_exists($property,$this->params)) return null;
		if($property == 'action'){
			return $this->params['action'];
		}
	}*/

	function getModule(){
		if(isset($this->params['module'])){
			return $this->params['module'];
		}
		return null;
	}
	function getSubModule(){
		if(isset($this->params['submodule'])){
			return $this->params['submodule'];
		}
		return null;
	}
	function getPageType(){
		return $this->getParam('type');
	}
	function getParam($param){
		return isset($this->$query[$param]) ? $this->$query[$param] : false;
	}

	//abstract function prepareData();

}