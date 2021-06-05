<?php
include_once "db.class.php";
include_once "frontDb.class.php";

class Goodser{
	private $db;
	private static $frontDb;

	function __construct(){
		$this->db = new Db();
		self::$frontDb = new Db();
	}
	function getGoods($goodsData){
		$goodsData = (object)$goodsData;
		$perPage = $goodsData->perPage;
		$page = $goodsData->page - 1;
		$page = ($perPage * $page);
		$sql = "
			SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`,`retail`
			FROM `goods` 
			LIMIT ?,?";
		$goods = $this->db->prepare($sql,'ii',[$page,$perPage])->fetch_all(MYSQLI_ASSOC);
		if(!empty($goods)){
			return $goods;
		}
		return [];
	}
	function getItem($goodsId){
		$sql = "
			SELECT `id`,`title`,`model`,`tables`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`,`retail`
			FROM `goods`
			WHERE `id` = ?
			";
		$item = $this->db->prepare($sql,'i',[$goodsId])->fetch_assoc();
		if(!empty($item)){
			return $item;
		}
		return [];
	}
	function getGoodsProps($goodsId){
		if(is_object($goodsId))	$goodsId= $goodsId->id;
		$sql = "
			SELECT `id`,`prop_id`,`prop_value`
			FROM `goods_props`
			WHERE `goods_id` = ?
		";
		$props = $this->db->prepare($sql,'i',[$goodsId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($props)){
			return $props;
		}
		return [];
	}
	function getGoodsFull($goodsData){
		$itemId= $goodsData->id;
		$curentItem = $this->getItem($itemId);
		if(isset($curentItem['images'])){
			$curentItem['images'] = unserialize($curentItem['images']);
		}
		$curentItem['props'] = $this->getGoodsProps($itemId);
		if(!empty($curentItem)){
			return $curentItem;
		}
		return [];
	}
	function save($goodsData){
		$goodsData->images = serialize($goodsData->images);
		$goodsId = $this->db->insert([
			'tableName'=>'goods',
			'insertData'=>$goodsData,
			'fieldsToInsert'=> [
				['s'=>'title'],
				['s'=>'article'],
				['s'=>'model'],
				['s'=>'tables'],
				['s'=>'manufac'],
				['i'=>'avail'],
				['i'=>'c_id'],
				['d'=>'price'],
				['d'=>'sale'],
				['i'=>'retail'],
				['d'=>'weight'],
				['i'=>'sort'],
				['s'=>'description'],
				['s'=>'image'],
				['s'=>'images'],
				['s'=>'meta_keywords'],
				['s'=>'meta_description'],
			]
		]);
		if(!is_null($goodsId)){
			$props = $this->saveProps($goodsId,$goodsData->props);
			return [
				'status'=>'success',
				'data'=>[
					'goodsId'=>$goodsId,
					'props'=>$props
				]
			];
		}
		return [
			'status'=>'fail',
			'failText'=>'Goods creating error',
			'data'=> $goodsData,
			'errorText'=>$this->db->errtext,
			'errorNo'=>$this->db->errno
		];
	}
	function update($goodsData){
		$goodsData->images = serialize($goodsData->images);
		#print_r($goodsData);
		$goodsId = $this->db->update([
			'tableName'=>'goods',
			'updateData'=>$goodsData,
			'fieldsToUpdate'=> [
				['i'=>'avail'],
				['s'=>'title'],
				['s'=>'tables'],
				['s'=>'article'],
				['s'=>'model'],
				['s'=>'manufac'],
				['i'=>'retail'],
				['i'=>'c_id'],
				['d'=>'price'],
				['s'=>'sale'],
				['d'=>'weight'],
				['i'=>'sort'],
				['s'=>'description'],
				['s'=>'image'],
				['s'=>'images'],
				['s'=>'meta_keywords'],
				['s'=>'meta_description'],
			],
			'condition'=>' WHERE `id` = ?',
			'conditionFields'=>[['id'=>'i']]
		]);
		if($goodsId){
			$props = $this->updateProps($goodsData->id,$goodsData->props);
			return [
				'status'=>'success',
				'data'=>[
					'goodsId'=>$goodsId,
					'props'=>$props
				]
			];
		}
		return [
			'status'=>'fail',
			'failText'=>'Goods creating error',
			'data'=> $goodsData,
			'errorText'=>$this->db->errtext,
			'errorNo'=>$this->db->errno
		];
	}
	function updateProps($goodsId,$props){
		$propsArr = [];
		foreach ($props as $key=>$prop){
			foreach ($prop as $k=>$v){
				$propData = (object) [
					'goods_id' => $goodsId,
					'prop_id' => $k,
					'prop_value' => $v,
				];
				$propId = $this->db->update([
					'tableName'=>'goods_props',
					'updateData'=>$propData,
					'fieldsToUpdate'=> [
						['i'=>'goods_id'],
						['i'=>'prop_id'],
						['s'=>'prop_value'],
					],
					'condition'=>' WHERE `goods_id` = ? AND `prop_id` = ?',
					'conditionFields'=>[['goods_id'=>'i','prop_id'=>'i']],
				]);
				$propsArr[] = $propId;
			}
		}
		return $propsArr;
	}
	function delete($goodsData){
		$goodsId = $goodsData->id;
		$sql = "DELETE FROM `goods` WHERE `id`= ?";
		$this->db->prepare($sql,'i',[$goodsId]);
		if($this->db->errno <= 0){
			return [
				'status'=>'success',
				'failText'=>'Goods deleting success',
				'data'=>[
					'id'=>$goodsId
				]
			];
		}
		return [
			'status'=>'fail',
			'failText'=>'Goods deleting error',
			'errorText'=>$this->db->errtext,
			'errorNo'=>$this->db->errno
		];
	}
	function saveProps($goodsId,$props){
		$propsArr = [];
		foreach ($props as $key=>$prop){
			foreach ($prop as $k=>$v){
				$propData =(object) [
						'goods_id' => $goodsId,
						'prop_id' => $k,
						'prop_value' => $v,
				];
				$propId = $this->db->insert([
						'tableName'=>'goods_props',
						'insertData'=>$propData,
						'fieldsToInsert'=> [
								['i'=>'goods_id'],
								['i'=>'prop_id'],
								['s'=>'prop_value'],
						]
				]);
				$propsArr[] = $propId;
			}
		}
		return $propsArr;
	}

	function search($searchData){
		$query = $searchData->searchQuery;
		$perPage = $searchData->perPage;
		$page = $searchData->page - 1;
		$page = ($perPage * $page);
		$sql = "
			SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`
			FROM `goods` 
			WHERE `title` LIKE ? 
	    LIMIT ?,?
		";
		$goods = $this->db->prepare($sql,'sii',["%".$query."%",$page,$perPage])->fetch_all(MYSQLI_ASSOC);
		if(!empty($goods)){
			return $goods;
		}
		return [];
	}


	/* Front functions */
	public static function get($goodsId){
		$sql = "
SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`,`tables`
FROM `goods`
WHERE `id` = ?
";
		$item = frontDb::prepare($sql,'i',[$goodsId])->fetch_assoc();
		if(!empty($item)){
			return $item;
		}
		return [];
	}
	public static function getProps($goodsId){
		$sql = "
			SELECT `id`,`prop_id`,`prop_value`
			FROM `goods_props`
			WHERE `goods_id` = ?
		";
		$props = frontDb::prepare($sql,'i',[$goodsId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($props)){
			return $props;
		}
		return [];
	}
	public static function getFull($goodsId){
		$itemId= $goodsId;
		$curentItem = self::get($itemId);
		$curentItem['images'] = unserialize($curentItem['images']);
		$curentItem['props'] = self::getProps($itemId);
		if(!empty($curentItem)){
			return $curentItem;
		}
		return [];
	}
	public static function getFirstFromCat($catId){
		$sql = "
			SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`,`tables`
			FROM `goods`
			WHERE `c_id` = ?
			LIMIT 0,1
		";
		$item = frontDb::prepare($sql,'i',[$catId])->fetch_assoc();
		if(!empty($item)){
			return $item;
		}
		return [];
	}
	public static function getFullFromCat($catId){
		$curentItem = self::getFirstFromCat($catId);
		$curentItem['images'] = unserialize($curentItem['images']);
		$curentItem['props'] = self::getProps($curentItem['id']);
		if(!empty($curentItem)){
			return $curentItem;
		}
		return [];
	}
	public static function getGoodsFromCat($catId){
		$sql = "
			SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`
			FROM `goods`
			WHERE `c_id` = ?
		";
		$item = frontDb::prepare($sql,'i',[$catId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($item)){
			return $item;
		}
		return [];
	}
	public static function getRetailGoods(){
		$sql = "
			SELECT `id`,`title`,`model`,`article`,`manufac`,`c_id`,`price`,`sale`,`avail`,`weight`,`sort`,`description`,`meta_keywords`,`meta_description`,`image`,`images`
			FROM `goods`
			WHERE `retail` = 1
		";
		$items = frontDb::prepare($sql)->fetch_all(MYSQLI_ASSOC);
		if(!empty($items)){
			return $items;
		}
		return [];
	}
}