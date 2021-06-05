<?
class cat extends main{
	protected $model;
	const componentName = 'cat';
	function __construct($params){
		parent::__construct($params);
	}
	function handle_index(){
		return self::$view->render($this->preparedData,self::componentName."/index.php");
	}
}