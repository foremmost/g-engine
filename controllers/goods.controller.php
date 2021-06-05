<?
class goods extends main{
	private $parent;
	protected $model;
	const componentName = 'goods';
	function __construct($params){
		parent::__construct($params);
	}
	function handle_index(){
		return self::$view->render($this->preparedData,self::componentName."/index.php");
	}
}