<?
// Main const variables
define('ROOT_DIR',$_SERVER['DOCUMENT_ROOT']);
define('WORKSPACE_DIR',ROOT_DIR.'/workspace');
define('FRONT_DIR',WORKSPACE_DIR.'/front');
define('CORE_DIR',FRONT_DIR.'/core');
#define('ROOT_DIR','/');
define('HOST',$_SERVER['HTTP_HOST']);
define('URI',$_SERVER['REQUEST_URI']);
if(isset($_SERVER['REDIRECT_STATUS'])) define('HOST_STATUS',$_SERVER['REDIRECT_STATUS']);
define('METHOD',$_SERVER['REQUEST_METHOD']);
define('REMOTE_IP',$_SERVER['REMOTE_ADDR']);


//

define('CTRL_DIR',ROOT_DIR.'/controllers/');
define('VIEWS_DIR',ROOT_DIR.'/views/');
define('MODELS_DIR',ROOT_DIR.'/models/');

