// ==UserScript==
// @name           UMA
// @namespace      http://tampermonkey.net/
// @version        0.5
// @description    try to take over the world!
// @author         You
// @match          http://jra.jp/JRADB/*
// @match          http://www.jra.go.jp/JRADB/*
// @resource style https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/smoothness/jquery-ui.css
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js
// @grant          none
// ==/UserScript==

(function($) {
  var $uma_tr = $(".mainList tr").filter(function(){ return $(this).children("td.umaKihon").length > 0; });
  var umamei_list = $uma_tr.find(".umameiCol").map(function(){ return this.innerText;});
  if (umamei_list.length == 0) {
    umamei_list =  $uma_tr.find(".umamei").map(function(){ return this.innerText;});
    if (umamei_list.length == 0) {
      umamei_list =  $uma_tr.find(".mokuyouUmamei").map(function(){ return this.innerText;});
    }
  }
  if (umamei_list.length == 0) {
    $uma_tr = $(".mainList tr").filter(function(){ return $(this).children("td.umameiCol").length > 0; });
    umamei_list = $uma_tr.find(".umameiCol").map(function(){ return this.innerText;});
    if (umamei_list.length == 0) {
      umamei_list =  $uma_tr.find(".umamei").map(function(){ return this.innerText;});
      if (umamei_list.length == 0) {
        umamei_list =  $uma_tr.find(".mokuyouUmamei").map(function(){ return this.innerText;});
      }
    }
  }
  if (umamei_list.length > 0) {
    $('body').append('<div class="umapanel parent" style="height:200px; width:1000px; position:absolute; top:200px; left:200px; border:1px solid #000000; background-color: #ffffff">馬パネル<div>');
    umamei_list.each(function(index){
        $('.parent').append('<div class="umapanel" style="height:50px; width:50px; border:1px solid #000000; top:-'+ index*52 +'px; left:'+ index*52 +'px;">'+ this +'<div>');
    });
    $('.umapanel').draggable();
  }
})(jQuery);