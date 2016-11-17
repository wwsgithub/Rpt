/* 31,462,132 2013-07-30 15:37:41 */

/******** Sales dept. begin ********/
function SinaDotAdJs(){
//-------------------------------

var pthis = this;
//浏览器判断
this.isIE=navigator.userAgent.indexOf("MSIE")==-1?false:true;
this.isOPER=navigator.userAgent.indexOf("Opera")==-1?false:true;
this.version=navigator.appVersion.split(";"); 
this.isIE6= !window.XMLHttpRequest;
this.isXHTML = document.compatMode=="CSS1Compat"?true:false;

//获取body
this.bdy = (document.documentElement && document.documentElement.clientWidth)?document.documentElement:document.body;

//获取对象
this.$ = function(id){if(document.getElementById){return eval('document.getElementById("'+id+'")')}else{return eval('document.all.'+id)}};

//获取cookie
this.getAdCookie = function(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N)return unescape(d[1]);}
	return "";
};

//设置cookie
this.setAdCookie = function(N,V,Q,D){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
    var tmpdomain = "";
	if(typeof(D)!="undefined"){if(D){tmpdomain="domain=sina.com.cn;";}}
	document.cookie=N+"="+escape(V)+";path=/;"+tmpdomain+"expires="+z.toGMTString()+";";
};

//日期判断函数
this.compareDate = function(type,d){
  try{
        var dateArr = d.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
		var now = new Date();
        var nowTime = now.getTime();
		var checkTime = checkDate.getTime();
		if(type=="after"){          
		  if(nowTime >= checkTime){return true;}
		  else{return false;}
		}		
        else if(type=="before"){
          if(nowTime <= checkTime){return true;}
		  else{return false;}
		}
  }catch(e){return false;}
}

//获取时间对象
this.strToDateFormat = function(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],arys[3],0,0);
	if(ext){newDate = new Date(newDate.getTime()+1000*60*60*24);}
	return newDate;
 }

//时间区间检查
this.checkTime = function(begin,end){
  var td = new Date();
  var flag = (td>=pthis.strToDateFormat(begin,false) && td<pthis.strToDateFormat(end,begin==end?true:false))?true:false;
  return flag;
}

//外部事件加载
this.addEvent = function(obj,event,func){
  var MSIE=navigator.userAgent.indexOf("MSIE");
  var OPER=navigator.userAgent.indexOf("Opera");
  if(document.all && MSIE!=-1 && OPER==-1){
    obj.attachEvent("on"+event,func);
  }else{
    obj.addEventListener(event,func,false);
  }
};

//PNG透明函数
this.correctPNG = function(){ 
    var arVersion = navigator.appVersion.split("MSIE");
    var vs = parseFloat(arVersion[1]);
    if ((vs >= 5.5) && (document.body.filters)){ 
       for(var j=0; j<document.images.length; j++){ 
          var img = document.images[j];
          var imgName = img.src.toUpperCase(); 
          if (imgName.substring(imgName.length-3, imgName.length) == "PNG"){ 
             var imgID = (img.id) ? "id='" + img.id + "' " : "";
             var imgClass = (img.className) ? "class='" + img.className + "' " : "";
             var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
             var imgStyle = "display:inline-block;" + img.style.cssText;
             if (img.align == "left"){imgStyle = "float:left;" + imgStyle}
             if (img.align == "right"){imgStyle = "float:right;" + imgStyle}
             if (img.parentElement.href){imgStyle = "cursor:hand;" + imgStyle}
             var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
             img.outerHTML = strNewHTML;
             j = j-1;
          } 
       } 
    }     
};

//容器对象
this.initWrap = function(mod,id,v,w,h,po,l,r,t,b,z,m,p,bg,dsp){
  var lst='';
  if(mod == 0x01){lst += 'pthis.'+v+' = document.createElement("'+id+'");';}
  else if(mod == 0x02){lst += 'pthis.'+v+' = document.getElementById("'+id+'");';}
  else return;
  if(v!="" && mod == 0x01){lst+=v+'.id = "'+v+'";';}
  if(w!=""){lst+=v+'.style.width = '+w+' + "px";';}
  if(h!=""){lst+=v+'.style.height = '+h+' + "px";';}
  if(po!=""){
	  lst+=v+'.style.position = "'+po+'";';

      if(l!=""){lst+=v+'.style.left = '+l+' + "px";';}
      else if(l=="" && r!=""){lst+=v+'.style.right = '+r+' + "px";';}
	  if(t!=""){lst+=v+'.style.top = '+t+' + "px";';}
      else if(t=="" && b!=""){lst+=v+'.style.bottom = '+b+' + "px";';}
	  if(z!=""){lst+=v+'.style.zIndex = "'+z+'";';}
  }
  if(bg!=""){lst+=v+'.style.background = "'+bg+'";';}
  if(m!=""){lst+=v+'.style.margin = "'+m+'";';}
  if(p!=""){lst+=v+'.style.padding = "'+p+'";';}
  if(dsp!=""){lst+=v+'.style.display = "'+dsp+'";';}
  return lst;
};

//素材对象
this.initObj = function(id,s,u,w,h){
  var lst = s.substring(s.length-3).toLowerCase();
  switch(lst){
	 case "tml":
	 case "htm":
	 case "php":var to = document.createElement("iframe");
                     to.id=id;
	                 to.width=w;
	                 to.height=h;
                     to.src=s;
                     to.frameBorder = 0;
					 to.allowTransparency = "true";
                     to.scrolling = "no";
                     to.marginheight = 0;
                     to.marginwidth = 0;
					 break;
	 case "swf": var to = document.createElement("div");
					 var fo = new sinaFlash( s, id, w, h, "7", "", false, "High");
	                 fo.addParam("wmode", "transparent");
	                 fo.addParam("allowScriptAccess", "always");
	                 fo.addParam("menu", "false");
	                 fo.write(to);
				     break;
     case "jpg":
     case "gif":
	 case "png":if(u!=""){
		             var to = document.createElement("a");
					 to.href = u;
					 to.target = "_blank";
					 var io = new Image();
	                 io.id = id;
					 io.style.width = w+"px";
					 io.style.height = h+"px";
					 io.style.border = "none";
					 io.src = s;
					 to.appendChild(io);
				}else{
				     var to = new Image();
	                 to.id = id;
					 to.style.width = w+"px";
					 to.style.height = h+"px";
					 to.style.border = "none";
					 to.style.cursor = "pointer";
					 to.src = s;	 
				}
				     break;
	     default:var to = document.createElement("a");
		             to.id = id;
					 to.href = u;
					 to.target = "_blank";
                     to.innerText = s;
  }
  return to;
};

//-------------------------------
};
/* http://d2.sina.com.cn/d1images/common/SinaDotTop.js ingore */
/* http://d2.sina.com.cn/d1images/button/rotator.js begin */
/*
RotatorAD V3.9.4 2013-07-30
Author: Dakular <shuhu at staff.sina.com.cn>
Editor: zhouyi <zhouyi3 at staff.sina.com.cn>
        lingchen <lingchen at staff.sina.com.cn>
格式: new RotatorAD(商业广告数组, 非商业广告数组, 层id)
说明: 第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时，从非商业广告中补充
      限制最少轮播数量，广告少于限制数时，才从垫底里补充，否则不补垫底
*/
if (typeof (RotatorAD) != 'function') {
    var RotatorAD = function (rad, nad, div_id) {

        var date = new Date();
        var id = 0;
        var max = 99;
        var url = document.location.href;
		var curId;

        /*2012-10-26 coding about cookiename begin*/
        //var cookiename = 'SinaRot'+escape(url.substr(url.indexOf('/',7),2)+url.substring(url.lastIndexOf('/')));
        var urlStr = url.substring(7);
        var urlArr = []
        if (urlStr.indexOf('?') != -1) {
            urlStr = urlStr.substring(0, urlStr.indexOf('?'));
            urlArr = urlStr.split('/');
        } else {
            urlArr = urlStr.split('/');
        }
        var cookiename = null;
        var urlArrLen = urlArr.length;
        var nameStr1 = urlArr[0].substring(0, urlArr[0].indexOf('.'));
        var nameStr2 = '';
        var nameStr3 = '';
        if (urlArrLen > 1) {
            nameStr2 = '/' + urlStr.substring(urlStr.indexOf('/') + 1, urlStr.lastIndexOf('/'));
            if (urlStr.substring(urlStr.lastIndexOf('/')).indexOf('.') != -1) {
                nameStr3 = '/zw';
            } else {
                nameStr3 = '/' + urlStr.substring(urlStr.lastIndexOf('/') + 1)
            }
        }
        cookiename = String('SinaRot/' + nameStr1 + nameStr2 + nameStr3).replace(/\//g,"_"); /*2012-10-26 coding about cookiename end*/
        var timeout = 1440; //24h
        var w = rad.width;
        var h = rad.height;
        var bnum = rad.num;
        var num = rad.num;
        var num2 = rad.num2;
        var marginType = (typeof (rad.mtype) == "undefined") ? 0 : rad.mtype;
        var ary = new Array();
        //过滤无效商广
        for (var i = 0; i < rad.length; i++) {
            var start = strToDate(rad[i][2].replace('<startdate>', '').replace('</startdate>', ''));
            var end = strToDate(rad[i][3].replace('<enddate>', '').replace('</enddate>', ''), true);
            //增加移动设备过滤 coding by lingchen
            var ua = navigator.userAgent.toLowerCase();
            var IOS = /\((iPhone|iPad|iPod)/i.test(ua);
            var ary_type = rad[i][0].substring(rad[i][0].length - 3).toLowerCase();
            if (date > start && date < end) {
                if (IOS) {
                    if (ary_type != 'swf') {
                        ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5] ? rad[i][5] : '0', rad[i][6] ? rad[i][6] : '']);
                    }
                } else {
                    ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5] ? rad[i][5] : '0', rad[i][6] ? rad[i][6] : '']);
                }
            }
        }

        //标记商广为空 acelan
        var nullRad = ary.length - 1;

        //过滤无效垫底
        var vnad = new Array();
        for (var i = 0; i < nad.length; i++) {
            if (nad[i][2] == null || nad[i][2] == '') {
                vnad.push([nad[i][0], nad[i][1], '', '0', nad[i][6]]);
            } else {
                var start = strToDate(nad[i][2].replace('<startdate>', '').replace('</startdate>', ''));
                var end = strToDate(nad[i][3].replace('<enddate>', '').replace('</enddate>', ''), true);
                if (date > start && date < end) {
                    vnad.push([nad[i][0], nad[i][1], '', '0', nad[i][6]]);
                }
            }
        }
        //补位
        var nn = 0;
        if (vnad.length > 0 && (num2 == null || ary.length < num2)) {
            for (var i = 0; i < (num2 == null ? rad.num : num2); i++) {
                if (i > ary.length - 1) {
                    ary.push([vnad[nn][0], vnad[nn][1], '', '0', vnad[nn][6]]);
                    if (++nn > nad.length - 1) nn = 0;
                }
            }
        }
        //num = ary.length<num?ary.length:num;
        //排序(同步有序号的广告)
        ary.sort(function (x, y) {
            return x[3] - y[3];
        });

		//使用localStorage和userData存储轮播数
		var localData = {
			hname:location.hostname?location.hostname:'localStatus',
			isLocalStorage:window.localStorage?true:false,
			dataDom:null,

			initDom:function(){ //初始化userData
				if(!this.dataDom){
					try{
						this.dataDom = document.createElement('input');
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');
						document.body.insertBefore(this.dataDom, document.body.firstChild);
					}catch(ex){
						return false;
					}
				}
				return true;
			},
			set:function(config){
				if(this.isLocalStorage){
					window.localStorage.setItem(config.key,config.value);
					if(config.expires) {
						var expires;
						if (typeof config.expires == 'number') {
							expires = new Date();
							expires.setTime(expires.getTime() + config.expires * 60000);
						}
						window.localStorage.setItem(config.key + ".expires",expires);
					}
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.setAttribute(config.key,config.value);
						this.dataDom.save(this.hname);
						if(config.expires) {
							var expires;
							if (typeof config.expires == 'number') {
								expires = new Date();
								expires.setTime(expires.getTime() + config.expires * 60000);
							}
							this.dataDom.expires = expires.toUTCString();//设定过期时间
						}

					}
				}
			},
			get:function(config){
				if(this.isLocalStorage){
					var result = window.localStorage.getItem(config.key);
					//过期时间判断，如果过期了，则移除该项
					if(result) {
						var expires = window.localStorage.getItem(config.key + ".expires");
						result = {
							value : result,
							expires : expires ? new Date(expires) : null
						};
						if(result && result.expires && result.expires < new Date()) {
							result = null;
							window.localStorage.removeItem(config.key);
						}else{
							return result.value;
						}
					}
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						var result = this.dataDom.getAttribute(config.key);
						if(result) {
							var expires = this.dataDom.expires;
							result = {
								value : result,
								expires : expires ? new Date(expires) : null
							};
							if(result && result.expires && result.expires < new Date()) {
								result = null;
								this.remove(config);
							}else{
								return result.value;

							}
						}
					}
				}
			},
			remove:function(config){
				if(this.isLocalStorage){
					localStorage.removeItem(config.key);
				}else{
					if(this.initDom()){
						this.dataDom.load(this.hname);
						this.dataDom.removeAttribute(config.key);
						//强制使其过期
						var expires = new Date();
						expires.setTime(expires.getTime() - 1);
						this.dataDom.expires = expires.toUTCString();
						this.dataDom.save(this.hname);
					}
				}
			}
		}

        if (typeof (globalRotatorId) == 'undefined' || globalRotatorId == null || isNaN(globalRotatorId)) {
            //curId = G(cookiename);
			curId = localData.get({key:cookiename});
            curId = (curId == '' || typeof curId=='undefined') ? Math.floor(Math.random() * max) : ++curId;
            if (curId > max || curId == null || isNaN(curId)) curId = 0;
            //S(cookiename, curId, timeout);
			localData.set({key:cookiename,value:curId,expires:timeout});
            globalRotatorId = curId;
        }

		//取id
        id = globalRotatorId % num;
		//document.title = '随机数：'+globalRotatorId+' | 轮数：'+id+' ';
        //若商广为空
        //nullRad = true;
        if ((typeof _ssp_ad != 'undefined') && (id > nullRad)) {
            _ssp_ad.load(div_id, showAD, w, h);
        } else {
            showAD();
        }

        function trackerMonitor(string, dom) {
            dom.setAttribute("digger", string);
            dom.setAttribute("enter", '');
            var alink = dom.getElementsByTagName("a");
            var alength = alink.length;
            while(alength--) {
                alink[alength].setAttribute("clk", '');
            }
			try{
				Tracker(string);
			}catch(e){

			}
        }
        //Show AD by acelan

        function showAD() {
            if (ary.length == 0) return; //如果没有广告则不显示
            var n = id;
            try {
                if (typeof (ary[n][0]) == "undefined" || ary[n][0] == "") return;
                var type = ary[n][0].substring(ary[n][0].length - 3).toLowerCase();
                var od = document.getElementById(div_id);
                if (od && marginType == 1) {
                    od.style.marginTop = 8 + "px";
                }
                if (od && marginType == 2) {
                    od.style.marginBottom = 8 + "px";
                }
                if (od && marginType == 3) {
                    od.style.marginTop = 8 + "px";
                    od.style.marginBottom = 8 + "px";
                }
                //将轮播序号返回到页面上
                if (ary[n][3] != null || ary[n][3] != 'undefined') {
                    if (!document.getElementById('rotatorAD_id')) {
                        var rotatorAD_id = document.createElement('input');
                        rotatorAD_id.id = 'rotatorAD_id';
                        rotatorAD_id.type = 'hidden';
                        rotatorAD_id.value = ary[n][3];
                        document.body.insertBefore(rotatorAD_id, document.body.firstChild);
                    } else {
                        document.getElementById('rotatorAD_id').value = ary[n][3];
                    }
                }
                //添加监测
                if (ary[n][4] != null || ary[n][4] != '') {
                    monitor(ary[n][4]);
                }
            } catch(e) {
                return;
            }

            if (type == 'swf') {
                var of = new sinaFlash(ary[n][0], div_id + '_swf', w, h, "7", "", false, "High");
                of.addParam("wmode", "opaque");
                of.addParam("allowScriptAccess", "always");
                of.addVariable("adlink", escape(ary[n][1]));
                if (ary[n][2] != "" && ary[n][2] != null) {
                    of.addVariable("_did", ary[n][2]);
                }
                of.write(div_id);
                (function () {
                    var url = ary[n][1];
                    if (url) {
                        var el = document.createElement('a'),
                            flashEl = document.getElementById(div_id);
                        flashEl.style.position = "relative";
                        el.setAttribute("href", url);
                        el.setAttribute("target", "_blank");
                        el.style.cssText += ";display:block;width:" + w + "px;height:" + h + "px;position:absolute;left:0px;top:0px;filter:alpha(opacity:0)";
                        if (el.style.filter) {
                            el.style.backgroundColor = "white";
                        }
                        flashEl.appendChild(el);
                    }
                })();
            } else if (type == 'jpg' || type == 'gif' || type == 'png') {
                if (ary[n][2] != "" && ary[n][2] != null) {
                    od.innerHTML = '<a href="' + ary[n][1] + '" target="_blank" onclick="try{_S_acTrack(' + ary[n][2] + ');}catch(e){}"><img src="' + ary[n][0] + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                } else {
                    od.innerHTML = '<a href="' + ary[n][1] + '" target="_blank"><img src="' + ary[n][0] + '" border="0" width="' + w + '" height="' + h + '" /></a>';
                }
            } else if (type == 'htm' || type == 'tml') {
                od.innerHTML = '<iframe id="ifm_' + div_id + '" frameborder="0" scrolling="no" width="' + w + '" height="' + h + '"></iframe>';
                document.getElementById('ifm_' + div_id).src = ary[n][0];
            } else if (type == '.js') { //js
                //document.write('<script language="javascript" type="text/javascript" src="'+ary[n][0]+'"></scr'+'ipt>');
                var jsurl = ary[n][0];
                var adScript = document.createElement('script');
                adScript.src = jsurl;
                document.getElementsByTagName('head')[0].appendChild(adScript);
            } else { //textlink
                if (ary[n][2] != "" && ary[n][2] != null) {
                    document.write('<a href="' + ary[n][1] + '" onclick="try{_S_acTrack(' + ary[n][2] + ');}catch(e){}"  target="_blank">' + ary[n][0] + '</a>');
                } else {
                    document.write('<a href="' + ary[n][1] + '"  target="_blank">' + ary[n][0] + '</a>');
                }
            }
            if (type != 'tml') {
                if (ary[n][3] && ary[n][3] != 0) {
                    trackerMonitor(ary[n][3], od);
                }
            }
        }

        function G(N) {
            var c = document.cookie.split("; ");
            for (var i = 0; i < c.length; i++) {
                var d = c[i].split("=");
                if (d[0] == N) return unescape(d[1]);
            }
            return '';
        };

        function S(N, V, Q) {
            var L = new Date();
            var z = new Date(L.getTime() + Q * 60000);
            document.cookie = N + "=" + escape(V) + ";path=/;expires=" + z.toGMTString() + ";";
        };

        function strToDate(str, ext) {
            var arys = new Array();
            arys = str.split('-');
            var newDate = new Date(arys[0], arys[1] - 1, arys[2], 9, 0, 0);
            if (ext) {
                newDate = new Date(newDate.getTime() + 1000 * 60 * 60 * 24);
            }
            return newDate;
        }

        //监测

        function monitor(o) {
            if (o instanceof Array) {
                var aImg = [];

                for (var i = 0, len = o.length; i < len; i++) {
                    aImg[i] = new Image();
                    aImg[i].src = o[i];
                }
            } else if (typeof o === 'string') {
                var oImg = new Image();
                oImg.src = o;
            }
        }

    }
}

/************RotatorAD end*********************/
(function(){
  var pthis=this;this.compareDate = function (a,b){try{var n = new Date().getHours();if(n >= a && n < b){return true;}else{return false;}}catch(e){return false;}};
  try{window.timer_0915 = this.compareDate(9,15);}catch(e){}
  try{window.timer_1524 = this.compareDate(15,24);}catch(e){}
})();

/*********************************/

/*

轮播背投类 RotatorPB v3.1
Update by Dakular <shuhu@staff.sina.com.cn> 2008-8-25
格式：new RotatorPB(广告数组)
说明：第一次访问随机出现，以后访问顺序轮播；自动过滤过期广告；cookie时间24小时；商业广告数量不足时不显示
*/
if(typeof(RotatorPB)!='function'){
	var RotatorPB=function (rad){
		this.ary = new Array();
		this.date = new Date();
		this.w = rad.width;
		this.h = rad.height;
		this.num = rad.num;
		this.o = rad.length;
		this.id = RotatorPB.id++;
		this.m = 'rpb_'+this.id;
		this.n = new Array();
		this.L = new Date();
		this.e = 0;
		var f;
		var D = false;
		var nn = 0;
		//过滤无效广告
		for(var i=0; i<rad.length; i++){
			var start = RotatorPB.strToDate(rad[i][2].replace('<startdate>','').replace('</startdate>',''));
			var end = RotatorPB.strToDate(rad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
			if(this.date>start && this.date<end && (this.num==null || this.ary.length<this.num) ){
				this.ary.push([rad[i][0], rad[i][1], rad[i][4]]);
			}
		}
		this.o = this.ary.length;
		//取id
		for(var i=0;i<this.o;i++){
			f=this.m+'_'+(i+1);
			g=RotatorPB.G(f);
			if(g!=''){
				this.n[i]=g;
				D=true;
			}else {
				this.n[i]=0;
			}
		}
		if(!D){
			var r=Math.ceil(Math.random()*this.o);
			var t=this.m+'_'+r;
			RotatorPB.S(t,this.L.getTime(),1440);
			this.e=r;
			if(this.o==1){RotatorPB.S('s_dl',r,1440);}
			//return r;
		}else {
			var R=this.n.join(',').split(',');
			var k=R.sort();
			var max=Number(k[k.length-1]);
			var min=Number(k[0]);
			var F;
			for(var i=0;i<this.n.length;i++){
				if(max==this.n[i]){
					F=i+1;
					break;
				}
			}
			if(typeof(F)!='undefined'){
				G=this.m+'_'+F;
				H=Number(RotatorPB.G(G));
				I=F%this.o+1;
				J=this.m+'_'+I;
				RotatorPB.S(J,this.L.getTime(),1440);
				if(this.o==1){
					I=-RotatorPB.G('s_dl');
					if(I==0){I=1;RotatorPB.S('s_dl',1,1440);}
					RotatorPB.S('s_dl',I,1440);
				}
				this.e=I;
				//return I;
			}
		}
		//Show AD
		if(this.e==0 || this.ary.length==0) return; //如果没有广告则不显示
		if(this.e==-1) return; //当只有一个广告时：始终显示第一个/奇数次刷新显示
		var n = this.e-1;
		var btsrc = this.ary[n][0];
		var bturl = this.ary[n][1];
		var bttype = btsrc.substring(btsrc.length-3).toLowerCase();

		/*lingchen coding begin*/
		var limitsrc = ['sina.com.cn','weibo.com','sinaimg.cn'];
		var limiturl = ['sina.com.cn','weibo.com','allyes.com'];
		var limitflag = 1;
		for(var i=0;i<limitsrc.length;i++){
			if(btsrc.indexOf(limitsrc[i])!=-1){
				limitflag++;
				break;
			}
		}
		for(var i=0;i<limiturl.length;i++){
			if(bturl.indexOf(limiturl[i])!=-1){
				limitflag++;
				break;
			}
		}
		if(limitflag==3){
			if(bttype=='.js'){ //js
				document.write('<script language="javascript" type="text/javascript" src="'+btsrc+'"></scr'+'ipt>'); return;
			}else if(bttype!='htm' && bttype!='tml'){
				sinabturl = "http://d1.sina.com.cn/d1images/pb/pbv4.html?"+bturl+"${}"+bttype+"${}"+btsrc;
			}else{
				sinabturl = btsrc;
			}
		}
		/*lingchen coding end*/

		try{
			aryADSeq.push("openWindowBack()");
		}catch(e){
			openWindowBack();
		}
		if(this.ary[n][2]!=""){ //监测计数
			var oImg = new Image();
			oImg.src = this.ary[n][2];
		}
	};
	RotatorPB.id=1;
	RotatorPB.G=function (N){
		var c=document.cookie.split("; ");
		for(var i=0;i<c.length;i++){
			var d=c[i].split("=");
			if(d[0]==N)return unescape(d[1]);
		}return '';
	};
	RotatorPB.S=function (N,V,Q){
		var L=new Date();
		var z=new Date(L.getTime()+Q*60000);
		document.cookie=N+"="+escape(V)+"; path=/; expires="+z.toGMTString()+";";
	};
	RotatorPB.strToDate = function(str,ext){
		var arys = new Array();
		arys = str.split('-');
		var newDate = new Date(arys[0],arys[1]-1,arys[2],9,0,0);
		if(ext){
			newDate = new Date(newDate.getTime()+1000*60*60*24);
		}
		return newDate;
	}
	var openWindowBack = function(){
		var popUpWin2 = open(sinabturl, (window.name!="popUpWin2")?"popUpWin2":"", "width=1,height=1,top=4000,left=3000");
	}
};

/*********************************/

/*赞助生成工具*/
try{if(typeof(SinaDotColumnBarCreativeClass)!="function"){var SinaDotColumnBarCreativeClass=function(o){if(typeof(o)!="undefined"&&o!=""){var pthis=this;this.$=function(id){if(document.getElementById){return eval('document.getElementById("'+id+'")')}else{return eval("document.all."+id)}};this.initWrap=function(mod,id,v,w,h,po,l,r,t,b,z,m,p,bg,dsp){var lst="";if(mod==1){lst+="var "+v+' = document.createElement("'+id+'");'}else{if(mod==2){lst+="var "+v+' = document.getElementById("'+id+'");'}else{return}}if(v!=""){lst+=v+'.id = "'+v+'";'}if(w!=""){lst+=v+".style.width = "+w+' + "px";'}if(h!=""){lst+=v+".style.height = "+h+' + "px";'}if(po!=""){lst+=v+'.style.position = "'+po+'";';if(l!=""){lst+=v+".style.left = "+l+' + "px";'}else{if(l==""||r!=""){lst+=v+".style.right = "+r+' + "px";'}}if(t!=""){lst+=v+".style.top = "+t+' + "px";'}else{if(t==""||b!=""){lst+=v+".style.bottom = "+b+' + "px";'}}if(z!=""){lst+=v+'.style.zIndex = "'+z+'";'}}if(bg!=""){lst+=v+'.style.background = "'+bg+'";'}if(m!=""){lst+=v+'.style.margin = "'+m+'";'}if(p!=""){lst+=v+'.style.padding = "'+p+'";'}if(dsp!=""){lst+=v+'.style.display = "'+dsp+'";'}return lst};this.initObj=function(id,s,u,w,h){var lst=s.substring(s.length-3).toLowerCase();switch(lst){case"tml":case"htm":var to=document.createElement("iframe");to.id=id;to.style.width=w+"px";to.style.height=h+"px";to.src=s;to.frameBorder=0;to.scrolling="no";to.marginheight=0;to.marginwidth=0;break;case"swf":var to=document.createElement("div");var fo=new sinaFlash(s,id,w,h,"7","",false,"High");fo.addParam("wmode","transparent");fo.addParam("allowScriptAccess","always");fo.addParam("menu","false");fo.write(to);break;case"jpg":case"gif":case"png":if(u!=""){var to=document.createElement("a");to.href=u;to.target="_blank";var io=new Image();io.id=id;io.style.width=w+"px";io.style.height=h+"px";io.style.border="none";io.src=s;to.appendChild(io)}else{var to=new Image();to.id=id;to.style.width=w+"px";to.style.height=h+"px";to.style.border="none";to.style.cursor="pointer";to.src=s}break;default:var to=document.createElement("a");to.id=id;to.href=u;to.target="_blank";to.innerText=s}return to};this.getAdCookie=function(N){var c=document.cookie.split("; ");for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N){return unescape(d[1])}}return""};this.setAdCookie=function(N,V,Q){var L=new Date();var z=new Date(L.getTime()+Q*60000);document.cookie=N+"="+escape(V)+";path=/;expires="+z.toGMTString()+";"};this.addEvent=function(obj,event,func){var MSIE=navigator.userAgent.indexOf("MSIE");var OPER=navigator.userAgent.indexOf("Opera");if(document.all&&MSIE!=-1&&OPER==-1){obj.attachEvent("on"+event,func)}else{obj.addEventListener(event,func,false)}};var btimer;var showTag=false;var bo=pthis.$("SinaDotColumnBarCreativeTmpWrap_"+o.id);bo=bo.parentNode;bo.style.position="relative";eval(pthis.initWrap(1,"div","b_"+o.id,o.b.w,o.b.h,"absolute",o.b.p[0],o.b.p[1],o.b.p[2],o.b.p[3],o.b.z,0,0,"","block"));eval("pthis.bWrap = b_"+o.id+"");var bObj=pthis.initObj("bo_"+o.id,o.b.s,o.b.u,o.b.w,o.b.h);pthis.bWrap.appendChild(bObj);bo.appendChild(pthis.bWrap);pthis.eWrap=document.createElement("div");pthis.eWrap.innerHTML="";pthis.showE=function(){var apthis=pthis;clearTimeout(btimer);apthis.eWrap.innerHTML="";if(o.e.s!=""){eval(pthis.initWrap(1,"div","e_"+o.id,o.e.w,o.e.h,"absolute",o.e.p[0],o.e.p[1],o.e.p[2],o.e.p[3],o.e.z,0,0,"","none"));eval("apthis.eWrap = e_"+o.id+"");var eObj=pthis.initObj("eo_"+o.id,o.e.s,o.e.u,o.e.w,o.e.h);apthis.eWrap.appendChild(eObj);bo.appendChild(apthis.eWrap);apthis.eWrap.style.display="block";if(o.c.w!=""||o.c.h!=""){eval(pthis.initWrap(1,"div","c_"+o.id,o.c.w,o.c.h,"absolute",o.c.p[0],o.c.p[1],o.c.p[2],o.c.p[3],o.c.z,0,0,o.c.b,"block"));eval("apthis.cWrap = c_"+o.id+"");apthis.cWrap.onclick=function(){apthis.eWrap.style.display="none";showTag=false};apthis.cWrap.style.background=(o.c.b=="")?"url(http://d1.sina.com.cn/shh/SinaDotColumnBarCreativeTool/spc.gif) repeat":o.c.b;apthis.cWrap.innerHTML=o.c.inn;apthis.cWrap.style.textAlign="center";apthis.cWrap.style.overFlow="hidden";apthis.cWrap.style.cursor="pointer";apthis.cWrap.style.color=o.c.c;apthis.eWrap.appendChild(apthis.cWrap)}if(o.e.t!=""){btimer=setTimeout(function(){apthis.eWrap.style.display="none";showTag=false},o.e.t)}if(o.e.tr!=""){var tro=new Image();tro.src=o.e.tr+"&"+Math.random()}if(o.o.ahd){apthis.eWrap.onmouseover=function(){apthis.eWrap.style.display="block"};pthis.bWrap.onmouseout=function(){apthis.eWrap.style.display="none";showTag=false};apthis.eWrap.onmouseout=function(){apthis.eWrap.style.display="none";showTag=false}}}};var currTimes=1;var clcExt=typeof(o.o.cle)=="undefined"?0:o.o.cle;pthis.bWrap.onmouseover=function(){if(!showTag){showTag=true;if(clcExt==0){var tmpeip=true;try{if(typeof(o.o.eip)!="undefined"&&typeof(o.o.eti)!="undefined"){if(o.o.eip!=""&&!isNaN(o.o.eip)){var tmpeti=(o.o.eti=="")?1440:eval(o.o.eti*60);var cepcookie=pthis.getAdCookie("ceCookie"+o.id);cepcookie=(cepcookie==""||cepcookie=="undefined")?0:cepcookie;cepcookie++;pthis.setAdCookie("ceCookie"+o.id,cepcookie,tmpeti);if(cepcookie>o.o.eip){tmpeip=false}}}}catch(e){}if(tmpeip){if(o.o.enm!=""&&!isNaN(o.o.enm)){if(currTimes<=o.o.enm){pthis.showE();++currTimes}}else{pthis.showE()}}}}};pthis.bWrap.onclick=function(){if(clcExt==1){var tmpeip=true;try{if(typeof(o.o.eip)!="undefined"&&typeof(o.o.eti)!="undefined"){if(o.o.eip!=""&&!isNaN(o.o.eip)){var tmpeti=(o.o.eti=="")?1440:eval(o.o.eti*60);var cepcookie=pthis.getAdCookie("ceCookie"+o.id);cepcookie=(cepcookie==""||cepcookie=="undefined")?0:cepcookie;cepcookie++;pthis.setAdCookie("ceCookie"+o.id,cepcookie,tmpeti);if(cepcookie>o.o.eip){tmpeip=false}}}}catch(e){}if(tmpeip){if(o.o.enm!=""&&!isNaN(o.o.enm)){if(currTimes<=o.o.enm){pthis.showE();++currTimes}}else{pthis.showE()}}}};if(o.o.anm!=""&&!isNaN(o.o.anm)){var cbpcookie=pthis.getAdCookie("cbCookie"+o.id);cbpcookie=(cbpcookie==""||cbpcookie=="undefined")?1:cbpcookie;setTimeout(function(){if(cbpcookie<=o.o.anm){pthis.showE();++cbpcookie;pthis.setAdCookie("cbCookie"+o.id,cbpcookie,1440)}},o.o.adl)}else{if(o.o.anm=="auto"&&isNaN(o.o.anm)){setTimeout(function(){pthis.showE()},o.o.adl)}else{}}}}}}catch(e){};
/* http://d2.sina.com.cn/d1images/common/SinaDotTop.js end */

/******** Sales dept. end ********/

/**
 * sina flash class
 * @version 1.1.4.2
 * @author [sina ui]zhangping1@
 * @update 2008-7-7 
 */

if(typeof(sina)!="object"){var sina={}}
sina.$=function(i){if(!i){return null}
return document.getElementById(i)};var sinaFlash=function(V,x,X,Z,v,z,i,c,I,l,o){var w=this;if(!document.createElement||!document.getElementById){return}
w.id=x?x:'';var O=function(I,i){for(var l=0;l<I.length;l++){if(I[l]==i){return l}}
return-1},C='8.0.42.0';if(O(['eladies.sina.com.cn','ent.sina.com.cn'],document.domain)>-1){w.ver=C}else{w.ver=v?v:C}
w.ver=w.ver.replace(/\./g,',');w.__classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";w.__codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+w.ver;w.width=X;w.height=Z;w.movie=V;w.src=w.movie;w.bgcolor=z?z:'';w.quality=c?c:"high";w.__pluginspage="http://www.macromedia.com/go/getflashplayer";w.__type="application/x-shockwave-flash";w.useExpressInstall=(typeof(i)=="boolean")?i:false;w.xir=I?I:window.location;w.redirectUrl=l?l:window.location;w.detectKey=(typeof(o)=="boolean")?o:true;w.escapeIs=false;w.__objAttrs={};w.__params={};w.__embedAttrs={};w.__flashVars=[];w.__flashVarsStr="";w.__forSetAttribute("id",w.id);w.__objAttrs["classid"]=w.__classid;w.__forSetAttribute("codebase",w.__codebase);w.__forSetAttribute("width",w.width);w.__forSetAttribute("height",w.height);w.__forSetAttribute("movie",w.movie);w.__forSetAttribute("quality",w.quality);w.__forSetAttribute("pluginspage",w.__pluginspage);w.__forSetAttribute("type",w.__type);w.__forSetAttribute("bgcolor",w.bgcolor)}
sinaFlash.prototype={getFlashHtml:function(){var I=this,i='<object ';for(var l in I.__objAttrs){i+=l+'="'+I.__objAttrs[l]+'"'+' '}
i+='>\n';for(var l in I.__params){i+='	<param name="'+l+'" value="'+I.__params[l]+'" \/>\n'}
if(I.__flashVarsStr!=""){i+='	<param name="flashvars" value="'+I.__flashVarsStr+'" \/>\n'}
i+='	<embed ';for(var l in I.__embedAttrs){i+=l+'="'+I.__embedAttrs[l]+'"'+' '}
i+='><\/embed>\n<\/object>';return i},__forSetAttribute:function(I,i){var l=this;if(typeof(I)=="undefined"||I==''||typeof(i)=="undefined"||i==''){return}
I=I.toLowerCase();switch(I){case "classid":break;case "pluginspage":l.__embedAttrs[I]=i;break;case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblClick":case "ondrag":case "ondragend":case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "codebase":l.__objAttrs[I]=i;break;case "src":case "movie":l.__embedAttrs["src"]=i;l.__params["movie"]=i;break;case "width":case "height":case "align":case "vspace":case "hspace":case "title":case "class":case "name":case "id":case "accesskey":case "tabindex":case "type":l.__objAttrs[I]=l.__embedAttrs[I]=i;break;default:l.__params[I]=l.__embedAttrs[I]=i}},__forGetAttribute:function(i){var I=this;i=i.toLowerCase();if(typeof I.__objAttrs[i]!="undefined"){return I.__objAttrs[i]}else if(typeof I.__params[i]!="undefined"){return I.__params[i]}else if(typeof I.__embedAttrs[i]!="undefined"){return I.__embedAttrs[i]}else{return null}},setAttribute:function(I,i){this.__forSetAttribute(I,i)},getAttribute:function(i){return this.__forGetAttribute(i)},addVariable:function(I,i){var l=this;if(l.escapeIs){I=escape(I);i=escape(i)}
if(l.__flashVarsStr==""){l.__flashVarsStr=I+"="+i}else{l.__flashVarsStr+="&"+I+"="+i}
l.__embedAttrs["FlashVars"]=l.__flashVarsStr},getVariable:function(I){var o=this,i=o.__flashVarsStr;if(o.escapeIs){I=escape(I)}
var l=new RegExp(I+"=([^\\&]*)(\\&?)","i").exec(i);if(o.escapeIs){return unescape(RegExp.$1)}
return RegExp.$1},addParam:function(I,i){this.__forSetAttribute(I,i)},getParam:function(i){return this.__forGetAttribute(i)},write:function(i){var I=this;if(typeof i=="string"){document.getElementById(i).innerHTML=I.getFlashHtml()}else if(typeof i=="object"){i.innerHTML=I.getFlashHtml()}}}

try{if(typeof(SinaDotColumnBarCreativeClass)!="function"){var SinaDotColumnBarCreativeClass=function(o){if(typeof(o)!="undefined"&&o!=""){var pthis=this;this.$=function(id){if(document.getElementById){return eval('document.getElementById("'+id+'")')}else{return eval("document.all."+id)}};this.initWrap=function(mod,id,v,w,h,po,l,r,t,b,z,m,p,bg,dsp){var lst="";if(mod==1){lst+="var "+v+' = document.createElement("'+id+'");'}else{if(mod==2){lst+="var "+v+' = document.getElementById("'+id+'");'}else{return}}if(v!=""){lst+=v+'.id = "'+v+'";'}if(w!=""){lst+=v+".style.width = "+w+' + "px";'}if(h!=""){lst+=v+".style.height = "+h+' + "px";'}if(po!=""){lst+=v+'.style.position = "'+po+'";';if(l!=""){lst+=v+".style.left = "+l+' + "px";'}else{if(l==""||r!=""){lst+=v+".style.right = "+r+' + "px";'}}if(t!=""){lst+=v+".style.top = "+t+' + "px";'}else{if(t==""||b!=""){lst+=v+".style.bottom = "+b+' + "px";'}}if(z!=""){lst+=v+'.style.zIndex = "'+z+'";'}}if(bg!=""){lst+=v+'.style.background = "'+bg+'";'}if(m!=""){lst+=v+'.style.margin = "'+m+'";'}if(p!=""){lst+=v+'.style.padding = "'+p+'";'}if(dsp!=""){lst+=v+'.style.display = "'+dsp+'";'}return lst};this.initObj=function(id,s,u,w,h){var lst=s.substring(s.length-3).toLowerCase();switch(lst){case"tml":case"htm":var to=document.createElement("iframe");to.id=id;to.style.width=w+"px";to.style.height=h+"px";to.src=s;to.frameBorder=0;to.scrolling="no";to.marginheight=0;to.marginwidth=0;break;case"swf":var to=document.createElement("div");var fo=new sinaFlash(s,id,w,h,"7","",false,"High");fo.addParam("wmode","transparent");fo.addParam("allowScriptAccess","always");fo.addParam("menu","false");fo.write(to);break;case"jpg":case"gif":case"png":if(u!=""){var to=document.createElement("a");to.href=u;to.target="_blank";var io=new Image();io.id=id;io.style.width=w+"px";io.style.height=h+"px";io.style.border="none";io.src=s;to.appendChild(io)}else{var to=new Image();to.id=id;to.style.width=w+"px";to.style.height=h+"px";to.style.border="none";to.style.cursor="pointer";to.src=s}break;default:var to=document.createElement("a");to.id=id;to.href=u;to.target="_blank";to.innerText=s}return to};this.getAdCookie=function(N){var c=document.cookie.split("; ");for(var i=0;i<c.length;i++){var d=c[i].split("=");if(d[0]==N){return unescape(d[1])}}return""};this.setAdCookie=function(N,V,Q){var L=new Date();var z=new Date(L.getTime()+Q*60000);document.cookie=N+"="+escape(V)+";path=/;expires="+z.toGMTString()+";"};this.addEvent=function(obj,event,func){var MSIE=navigator.userAgent.indexOf("MSIE");var OPER=navigator.userAgent.indexOf("Opera");if(document.all&&MSIE!=-1&&OPER==-1){obj.attachEvent("on"+event,func)}else{obj.addEventListener(event,func,false)}};var btimer;var showTag=false;var bo=pthis.$("SinaDotColumnBarCreativeTmpWrap_"+o.id);bo=bo.parentNode;bo.style.position="relative";eval(pthis.initWrap(1,"div","b_"+o.id,o.b.w,o.b.h,"absolute",o.b.p[0],o.b.p[1],o.b.p[2],o.b.p[3],o.b.z,0,0,"","block"));eval("pthis.bWrap = b_"+o.id+"");var bObj=pthis.initObj("bo_"+o.id,o.b.s,o.b.u,o.b.w,o.b.h);pthis.bWrap.appendChild(bObj);bo.appendChild(pthis.bWrap);pthis.eWrap=document.createElement("div");pthis.eWrap.innerHTML="";pthis.showE=function(){var apthis=pthis;clearTimeout(btimer);apthis.eWrap.innerHTML="";if(o.e.s!=""){eval(pthis.initWrap(1,"div","e_"+o.id,o.e.w,o.e.h,"absolute",o.e.p[0],o.e.p[1],o.e.p[2],o.e.p[3],o.e.z,0,0,"","none"));eval("apthis.eWrap = e_"+o.id+"");var eObj=pthis.initObj("eo_"+o.id,o.e.s,o.e.u,o.e.w,o.e.h);apthis.eWrap.appendChild(eObj);bo.appendChild(apthis.eWrap);apthis.eWrap.style.display="block";if(o.c.w!=""||o.c.h!=""){eval(pthis.initWrap(1,"div","c_"+o.id,o.c.w,o.c.h,"absolute",o.c.p[0],o.c.p[1],o.c.p[2],o.c.p[3],o.c.z,0,0,o.c.b,"block"));eval("apthis.cWrap = c_"+o.id+"");apthis.cWrap.onclick=function(){apthis.eWrap.style.display="none";showTag=false};apthis.cWrap.style.background=(o.c.b=="")?"url(http://d1.sina.com.cn/shh/SinaDotColumnBarCreativeTool/spc.gif) repeat":o.c.b;apthis.cWrap.innerHTML=o.c.inn;apthis.cWrap.style.textAlign="center";apthis.cWrap.style.overFlow="hidden";apthis.cWrap.style.cursor="pointer";apthis.cWrap.style.color=o.c.c;apthis.eWrap.appendChild(apthis.cWrap)}if(o.e.t!=""){btimer=setTimeout(function(){apthis.eWrap.style.display="none";showTag=false},o.e.t)}if(o.e.tr!=""){var tro=new Image();tro.src=o.e.tr+"&"+Math.random()}if(o.o.ahd){apthis.eWrap.onmouseover=function(){apthis.eWrap.style.display="block"};pthis.bWrap.onmouseout=function(){apthis.eWrap.style.display="none";showTag=false};apthis.eWrap.onmouseout=function(){apthis.eWrap.style.display="none";showTag=false}}}};var currTimes=1;var clcExt=typeof(o.o.cle)=="undefined"?0:o.o.cle;pthis.bWrap.onmouseover=function(){if(!showTag){showTag=true;if(clcExt==0){var tmpeip=true;try{if(typeof(o.o.eip)!="undefined"&&typeof(o.o.eti)!="undefined"){if(o.o.eip!=""&&!isNaN(o.o.eip)){var tmpeti=(o.o.eti=="")?1440:eval(o.o.eti*60);var cepcookie=pthis.getAdCookie("ceCookie"+o.id);cepcookie=(cepcookie==""||cepcookie=="undefined")?0:cepcookie;cepcookie++;pthis.setAdCookie("ceCookie"+o.id,cepcookie,tmpeti);if(cepcookie>o.o.eip){tmpeip=false}}}}catch(e){}if(tmpeip){if(o.o.enm!=""&&!isNaN(o.o.enm)){if(currTimes<=o.o.enm){pthis.showE();++currTimes}}else{pthis.showE()}}}}};pthis.bWrap.onclick=function(){if(clcExt==1){var tmpeip=true;try{if(typeof(o.o.eip)!="undefined"&&typeof(o.o.eti)!="undefined"){if(o.o.eip!=""&&!isNaN(o.o.eip)){var tmpeti=(o.o.eti=="")?1440:eval(o.o.eti*60);var cepcookie=pthis.getAdCookie("ceCookie"+o.id);cepcookie=(cepcookie==""||cepcookie=="undefined")?0:cepcookie;cepcookie++;pthis.setAdCookie("ceCookie"+o.id,cepcookie,tmpeti);if(cepcookie>o.o.eip){tmpeip=false}}}}catch(e){}if(tmpeip){if(o.o.enm!=""&&!isNaN(o.o.enm)){if(currTimes<=o.o.enm){pthis.showE();++currTimes}}else{pthis.showE()}}}};if(o.o.anm!=""&&!isNaN(o.o.anm)){var cbpcookie=pthis.getAdCookie("cbCookie"+o.id);cbpcookie=(cbpcookie==""||cbpcookie=="undefined")?1:cbpcookie;setTimeout(function(){if(cbpcookie<=o.o.anm){pthis.showE();++cbpcookie;pthis.setAdCookie("cbCookie"+o.id,cbpcookie,1440)}},o.o.adl)}else{if(o.o.anm=="auto"&&isNaN(o.o.anm)){setTimeout(function(){pthis.showE()},o.o.adl)}else{}}}}}}catch(e){};

var SuggestServer=function(){this._P="http://suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@";this._Q="";this._R=null;this._S=null;this._T="";this._U="";this._V=null;this._W=null;this._X={};this._Y={};this._Z=false;this._00={"11":"A 股","12":"B 股","13":"权证","14":"期货","15":"债券","21":"开基","22":"ETF","23":"LOF","24":"货基","25":"QDII","26":"封基","31":"港股","32":"窝轮","41":"美股","42":"外期"};this._01={"input":null,"loader":null,"default":"","type":0,"max":10,"width":220,"link":null,"head":["选项","代码","名称"],"body":[-1,2,4],"fix":{"firefox":[1,1]},"callback":null};this._02=function(_a){return document.getElementById(_a);};this._03=function(){return(new Date()).getTime();};this._04=function(_b,_c){var _d=this;return function(){var _e=null;if(typeof _c!="undefined"){for(var i=0;i<arguments.length;i++){_c.push(arguments[i]);}_e=_c;}else{_e=arguments;}return _b.apply(_d,_e);};};this._05=function(_f,_g,_h){if(window.addEventListener){_f.addEventListener(_g,_h,false);}else if(window.attachEvent){_f.attachEvent("on"+_g,_h);}};this._06=function(){var _i=navigator.userAgent;if(/^Opera.*/.test(_i)==true){return "opera";}else if(/^Mozilla\/4\.0.*/.test(_i)==true){if(_i.indexOf("MSIE 7.0")!=-1){return "ie7";}else if(_i.indexOf("MSIE 6.0")!=-1){return "ie6";}else if(_i.indexOf("MSIE")!=-1){return "ie";}else{return "mozilla4";}}else if(/^Mozilla\/5\.0.*/.test(_i)==true){if(_i.indexOf("Chrome")!=-1){return "chrome";}else if(_i.indexOf("Safari")!=-1){return "safari";}else if(_i.indexOf("Firefox")!=-1){return "firefox";}else{return "mozilla5";}}else{return "unknown"}return "unknown"};this._07=function(){var _j=0;var _k=0;var _f=this._08;do{_j+=_f.offsetTop||0;_k+=_f.offsetLeft||0;if(_f.style.position!="relative"){break;}_f=_f.offsetParent;}while(_f);var _l=[this._08.parentNode.style.borderTopWidth.replace("px","")*1,this._08.parentNode.style.borderLeftWidth.replace("px","")*1];var _m=this._06();var _n="all" in this._01["fix"]?this._01["fix"]["all"]:[0,0];var _o=_m in this._01["fix"]?this._01["fix"][_m]:[0,0];_o=[_n[0]+_o[0],_n[1]+_o[1]];if(this._S.style.top!=_j+"px"){this._S.style.top=_j-_l[0]+_o[0]+"px";}if(this._S.style.left!=_k+"px"){this._S.style.left=_k-_l[1]+_o[1]+"px";}var _p=this._08.style.borderTopWidth;var _q=this._08.style.borderBottomWidth;var _r=this._08.clientHeight;_r+=_p!=""?_p.replace("px","")*1:2;_r+=_q!=""?_q.replace("px","")*1:2;if(this._S.style.marginTop!=_r+"px"){this._S.style.marginTop=_r+"px";}};this._09=function(_g){return{"1":"stock","2":"fund","3":"hk","4":"us"}[_g.substr(0,1)];};this._0a=function(){var _s=this._08.value;if(("key_"+_s)in this._Y&&this._Y["key_"+_s]!=""){if(this._S==null){this._S=document.createElement("div");this._S.style.cssText+="display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:"+this._01["width"]+"px; z-index:999;";this._08.parentNode.insertBefore(this._S,this._08);this._S["suggest"]=this;}this._07();var _t='';_t+='<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:'+(this._01["width"]-2)+'px;">'
if(this._01["head"]!=null){_t+='<tr style="background-color:#F3F3F3;">';for(var i in this._01["head"]){_t+='<td>'+this._01["head"][i]+'</td>';}_t+='</tr>';}var _u=this._Y["key_"+_s].replace(/&amp;/g,"&").replace(/;$/,"").split(";");var _v=_u.length>this._01["max"]?this._01["max"]:_u.length;var _w='parentNode.parentNode.parentNode[\'suggest\']';for(var i=0;i<_v;i++){var _x=_u[i].split(",");_x[-1]=_x[0].replace(_s,'<span style="color:#F00;">'+_s+'</span>');_x[-2]=_x[1]in this._00?this._00[_x[1]]:"——";var _y=this._01["link"]==null||this._01["link"]==""?['<td style="padding:0px;"><span style="display:block; padding:1px;">','</span></td>']:['<td style="padding:0px;"><a href="'+this._01["link"].replace(/@type@/g,this._09(_x[1])).replace(/@code@/g,this._0b(_x))+'" hidefocus="true" onmousedown="return this.parentNode.parentNode.'+_w+'[\'hidepause\'](this);" onclick="return this.parentNode.parentNode.'+_w+'[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="_blank">','</a></td>'];_t+='<tr id="'+_u[i]+'" style="cursor:pointer;" onmouseover="this.'+_w+'[\'mouseoverLine\'](this);" onmouseout="this.'+_w+'[\'mouseoutLine\'](this);" onmousedown="this.'+_w+'[\'setLineMouse\'](this);">';for(var j in this._01["body"]){_t+=_y[0]+_x[this._01["body"][j]]+_y[1];}_t+='</tr>';}_t+='</table>';this._X["key_"+_s]=_t;this._W=null;var _z=document.createElement("div");this._S.innerHTML=this._X["key_"+_s];this._0c();}else{this._0d();}};this._0e=function(_A){var _B="";if(_A._0f&&_A._0g){_B="#F8FBDF";}else if(_A._0f){_B="#F1F5FC";}else if(_A._0g){_B="#FCFEDF";}if(_A.style.backgroundColor!=_B){_A.style.backgroundColor=_B;}};this["mouseoverLine"]=function(_A){_A._0g=true;this._0e(_A);};this["mouseoutLine"]=function(_A){_A._0g=false;this._0e(_A);};this["setLineMouse"]=function(_A){this["setLine"](_A);if(this._V!=null){this._V(this._08.value);}};this._0b=function(_C){switch(_C[1]){case "11":return _C[3];break;case "12":return _C[3];break;case "13":return _C[3];break;case "14":return _C[3];break;case "15":return _C[3];break;case "21":return _C[3];break;case "22":return _C[3];break;case "23":return _C[3];break;case "24":return _C[3];break;case "25":return _C[3];break;case "26":return _C[3];break;default:return _C[2];break;}};this["setLine"]=function(_A){var _C=_A.id.split(",");var _D=this._0b(_C);this._U=_D;this._08.value=_D;if(this._W!=null){this._W._0f=false;this._0e(this._W);}_A._0f=true;this._0e(_A);this._W=_A;};this._0c=function(){if(this._S!=null){this._S.style.display="";}};this["hidepause"]=function(){this._Z=true;};this["hideresume"]=function(){this._Z=false;this._0h();};this._0d=function(){if(this._Z==false){this._0h();}};this._0h=function(){if(this._S!=null){this._S.style.display="none";}};this._0i=function(_s,_E,_F){if(this._R==null){this._R=document.createElement("div");this._R.style.display="none";this._08.parentNode.insertBefore(this._R,this._08);}var _G="suggestdata_"+this._03();var _H=document.createElement("script");_H.type="text/javascript";_H.charset="gb2312";_H.src=this._Q.replace("@NAME@",_G).replace("@KEY@",_s);_H._0j=this;if(_E){_H._0k=_E;}if(_F){_H._0l=_F;}_H._0m=_s;_H._0n=_G;_H[document.all?"onreadystatechange":"onload"]=function(){if(document.all&&this.readyState!="loaded"&&this.readyState!="complete"){return;}var _I=window[this._0n];if(typeof _I!="undefined"){this._0j._Y["key_"+this._0m]=_I;this._0k(_I);window[this._0n]=null;}else if(this._0o){this._0o("");}this._0j=null;this._0m=null;this._0n=null;this[document.all?"onreadystatechange":"onload"]=null;this.parentNode.removeChild(this);};this._R.appendChild(_H);};this._0p=function(){var _s=this._08.value;if(this._U!=_s){this._U=_s;if(_s!=""){if(("key_"+_s)in this._Y){this._0a();}else{this._0i(_s,this._04(this._0a),this._04(this._0d));}}else{if(this._S!=null){this._W=null;this._S.innerHTML="";}this._0d();}}else{this._0c();}};this._0q=function(){if(this._08.value==this._T){this._08.value="";}this._U="";this._0p();};this._0r=function(){if(this._08.value==""){this._08.value=this._T;};this._U="";this._0d();};this._0s=function(){var _J=arguments[0]||window.event;var _K=this._01["head"]==null?0:1;switch(_J.keyCode){case 38:if(this._S!=null){this["setLine"](this._S.firstChild.rows[(!this._W||this._W.rowIndex==_K)?this._S.firstChild.rows.length-1:this._W.rowIndex-1]);}break;case 40:if(this._S!=null){this["setLine"](this._S.firstChild.rows[(!this._W||this._W.rowIndex==this._S.firstChild.rows.length-1)?_K:this._W.rowIndex+1]);}break;case 13:if(this._S!=null){if(this._W!=null){this["setLine"](this._W);}if(this._V!=null){this._V(this._08.value);}}this._0d();break;default:this._0p();break;}};this.getCodeFromCache=function(_s){if(("key_"+_s)in this._Y){return this._Y["key_"+_s];}};this.getCode=function(_s,_L){if(("key_"+_s)in this._Y){_L(this._Y["key_"+_s]);}else{this._0i(_s,_L,_L);}};this.changeType=function(_g){this._X={};this._Y={};this._08.value=this._T;if(typeof _g!="undefined"){var _M="";switch(_g.toLowerCase()){case "stock":_M="11,12,13,14,15";break;case "fund":_M="21,22,23,24,25,26";break;case "hkstock":_M="31";break;case "hk":_M="31,32";break;case "usstock":_M="41";break;case "us":_M="41,42";break;default:_M=_g;break;}this._Q=this._P.replace("@TYPE@",_M);}else{this._Q=this._P.replace("type=@TYPE@&","");}this._01["type"]=_g;};this.changeLink=function(_N){this._01["link"]=_N;this._0a();this._0d();};this.bind=function(_O){if(typeof _O!="undefined"){for(var i in _O){this._01[i]=_O[i];}}this._08=typeof this._01["input"]=="string"?document.getElementById(this._01["input"]):this._01["input"];if(this._01["loader"]!=null){this._R=typeof this._01["loader"]=="string"?document.getElementById(this._01["loader"]):this._01["loader"];}if(this._08){this.changeType(this._01["type"]);this._T=this._01["default"]==null||this._01["default"]==""?this._08.value:this._01["default"];this._08.value=this._T;this._08.setAttribute("autocomplete","off");this._08.autoComplete="off";this._05(this._08,"focus",this._04(this._0q));this._05(this._08,"blur",this._04(this._0r));this._05(this._08,"keyup",this._04(this._0s));this._05(this._08,"mouseup",this._04(this._0s));this._V=this._01["callback"];}};};

if(typeof $=="undefined"){$=function(a){return document.getElementById(a)}}if(typeof $C=="undefined"){$C=function(a){return document.createElement(a)}}Function.prototype.Bind=function(){var d=this,b=arguments[0],a=new Array();for(var c=1;c<arguments.length;c++){a.push(arguments[c])}return function(){return d.apply(b,a)}};var ScrTabCtrl=function(){this.Init.apply(this,arguments)};ScrTabCtrl.prototype={nTimeout:40,nRepeat:8,nContentHeight:128,nMoveTime:0,Init:function(a,g){this.oTitles=[];this.oContents=[];this.oImgs=[];this._callbacks=g;var f=$("wmt_"+a.id).getElementsByTagName("DL");for(var d=0;d<f.length;d++){if(f[d].nodeType==1&&a.set[d][2]!=""){for(var c=0;c<f[d].childNodes.length;c++){switch(f[d].childNodes[c].tagName){case"DT":this.oTitles.push(f[d].childNodes[c]);break;case"DD":this.oContents.push(f[d].childNodes[c]);continue;break}}}else{f[d].className="noscroll"}}this.activeIndex=0;for(var d=0;d<this.oTitles.length;d++){this.oTitles[d].onmouseover=this.overCheck.Bind(this,d);this.oTitles[d].onmouseout=this.outCheck.Bind(this,d)}this.aPace=[];var h=0,b=0.3,e=20;for(var d=0;d<e;d++){var l=h;h+=(this.nContentHeight-h)*b;this.aPace.push(Math.round(h-l));if(this.nContentHeight-h<3||d==e-1){this.steps=this.aPace.length;break}}},overCheck:function(a){this.overTt=window.setTimeout(this.start.Bind(this,a),300)},outCheck:function(){if(this.overTt){window.clearTimeout(this.overTt)}},start:function(a){if(a==this.activeIndex||this.bDisabled){return}if(this.oTitles[this.activeIndex]){this.oTitles[this.activeIndex].className=""}this.move(this.activeIndex,a);this.activeIndex=a;this.oTitles[this.activeIndex].className="active"},move:function(a,b){if(this.nMoveTime==this.steps-1){this.oPre.style.height="0px";this.oNow.style.height=this.nContentHeight+"px";this.nMoveTime=0;this.bDisabled=0;this._callbacks[this.activeIndex]();return}if(this.nMoveTime==0){this.oPre=this.oContents[a];this.oNow=this.oContents[b];this.oTitlePre=this.oTitles[a];this.oTitleNow=this.oTitles[b];this.bDisabled=1}this.oPre.style.height=[this.oPre.clientHeight-this.aPace[this.nMoveTime],"px"].join("");this.oNow.style.height=[this.oNow.clientHeight+this.aPace[this.nMoveTime],"px"].join("");this.nMoveTime++;this.moveTO=window.setTimeout(this.move.Bind(this),this.nTimeout)}};var TabSwitch=function(){this.Init.apply(this,arguments)};TabSwitch.prototype={Init:function(l,f,h,d,g){this.tabs=[];var m=l.childNodes;for(var e=0;e<m.length;e++){if(m[e].nodeType==1){this.tabs.push(m[e])}}this.activeTab=this.tabs[0];if(f){this.targets=[];var a=f.childNodes;for(var c=0;c<a.length;c++){if(a[c].nodeType==1){this.targets.push(a[c])}}this.activeTarget=this.targets[0]}if(g){for(var b=0;b<this.tabs.length;b++){this.tabs[b].onclick=this.showTab.Bind(this,b,g[b])}}else{if(h!="mouseover"){for(var b=0;b<this.tabs.length;b++){this.tabs[b].onclick=this.showTab.Bind(this,b)}}else{for(var b=0;b<this.tabs.length;b++){this.tabs[b].onmouseover=this._over.Bind(this,b);this.tabs[b].onmouseout=this._hide.Bind(this,b)}}}},showTab:function(a,b){if(this.tabs[a]==this.activeTab){return}if(this.activeTab){this.activeTab.className=""}this.activeTab=this.tabs[a];this.activeTab.className="active";if(this.targets){if(this.activeTarget){this.activeTarget.style.display="none"}this.activeTarget=this.targets[a];this.activeTarget.style.display=""}if(b){this.activeCallback=b;b()}},_over:function(a,b,c){this._timeout=window.setTimeout(this.showTab.Bind(this,a,b,c),200)},_hide:function(){if(this._timeout){window.clearTimeout(this._timeout)}}};var WmtHq_Ctrl=function(){this.Init.apply(this,arguments)};WmtHq_Ctrl.prototype={_hqUrl:"http://hq.sinajs.cn/rn=@RN@&list=",_hqTpl:'<ul class="@RG@"><li class="wmt_n">@TITLE@</li><li><span class="@PBG@">@P@</span></li><li><span class="@PBG@">@CG@</span></li><li><span class="@PBG@">@CGP@</span></li></ul>',_linkTpl:'<a href="@URL@" target="_blank">@NAME@</a>',_bfUrl:"http://finance.sina.com.cn/",_nHqFqc:5000,_nImgFqc:60000,Init:function(){this._getIF();var a=new SINAHQ_LOADER();a.load("http://hq.sinajs.cn/?format=json&func=window.StandardBJTime=hq_json_sys_time;if%28typeof%28StandardBJTime_Callback%29==%27function%27%29StandardBJTime_Callback%28%29;&list=sys_time",this._start.Bind(this));this._alternativeStart=window.setTimeout(this.show.Bind(this,oWmtdata.asia),3000);this._tabCtrl=new TabSwitch($("wmt_tabs"),$("wmt_contents"),null,null,[this.show.Bind(this,oWmtdata.china),this.show.Bind(this,oWmtdata.asia),this.show.Bind(this,oWmtdata.america),this.show.Bind(this,oWmtdata.euro)])},_start:function(){this.bjDate=new Date(window.StandardBJTime*1000);var b=this.bjDate.getHours()*100+this.bjDate.getMinutes();var a=this.bjDate.getDay();if(b>=700&&b<2125){this.show(oWmtdata.china)}else{if(a==6&&b<=700){this._tabCtrl.showTab(2,this.show.Bind(this,oWmtdata.america))}else{if(a!=0&&a!=6){this._tabCtrl.showTab(2,this.show.Bind(this,oWmtdata.america))}else{this.show(oWmtdata.china)}}}},_getIF:function(){this._nextIF=window.hq_str_CFF_LIST.split(",")[0];for(var a=0;a<oWmtdata.china.set.length;a++){if(oWmtdata.china.set[a][1]=="期指"){oWmtdata.china.set[a][0]="CFF_"+this._nextIF;oWmtdata.china.set[a][1]+=this._nextIF.replace("IF","");oWmtdata.china.set[a][2]=oWmtdata.china.set[a][2].replace("IF",this._nextIF);oWmtdata.china.set[a][5]=oWmtdata.china.set[a][5].replace("IF",this._nextIF);break}}},show:function(c){if(this._alternativeStart){window.clearTimeout(this._alternativeStart)}this._sMarket=c.id;this._oSetNow=c.set;var b=[];var a=[];if(!oWmtdata[this._sMarket]._hqApi){for(var d=0;d<this._oSetNow.length;d++){b.push(this._loadImg.Bind(this,d));a.push(this._oSetNow[d][0])}oWmtdata[this._sMarket]._hqApi=this._hqUrl+a.join(",")}if(!oWmtdata[this._sMarket]._containersNow){oWmtdata[this._sMarket]._containersNow=[];var e=$("wmt_"+c.id).childNodes;for(var d=0;d<e.length;d++){if(e[d].nodeType==1){oWmtdata[this._sMarket]._containersNow.push(e[d].firstChild.nodeType==1?e[d].firstChild:e[d].firstChild.nextSibling)}}}this._loadhq();this._loadImg();if(!c.hasscroll){c.hasscroll=new ScrTabCtrl(c,b)}},_loadhq:function(){if(this._hqtimeout){window.clearTimeout(this._hqtimeout)}this._hqtimeout=window.setTimeout(this._loadhq.Bind(this),this._nHqFqc);if(!this._loader){this._loader=new SINAHQ_LOADER()}this._loader.load(oWmtdata[this._sMarket]._hqApi.replace("@RN@",(new Date()).getTime()),this._fill.Bind(this))},_fill:function(){for(var b=0;b<this._oSetNow.length;b++){var a=window[["hq_str_",this._oSetNow[b][0]].join("")].split(",");var c=this._parseData(a,this._oSetNow[b],b);if(c[0]!=""){if(c.length>1){this._setHtml(c[1],oWmtdata[this._sMarket]._containersNow[b]);window.setTimeout(this._setHtml.Bind(this,c[0],oWmtdata[this._sMarket]._containersNow[b]),1000)}else{this._setHtml(c[0],oWmtdata[this._sMarket]._containersNow[b])}}}},_setHtml:function(b,a){a.innerHTML=b},_parseData:function(c,b,f){var h="";switch(b[3]){case"cn":var g=this._setColorClass((c[2]*1),b[4]);var a=(c[1]*1).toFixed(2);if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",this._linkTpl.replace("@URL@",[this._bfUrl,b[5]].join("")).replace("@NAME@",b[1])],["@P@",a],["@CG@",(c[2]*1)>0?"+"+(c[2]*1).toFixed(2):(c[2]*1).toFixed(2)],["@CGP@",(c[3]*1)>0?["+",c[3],"%"].join(""):[c[3],"%"].join("")],["@RG@",g]])}break;case"hk":var g=this._setColorClass((c[7]*1),b[4]);var a=c[6];if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",this._linkTpl.replace("@URL@",[this._bfUrl,b[5]].join("")).replace("@NAME@",b[1])],["@P@",a],["@CG@",(c[7]*1)>0?"+"+c[7]:c[7]],["@CGP@",(c[8]*1)>0?["+",c[8],"%"].join(""):[c[8],"%"].join("")],["@RG@",g]])}break;case"bb":var g=this._setColorClass((c[2]*1),b[4]);var a=c[1];if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",b[1]],["@P@",a],["@CG@",(c[2]*1)>0?"+"+c[2]:c[2]],["@CGP@",(c[3]*1)>0?["+",c[3],"%"].join(""):[c[3],"%"].join("")],["@RG@",g]])}break;case"us":var g=this._setColorClass((c[2]*1),b[4]);var a=c[1];if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",this._linkTpl.replace("@URL@",[this._bfUrl,b[5]].join("")).replace("@NAME@",b[1])],["@P@",a],["@CG@",(c[4]*1)>0?"+"+c[4]:c[4]],["@CGP@",(c[2]*1)>0?["+",c[2],"%"].join(""):[c[2],"%"].join("")],["@RG@",g]])}break;case"fu":var e=c[0]-c[7];var g=this._setColorClass(e,b[4]);var a=(c[0]*1).toFixed(2);if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",this._linkTpl.replace("@URL@",[this._bfUrl,b[5]].join("")).replace("@NAME@",b[1])],["@P@",a],["@CG@",e>0?"+"+e.toFixed(2):e.toFixed(2)],["@CGP@",e>0?["+",(e/c[7]*100).toFixed(2),"%"].join(""):[(e/c[7]*100).toFixed(2),"%"].join("")],["@RG@",g]])}break;case"gzqh":var e=c[3]-c[14];var g=this._setColorClass(e,b[4]);var a=(c[3]*1).toFixed(2);if(this._oSetNow[f].prePrice&&this._oSetNow[f].prePrice==a){h=""}else{h=this._tplReplace(this._hqTpl,[["@TITLE@",this._linkTpl.replace("@URL@",[this._bfUrl,b[5]].join("")).replace("@NAME@",b[1])],["@P@",a],["@CG@",e>0?"+"+e.toFixed(2):e.toFixed(2)],["@CGP@",e>0?["+",(e/c[14]*100).toFixed(2),"%"].join(""):[(e/c[14]*100).toFixed(2),"%"].join("")],["@RG@",g]])}break}var d=this._oSetNow[f].prePrice?[h.replace(/@PBG@/g,""),h.replace(/@PBG@/g,g)]:[h.replace("@PBG@","")];this._oSetNow[f].prePrice=a;return d},_checkPrice:function(){alert("")},_setColorClass:function(b,a){switch(a){case"redup":return b!=0?(b>0?"rup":"gdown"):"";break;case"greenup":return b!=0?(b>0?"gup":"rdown"):"";break}},_tplReplace:function(c,b){for(var a=0;a<b.length;a++){c=c.replace(b[a][0],b[a][1])}return c},_loadImg:function(a){if(!oWmtdata[this._sMarket].activeImg){oWmtdata[this._sMarket].activeImg=0}if(a!=undefined){oWmtdata[this._sMarket].activeImg=a;if(this._oSetNow[oWmtdata[this._sMarket].activeImg].imgLoaded){return}}if(this._imgtimeout){window.clearTimeout(this._imgtimeout)}this._imgtimeout=window.setTimeout(this._loadImg.Bind(this),this._nImgFqc);var b=oWmtdata[this._sMarket].activeImg;if(this._oSetNow[b][2]!=""){this._fillImg(this._oSetNow[b],b)}if(!this._oSetNow[b].imgLoaded){this._oSetNow[b].imgLoaded=true}},_fillImg:function(b,e){var a=oWmtdata[this._sMarket]._containersNow[e].nextSibling;var d=a.nodeType==1?a:a.nextSibling;var c=new Image();c.src=[b[2],"?",(new Date()).getTime()].join("");if(isIE){c.onreadystatechange=this.insertBc.Bind(this,d,c,b[5])}else{c.onload=this.insertBc.Bind(this,d,c,b[5])}},insertBc:function(c,b,a){if(b.onreadystatechange){if(b.readyState!="loaded"&&b.readyState!="complete"){return}}c.innerHTML="";if(a!=""){var d=$C("A");d.target="_blank";d.href=[this._bfUrl,a].join("");d.appendChild(b);c.appendChild(d)}else{c.appendChild(b)}}};var isIE=false;var userAgent=navigator.userAgent.toLowerCase();if((userAgent.indexOf("msie")!=-1)&&(userAgent.indexOf("opera")==-1)){isIE=true}var SINAHQ_LOADER=function(){this.Init.apply(this,arguments)};SINAHQ_LOADER.prototype={_scriptCharset:"gb2312",_oScript:null,Init:function(a){this._setOptions(a)},_setOptions:function(a){if(typeof a!="undefined"){if(a.script_charset){this._scriptCharset=a.script_charset}}},_clearScriptObj:function(){if(this._oScript){try{this._oScript.onload=null;if(this._oScript.onreadystatechange){this._oScript.onreadystatechange=null}this._oScript.parentNode.removeChild(this._oScript)}catch(a){}}},_callbackWrapper:function(a){if(this._oScript.onreadystatechange){if(this._oScript.readyState!="loaded"&&this._oScript.readyState!="complete"){return}}if(typeof a!="undefined"){a()}this._clearScriptObj()},load:function(a,b){this._oScript=document.createElement("SCRIPT");this._oScript.type="text/javascript";if(isIE){this._oScript.onreadystatechange=this._callbackWrapper.Bind(this,b)}else{this._oScript.onload=this._callbackWrapper.Bind(this,b)}this._oScript.charset=this._scriptCharset;this._oScript.src=a;$("wmt_loader").appendChild(this._oScript)}};function wmtstart(){window.wmthqctrl=new WmtHq_Ctrl()};