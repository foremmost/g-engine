<?php session_start();
 ?><!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" href="img/favicon.png">
    <title data-word="1">G-ENGINE &mdash; </title>
    <link rel="stylesheet" property="stylesheet" href="css/main.css"/>
  </head>
  <script src="https://cdn.tiny.cloud/1/w06bwxeowxd9fws038luv7cdl7azhf624ucvv93dbczo1y7e/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
  <body>
    <core class="mbottom"><?php if(isset($_SESSION['group_id'])) {
	include_once 'system.php';
}else{
	include_once 'author.php';
} ?>
      <div class="sprite">
        <svg width="0" height="0" class="hidden">
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="zip">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#156ED6"></path>
        <path d="M8.523 17.361V18H5.66v-.63l2.16-5.031H5.76V11.7h2.78v.63l-2.168 5.031h2.15zM9.17 11.7h.702V18H9.17v-6.3zm1.424 0h1.377c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.49 1.521-1.467 1.521h-.621V18h-.702v-6.3zm.702 3.186h.62c.265 0 .46-.066.586-.198.126-.132.189-.348.189-.648v-.837c0-.294-.057-.51-.171-.648-.114-.144-.297-.216-.55-.216h-.674v2.547z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="bell-24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 .75c-2.761 0-5.25 1.924-5.25 4.5v3.404c0 .481-.142.952-.41 1.352L1.692 12.48a1.138 1.138 0 00.947 1.77h3.737a2.625 2.625 0 005.25 0h3.737a1.138 1.138 0 00.947-1.77l-1.65-2.474c-.267-.4-.409-.87-.409-1.352V5.25c0-2.576-2.489-4.5-5.25-4.5zm-4.125 4.5c0-1.773 1.787-3.375 4.125-3.375s4.125 1.602 4.125 3.375v3.404c0 .704.208 1.391.598 1.976l1.65 2.474a.014.014 0 01.002.008v.005l-.004.004a.023.023 0 01-.004.003l-.005.001H2.633l-.004-.004-.003-.004-.001-.005c0-.003 0-.005.002-.008l1.65-2.474c.39-.585.598-1.273.598-1.976V5.25zm5.625 9h-3a1.5 1.5 0 003 0z" fill="#5068E2"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" id="circle-check-fill-24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M.667 8.02a7.333 7.333 0 1114.667 0 7.333 7.333 0 01-14.667 0zm10.854-1.812a.5.5 0 10-.708-.708l-3.98 3.98-1.646-1.646a.5.5 0 10-.707.707l2 2a.5.5 0 00.707 0l4.333-4.333z" fill="#10DB3C" fill-opacity=".6"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="Close">
        <g filter="url(#filter0_d)">
        <path d="M10.94 10l4.2-4.193a.67.67 0 00-.946-.947L10 9.06l-4.193-4.2a.67.67 0 00-.947.947L9.06 10l-4.2 4.193a.666.666 0 00.217 1.093.666.666 0 00.73-.146L10 10.94l4.194 4.2a.665.665 0 00.946 0 .666.666 0 000-.947L10.94 10z" fill="#828282"></path>
        </g>
        <defs>
        <filter id="filter0_d" x="-2" y="-2" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"></feColorMatrix>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
        </filter>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="doc">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#7AB7FF"></path>
        <path d="M4.36 11.7V18h1.476c.981 0 1.431-.594 1.431-1.557v-3.177c0-.972-.45-1.566-1.431-1.566H4.36zm.702 5.661v-5.022h.756c.513 0 .756.315.756.891v3.24c0 .576-.243.891-.747.891h-.765zm2.812-.882c0 .954.477 1.584 1.44 1.584.972 0 1.45-.63 1.45-1.584v-3.258c0-.963-.478-1.584-1.45-1.584-.963 0-1.44.621-1.44 1.584v3.258zm.693-3.294c0-.567.243-.909.747-.909.513 0 .747.342.747.909v3.33c0 .576-.234.909-.747.909-.504 0-.747-.333-.747-.909v-3.33zm4.218-1.548c-.963 0-1.413.63-1.413 1.584v3.258c0 .954.45 1.584 1.413 1.584.972 0 1.422-.63 1.422-1.584v-.783h-.666v.819c0 .567-.225.909-.738.909-.504 0-.738-.342-.738-.909v-3.33c0-.567.234-.909.738-.909.513 0 .738.342.738.909v.603h.666v-.567c0-.954-.45-1.584-1.422-1.584z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="doc-1">
        <path d="M10 .5a.5.5 0 01.5.5v3A3.5 3.5 0 0014 7.5h3a.5.5 0 01.5.5v11a2.5 2.5 0 01-2.5 2.5H3A2.5 2.5 0 01.5 19V3A2.5 2.5 0 013 .5h7zm3.5.5a.45.45 0 01.133-.327.174.174 0 01.078-.045.118.118 0 01.073.01c.163.07.313.166.448.301l2.829 2.829c.135.135.232.285.3.448a.118.118 0 01.011.073.174.174 0 01-.044.078A.454.454 0 0117 4.5h-3a.5.5 0 01-.5-.5V1z" stroke="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#7AB7FF"></path>
        <path d="M4.36 11.7h1.476c.48 0 .837.138 1.071.414.24.27.36.654.36 1.152v3.177c0 .492-.12.876-.36 1.152-.234.27-.591.405-1.071.405H4.36v-6.3zm.702 5.661h.765c.498 0 .747-.297.747-.891v-3.24c0-.594-.252-.891-.756-.891h-.756v5.022zm2.812-.882v-3.258c0-.492.12-.879.36-1.161.246-.282.606-.423 1.08-.423.474 0 .834.141 1.08.423.246.282.37.669.37 1.161v3.258c0 .492-.124.879-.37 1.161-.246.282-.606.423-1.08.423-.468 0-.825-.141-1.07-.423-.247-.282-.37-.669-.37-1.161zm.693-3.294v3.33c0 .606.25.909.747.909.498 0 .747-.303.747-.909v-3.33c0-.606-.249-.909-.747-.909s-.747.303-.747.909zm4.218-1.548c.474 0 .828.141 1.062.423.24.282.36.669.36 1.161v.567h-.666v-.603c0-.606-.246-.909-.738-.909s-.738.303-.738.909v3.33c0 .606.246.909.738.909s.738-.303.738-.909v-.819h.666v.783c0 .492-.12.879-.36 1.161-.234.282-.588.423-1.062.423-.468 0-.822-.141-1.062-.423-.234-.282-.35-.669-.35-1.161v-3.258c0-.492.116-.879.35-1.161.24-.282.594-.423 1.062-.423z" fill="#3A3A3A"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" id="error">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16.02a8 8 0 100-16 8 8 0 000 16zM6.839 3.567H9.16l-.212 6.56H7.05l-.212-6.56zm2.363 8.388a1.224 1.224 0 01-1.2 1.2 1.19 1.19 0 01-1.2-1.2c-.01-.655.535-1.186 1.2-1.186.633 0 1.191.53 1.2 1.186z" fill="red" fill-opacity=".6"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="gear-24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9a3 3 0 11-6 0 3 3 0 016 0zm-1.125 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" fill="#5068E2"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 .75c-.2 0-.4.007-.598.021a1.27 1.27 0 00-1.134.978l-.264 1.087c-.014.059-.067.13-.168.166a6.339 6.339 0 00-.547.227c-.097.045-.184.033-.236.001l-.956-.582a1.27 1.27 0 00-1.492.11 8.3 8.3 0 00-.847.847 1.27 1.27 0 00-.11 1.492l.582.956c.032.052.044.139-.001.236a6.34 6.34 0 00-.227.547c-.037.101-.107.154-.166.168l-1.087.264A1.27 1.27 0 00.77 8.402a8.361 8.361 0 000 1.196 1.27 1.27 0 00.978 1.134l1.087.264c.059.014.13.067.166.168.067.187.143.369.227.547.045.097.033.184.001.236l-.582.956a1.27 1.27 0 00.11 1.492c.262.302.545.585.847.847a1.27 1.27 0 001.492.11l.956-.582c.052-.032.139-.044.236.001.178.084.36.16.547.227.101.037.154.107.168.166l.264 1.087a1.27 1.27 0 001.134.978 8.39 8.39 0 001.196 0 1.27 1.27 0 001.134-.978l.264-1.087c.014-.059.067-.13.168-.166.187-.067.369-.143.547-.227.097-.045.184-.033.236-.002l.956.583a1.27 1.27 0 001.492-.11c.302-.262.585-.545.847-.847a1.27 1.27 0 00.11-1.492l-.582-.956c-.032-.052-.044-.139.001-.236.084-.178.16-.36.227-.547.037-.101.107-.154.166-.168l1.087-.264a1.27 1.27 0 00.978-1.134 8.39 8.39 0 000-1.196 1.27 1.27 0 00-.978-1.134l-1.087-.264c-.059-.014-.13-.067-.166-.168a6.337 6.337 0 00-.227-.547c-.045-.097-.033-.184-.002-.236l.583-.956a1.27 1.27 0 00-.11-1.492 8.292 8.292 0 00-.847-.847 1.27 1.27 0 00-1.492-.11l-.956.582c-.052.032-.139.044-.236-.001a6.335 6.335 0 00-.547-.227c-.101-.037-.154-.107-.168-.166l-.264-1.087A1.27 1.27 0 009.598.77 8.361 8.361 0 009 .75zm-.517 1.143a7.237 7.237 0 011.034 0c.042.003.101.038.122.121l.264 1.088c.114.47.468.81.88.958.153.055.303.118.449.187.395.186.887.196 1.3-.056l.956-.582c.073-.045.14-.027.171 0 .261.226.506.47.732.732.027.031.045.098 0 .171l-.582.956a1.374 1.374 0 00-.055 1.3c.068.146.13.296.186.45.148.41.488.765.958.88l1.088.263c.083.02.118.08.12.122a7.197 7.197 0 010 1.034c-.002.042-.037.101-.12.122l-1.088.264c-.47.114-.81.468-.958.88a5.214 5.214 0 01-.186.449 1.37 1.37 0 00.055 1.3l.582.956c.045.073.027.14 0 .171-.226.261-.47.506-.732.732-.031.027-.098.045-.171 0l-.956-.582a1.374 1.374 0 00-1.3-.055 5.214 5.214 0 01-.45.186c-.41.148-.765.488-.88.958l-.263 1.088c-.02.083-.08.118-.122.12a7.197 7.197 0 01-1.034 0c-.042-.002-.101-.037-.122-.12l-.264-1.088a1.374 1.374 0 00-.88-.958 5.219 5.219 0 01-.449-.186 1.374 1.374 0 00-1.3.055l-.956.582c-.073.045-.14.027-.171 0a7.175 7.175 0 01-.732-.732c-.027-.031-.045-.098 0-.171l.582-.956c.252-.413.242-.905.056-1.3a5.208 5.208 0 01-.187-.45 1.374 1.374 0 00-.958-.88L2.014 9.64c-.083-.02-.118-.08-.12-.122a7.237 7.237 0 010-1.034c.002-.042.037-.101.12-.122l1.088-.264c.47-.114.81-.469.958-.88.055-.153.118-.303.187-.449a1.374 1.374 0 00-.056-1.3l-.582-.956c-.045-.073-.027-.14 0-.171.226-.261.47-.506.732-.732.031-.027.098-.045.171 0l.956.582c.413.252.905.242 1.3.056.146-.07.296-.132.45-.187.41-.148.765-.488.88-.958l.263-1.088c.02-.083.08-.118.122-.12z" fill="#5068E2"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="main">
        <path d="M11.181 17v-5.652H6.818v5.651M17 17V8.13a.69.69 0 00-.238-.524L9.489 1.184a.74.74 0 00-.979 0L1.238 7.606A.708.708 0 001 8.13V17h16z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.715" y1="13.96" x2="11.928" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Group 79">
        <path d="M8.948 12.855a3.855 3.855 0 100-7.71 3.855 3.855 0 000 7.71z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.536 2.266L7.021 1.129a.642.642 0 00-.577-.1 8.3 8.3 0 00-1.36.563.643.643 0 00-.338.48l-.268 1.875a6.891 6.891 0 00-.583.582h0l-1.875.269a.642.642 0 00-.478.337 8.3 8.3 0 00-.565 1.36.643.643 0 00.1.577l1.137 1.516a6.885 6.885 0 000 .824h0l-1.136 1.515a.643.643 0 00-.1.577c.147.47.335.925.563 1.36a.644.644 0 00.479.339l1.875.268a6.88 6.88 0 00.583.582h0l.268 1.875a.642.642 0 00.337.479c.436.228.89.416 1.36.564a.643.643 0 00.578-.1l1.515-1.137a6.853 6.853 0 00.824 0h0l1.516 1.137a.642.642 0 00.576.1c.47-.147.925-.336 1.361-.563a.641.641 0 00.338-.48l.268-1.875a6.91 6.91 0 00.582-.582h0l1.876-.269a.642.642 0 00.478-.337c.228-.435.417-.89.564-1.36a.643.643 0 00-.1-.578l-1.136-1.515a6.936 6.936 0 000-.824h0l1.136-1.515a.642.642 0 00.1-.577 8.304 8.304 0 00-.563-1.36.643.643 0 00-.48-.339l-1.875-.268a6.923 6.923 0 00-.582-.582h0l-.268-1.875a.643.643 0 00-.337-.479 8.301 8.301 0 00-1.36-.564.643.643 0 00-.578.1L9.36 2.266a6.886 6.886 0 00-.824 0h0z" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="5.437" y1="11.39" x2="10.359" y2="13.018" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="1.663" y1="13.96" x2="11.876" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Group 80">
        <path d="M16.948 17h-16" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.402 5.174v8.347c0 .385.326.696.728.696h3.636c.402 0 .727-.311.727-.696V5.174c0-.384-.325-.696-.727-.696H11.13c-.402 0-.728.312-.728.696z" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.766 1H3.13c-.402 0-.728.311-.728.696V13.52c0 .384.326.696.728.696h3.636c.402 0 .727-.312.727-.696V1.696c0-.385-.325-.696-.727-.696z" stroke="url(#paint2_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.663" y1="17.81" x2="2.054" y2="19.877" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="14.526" y1="13.782" x2="17.642" y2="8.857" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="2.63" y1="11.706" x2="6.177" y2="12.158" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" id="Group 81">
        <path d="M18.756 16.754l-4.794-9.59-4.795 9.59" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.538 14.014h6.85" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.429 1v2.055" stroke="url(#paint2_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M.948 3.055h10.96" stroke="url(#paint3_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.168 3.055a8.22 8.22 0 01-8.22 8.22" stroke="url(#paint4_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4.156 5.795a8.223 8.223 0 007.75 5.476" stroke="url(#paint5_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="9.595" y1="14.932" x2="15.716" y2="16.957" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="10.844" y1="14.824" x2="11.635" y2="16.616" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="6.473" y1="2.664" x2="7.164" y2="2.776" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="1.438" y1="3.865" x2="1.987" y2="5.854" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint4_linear" x1="1.315" y1="9.712" x2="6.562" y2="11.448" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint5_linear" x1="4.503" y1="10.231" x2="9.004" y2="12.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" id="Group 82">
        <path d="M13.859 9.18a20.39 20.39 0 01-1.528 7.77" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12.817 6.453A4.09 4.09 0 005.68 9.179a12.213 12.213 0 01-1.532 5.941" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M7.042 1.465A8.185 8.185 0 0117.948 9.18a24.621 24.621 0 01-.608 5.453" stroke="url(#paint2_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M.849 12.587a8.147 8.147 0 00.741-3.408 8.159 8.159 0 012.727-6.096" stroke="url(#paint3_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.284 15.995c-.173.377-.36.745-.56 1.106" stroke="url(#paint4_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.768 9.18a16.388 16.388 0 01-.515 4.089" stroke="url(#paint5_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="12.399" y1="15.473" x2="13.477" y2="15.543" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="4.535" y1="13.215" x2="10.21" y2="14.837" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="7.529" y1="12.042" x2="14.747" y2="13.952" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="1.004" y1="10.781" x2="3.424" y2="11.074" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint4_linear" x1="7.75" y1="16.891" x2="8.135" y2="16.956" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint5_linear" x1="9.276" y1="12.492" x2="9.64" y2="12.507" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" id="Group 83">
        <path d="M9.671 17.354A8.177 8.177 0 109.671 1a8.177 8.177 0 000 16.354z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.99 8.496h.68v4.77h.682" stroke="url(#paint1_linear)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.672 6.451a1.022 1.022 0 100-2.044 1.022 1.022 0 000 2.044z" fill="url(#paint2_linear)"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="2.225" y1="14.247" x2="12.664" y2="17.7" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="9.05" y1="12.359" x2="10.007" y2="12.45" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="8.741" y1="6.063" x2="10.046" y2="6.495" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" id="Group 84">
        <path d="M18.883 5.866H1.878a.615.615 0 00-.61.547l3.491 9.833a.614.614 0 00.61.683h10.023a.614.614 0 00.61-.683l3.492-9.833a.614.614 0 00-.61-.547z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M7.308 5.866c0-.815 1.35-4.29 1.927-4.866m4.584 4.866c0-.815-1.351-4.29-1.927-4.866" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="2.082" y1="14.827" x2="12.033" y2="20.25" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="7.599" y1="4.941" x2="11.454" y2="6.648" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 18" id="Group 85">
        <path d="M9.178 12.659A5.829 5.829 0 109.178 1a5.829 5.829 0 000 11.658z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.734 1.218a5.83 5.83 0 111.582 11.44" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M1.107 16.85a9.867 9.867 0 0116.142 0" stroke="url(#paint2_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15.316 12.658a9.852 9.852 0 018.071 4.192" stroke="url(#paint3_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="3.87" y1="10.444" x2="11.312" y2="12.905" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="14.066" y1="10.444" x2="19.091" y2="11.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="1.829" y1="16.054" x2="6.187" y2="21.606" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="15.677" y1="16.053" x2="19.743" y2="18.643" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" id="Group 86">
        <path d="M7.03 12.73H1.652a.489.489 0 01-.489-.489V6.865A5.865 5.865 0 017.03 1h0a5.865 5.865 0 015.865 5.865v0A5.865 5.865 0 017.03 12.73v0z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.71 12.73a5.867 5.867 0 005.532 3.91h5.377a.488.488 0 00.488-.489v-5.376a5.865 5.865 0 00-5.544-5.856" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.688" y1="10.501" x2="9.176" y2="12.978" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="7.22" y1="14.413" x2="14.534" y2="16.765" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 18" id="Group 87">
        <path d="M16.268 8.385h-2.462a1.23 1.23 0 00-1.23 1.23v3.077a1.23 1.23 0 001.23 1.231h1.231a1.23 1.23 0 001.23-1.23V8.384zm0 0A7.385 7.385 0 008.828 1a7.385 7.385 0 00-7.441 7.385v4.307a1.23 1.23 0 001.23 1.231h1.231a1.23 1.23 0 001.231-1.23V9.614a1.23 1.23 0 00-1.23-1.23H1.386" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M16.268 12.692v1.847A2.462 2.462 0 0113.806 17h-4.42" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="2.052" y1="11.468" x2="11.254" y2="14.973" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="9.694" y1="16.182" x2="13.503" y2="18.195" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" id="Group 110">
        <path d="M18 5.873h-4.873V1" stroke="url(#paint0_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M1.757 12.37H6.63v4.873" stroke="url(#paint1_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.127 17.243V12.37H18" stroke="url(#paint2_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.63 1v4.873H1.757" stroke="url(#paint3_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="13.345" y1="4.947" x2="16.455" y2="5.976" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="1.975" y1="16.317" x2="5.085" y2="17.346" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="13.345" y1="16.317" x2="16.455" y2="17.346" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="1.975" y1="4.947" x2="5.085" y2="5.976" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Group 111">
        <path d="M13 1h4v4" stroke="url(#paint0_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5 17H1v-4" stroke="url(#paint1_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17 13v4h-4" stroke="url(#paint2_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M1 5V1h4" stroke="url(#paint3_linear)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="13.179" y1="4.24" x2="15.732" y2="5.085" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="1.179" y1="16.24" x2="3.732" y2="17.085" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="13.179" y1="16.24" x2="15.732" y2="17.085" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="1.179" y1="4.24" x2="3.732" y2="5.085" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="html">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#0085FF"></path>
        <path d="M4.767 15.165H3.219V18h-.702v-6.3h.702v2.835h1.548V11.7h.702V18h-.702v-2.835zM7.81 18h-.702v-5.661h-1.16V11.7h3.024v.639H7.81V18zm4.97-5.067l-.999 5.058h-.675l-1.044-5.013V18H9.45v-6.3h.981l1.035 5.031 1-5.031h.98V18h-.666v-5.067zM16.673 18h-2.502v-6.3h.702v5.661h1.8V18z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 17" id="Icon">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.5a.88.88 0 01-.882.88H.882A.88.88 0 010 8.5a.88.88 0 01.882-.88h18.236A.88.88 0 0120 8.5zm-4.265 7.62a.88.88 0 01-.882.88H.883A.88.88 0 010 16.12a.88.88 0 01.882-.879h13.97a.88.88 0 01.883.88zM11.177.88a.88.88 0 01-.883.879H.882A.88.88 0 010 .879.88.88 0 01.882 0h9.412a.88.88 0 01.883.88z" fill="#5068E2"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 19" id="Icon-1">
        <path d="M1 2.417C1 1.634 1.635 1 2.419 1h4.46a.608.608 0 110 1.214h-4.46a.203.203 0 00-.203.203v14.166c0 .112.091.203.203.203h4.46a.608.608 0 110 1.214h-4.46A1.418 1.418 0 011 16.583V2.417z" fill="#F79141"></path>
        <path d="M13.978 10.107l-2.676 2.82a.606.606 0 10.883.836l3.648-3.845a.606.606 0 000-.836l-3.648-3.845a.609.609 0 00-.883.835l2.676 2.82H7.284a.608.608 0 100 1.215h6.694z" fill="#F79141"></path>
        <path d="M1 2.417C1 1.634 1.635 1 2.419 1h4.46a.608.608 0 110 1.214h-4.46a.203.203 0 00-.203.203v14.166c0 .112.091.203.203.203h4.46a.608.608 0 110 1.214h-4.46A1.418 1.418 0 011 16.583V2.417z" stroke="#F79141" stroke-width=".6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.978 10.107l-2.676 2.82a.606.606 0 10.883.836l3.648-3.845a.606.606 0 000-.836l-3.648-3.845a.609.609 0 00-.883.835l2.676 2.82H7.284a.608.608 0 100 1.215h6.694z" stroke="#F79141" stroke-width=".6" stroke-linecap="round" stroke-linejoin="round"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="jpeg">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#FF7ADA"></path>
        <path d="M3.506 18v-.639c.078.006.195.009.35.009.247-.012.43-.084.55-.216.126-.138.189-.36.189-.666V11.7h.693v4.743c0 1.02-.447 1.542-1.341 1.566-.246 0-.393-.003-.441-.009zm2.474-6.3h1.377c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.49 1.521-1.467 1.521h-.621V18H5.98v-6.3zm.702 3.186h.62c.265 0 .46-.066.586-.198.126-.132.189-.348.189-.648v-.837c0-.294-.057-.51-.171-.648-.114-.144-.297-.216-.55-.216h-.674v2.547zm3.366-.396h1.539v.63h-1.54v2.241h1.89V18h-2.59v-6.3h2.592v.639h-1.89v2.151zm3.9-2.853c.474 0 .828.141 1.062.423.24.282.36.669.36 1.161v.54h-.666v-.576c0-.606-.246-.909-.738-.909s-.738.303-.738.909v3.33c0 .606.246.909.738.909s.738-.303.738-.909v-1.26h-.648v-.63h1.314v1.854c0 .492-.12.879-.36 1.161-.234.282-.588.423-1.062.423-.468 0-.822-.141-1.062-.423-.234-.282-.351-.669-.351-1.161v-3.258c0-.492.117-.879.351-1.161.24-.282.594-.423 1.062-.423z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="jpg">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#AD7AFF"></path>
        <path d="M4.627 18v-.639c.078.006.195.009.351.009.246-.012.43-.084.55-.216.125-.138.188-.36.188-.666V11.7h.693v4.743c0 1.02-.447 1.542-1.34 1.566-.247 0-.394-.003-.442-.009zm2.474-6.3h1.377c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.489 1.521-1.467 1.521h-.62V18H7.1v-6.3zm.702 3.186h.621c.264 0 .46-.066.585-.198.126-.132.19-.348.19-.648v-.837c0-.294-.058-.51-.172-.648-.114-.144-.297-.216-.549-.216h-.675v2.547zm4.023-3.249c.474 0 .828.141 1.062.423.24.282.36.669.36 1.161v.54h-.666v-.576c0-.606-.246-.909-.738-.909s-.738.303-.738.909v3.33c0 .606.246.909.738.909s.738-.303.738-.909v-1.26h-.648v-.63h1.314v1.854c0 .492-.12.879-.36 1.161-.234.282-.588.423-1.062.423-.468 0-.822-.141-1.062-.423-.234-.282-.35-.669-.35-1.161v-3.258c0-.492.116-.879.35-1.161.24-.282.594-.423 1.062-.423z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="pdf">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#FF7A7A"></path>
        <path d="M4.36 11.7V18h.702v-2.484h.621c.999 0 1.467-.522 1.467-1.521v-.756c0-.954-.423-1.539-1.413-1.539H4.36zm.702 3.186v-2.547h.675c.513 0 .72.288.72.864v.837c0 .603-.252.846-.774.846h-.621zM7.7 11.7V18h1.476c.98 0 1.43-.594 1.43-1.557v-3.177c0-.972-.45-1.566-1.43-1.566H7.7zm.702 5.661v-5.022h.756c.513 0 .756.315.756.891v3.24c0 .576-.243.891-.747.891h-.765zm3.568-2.727v-2.295h1.8V11.7h-2.502V18h.702v-2.727h1.45v-.639h-1.45z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="pdf-1">
        <path d="M10 .5a.5.5 0 01.5.5v3A3.5 3.5 0 0014 7.5h3a.5.5 0 01.5.5v11a2.5 2.5 0 01-2.5 2.5H3A2.5 2.5 0 01.5 19V3A2.5 2.5 0 013 .5h7zm3.5.5a.45.45 0 01.133-.327.174.174 0 01.078-.045.118.118 0 01.073.01c.163.07.313.166.448.301l2.829 2.829c.135.135.232.285.3.448a.118.118 0 01.011.073.174.174 0 01-.044.078A.454.454 0 0117 4.5h-3a.5.5 0 01-.5-.5V1z" stroke="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#FF7A7A"></path>
        <path d="M4.36 11.7V18h.702v-2.484h.621c.999 0 1.467-.522 1.467-1.521v-.756c0-.954-.423-1.539-1.413-1.539H4.36zm.702 3.186v-2.547h.675c.513 0 .72.288.72.864v.837c0 .603-.252.846-.774.846h-.621zM7.7 11.7V18h1.476c.98 0 1.43-.594 1.43-1.557v-3.177c0-.972-.45-1.566-1.43-1.566H7.7zm.702 5.661v-5.022h.756c.513 0 .756.315.756.891v3.24c0 .576-.243.891-.747.891h-.765zm3.568-2.727v-2.295h1.8V11.7h-2.502V18h.702v-2.727h1.45v-.639h-1.45z" fill="#3A3A3A"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="png">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#48B8D0"></path>
        <path d="M4.613 11.7H5.99c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.49 1.521-1.467 1.521h-.621V18h-.702v-6.3zm.702 3.186h.62c.265 0 .46-.066.586-.198.126-.132.189-.348.189-.648v-.837c0-.294-.057-.51-.171-.648-.114-.144-.297-.216-.55-.216h-.674v2.547zm3.285-1.98V18h-.63v-6.3h.891l1.458 4.554V11.7h.621V18h-.729l-1.61-5.094zm4.42-1.269c.475 0 .829.141 1.063.423.24.282.36.669.36 1.161v.54h-.666v-.576c0-.606-.246-.909-.738-.909s-.738.303-.738.909v3.33c0 .606.246.909.738.909s.738-.303.738-.909v-1.26h-.648v-.63h1.314v1.854c0 .492-.12.879-.36 1.161-.234.282-.588.423-1.062.423-.468 0-.822-.141-1.062-.423-.234-.282-.351-.669-.351-1.161v-3.258c0-.492.117-.879.35-1.161.24-.282.595-.423 1.063-.423z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="ppt">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#B842C2"></path>
        <path d="M4.859 11.7h1.377c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.489 1.521-1.467 1.521h-.621V18h-.702v-6.3zm.702 3.186h.621c.264 0 .459-.066.585-.198.126-.132.189-.348.189-.648v-.837c0-.294-.057-.51-.171-.648-.114-.144-.297-.216-.549-.216h-.675v2.547zM8.225 11.7h1.377c.942 0 1.413.513 1.413 1.539v.756c0 1.014-.489 1.521-1.467 1.521h-.62V18h-.703v-6.3zm.702 3.186h.621c.264 0 .46-.066.585-.198.126-.132.19-.348.19-.648v-.837c0-.294-.058-.51-.172-.648-.114-.144-.297-.216-.549-.216h-.675v2.547zM13.211 18h-.702v-5.661h-1.16V11.7h3.023v.639h-1.16V18z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="question-24">
        <path d="M8.228 6.199c-.165.11-.282.26-.365.428a.563.563 0 11-1.007-.504c.15-.3.386-.619.748-.86.366-.245.829-.388 1.396-.388.493 0 1.027.146 1.45.464.44.33.753.84.753 1.505 0 .775-.384 1.29-.77 1.661-.142.137-.299.268-.434.381l-.11.093a3.242 3.242 0 00-.326.306v1.027a.562.562 0 11-1.125 0V9.207c0-.177.05-.378.185-.551.164-.21.364-.388.538-.535l.137-.116H9.3c.129-.108.243-.203.353-.31.276-.265.426-.506.426-.851a.715.715 0 00-.302-.605A1.343 1.343 0 009 6c-.37 0-.61.091-.772.199zM9.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" fill="#5068E2"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 .75a8.25 8.25 0 100 16.5A8.25 8.25 0 009 .75zM1.875 9a7.125 7.125 0 1114.25 0 7.125 7.125 0 01-14.25 0z" fill="#5068E2"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="rar">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#67A270"></path>
        <path d="M4.42 11.7h1.404c.486 0 .84.12 1.062.36.228.24.342.6.342 1.08v.513c0 .696-.261 1.128-.783 1.296.528.156.792.594.792 1.314v.981c0 .348.042.6.126.756h-.711c-.078-.174-.117-.429-.117-.765v-.99c0-.342-.078-.582-.234-.72-.15-.144-.378-.216-.684-.216h-.495V18H4.42v-6.3zm.702 2.97h.522c.3 0 .522-.063.666-.189.15-.126.225-.351.225-.675v-.603c0-.576-.243-.864-.73-.864h-.683v2.331zm5.144 2.061H8.673L8.43 18h-.648l1.206-6.3h1.017L11.21 18h-.702l-.243-1.269zm-.81-4.239l-.693 3.636h1.404l-.711-3.636zm2.302-.792h1.404c.486 0 .84.12 1.062.36.228.24.342.6.342 1.08v.513c0 .696-.26 1.128-.783 1.296.528.156.792.594.792 1.314v.981c0 .348.042.6.126.756h-.71c-.079-.174-.118-.429-.118-.765v-.99c0-.342-.078-.582-.234-.72-.15-.144-.378-.216-.684-.216h-.495V18h-.702v-6.3zm.702 2.97h.522c.3 0 .522-.063.666-.189.15-.126.225-.351.225-.675v-.603c0-.576-.243-.864-.729-.864h-.684v2.331z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="svg">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#A58F44"></path>
        <path d="M4.87 12.051c.234-.276.582-.414 1.044-.414.462 0 .81.141 1.044.423.24.276.36.66.36 1.152v.171h-.666v-.207c0-.6-.24-.9-.72-.9s-.72.297-.72.891c0 .222.051.429.153.621.108.186.24.345.396.477.156.126.324.27.504.432.186.156.357.309.513.459.156.144.285.333.387.567.108.234.162.489.162.765 0 .492-.12.879-.36 1.161-.24.276-.594.414-1.062.414-.468 0-.822-.138-1.062-.414-.234-.282-.351-.669-.351-1.161v-.36h.657v.396c0 .6.246.9.738.9s.738-.3.738-.9c0-.192-.039-.369-.117-.531a1.569 1.569 0 00-.306-.432 4.063 4.063 0 00-.405-.369c-.15-.12-.3-.246-.45-.378a4.493 4.493 0 01-.414-.414 1.826 1.826 0 01-.297-.522 1.85 1.85 0 01-.117-.666c0-.498.117-.885.351-1.161zm2.88-.351h.712l1.026 5.481 1.017-5.481h.648L9.973 18H8.94l-1.19-6.3zm5.293-.063c.474 0 .828.141 1.062.423.24.282.36.669.36 1.161v.54h-.666v-.576c0-.606-.246-.909-.738-.909s-.738.303-.738.909v3.33c0 .606.246.909.738.909s.738-.303.738-.909v-1.26h-.648v-.63h1.314v1.854c0 .492-.12.879-.36 1.161-.234.282-.588.423-1.062.423-.468 0-.822-.141-1.062-.423-.234-.282-.351-.669-.351-1.161v-3.258c0-.492.117-.879.35-1.161.24-.282.595-.423 1.063-.423z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="txt">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#466F9F"></path>
        <path d="M6.255 18h-.702v-5.661H4.392V11.7h3.024v.639H6.255V18zm4.26 0L9.47 15.282 8.417 18h-.666l1.27-3.249-1.19-3.051h.73l.971 2.52.981-2.52h.657l-1.179 3.051L11.252 18h-.738zm2.92 0h-.701v-5.661h-1.161V11.7h3.024v.639h-1.161V18z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Vector">
        <path d="M6.09 6.09h5.82M6.09 9h5.82m5.024 2.908H11.91v5.026m-.301.066h-9.88A.727.727 0 011 16.273V1.727A.727.727 0 011.727 1h14.546a.727.727 0 01.727.727v9.88a.727.727 0 01-.213.515l-4.665 4.665a.727.727 0 01-.514.213z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.715" y1="13.96" x2="11.928" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" id="Vector-1">
        <path d="M3 3.007V1.875a.98.98 0 01.211-.619A.665.665 0 013.722 1h4.092c.156 0 .308.061.433.175l2.503 2.274a.644.644 0 00.434.175h6.258c.191 0 .375.092.51.256a.976.976 0 01.212.618v10.55a.921.921 0 01-.05.298.804.804 0 01-.138.252.65.65 0 01-.209.169.546.546 0 01-.245.059h-1.195m-.163-9.321v9.718a.868.868 0 01-.188.55.591.591 0 01-.454.227h-13.8a.665.665 0 01-.51-.256.976.976 0 01-.212-.619V3.881c0-.232.076-.454.211-.618a.665.665 0 01.511-.256h4.092c.156 0 .308.061.433.175L8.75 5.455a.644.644 0 00.434.175h6.258c.191 0 .375.092.51.257a.976.976 0 01.212.618z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.767" y1="13.96" x2="12.562" y2="17.791" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Vector-2">
        <path d="M7.348 1h-6.4v6.4h6.4V1z" stroke="url(#paint0_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M16.948 1h-6.4v6.4h6.4V1z" stroke="url(#paint1_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M7.348 10.6h-6.4V17h6.4v-6.4z" stroke="url(#paint2_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M16.948 10.6h-6.4V17h6.4v-6.4z" stroke="url(#paint3_linear)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <defs>
        <linearGradient id="paint0_linear" x1="1.663" y1="13.96" x2="11.876" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="1.663" y1="13.96" x2="11.876" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="1.663" y1="13.96" x2="11.876" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="1.663" y1="13.96" x2="11.876" y2="17.338" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5C72E8"></stop>
        <stop offset="1" stop-color="#5068E2"></stop>
        </linearGradient>
        </defs>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" id="next">
        <path d="M2 2.02l6 6-6 6" stroke="#5C72E8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" id="back">
        <path d="M8 2.02l-6 6 6 6" stroke="#5C72E8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" id="clear">
        <path d="M16.465 5.859a1 1 0 011.414 0l.303.303a1 1 0 010 1.414L7.576 18.183a1 1 0 01-1.414 0l-.303-.303a1 1 0 010-1.415L16.465 5.86z" fill="#373A4A"></path>
        <path d="M18.182 16.465a1 1 0 010 1.415l-.303.303a1 1 0 01-1.414 0L5.86 7.576a1 1 0 010-1.414l.303-.303a1 1 0 011.414 0l10.606 10.607z" fill="#373A4A"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="WarningCircle">
        <path d="M6 10.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-6.75v2.625" stroke="#5C72E8" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6 9.333A.667.667 0 106 8a.667.667 0 000 1.333z" fill="#5C72E8"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="what">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#C4C4C4"></path>
        <path d="M5.76 11.637c.474 0 .825.141 1.053.423.234.282.351.672.351 1.17 0 .282-.045.543-.135.783a2.285 2.285 0 01-.315.603l-.36.486c-.12.156-.225.333-.315.531a1.532 1.532 0 00-.126.621c0 .108.015.222.045.342h-.63a1.48 1.48 0 01-.045-.36c0-.306.06-.588.18-.846a2.73 2.73 0 01.405-.639c.15-.168.285-.387.405-.657.126-.276.19-.576.19-.9 0-.618-.24-.927-.72-.927s-.72.309-.72.927v.558h-.658v-.513c0-.498.114-.888.342-1.17.234-.288.585-.432 1.053-.432zm-.459 5.49h.666V18h-.666v-.873zm3.711-5.49c.474 0 .825.141 1.053.423.234.282.351.672.351 1.17 0 .282-.045.543-.135.783a2.285 2.285 0 01-.315.603l-.36.486c-.12.156-.225.333-.315.531a1.532 1.532 0 00-.126.621c0 .108.015.222.045.342h-.63a1.48 1.48 0 01-.045-.36c0-.306.06-.588.18-.846a2.73 2.73 0 01.405-.639c.15-.168.285-.387.405-.657.126-.276.189-.576.189-.9 0-.618-.24-.927-.72-.927s-.72.309-.72.927v.558h-.657v-.513c0-.498.114-.888.342-1.17.234-.288.585-.432 1.053-.432zm-.459 5.49h.666V18h-.666v-.873zm3.711-5.49c.474 0 .825.141 1.053.423.234.282.351.672.351 1.17 0 .282-.045.543-.135.783a2.285 2.285 0 01-.315.603l-.36.486c-.12.156-.225.333-.315.531a1.532 1.532 0 00-.126.621c0 .108.015.222.045.342h-.63a1.48 1.48 0 01-.045-.36c0-.306.06-.588.18-.846a2.73 2.73 0 01.405-.639c.15-.168.285-.387.405-.657.126-.276.189-.576.189-.9 0-.618-.24-.927-.72-.927s-.72.309-.72.927v.558h-.657v-.513c0-.498.114-.888.342-1.17.234-.288.585-.432 1.053-.432zm-.459 5.49h.666V18h-.666v-.873z" fill="#fff"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22" id="xls">
        <path d="M10 0a1 1 0 011 1v3a3 3 0 003 3h3a1 1 0 011 1v11a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3h7z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#3A3A3A"></path>
        <path d="M13.977.178C13.468-.036 13 .448 13 1v3a1 1 0 001 1h3c.552 0 1.036-.468.823-.977a1.88 1.88 0 00-.409-.609L14.586.586a1.88 1.88 0 00-.609-.408z" fill="#54EC5A"></path>
        <path d="M7.324 18L6.28 15.282 5.227 18h-.666l1.269-3.249L4.642 11.7h.729l.972 2.52.981-2.52h.657l-1.179 3.051L8.062 18h-.738zm3.803 0H8.625v-6.3h.702v5.661h1.8V18zm.81-5.949c.233-.276.581-.414 1.043-.414.462 0 .81.141 1.044.423.24.276.36.66.36 1.152v.171h-.666v-.207c0-.6-.24-.9-.72-.9s-.72.297-.72.891c0 .222.051.429.153.621.108.186.24.345.396.477.156.126.324.27.504.432.186.156.357.309.513.459.156.144.285.333.387.567.108.234.162.489.162.765 0 .492-.12.879-.36 1.161-.24.276-.594.414-1.062.414-.468 0-.822-.138-1.062-.414-.234-.282-.35-.669-.35-1.161v-.36h.656v.396c0 .6.246.9.738.9s.738-.3.738-.9c0-.192-.039-.369-.117-.531a1.569 1.569 0 00-.306-.432 4.063 4.063 0 00-.405-.369c-.15-.12-.3-.246-.45-.378A4.493 4.493 0 0112 14.4a1.826 1.826 0 01-.297-.522 1.85 1.85 0 01-.117-.666c0-.498.117-.885.351-1.161z" fill="#fff"></path>
        </symbol>
        <symbol width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="load">
        		<style>
        				@keyframes bounce{
        						0%{
        								transform: scale(0);
        						}
        						100%{
        								transform: scale(1);
        						}
        				}
        				.big,.middle,.little{transform-origin: center}
        				.big{
        						animation: .75s bounce infinite alternate ease;
        				}
        				.middle{
        						animation: .85s bounce infinite alternate ease;
        				}
        				.little{
        						animation: .95s bounce infinite alternate ease;
        				}
        		</style>
        <path class="big" d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#F79141" stroke-miterlimit="10"/>
        <path class='middle' d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#F79141" stroke-miterlimit="10"/>
        <path class='little' d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#F79141" stroke="#F79141" stroke-miterlimit="10"/>
        </symbol>
        
        </svg>
      </div>
      <core-foot></core-foot>
    </core>
    <script src="front/boot.js" type="module"></script>
  </body>
</html>