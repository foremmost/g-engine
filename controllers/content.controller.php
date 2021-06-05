<?
class content extends main{
	protected $model;
	const componentName = 'contenter';
	function __construct($params){
		parent::__construct($params);
	}
	function handle_144(){
		return self::$view->render($this->preparedData,self::componentName."/index.php");
	}
	function handle_news(){
		return self::$view->render($this->preparedData,self::componentName."/news.php");
	}
}