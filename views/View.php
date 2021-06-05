<?php
class View{
	function header($data){
		#include_once VIEWS_DIR.self::componentName."/header.php";
		include_once VIEWS_DIR."main/header.php";
	}
	function content($data,$route){
		include_once  VIEWS_DIR.$route;
	}
	function footer($data){
		#include_once VIEWS_DIR.self::componentName."/footer.php";
		include_once VIEWS_DIR."main/footer.php";
	}
	function render($data,$route){
		ob_start( );
			if(!method_exists($this,'header')){
				//parent::header();
			}else{
				$this->header($data);
			}
			if(!method_exists($this,'content')){
			//	parent::content();
			}else{
				$this->content($data,$route);
			}
			if(!method_exists($this,'footer')){
			//	parent::footer();
			}else{
				$this->footer($data);
			}
		return ob_get_clean();

	}
}