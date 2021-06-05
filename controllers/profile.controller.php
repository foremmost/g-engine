<?
class profile extends main{
	protected $model;
	const componentName = 'profile';
	function __construct($params){
		parent::__construct($params);
	}
	function handle_index(){
		return self::$view->render($this->preparedData,self::componentName."/index.php");
	}
}