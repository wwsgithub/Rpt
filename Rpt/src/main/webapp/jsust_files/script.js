$(function(){
	//顶部导航
	$("#top-nav>li").hover(function(){
		if($(this).find(".sub-nav").length>0){
			$(this).addClass("current")
			$(this).find(".sub-nav").show();
		}
	},function(){
		if($(this).find(".sub-nav").length>0){
			$(this).removeClass("current")
			$(this).find(".sub-nav").hide();
		}
	});
	//搜索
	$("#search-ipt").focus(function(){
		var txt = $.trim($(this).val());
		if(txt==this.defaultValue){
			$(this).val("");
		}
	});
	$("#search-ipt").blur(function(){
		var txt = $.trim($(this).val());
		if(txt==""){
			$(this).val(this.defaultValue);
		}
	});
	$("#search-form").submit(function(e) {
        var txt = $.trim($("#search-ipt").val());
		if(txt=="" || txt=="输入关键词"){
			alert("请输入关键词");
			return false;
		}
    });
	
	//导航
	
	if($("#nav>ul>li>ul.sub-nav").length>0){
		//点击弹出菜单
		/*var menuOpen = false;
		$("#nav>ul>li").click(function(){
			if(menuOpen){
				$(this).children(".sub-nav").stop().slideUp();
				menuOpen = false;
			}else{
				$(this).children(".sub-nav").stop().slideDown();
				menuOpen = true;
			}
		});*/
		//鼠标经过弹出菜单（个人觉得比较合理）
		$("#nav>ul>li").hover(function(){
			if($(this).children(".sub-nav").length <= 0 || $(this).children(".sub-nav").queue().length>0) return;
			$(this).children(".sub-nav").stop().slideDown(0);
		},function(){
			if($(this).children(".sub-nav").length <= 0 || $(this).children(".sub-nav").queue().length>0) return;
			$(this).children(".sub-nav").stop().slideUp(0);
		});
	}
	
	//新闻列表
	function tab(tabId,conId){
		$(tabId+">li").each(function(index,el){
			$(this).hover(function(){
				$(this).addClass("current").siblings().removeClass("current");
				setTimeout(function(){
					$(conId).eq(index).show().siblings(conId).hide();
				},200)
			});
		});
	}
	tab("#left-nav",".left-con");
	tab("#mid-nav",".mid-con");
	
//图片放大镜

	$(".jqzoom").jqzoom({zoomHeight:400,title:false}); 


	//滚动图片
	/*(function(){
		var imgIndex=0,len = $("#banner>ul>li").length,timer,winWidth = $(window).width();
		$("#banner>ul>li").width(winWidth)
		$("#banner>ul").width(winWidth*len);
		function move(index){
			//$("#banner>ul").animate({"margin-left":-index*winWidth},500);
			$("#banner>ul>li").hide();
			$("#banner>ul>li:eq("+index+")").fadeIn(500);
		}
		$("#banner").find(".pre").click(function(){
			imgIndex--;
			if(imgIndex<0){imgIndex = len-1;}
			move(imgIndex);
		});
		$("#banner").find(".next").click(function(){
			imgIndex++;
			if(imgIndex>=len){imgIndex = 0;}
			move(imgIndex);
		});
		$("#banner").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				imgIndex++;
				if(imgIndex>=len){imgIndex = 0;}
				move(imgIndex);
			},6000);
		}).trigger("mouseout");
	})();*/
	
});


(function($) {
	var matched, browser; // Use of jQuery.browser is frowned upon.
	// More details: http://api.jquery.com/jQuery.browser
	// jQuery.uaMatch maintained for back-compat
	$.uaMatch = function(ua) {
		ua = ua.toLowerCase();
		var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
		return {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	};
	matched = jQuery.uaMatch(navigator.userAgent);
	browser = {};
	if (matched.browser) {
		browser[matched.browser] = true;
		browser.version = matched.version;
	} // Chrome is Webkit, but Webkit is also Safari.
	if (browser.chrome) {
		browser.webkit = true;
	} else if (browser.webkit) {
		browser.safari = true;
	}
	$.browser = browser;
})(jQuery);

/** 
 * JQuery广告代码 
 */  
ad ={  
    basePath: '',  
    content: [],  
    floatDivs: [],  
    closeHtml : '<div class="close" style="">X关闭</div>',
//<img class="close" width="66px" height="22px" src="'+this.basePath+'/statics/images/close.gif">',  
    showAD: function(){  
        for(var i =0; i<this.content.length; i++){  
            var adConfig = this.content[i];  
            if(adConfig && adConfig.isOpen){   
                this.generateHtml(adConfig);  
            }  
        }  
          
        this.maxTop = jQuery(window).height() + jQuery(window).scrollTop() - 1 ;  //设置浮动时的最大高度
        this.maxLeft = jQuery(window).width() + jQuery(window).scrollLeft() - 1; //设置浮动时的最大宽度
        this.floatStrat();  
    },  
    generateHtml: function(o){  /*生成包含关闭的Html代码*/  
        var adHtml = this.generateADHtml(o);  
        var adDiv = jQuery("<div class='ads'/>");  
        var divHeight = o.height + (o.allowClose? 22 : 0);  
        adDiv.css({height: divHeight +"px", width: o.width+"px"});  
        adDiv.top = o.top || (jQuery(window).height() - divHeight);  
        var tableHtml = "";  
        switch(o.position){  
            case "left":  
                adDiv.css({left:'0px', top:o.top+'px'});  
                tableHtml = this.generateTableHtml(adHtml,o.allowClose? this.closeHtml:null);  
                break;  
            case "right":  
                adDiv.css({right:'0px', top:o.top+'px'});  
                tableHtml = this.generateTableHtml(adHtml,o.allowClose? this.closeHtml:null);  
                break;  
            case "bottom":  
                adDiv.css({right:'0px',bottom:'0px'});  
                tableHtml = this.generateTableHtml(o.allowClose? this.closeHtml:null, adHtml);  
                break;  
            case "float":  
                adDiv.css({left:o.left + 'px', top: o.top + 'px',position:'absolute'});  
                tableHtml = this.generateTableHtml(adHtml,o.allowClose? this.closeHtml:null);  
                this.addFloatDiv(adDiv);  
                break;  
        };  
        adDiv.append(jQuery(tableHtml));  
        adDiv.appendTo("body");  
        adDiv.find(".close").bind("click",function(){adDiv.hide()});  
          
        if(jQuery.browser.msie && jQuery.browser.version <= 6 && o.position != 'float'){/*如果是IE6及以下版本*/  
            jQuery(window).scroll(function(){  
                if(adDiv.css("display") != "none"){  
                    var windowTop=jQuery(window).scrollTop();  
                    adDiv.animate({top:adDiv.top +windowTop+"px"},{duration:800,queue:false});  
                }  
            });  
        }  
    },  
    generateADHtml: function(o){    /*生成广告的内容*/  
        var str = '<a target="_blank" href="' + o.href +'">'  
        if(o.type=="img"){  
            str += '<img src="' + o.src  + '" width="'+o.width+'px" height="'+ o.height+'px"/>'  
        }else if(o.type=="flash"){  
            str += "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='"+o.width+"' height='"+o.height+"' >";  
            str += "<param name='movie' value='"+this.basePath + o.src +"' />";   
            str += "<param name='quality' value='high' />";  
            str += "<param name='wmode' value='transparent'/>";  
            str += "<param name='swfversion' value='8.0.35.0' />";  
            str += "<embed wmode='transparent' src='"+this.basePath + o.src+"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+o.width+"' height='"+o.height+"'></embed>";  
            str += "</object>";  
        }  
        return str + "</a>";  
    },  
    generateTableHtml: function(s1, s2){  
        var tableBegin = "<table>";  
        if(s1){  
            tableBegin = tableBegin + "<tr><td>" +  
                    s1 + "</td></tr>";  
        }  
        if(s2){  
            tableBegin = tableBegin + "<tr><td>" +  
                    s2 + "</td></tr>";  
        }  
        tableBegin = tableBegin + "</table>";  
        return tableBegin;  
    },  
    floatStrat: function(){  
        var hasFloatDiv = false;  
        for(var i = 0 ; i<this.floatDivs.length; i++){  
            var ad = this.floatDivs[i];  
            hasFloatDiv = hasFloatDiv || ad.css("display") != "none";  
            if(ad.css("display") != "none" && ad.autoMove == true){  
                var curTop = parseInt(ad.css("top"));  
                var curLeft = parseInt(ad.css("left"));  

               // if(jQuery(window).height()+ jQuery(window).scrollTop() - 1 < this.maxTop){  
                    this.maxTop = jQuery(window).height() + jQuery(window).scrollTop() - 1;  
                //}  
                //if(jQuery(window).width() + jQuery(window).scrollLeft() - 1 < this.maxLeft){  
                    this.maxLeft = jQuery(window).width() + jQuery(window).scrollLeft() - 1;  
                //}
                if(ad[0].offsetWidth + curLeft > this.maxLeft)   
                {   
                    curLeft = jQuery(window).scrollLeft() + jQuery(window).width() - ad[0].offsetWidth;   
                    ad.dirW = false;   
                }   
                if(ad[0].offsetHeight + curTop > this.maxTop)   
                {   
                    curTop = jQuery(window).scrollTop() + jQuery(window).height() - ad[0].offsetHeight;   
                    ad.dirH = false;   
                }   
                if(curLeft <= jQuery(window).scrollLeft())   
                {   
                    curLeft = jQuery(window).scrollLeft();   
                    ad.dirW = true;   
                }   
                if(curTop <= jQuery(window).scrollTop())   
                {   
                    curTop = jQuery(window).scrollTop();   
                    ad.dirH = true;   
                }  
                curLeft = curLeft + (ad.dirW ? 5 : -5) + "px";  
                curTop = curTop + (ad.dirH ? 5 : -5) + "px"  
                ad.css({left:curLeft, top:curTop});  
                  
            }  
        }  
        if(hasFloatDiv){  
            setTimeout("ad.floatStrat()", 200);  
        }  
    },  
    addFloatDiv: function(o){  
        o.autoMove = true;  
        o.dirH = true; /*纵向移动,true:向下;false:向上,默认向下*/  
        o.dirW = true; /*横向移动,true:向右;false:向左,默认向右*/  
        o.bind("mouseover",function(){o.autoMove = false});  
        o.bind("mouseout",function(){o.autoMove = true});  
        this.floatDivs.push(o);  
    }  
}  
  