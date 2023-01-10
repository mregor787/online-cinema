document.addEventListener('DOMContentLoaded', kinoplayer_run);
var stopPostKinoplayertop = false,
    selKinoplayertop = '',
	stopRunKinoplayertop = false;
function kinoplayer_run() {
    var a = document.querySelectorAll('[data-click-kinoplayer]');
    if (a && a.length) {
        for (var i in a) {
            if (a.hasOwnProperty(i) && a[i]) {
                a[i].addEventListener('click', function() {
					deUpdateStopPostKinoplayertop();
					runKinoplayertop(this.getAttribute('data-click-kinoplayer'));
				});
            }
        }
    }
    else {
        runKinoplayertop();
    }
}

function isVisibilityKinopPlayerTop (el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
     ((rect.top + el.clientHeight) > 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || 
	 (rect.bottom > 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) 
	     );
}


function onVisibilityKinopPlayerTop(el, callback) {
	var visible_marcer = true;
	return function () {
       var visible = isVisibilityKinopPlayerTop(el);
        if (visible && visible_marcer) {
            visible_marcer = false;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}
 
function ifVisibilityKinopPlayerTop(el){
 var httpGetServ = onVisibilityKinopPlayerTop(el, function() {
   getResponseKinoplayertop(true,el);
 });
     httpGetServ();
  if (window.addEventListener) {
    //addEventListener('DOMContentLoaded', httpGetServ, false); 
    addEventListener('click', httpGetServ, false); 
    addEventListener('scroll', httpGetServ, false); 
    addEventListener('resize', httpGetServ, false);	
  } else if (window.attachEvent)  {
    //attachEvent('onDOMContentLoaded', httpGetServ); // IE9+ :(
    attachEvent('onclick', httpGetServ);
    attachEvent('onscroll', httpGetServ);
    attachEvent('onresize', httpGetServ);
  }
}

function showHideKinoplayertopLoading(command='show'){
	var kinoplayertopLoading = document.querySelector('#kinoplayertop-loading');
    var kinoplayertopIframe = document.querySelector('#kinoplayertop-iframe');
	var kinoplayertopButtons = document.querySelector('#kinoplayertop-buttons');
	if (!kinoplayertopLoading || !kinoplayertopIframe || !kinoplayertopButtons) {
      return false;
    }
	if(command == 'show'){
	 if(kinoplayertopLoading.style.display !== 'block'){
	  kinoplayertopLoading.style.display = 'block';
     }
	 if(kinoplayertopIframe.style.display !== 'none'){
	  kinoplayertopIframe.style.display = 'none';
	 }	 
	}else if(command == 'hide'){
	 if(kinoplayertopLoading.style.display !== 'none'){
	  kinoplayertopLoading.style.display = 'none';
     }	 
	 if(kinoplayertopIframe.style.display !== 'block'){
	  kinoplayertopIframe.style.display = 'block';
	 }
	}else{
	  return false;
	}
	 if(kinoplayertopButtons.style.display !== 'none'){
	  kinoplayertopButtons.style.display = 'none';
     }	 
	return true;
} 

function showErrorButtonKinoplayertop(){
	var kinoplayertopLoading = document.querySelector('#kinoplayertop-loading');
    var kinoplayertopIframe = document.querySelector('#kinoplayertop-iframe');
	var kinoplayertopButtons = document.querySelector('#kinoplayertop-buttons');
	if (!kinoplayertopLoading || !kinoplayertopIframe || !kinoplayertopButtons) {
      return false;
    }
	setTimeout(function () {
     kinoplayertopLoading.style.display = 'none';
     kinoplayertopIframe.style.display = 'none';
     kinoplayertopButtons.style.display = 'block';
	},1000);	 
	  return true;

} 

function getOptionsKinoplayertop(kinoplayertop) {
	var options ={};
    if (kinoplayertop){
	 options = [].slice.call(kinoplayertop.attributes).reduce(function (o, a) {
        return /^data-/.test(a.name) && (o[a.name.substr(5)] = a.value), o;
     }, {});
	}
	return options;
}

function getDataKinoplayertop(el) {
	var options = getOptionsKinoplayertop(el),p = '';
	for (var data in options) {
        if (options.hasOwnProperty(data)) {
            p += (p)
                ? '&' + data + '=' + encodeURIComponent(options[data])
                : data + '=' + encodeURIComponent(options[data]);
        }
        else {
            options[data] = '';
        }
    }
	return p;
}

function runKinoplayertop(sel) {
    if(stopRunKinoplayertop){
	   return false;	
	}
	 updateStopRunKinoplayertop();
	setTimeout(function () {
     deUpdateStopRunKinoplayertop();
	},1000);	
	
	var i, e, l, b, s, date = new Date();
    
    var kinoplayertop = document.querySelector('#' + ((sel) ? sel : 'kinoplayertop'));
	if (!kinoplayertop) {
       return false;
    }
	    kinoplayertop.setAttribute('class', '');
		kinoplayertop.setAttribute('style','');
	if (selKinoplayertop && selKinoplayertop !== kinoplayertop) {
		  selKinoplayertop.setAttribute('class', '');
		  selKinoplayertop.setAttribute('style','display: none;');
	}
	    selKinoplayertop = kinoplayertop;
	
    var options = getOptionsKinoplayertop(kinoplayertop);

    var bg = (options.bg && options.bg.replace(/[^0-9a-z]/ig, ''))
        ? options.bg.replace(/[^0-9a-z]/ig, '')
        : '2196f3';
        
	var ratio = (typeof options.ratio === 'undefined' ? '16by9' : options.ratio);
    var classname = ((typeof options.classname === 'undefined' || options.classname.trim() === '') ? false : options.classname);	
    var ratio_arr = new Map([['21by9', '42.85'], ['16by9','56.25'], ['4by3','75'], ['1by1','100']]);	  
	
	if(classname){
		kinoplayertop.setAttribute('class', classname);
	}else{
		kinoplayertop.setAttribute('style','position: relative !important; display: block !important; width: 100% !important; min-width: 240px !important; padding-top: ' + (ratio_arr.has(ratio) ? ratio_arr.get(ratio) : '56.25') + '% !important; padding-bottom: 0px !important; overflow: hidden !important; background: #' + bg + ' !important;');	
	}
	
    var kinoplayertop_loading = document.querySelector('#kinoplayertop-loading');
    if (kinoplayertop_loading) {
        kinoplayertop_loading.parentNode.removeChild(kinoplayertop_loading);
    }
    var kinoplayertop_buttons = document.querySelector('#kinoplayertop-buttons');
    if (kinoplayertop_buttons) {
        kinoplayertop_buttons.parentNode.removeChild(kinoplayertop_buttons);
    }
    var kinoplayertop_iframe = document.querySelector('#kinoplayertop-iframe');
    if (kinoplayertop_iframe) {
        kinoplayertop_iframe.parentNode.removeChild(kinoplayertop_iframe);
    }
    
    l = document.createElement('div');
    l.setAttribute('id', 'kinoplayertop-loading');
    l.setAttribute('style','position:absolute;left:0;top:0;width:100%;height:100%;background:#' + bg + ';background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTExLjcwOCw0OUE1MC4xMTYsNTAuMTE2LDAsMCwwLDc5LDE2LjI5MlYxLjc4NUE2NC4wNzYsNjQuMDc2LDAsMCwxLDEyNi4yMTUsNDlIMTExLjcwOFpNNDksMTYuMjkyQTUwLjExNCw1MC4xMTQsMCwwLDAsMTYuMjkyLDQ5SDEuNzg1QTY0LjA3NSw2NC4wNzUsMCwwLDEsNDksMS43ODVWMTYuMjkyWk0xNi4yOTIsNzlBNTAuMTE2LDUwLjExNiwwLDAsMCw0OSwxMTEuNzA4djE0LjUwN0E2NC4wNzYsNjQuMDc2LDAsMCwxLDEuNzg1LDc5SDE2LjI5MlpNNzksMTExLjcwOEE1MC4xMTgsNTAuMTE4LDAsMCwwLDExMS43MDgsNzloMTQuNTA3QTY0LjA3OCw2NC4wNzgsMCwwLDEsNzksMTI2LjIxNVYxMTEuNzA4WiI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgNjQgNjQiIHRvPSItOTAgNjQgNjQiIGR1cj0iMTAwMG1zIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvcGF0aD4KICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNOTYuOTcxLDUzLjYzM2EzNC42MzQsMzQuNjM0LDAsMCwwLTIyLjYtMjIuNlYyMUE0NC4yODMsNDQuMjgzLDAsMCwxLDEwNyw1My42MzNIOTYuOTcxWm0tNDMuMzM4LTIyLjZhMzQuNjM0LDM0LjYzNCwwLDAsMC0yMi42LDIyLjZIMjFBNDQuMjgzLDQ0LjI4MywwLDAsMSw1My42MzMsMjFWMzEuMDI5Wm0tMjIuNiw0My4zMzhhMzQuNjM0LDM0LjYzNCwwLDAsMCwyMi42LDIyLjZWMTA3QTQ0LjI4Myw0NC4yODMsMCwwLDEsMjEsNzQuMzY3SDMxLjAyOVptNDMuMzM4LDIyLjZhMzQuNjM0LDM0LjYzNCwwLDAsMCwyMi42LTIyLjZIMTA3QTQ0LjI4Myw0NC4yODMsMCwwLDEsNzQuMzY3LDEwN1Y5Ni45NzFaIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA2NCA2NCIgdG89IjkwIDY0IDY0IiBkdXI9IjEwMDBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L3BhdGg+CiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTg1LjQ3LDU3LjI1QTIyLjU1MiwyMi41NTIsMCwwLDAsNzAuNzUsNDIuNTNWMzZBMjguODM2LDI4LjgzNiwwLDAsMSw5Miw1Ny4yNUg4NS40N1pNNTcuMjUsNDIuNTNBMjIuNTUyLDIyLjU1MiwwLDAsMCw0Mi41Myw1Ny4yNUgzNkEyOC44MzYsMjguODM2LDAsMCwxLDU3LjI1LDM2VjQyLjUzWk00Mi41Myw3MC43NUEyMi41NTIsMjIuNTUyLDAsMCwwLDU3LjI1LDg1LjQ3VjkyQTI4LjgzNiwyOC44MzYsMCwwLDEsMzYsNzAuNzVINDIuNTNaTTcwLjc1LDg1LjQ3QTIyLjU1MiwyMi41NTIsMCwwLDAsODUuNDcsNzAuNzVIOTJBMjguODM2LDI4LjgzNiwwLDAsMSw3MC43NSw5MlY4NS40N1oiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDY0IDY0IiB0bz0iLTkwIDY0IDY0IiBkdXI9IjEwMDBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L3BhdGg+PC9zdmc+);background-repeat:no-repeat;background-position: center center;');
	kinoplayertop.innerHTML = '';
	kinoplayertop.appendChild(l);

    b = document.createElement('div');
    b.setAttribute('id', 'kinoplayertop-buttons');
	b.setAttribute('style','display: none;z-index:9999;position:absolute;left:0;top:0;width:100%;height:100%;background-color: #fc1100;background-image:linear-gradient( 20deg, #fa1100 0%, #' + bg + ' 100%);');
    kinoplayertop.appendChild(b);
    
	e = document.createElement('div');
    e.setAttribute('class', 'alert-danger-kinoplayertop');
	e.setAttribute('style','cursor:pointer;color:#721c24;background-color:#f8d7da;border-color:#f5c6cb;font-size:1.9vw;position:absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);padding: 0.75rem 1.25rem;margin-bottom: 1rem;border: 1px solid transparent;border-radius: 0.25rem;');
    e.innerHTML = 'Ошибка загрузки плеера! Повторить?';
	e.onclick = function() { getResponseKinoplayertop(false,kinoplayertop); };
	b.appendChild(e);

    i = document.createElement('iframe');
    i.setAttribute('id', 'kinoplayertop-iframe');
    i.setAttribute('frameborder', '0');
	i.setAttribute('scrolling', 'no');
    i.setAttribute('allow', 'fullscreen');
	//i.setAttribute('allowfullscreen', 'allowfullscreen');
	if(!classname){ 
	i.setAttribute('style','position: absolute !important; top: 0 !important; bottom: 0 !important; left: 0 !important; right: 0!important; width: 100% !important; height: 100% !important; border: 0 !important; background: #000000;');
	}
    i.onload = function() { showHideKinoplayertopLoading('hide') }; 
	kinoplayertop.appendChild(i);
    
	ifVisibilityKinopPlayerTop(kinoplayertop);
    showHideKinoplayertopLoading('show');
}

function updateStopPostKinoplayertop() {
    stopPostKinoplayertop = true; 	
}
function deUpdateStopPostKinoplayertop() {
    stopPostKinoplayertop = false;	
}
function updateStopRunKinoplayertop() {
   stopRunKinoplayertop = true; 
}
function deUpdateStopRunKinoplayertop() { 
   stopRunKinoplayertop = false; 
}

function getResponseKinoplayertop(post=true,el='') {
	var kinoplayertopIframe = document.querySelector('#kinoplayertop-iframe');	 
	 if(!kinoplayertopIframe || !el){
		return false; 
	 }
	showHideKinoplayertopLoading('show');
     if(stopPostKinoplayertop && post){
		showErrorButtonKinoplayertop();
		return false; 
	 }else if(post){
      updateStopPostKinoplayertop(); 
     }
	
	httpGetAsyncKinoplayertop(window.location.protocol + '//kinoplayer.online', getDataKinoplayertop(el), function (players) {
	
	if (typeof players.iframe === 'undefined' || !players.iframe.trim()) {
		showErrorButtonKinoplayertop();
		showHideKinoplayertopLoading('hide');
		return false;
	}

	kinoplayertopIframe.setAttribute('src', players.iframe.trim());
	setTimeout(function () {
      showHideKinoplayertopLoading('hide');
      },5000);
	 });
}

function httpGetAsyncKinoplayertop(url, body, callback) {
	console.log('Kinoplayer: Get Watch'); 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(tryParseJSONKinoplayertop(xmlHttp.responseText));
        }else if(xmlHttp.readyState === 4 && xmlHttp.status !== 200){
			showErrorButtonKinoplayertop();
		}
    };
    xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(body);
}

function tryParseJSONKinoplayertop(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return {};
}