(function(){
    var bd_inited = false,
        bd_requesting = false,
        bd_count,
        tab0 = _id('fin_tabs0_0'),
        tab1 = _id('fin_tabs0_1'),
        cont0 = _id('fin_tabs0_c0'),
        cont1 = _id('fin_tabs0_c1'),
        list = _id('fin_bd_list'),
        refreshBtn = _id('fin_bd_refresh'),
        fzBtn = _id('fin_bd_fz'),
        autoBtn = _id('fin_bd_auto'),
        autoSec = _id('fin_bd_auto_sec'),
        impNewsChange1 = _id('impNewsChange1'),
    	tab2 = _id('fin_tabs0_2');
    var ScrollInterval;
    if(_getCookie('bd_fi')){//如果点击了突发标签，跳至突发标签并刷新
        try{
            SUDA.uaTrack('finance_index_live', 'first_show');
            SUDA.uaTrack('finance_index_live', 'menu_click');
        }
        catch(e){}
        toFiBd(true);
    }else{
    	//未点击突发标签，不跳至突发标签，但是刷新并显示最新一条
    	
        toFiBd(false);
    }

    tab0.onclick = function () {
        tab0.className = 'fin_tabs0_0 fin_tabs0_cur0';
        tab1.className = 'fin_tabs0_1';
        tab2.style.display = '';
        cont1.style.display = 'none';
        impNewsChange1.style.display = 'block';
        cont0.style.display = 'block';
        _deleteCookie('bd_fi');
    }
    tab1.onclick = function () {
    	if(typeof(ScrollInterval)!='undefined'){
    		clearInterval(ScrollInterval);
    	}
    	//tab2.style.display = 'none';
        toFiBd(true);
        _setCookie('bd_fi', '1');
    }
    fzBtn.onclick = function () {
        var fz;
        if(this.className == 'fin_bd_fz'){
            fz = '14';
        }
        else if(this.className == 'fin_bd_fz fin_bd_fz14'){
            fz = '12';
        }
        if(fz){
            _setCookie('bd_fi_fz', fz);
            setFz(fz);
        }
    }
    autoBtn.onclick = function () {
        if(autoBtn.className.indexOf('fin_bd_autoing') > -1){
            autoBtn.className = 'fin_bd_auto';
            _stopCountDown();
            _setCookie('bd_fi_auto', '0');
        }
        else{
            autoBtn.className = 'fin_bd_auto fin_bd_autoing';
            _startCountDown();
            _setCookie('bd_fi_auto', '1');
        }
    }

    function _startCountDown () {
        autoSec.innerHTML = '60';
        bd_count = setInterval(function () {
            var oldTime = autoSec.innerHTML;
            if(oldTime == 1){
                bd_refresh();
                autoSec.innerHTML = '60';
            }
            else{
                autoSec.innerHTML = oldTime - 1;
            }
        }, 1000);
    }
    function _stopCountDown (argument) {
        autoSec.innerHTML = '60';
        clearInterval(bd_count);
        bd_count = null;
    }

    function setFz (fz) {
        if(fz == 14){
            fzBtn.className = 'fin_bd_fz fin_bd_fz14';
            list.className = 'fin_bd_list fz14';
        }
        else if(fz == 12){
            fzBtn.className = 'fin_bd_fz';
            list.className = 'fin_bd_list';
        }
    }

    function toFiBd (isShow) {//isShow 是否显示 突发标签
    	if(isShow){
    		//为true显示 突发标签
    		tab0.className = 'fin_tabs0_0';
	        tab1.className = 'fin_tabs0_1 fin_tabs0_cur1';
            //tab2.style.display = 'none';
	        cont1.style.display = 'block';
	        impNewsChange1.style.display = 'none';
	        cont0.style.display = 'none';	
    	}else{

    	}
        
        if(!bd_inited){
            bd_init();
        }
        else{
            bd_refresh();
        }
    }
    function bd_init () {
        bd_refresh();
        refreshBtn.onclick = function () {
            bd_refresh();
            return false;
        }
        if(_getCookie('bd_fi_fz') == '14'){
            setFz(14);
        }
        if(_getCookie('bd_fi_auto') == '0'){
            autoBtn.className = 'fin_bd_auto';
        }
        if(autoBtn.className.indexOf('fin_bd_autoing') > -1){
            _startCountDown();
        }
        bd_inited = true;
    }
    function ScrollLeft(obj,obj01,obj02){ 
		var speed=50; 
		if(obj02.offsetWidth-obj.scrollLeft<=0){ 
			obj.scrollLeft-=obj01.offsetWidth; 
		}else {
			obj.scrollLeft++; 
		} 	
	}   
    function bd_refresh () {
        if(bd_requesting){ return; }
        seajs.use('$', function($){
            if(bd_requesting){ return; }
            bd_requesting = true;
            $('#fin_bd_loading').show(0);
            $('#fin_bd_w').hide(0);
            var topLink = $('#fin_tabs0_2 span');
            $.ajax({
                dataType : "jsonp",
                url : 'http://live.sina.com.cn/api/?p=zt&s=tfin&a=cjsyqcrss&channel_symbol=finance&special_symbol=globalnews1&pagesize=20',
                // url : 'http://live.sina.com.cn/api/?p=zt&s=tfin&a=cjsyqcrss&channel_symbol=ent&special_symbol=the86thoscar&pagesize=20',
                data : {'dpc' : 1},
                cache : true,
                jsonpCallback : 't' + Math.floor(Date.parse(new Date())/100000),
                success : function (d) {
                    if(d && d.result && d.result.status && d.result.status.code == 0){
                        var data = d.result.data,
                            dataLen = data.length,
                            $itemWrap, $item,
                            wbLink, vType, txtStr, reContStr;
                        $('#fin_bd_loading').hide(0);
                        $('#fin_bd_w').show(0);
                        $itemWrap = $('<div></div>');
                        var scrollStrArray = [];
                        for(var i = 0; i < dataLen; i ++){
                        	//1126 顶部单条填写内容
                        	if(i==0){
                        		topLink.html('<a href="javascript:;">'+data[i].content+'</a>')
                        	}
                        	if(i<5){
                        		//前五条填入横向滚动
                        		scrollStrArray.push('<span>['+data[i].format_created_time+']'+data[i].content+'</span>');
                        	}
                            if(data[i].re_user){
                                wbLink = 'http://weibo.com/' + data[i].re_uid + '/' + data[i].base62re_mid;
                                wbUserLink = 'http://weibo.com/' + data[i].re_uid;
                                vType = (data[i].re_user.verified) ? ((data[i].re_user.verified_type == 0) ? 'bd_v0' : 'bd_v1') : '';
                                reContStr = '\
                                    <div class="bd_rec">\
                                        <p class="bd_rec_tt"><a class="bd_rec_user ' + vType + '" href="' + wbUserLink + '" target="_blank">' + data[i].re_user.screen_name + '</a></p>\
                                        <p class="bd_rec_cont">' + data[i].re_content + '</p>\
                                    </div>';
                            }
                            else{
                                reContStr = '';
                            }
                            txtStr = (data[i].content == '转发微博' ? '' : data[i].content);
                            $item = $('\
                                <div class="bd_i">\
                                    <div class="bd_i_c">\
                                        <span class="bd_i_time">' + data[i].format_created_time + '</span>\
                                        <span class="bd_i_time_end">|</span>\
                                        <span class="bd_i_txt">' + txtStr + '</span>\
                                    </div>\
                                    ' + reContStr + '\
                                </div>');
                            $itemWrap.append($item);
                        }
                        $('#fin_bd_list').html('');
                        $('.hoverScroll .hsInner').html(scrollStrArray.join(''));
                        topLink.find('a').on('mouseover',function(){
                        	$('.hoverScroll').show();
                        	if(typeof(ScrollInterval)=='undefined'){
                        		ScrollInterval = setInterval(function(){
                        			
									ScrollLeft($(".hoverScroll")[0],$(".hoverScroll .hsInner").eq(0)[0],$(".hoverScroll .hsInner").eq(1)[0]);
								},20);	
                        	}else{
                        		clearInterval(ScrollInterval);
                        		ScrollInterval = setInterval(function(){
                        			
									ScrollLeft($(".hoverScroll")[0],$(".hoverScroll .hsInner").eq(0)[0],$(".hoverScroll .hsInner").eq(1)[0]);
								},20);
                        	}
                        	
                        });
                        topLink.find('a').on('mouseleave',function(){
                        	clearInterval(ScrollInterval);
                        	setTimeout(function(){
                        		$('.hoverScroll').hide();	
                        	},200);
                        	
                        });
                        topLink.find('a').on('click',function(){
                        	tab1.click();
                        	clearInterval(ScrollInterval);
                        	$('.hoverScroll').hide();	
                        });
                        $itemWrap.appendTo($('#fin_bd_list'));
                        bd_requesting = false;
                    }
                    else if(d && d.result && d.result.status && d.result.status.code == 11){
                        bd_requesting = false;
                        return;
                    }
                }
            });
        });
    }
    function _id(id){
        return document.getElementById(id);
    }
    function _getCookie(name) {
        var start = document.cookie.indexOf(name + "=");
        var len = start + name.length + 1;
        if ((!start) && (name != document.cookie.substring(0, name.length))) {
            return null;
        }
        if (start == -1) return null;
        var end = document.cookie.indexOf(';', len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));
    }

    function _setCookie(name, value, expires, path, domain, secure) {
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + '=' + escape(value) +
            ((expires) ? ';expires=' + expires_date.toGMTString() : '') +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ((secure) ? ';secure' : '');
    }
    function _deleteCookie(name, path, domain) {
        if (_getCookie(name)) document.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    }
})();