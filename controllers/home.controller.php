<?
class home extends main{
	private $parent;
	protected $model;
	protected $preparedData;
	const componentName = 'home';
	function __construct($params){
		parent::__construct($params);
	}
	function handle_index(){
		return self::$view->render($this->preparedData,self::componentName."/index.php");
	}
}