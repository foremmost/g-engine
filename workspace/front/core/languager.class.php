<?php
include_once "db.class.php";
include_once "settings.class.php";
class Languager{
	private $db;
	function __construct(){
		$this->db = new Db();
		$this->settings = new Settings();
	}
	function checkSuper(){
		session_start();
		$groupId = $_SESSION['group_id'];
		$hasDefault = "
			WHERE `type` <> 'sys'
		";
		if ($groupId == 1) {
			$hasDefault = "";
		}
		return $hasDefault;
	}
	function getLangs()
	{
		$sql = "
			SELECT `id`,`lang`,`value` 
			FROM `languages`
		";
		$langs = $this->db->prepare($sql)->fetch_all(MYSQLI_ASSOC);
		if (!empty($langs)) {
			return $langs;
		}
		return [];
	}
	function getDefaultTranslateoo($wordName){
		$sql = "
			SELECT `id`,`value` as `translate`,`type`
			FROM `words`
			WHERE `value` = ?
		";
		$word = $this->db->prepare($sql, 's', [$wordName])->fetch_assoc();
		if (!empty($word)) {
			return $word;
		}
		return '';
	}
	function getDefaultTranslate($wordName){
		$sql = "
			SELECT `id`,`value` as `translate`,`type`
			FROM `words` as `w` 
			WHERE `value` IN {$wordName}
			GROUP BY `w`.id
		";
		#echo $sql;
		$words = [];
		$preparedWords = $this->db->prepare($sql);
		while($word = $preparedWords->fetch_assoc()){
			$w = [];
			$w['id'] = $word['id'];
			$w['type'] = $word['type'];
			$w['translate'] = $word['translate'];
			$words[$word['translate']] = $w;
		}
		if (!empty($words)) {
			return $words;
		}
		return '';
	}
	function getChangedDefaultTranslate($wordName){
		$sql = "
			SELECT `id`,`value` as `translate`,`type`
			FROM `words` as `w` 
			WHERE `value` IN {$wordName}
			GROUP BY `w`.id
		";
		$words = [];
		$preparedWords = $this->db->prepare($sql);
		while($word = $preparedWords->fetch_assoc()){
			$w = [];
			$w['id'] = $word['id'];
			$w['type'] = $word['type'];
			$w['translate'] = $word['translate'];
			$words[$word['translate']] = $w;
		}
		if (!empty($words)) {
			return $words;
		}
		return '';
	}


	function getChangedIds($words){
		$sql = "SELECT `word_id` as `id` FROM `translates` WHERE `translate` IN {$words}";
		$ids = $this->db->prepare($sql)->fetch_all(MYSQLI_ASSOC);
		$strIds = "(";
		if(!empty($ids)){
			foreach($ids as $id=>$val):
			 $strIds.= $val['id'].",";
			endforeach;
		}
		$strIds.= "'#')";
		return $strIds;
	}
	function getChangedLangTranslate($words, $langId){
		$strIds =  $this->getChangedIds($words);
	#	echo $strIds;
		$sql = "
			SELECT `w`.`id`,`w`.`value` as `translate`,`w`.`type`,`translates`.`translate` as `def`
			FROM `words` as `w` 
			INNER JOIN `translates` ON `translates`.`word_id` = `w`.`id`
			WHERE `w`.`id` IN {$strIds} 
			GROUP BY `w`.id
		";
		$words = [];
		$preparedWords = $this->db->prepare($sql);
		while($word = $preparedWords->fetch_assoc()){
			$w = [];
			$w['id'] = $word['id'];
			$w['type'] = $word['type'];
			$w['def'] = $word['def'];
			$w['translate'] = $word['translate'];
			$words[$word['translate']] = $w;
		}
		if (!empty($words)) {
			return $words;
		}
		return '';
	}
	function getLangTranslate($wordName, $langId){
		$sql = "
			SELECT `w`.id,`w`.value as `default`,`w`.`translate`,`w`.`type`
			FROM (
				SELECT `words`.id,`translate`,`words`.value,`type`
				FROM `words`
				LEFT OUTER JOIN `translates` ON `translates`.word_id = `words`.id
				WHERE ( `words`.value IN {$wordName} AND `translates`.lang_id = ?)
				UNION ALL 
				SELECT `words`.id,NULL,`words`.value,`type`
				FROM `words`
				WHERE `words`.value IN {$wordName}
			) as `w` 
			GROUP BY `w`.id
		";
		$words = [];
		$preparedWords = $this->db->prepare($sql, 'i', [$langId]);
		while($word = $preparedWords->fetch_assoc()){
			$w = [];
			$w['id'] = $word['id'];
			$w['type'] = $word['type'];
			$w['translate'] = $word['translate'];
			$w['default'] = $word['default'];
			$words[$word['default']] = $w;
		}
		if (!empty($words)) {
			return $words;
		}
		return null;
	}
	function getLangId($lang){
		$sql = "
			SELECT `id`
			FROM `languages`
			WHERE `lang` = ? ";
		$langId = $this->db->prepare($sql, 's', [$lang])->fetch_assoc();
		if (!empty($langId)) {
			return $langId['id'];
		}
		return 0;
	}
	function getTranslate($wordData)
	{
		$wordData = (object)$wordData;
		$wordId = strtolower($wordData->wordId);
		$langId = $this->getLangId($wordData->lang);
		$currentLang = $this->getSystemLang();
		if ($langId == $currentLang['id']) {
			return $this->getDefaultTranslate($wordId);
		} else {
			return $this->getLangTranslate($wordId, $langId);
		}
	}
	function getTranslates($wordData){
		$wordData = (object)$wordData;
		$words = $wordData->words;
		$langId = $this->getLangId($wordData->lang);
		$translatedWords = [];
		$wordsStr = "('".implode("','",$words)."')";

		$defaultLang = $this->settings->get('default_lang');

		$currentLang = $this->getSystemLang();
		#print_r($defaultLang);

		if ( $langId == $currentLang['id'] ) {
			if($defaultLang == $currentLang['id'] ){
				$method = 'getDefaultTranslate';
				if (property_exists($wordData, 'type')) {
					$method = 'getDefaultTranslateFromId';
				}
				return $this->$method($wordsStr);
			}else{
				return $this->getChangedLangTranslate($wordsStr, $langId);
			}
		} else {
			$method = 'getLangTranslate';
			if (property_exists($wordData, 'type')) {
				$method = 'getLangTranslateFromId';
			}
			$translatedWords = $this->$method($wordsStr, $langId);
		}
		return $translatedWords;
	}



	function getItemsCnt($wordData)
	{
		$wordData = (object)$wordData;
		$hasDefault = $this->checkSuper();
		$sql = "
			SELECT COUNT(id) as `cnt`
			FROM `words`
			{$hasDefault}
		";
		$words = $this->db->prepare($sql)->fetch_assoc();

		if (!empty($words)) {
			return (int)$words['cnt'];
		}
		return 0;
	}
	function getLangWords($wordData){
		$hasDefault = $this->checkSuper();
		$wordData = (object)$wordData;
		$langId = $this->getLangId($wordData->lang);

		$perPage = $wordData->perPage;
		$page = $wordData->page - 1;
		$page = ($perPage * $page);
		$sql = "
			SELECT `w`.id,`w`.value,`w`.`translate`,`w`.`type`
			FROM (
				SELECT `words`.id,`translate`,`words`.value,`type`
				FROM `words`
				LEFT OUTER JOIN `translates` ON `translates`.word_id = `words`.id
				WHERE (`translates`.lang_id = ?)
				UNION ALL 
				SELECT `words`.id,NULL,`words`.value,`type`
				FROM `words`
			) as `w` 
			{$hasDefault}
			GROUP BY `id`
			ORDER BY `w`.value
			LIMIT ?,?
		";
		$words = $this->db->prepare($sql, 'iii', [$langId, $page, $perPage])->fetch_all(MYSQLI_ASSOC);
		if (!empty($words)) {
			return $words;
		}
		return [];
	}
	function getDefaultSearchedCnt($word)
	{
		$sql = "
			SELECT COUNT(`words`.id) as cnt
			FROM `words`
			WHERE `words`.value LIKE ?
		";
		$words = $this->db->prepare($sql, 's', ["%{$word}%"])->fetch_assoc();
		if (!empty($words)) {
			return $words['cnt'];
		}
		return 0;
	}
	function getSearchedCnt($wordData)
	{
		$wordData = (object)$wordData;
		$word = $wordData->word;
		$langId = $this->getLangId($wordData->lang);
		$currentLang = $this->getSystemLang();
		if ($langId == $currentLang['id']) {
			return $this->getDefaultSearchedCnt($word);
		}
		$sql = "
			SELECT COUNT(`words`.id) as cnt
			FROM `words`
			LEFT OUTER JOIN `translates` ON `translates`.word_id = `words`.id
			WHERE (`translates`.lang_id = ? OR `translate` IS NULL ) AND (`words`.value LIKE ? OR `translate` LIKE ? )
		";
		$words = $this->db->prepare($sql, 'iss', [$langId, "%{$word}%", "%{$word}%"])->fetch_assoc();
		if (!empty($words)) {
			return $words['cnt'];
		}
		return 0;
	}
	function getDefaultWords($wordData){
		$hasDefault = $this->checkSuper();
		$wordData = (object)$wordData;
		$perPage = $wordData->perPage;
		$page = $wordData->page - 1;
		$page = ($perPage * $page);

		$sql = "
			SELECT `id`,`lang_id`,`value`,`type`
			FROM `words`
			{$hasDefault}
			LIMIT ?,?
		";
		$words = $this->db->prepare($sql, 'ii', [$page, $perPage])->fetch_all(MYSQLI_ASSOC);
		if (!empty($words)) {
			return $words;
		}
		return [];
	}
	function getTranslateToFront($word, $lang = 'en'){
		$langId = $this->getLangId($lang);
		$currentLang = $this->getSystemLang();
		#$translatedWords = [];
		$wordsStr = "('{$word}')";
		if ($langId == $currentLang['id']) {
			$outWord = $this->getDefaultTranslate($wordsStr);
			if (empty($outWord['translate'])) return $word;
			return $outWord['translate'];
		} else {
			$outWord = $this->getLangTranslate($wordsStr, $langId);
			if (empty($outWord)) return $word;
			if (empty($outWord[$word]['translate'])) return $outWord[$word]['default'];
			return $outWord[$word]['translate'];
		}
	}
	function getDefaultTranslateFromId($wordId){
		$sql = "
			SELECT `id`,`value` as `translate`,`type`
			FROM `words`
			WHERE `id`= ?
			GROUP BY id
		";
		$word = $this->db->prepare($sql,'i',[$wordId])->fetch_assoc();
		if (!empty($word)) {
			return $word;
		}
		return '';
	}
	function getLangTranslateFromId($wordId, $langId){
		$sql = "
			SELECT `w`.id,`w`.value as `default`,`w`.`translate`,`w`.`type`
			FROM (
				SELECT `words`.id,`translate`,`words`.value,`type`
				FROM `words`
				LEFT OUTER JOIN `translates` ON `translates`.word_id = `words`.id
				WHERE ( `words`.id = ? AND `translates`.lang_id = ?)
				UNION ALL 
				SELECT `words`.id,NULL,`words`.value,`type`
				FROM `words`
				WHERE `words`.id = ?
			) as `w` 
			GROUP BY `w`.id
		";
		$word = $this->db->prepare($sql, 'iii', [$wordId,$langId,$wordId])->fetch_assoc();
		if (!empty($word)) {
			return $word;
		}
		return '';
	}
	function getTranslateToFrontFromId($wordId, $lang = 'en'){
		$langId = $this->getLangId($lang);
		$currentLang = $this->getSystemLang();
		if ($langId == $currentLang['id']) {
			$outWord = $this->getDefaultTranslateFromId($wordId);
			return $outWord['translate'];
		} else {
			$outWord = $this->getLangTranslateFromId($wordId, $langId);
			if (empty($outWord)) return $this->getDefaultTranslateFromId($wordId);
			if (empty($outWord['translate'])) return $outWord['default'];
			return $outWord['translate'];
		}
	}

	function getSystemLang(){
		$sql = "
			SELECT `id`,`lang`,`value`
			FROM `languages`
			WHERE `current` = 1
		";
		$systemLang = $this->db->prepare($sql)->fetch_assoc();
		if(!empty($systemLang)){
			return $systemLang;
		}
		return [];
	}
	function getCommonLangWords($langId){
		$sql = "
			SELECT `id`,`lang_id`,`word_id`,`translate`
			FROM `translates`
			WHERE `lang_id` = ?
		";
		$words = $this->db->prepare($sql,'i',[$langId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($words)){
			return $words;
		}
		return [];
	}
	function getCommonDefaultWords($langId){
		$sql = "
			SELECT `id`,`lang_id`,`value`
			FROM `words`
			WHERE `lang_id` = ?
		";
		$words = $this->db->prepare($sql,'i',[$langId])->fetch_all(MYSQLI_ASSOC);
		if(!empty($words)){
			return $words;
		}
		return [];
	}
	function changeSystemLang($langData){
		$langId = $langData->lang_id;
		$words = $this->getCommonLangWords($langId);

		$currentLangId = $this->getSystemLang();
		$currentSystemWords = $this->getCommonDefaultWords($currentLangId['id']);
		foreach($words as $word):
			$this->updateCommonWord( (object) [
				'lang_id'=> $langId,
				'word_id'=>$word['word_id'],
				'value'=>$word['translate'],
			]);
		endforeach;
		foreach($currentSystemWords as $word):
			$this->updatePrevWord((object) [
				'prev_lang'=> $langId,
				'lang_id'=> $currentLangId['id'],
				'word_id'=>$word['id'],
				'translate'=>$word['value'],
			]);
		endforeach;
		$this->changeCurrentLang( (object) [
			'current'=> 1,
			'lang_id'=> $langId
		]);
		$this->changeCurrentLang( (object) [
			'current'=> 0,
			'lang_id'=> $currentLangId['id']
		]);
	}
	function changeCurrentLang($langData){
		$this->db->update([
			'tableName'=>'languages',
			'updateData'=>$langData,
			'fieldsToUpdate'=> [
				['i'=>'current'],
			],
			'condition'=>' WHERE `id` = ?',
			'conditionFields'=>[['lang_id'=>'i']],
		]);
	}
	function updateCommonWord($langData){
		$propId = $this->db->update([
			'tableName'=>'words',
			'updateData'=>$langData,
			'fieldsToUpdate'=> [
				['i'=>'lang_id'],
				['s'=>'value'],
			],
			'condition'=>' WHERE `id` = ?',
			'conditionFields'=>[['word_id'=>'i']],
		]);
	}
	function updatePrevWord($langData){
		$propId = $this->db->update([
			'tableName'=>'translates',
			'updateData'=>$langData,
			'fieldsToUpdate'=> [
				['i'=>'lang_id'],
				['i'=>'word_id'],
				['s'=>'translate'],
			],
			'condition'=>' WHERE `lang_id` = ? AND `word_id` = ? ',
			'conditionFields'=>[['prev_lang'=>'i','word_id'=>'i']],
		]);
	}

	function hasTranslateWord($lang_id, $wordId)
	{
		$sql = "
			SELECT `id`
			FROM  `translates`
			WHERE  `lang_id`= ? AND `word_id` = ?
		";
		$word = $this->db->prepare($sql, 'is', [$lang_id, $wordId])->fetch_assoc();
		if (!empty($word)) {
			return true;
		}
		return false;
	}
	function searchWord($wordData)
	{
		$wordData = (object)$wordData;
		$hasDefault = $this->checkSuper();
		$word = $wordData->word;
		$langId = $this->getLangId($wordData->lang);
		$perPage = $wordData->perPage;
		$page = $wordData->page - 1;
		$page = ($perPage * $page);
		$sql = "
			SELECT `id`,`translate`,`value`,`type`
			FROM (
			SELECT `translates`.word_id as `id`,`translate`,`words`.value,`type`
				FROM `words`
				LEFT OUTER JOIN `translates` ON `translates`.word_id = `words`.id
				WHERE (`translates`.lang_id = ? ) AND (`words`.value LIKE ? OR `translate` LIKE ? )
				
				UNION ALL 
				SELECT `words`.id,NULL,`words`.value,`type`
				FROM `words`
				WHERE (`words`.value LIKE ?)
			) as `s`
			{$hasDefault}
			GROUP BY `value`
			ORDER BY `value`
				LIMIT ?,?		
		";
		$words = $this->db->prepare($sql, 'isssii', [$langId, "%{$word}%", "%{$word}%", "%{$word}%", $page, $perPage])->fetch_all(MYSQLI_ASSOC);
		if (!empty($words)) {
			return $words;
		}
		return [];
	}
	function searchDefaultWord($wordData)
	{
		$wordData = (object)$wordData;
		$word = $wordData->word;
		$perPage = $wordData->perPage;
		$page = $wordData->page - 1;
		$page = ($perPage * $page);
		$sql = "
		SELECT `id`,`value`,`type`
			FROM `words`
			WHERE (`words`.value LIKE ?  )
			LIMIT ?,?";
		$words = $this->db->prepare($sql, 'sii', ["%{$word}%", $page, $perPage])->fetch_all(MYSQLI_ASSOC);
		if (!empty($words)) {
			return $words;
		}
		return [];
	}
	function saveDefaultWord($wordData)
	{
		$currentLangId = $this->getSystemLang();
		$wordData = (object)$wordData;
		$lang_id = $currentLangId['id'];
		$value = $wordData->value;
		$type = $wordData->type;
		$sql = "
			INSERT INTO `words` (`lang_id`,`value`,`type`)
			VALUES (?,?,?)
		";
		$this->db->prepare($sql, 'iss', [$lang_id, $value, $type]);
		$id = $this->db->insert_id;
		if (!empty($id)) {
			return [
					'status' => 'success',
					'data' => [
							'id' => $id
					]
			];
		}
		return [
				'status' => 'fail'
		];
	}
	function saveTranslateWord($wordData){
		$wordData = (object)$wordData;
		$lang_id = $this->getLangId($wordData->lang);
		$value = $wordData->translate;
		$wordId = $wordData->wordId;
		if ($this->hasTranslateWord($lang_id, $wordId)) {
			$sql = "
				UPDATE `translates` SET `lang_id`=?,`translate`=?,`word_id`=?
				WHERE `word_id`= ? AND `lang_id` = ?
			";
			$response = $this->db->prepare($sql, 'issii', [$lang_id, $value, $wordId, $wordId, $lang_id]);
			$id = $wordId;
		} else {
			$sql = "
				INSERT INTO `translates` (`lang_id`,`translate`,`word_id`)
				VALUES (?,?,?)
			";
			$response = $this->db->prepare($sql, 'iss', [$lang_id, $value, $wordId]);
		}

		if (!isset($id))
			$id = $this->db->insert_id;
		if (!empty($id) || ($response)) {
			return [
					'status' => 'success',
					'data' => [
							'id' => $id
					]
			];
		}
		return [
				'status' => 'fail'
		];
	}
	function editDefaultWord($wordData)
	{
		$wordData = (object)$wordData;
		$wordId = $wordData->wordId;
		$value = $wordData->value;
		$type = $wordData->type;
		$sql = "
			UPDATE `words`
			SET `value`=?, `type` = ? 
			WHERE id = ?
		";
		$this->db->prepare($sql, 'ssi', [$value, $type, $wordId]);
		if (!empty($wordId)) {
			return [
				'status' => 'success',
				'data' => [
						'id' => $wordId
				]
			];
		}
		return [
				'status' => 'fail'
		];
	}
	function getWordTypes(){
		return [
				'status' => 'success',
				'types' => [
						[
								'value'=>'sys',
								'text' => 'System'
						],
						[
								'value'=>'site',
								'text' => 'Site'
						],
				]
		];
	}



}