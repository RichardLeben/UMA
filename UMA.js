// ==UserScript==
// @name           UMA
// @namespace      http://tampermonkey.net/
// @version        0.7
// @description    try to take over the world!
// @author         You
// @match          http://jra.jp/JRADB/*
// @match          http://www.jra.go.jp/JRADB/*
// @resource style https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/smoothness/jquery-ui.css
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js
// @grant          none
// ==/UserScript==

(function($) {
  function background_color(waku){
    switch (waku[waku.length - 1]) {
      case "白":
        return "#ffffff";
      case "黒":
        return "#000000";
      case "赤":
        return "#ff0000";
      case "青":
        return "#0000ff";
      case "黄":
        return "#ffff00";
      case "緑":
        return "#008000";
      case "橙":
        return "#ffa500";
      case "桃":
        return "#ffc0cb";
      default:
        return "#ffffff";
    }
  }

  function character_color(waku){
    switch (waku[waku.length - 1]) {
      case "白":
        return "#000000";
      case "黒":
        return "#ffffff";
      case "赤":
        return "#ffffff";
      case "青":
        return "#ffffff";
      case "黄":
        return "#000000";
      case "緑":
        return "#ffffff";
      case "橙":
        return "#000000";
      case "桃":
        return "#000000";
      default:
        return "#000000";
    }
  }

  function umaban_string(umaban) {
    if (umaban.length > 0) {
      return umaban + "番:";
    } else {
      return "";
    }
  }

  function get_waku($uma_tr){
    var $umamel_elm, waku;
    $umamel_elm = $uma_tr.find(".iconWakuImage, .wakuImage");
    if ($umamel_elm.length > 0) {
      waku = $umamel_elm.attr("alt");
    } else {
      waku = "";
    }

    return waku;
  }

  function get_umaban($uma_tr){
    var $umamel_elm, umaban;
    $umamel_elm = $uma_tr.find(".umabanCol, .hNumber");
    if ($umamel_elm.length > 0) {
      umaban = $umamel_elm.text().trim();
    } else {
      umaban = "";
    }

    return umaban;
  }

  function get_umamei($uma_tr){
    var $umamel_elm, umamei;
    $umamel_elm = $uma_tr.find(".umameiCol, .umamei, .mokuyouUmamei");
    if ($umamel_elm.length > 0) {
      umamei = $umamel_elm.text().trim();
    } else {
      umamei = "";
    }

    return umamei;
  }

  function get_uma_info($uma_tr){
    var uma_info = {
      waku:   get_waku($uma_tr),
      umaban: get_umaban($uma_tr),
      umamei: get_umamei($uma_tr)
    };

    return uma_info;
  }

  function get_uma_info_list($uma_tr_list){
    var uma_info_list = [];
    $uma_tr_list.each(function(){
      uma_info_list.push(get_uma_info($(this)));
    });

    return uma_info_list;
  }

  function get_uma_tr_list(){
    var $uma_tr_list = $(".mainList tr").filter(function(){ return $(this).children("td.umaKihon").length > 0; });
    if ($uma_tr_list.length == 0) {
      $uma_tr_list = $(".mainList tr").filter(function(){ return $(this).children("td.umameiCol").length > 0; });
    }

    return $uma_tr_list;
  }

  var uma_info_list = get_uma_info_list(get_uma_tr_list());
  if (uma_info_list.length > 0) {
    $('body').append('<div class="umapanel parent" style="height:200px; width:1000px; position:absolute; top:200px; left:200px; border:1px solid #000000; background-color: #ffffff;">馬パネル<div>');
    $(uma_info_list).each(function(index){
        console.log(this);
        $('.parent').append('<div class="umapanel" style="height:50px; width:50px; top:-'+ index*52 +'px; left:'+ index*52 +'px; border:1px solid #000000; background-color:'+ background_color(this.waku) +'; color:'+ character_color(this.waku) +';">'+ umaban_string(this.umaban) + this.umamei +'<div>');
    });
    $('.umapanel').draggable();
  }
})(jQuery);