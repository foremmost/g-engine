<?

class Router{
	public static $routes;
	function __construct() {
	#	$this->routes = [];
		self::getRoutes();
	}
	function getCurrentRoute(){
		$rawUri = explode('?',URI);
		$rawSize = count($rawUri);
		$currentAction = [];
		if($rawSize > 0 ) $rawPath = $rawUri[0];
		if($rawSize > 1 ) $query = $rawUri[1];
		if( $rawPath === '/'){
			return [
				'module'=>'home'
			];
		}
		$path = explode('/',$rawPath);
		$currentAction['method'] = METHOD;
		$size = count($path);
		if($size > 1 ) $currentAction['module'] = $path[1];
		if($size > 2 ) $currentAction['action'] = $path[2];
		if(isset($query)){
			parse_str($query,$queryParams);
			$currentAction['query'] = $queryParams;
		}
		return $currentAction;
	}
	public static function add($route = null){
		if( empty(self::$routes) || !is_array(self::$routes)){
			self::$routes = [];
		}
		if( empty($route) || !is_null($route)){
			$route = self::getCurrentRoute();
		}
		array_push(self::$routes,$route);
	}
	public static function showRoutes(){
		print_r(self::$routes);
	}

	public function init(){
		$currentRoute = $this->getCurrentRoute();
		$currentModule = $currentRoute['module'];
		$modelName = $currentModule.'Model';
		$model = new $modelName($currentRoute);
		$Module = new $currentModule(
			[
				'route'=>$currentRoute,
				'model'=>$model
		]);
		if( (isset($currentRoute['action'])) && (!empty($currentRoute['action']))){
			$handler = 'handle_'.$currentRoute['action'];
		}else{
			$handler = 'handle_index';
		}
		if(method_exists($Module, $handler)){
			$page = $Module->$handler($currentRoute);
			$outPage = $Module->replaceData($page);
			echo $outPage;
			return $outPage;
		}
		Router::errorPage();
		return false;
	}

	public static function errorPage($params=null){
		$errorPage = ROOT_DIR.'/404.php';
		if(file_exists($errorPage)){
			require_once $errorPage;
		}else{
			header("HTTP/1.0 404 Not Found");
		}
	}
	public static function getRoute($componentName){
		if(isset(self::$routes[$componentName]))		return self::$routes[$componentName];
	}
	public static function getRoutes(){
		global $routes;
		self::$routes = $routes;
	}
	function get(){}
	function post(){}
	function head(){}
	function put(){}
}