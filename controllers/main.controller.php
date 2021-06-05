<?php
class main extends abstractCtrl{
	const componentName= 'main';
	protected $route;
	protected $model;
	protected $preparedData;
	protected static $view;
	function __construct($params){
		self::$view = new View();

		$this->route = $params['route'];
		$this->query = isset($this->route['query']) ? $this->route['query'] : [];

		$this->model = $params['model'];
		$mainModel = new mainModel();
		$this->preparedData = $mainModel->getData($this->query);
		$modelData = $this->model->getData($this->query);
		if(is_array($modelData)){
			$this->preparedData = array_merge($this->preparedData,$modelData);
		}
	}
	public function replaceData($buffer){
		$replaceStrArr = [];
		$replaceValArr = [];
		if(is_array($this->preparedData)){
			foreach($this->preparedData as $param=>$value){
				if(is_array($param)) continue;
				if(is_array($value)) continue;
				$replaceStrArr[] = "/{{(\W*)$param(\W*)}}/i";
				$replaceValArr[] = $value;
			}
			return preg_replace($replaceStrArr, $replaceValArr, $buffer);
		}else{
			return $buffer;
		}
	}
}
