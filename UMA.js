// ==UserScript==
// @name           UMA
// @namespace      http://tampermonkey.net/
// @version        0.9
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

  function extract_style_obj(style_obj){
    var style = "";
    Object.keys(style_obj).forEach(function(key) {
      style += (key + ":" + style_obj[key] + ";");
    });

    return style;
  }

  function uma_element(index, uma_info){
    var style_obj = {
      height: "50px",
      width: "50px",
      top: "-"+index*52+"px",
      left: index*52+"px",
      border: "1px solid #000000",
      "background-color": background_color(uma_info.waku),
      color: character_color(uma_info.waku),
      "font-size": "10px"
    };

    var element = $( "<div>", {
      html: umaban_string(uma_info.umaban) + "<br>" + uma_info.umamei,
      "class": "umapanel",
      style: extract_style_obj(style_obj)
    });
    return element;
  }

  var uma_info_list = get_uma_info_list(get_uma_tr_list());
  if (uma_info_list.length > 0) {
    var subwindow = window.open("about:blank", "subwindow", "width=1000,height=300,scrollbars=yes");
    var $body = $(subwindow.document).find('body');
    $(uma_info_list).each(function(index){
      $body.append(uma_element(index, this));
    });
    $(subwindow.document).find('.umapanel').draggable();
  }
})(jQuery);