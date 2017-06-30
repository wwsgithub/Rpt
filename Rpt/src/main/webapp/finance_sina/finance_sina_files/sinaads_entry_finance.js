(function() {
    var setCookie = function (key, value, options) {
        options = options || {};

        // 计算cookie过期时间
        var expires = options.expires;
        if ('number' === typeof options.expires) {
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires);
        }
        document.cookie =
            key + "=" + value +
            (options.path ? "; path=" + options.path : "") +
            (expires ? "; expires=" + expires.toGMTString() : "") +
            (options.domain ? "; domain=" + options.domain : "") +
            (options.secure ? "; secure" : '');

    }




    var addEvent = function(obj, eventType, func) {
        if(obj.attachEvent) {
            obj.attachEvent("on" + eventType, func);
        } else {
            obj.addEventListener(eventType, func, false);
        }
    };
    /**
     * 定向标识(点击后种下)
     * @param  {String} 文字链的容器id
     * @param  {String} 标识值
     * @param  {String} 点击监测
     */
    var sinaads_entry_fn = function(id,value,url, cancelBubble){
        // var links;
        // try {
        //     links = document.getElementById(id).getElementsByTagName("a");
        // }catch(e) {
        //     links = [];
        // }

        // for (var i = 0, len = links.length; i < len; i++) {
        //     //不是商广节点, 这里有时序关系，如果广告先加载，会获取到广告，如果广告后加载，这里就不会被注入
        //     if ('INS' === links[i].parentNode.tagName.toUpperCase() && links[i].parentNode.className.indexOf('sinaads') !== -1) {
        //     } else {
        //         addEvent(links[i], "mousedown", function() {
        //             setCookie("sinaads_entry",value,{"path":"/","domain":".sina.com.cn","expires":24*3600000});
        //             //点击监测
        //             if(url){
        //                 var _clickStat = new Image();
        //                 _clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
        //             }
        //         });
        //     }
        // }
        try {
            addEvent(document.getElementById(id), 'mousedown', function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                if (target.tagName.toLowerCase() === 'a'
                    && target.getAttribute('href').length > 0) {
                    setCookie("sinaads_entry", value, {
                        "path": "/",
                        "domain": ".sina.com.cn",
                        "expires": 60000
                    });
                    if(url){
                        var _clickStat = new Image();
                        _clickStat.src = url + "&_=" + new Date().getTime() + "&url=";
                    }
                    if (cancelBubble) {
                        event.cancelBubble = true;
                        event.stopPropagation && event.stopPropagation();
                    }
                }
            });
        } catch (e) {}
    }

    ////要闻聚焦 begin
    //sinaads_entry_fn("blk_hdline_01","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_samsung_id","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_samsung_id_02","zheshang,huaxia", undefined, true);
    ////要闻聚焦 end
    //
    ////浙商要闻聚焦
    //sinaads_entry_fn("directAd_dell_fidx_01","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_02","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_03","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_04","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_05","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_06","zheshang,huaxia", undefined, true);
    //sinaads_entry_fn("directAd_dell_fidx_title","zheshang,huaxia", undefined, true);
    ////浙商要闻聚焦 end
    //
    //sinaads_entry_fn("directAd_huaxia", "huaxia");
    //
    ////华安基金 begin
    //
    //sinaads_entry_fn("directAd_huaan_01","huaan");
    //sinaads_entry_fn("directAd_huaan_02","huaan");
    //sinaads_entry_fn("directAd_huaan_03","huaan");
    //sinaads_entry_fn("directAd_huaan_04","huaan");
    //sinaads_entry_fn("directAd_huaan_05","huaan");
    ////华安基金 end
    //
    ////迎驾贡酒 begin
    //sinaads_entry_fn("directAd_gongjiu_id","yinjiagongjiu");
    ////迎驾贡酒 end

})()