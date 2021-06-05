<?php
?>

<h1>Страница товара ID - {{ id }}</h1>
{{ uId }}

<ul>
 <li>Title: {{ title }}</li>
 <li>Model:  {{ model }}</li>
 <li>Article:  {{ article }}</li>
 <li>Manufacturer:  {{ manufac }}</li>
 <li>Category id:  {{ c_id }}</li>
 <li>Price:  {{ price }}</li>
 <li>Sale:  {{ sale }}</li>
 <li>Available:  {{ avail }}</li>
 <li>Weight:  {{ weight }}</li>
 <li>Sort:  {{ sort }}</li>
 <li>Description:  {{ description }}</li>
 <li>Meta Keywords:  {{ meta_keywords }}</li>
 <li>Meta Description:  {{ meta_description }}</li>
 <li>Main image:  {{ image }}</li>
</ul>
<input type="number" class="goods-cnt" value="1">
<button data-click-action="front:addToCart" class="btn" data-id="{{id}}">Add to cart</button>