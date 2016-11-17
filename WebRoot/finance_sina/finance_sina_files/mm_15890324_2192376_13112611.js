(function(doc, w) {
    var pid = "mm_15890324_2192376_13112611"
    var saxlist = {
        "mm_15890324_2192376_8654451": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0Mg%3D%3D",
        "mm_15890324_2192376_9027674": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0Mg%3D%3D",
        "mm_15890324_2192376_9626783": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0NA%3D%3D",
        "mm_15890324_2192376_9164558": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0Ng%3D%3D",
        "mm_15890324_2192376_13096223": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1OQ%3D%3D",
        "mm_15890324_2192376_9022374": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1NQ%3D%3D",
        "mm_15890324_2192376_9067732": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1NQ%3D%3D",
        "mm_15890324_2192376_11153435": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0MA%3D%3D",
        "mm_15890324_2192376_11153358": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1Ng%3D%3D",
        "mm_15890324_2192376_23114697": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc2MA%3D%3D",
        "mm_15890324_2192376_13112611": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc0Mw%3D%3D",
        "mm_15890324_2192376_11134171": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc2OQ%3D%3D",
        "mm_15890324_2192376_11153352": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1MA%3D%3D",
        "mm_15890324_2192376_13776168": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1MQ%3D%3D",
        "mm_15890324_2192376_16138708": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3Nw%3D%3D",
        "mm_15890324_2192376_23736178": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1Mw%3D%3D",
        "mm_15890324_2192376_29750119": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1NA%3D%3D",
        "mm_15890324_2192376_25140079": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3MA%3D%3D",
        // mobile
        "mm_15890324_8176878_28006157": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3Mw%3D%3D",
        "mm_15890324_8176878_30042709": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3NA%3D%3D",
        "mm_15890324_8176878_28008044": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3NQ%3D%3D",
        "mm_15890324_8176878_30034679": "http://sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc3Ng%3D%3D"
    }
    var currentScript = doc.currentScript;
    if(!doc.getElementById('tanx-a-'+pid)){
        doc.body.appendChild((function(){
            var o = doc.createElement("a");
            o.style.display = "none";
            o.id = "tanx-a-"+pid;
            return o;
        })())
    }

    function ali(k, p) {
        var M = Math;
        var cache = M.floor(268435456 * M.random()).toString(16),
            url = "//log.mmstat.com/tanx." + k + "?cache=" + cache + "&gmkey=&gokey=" + p + "&cna=&isbeta=3&spm-cnt=&logtype=2",
            a = new Image(),
            n = "_img_" + M.random();
        w[n] = a;
        a.onload = a.onerror = function() {
            w[n] = null
        };
        a.src = url;
    }

    function sax(url) {
        if (!url) return;
        var img = new Image();
        w[Math.random().toString(16).substring(2)] = img;
        img.src = url;
    };

    if (!currentScript) {
        var scripts = doc.getElementsByTagName('script');
        currentScript = scripts[scripts.length - 1];
        for (var i = scripts.length - 1; i >= 0; i--) {
            var script = scripts[i];
            if (script.readyState === 'interactive') {
                currentScript = script;
            }
        }
    }
    var uuid = currentScript.src.match(/[?&]uuid=([^&]*)/i)[1];
    var p = encodeURIComponent("aa=&bb=" + pid + "&cc=" + uuid);
    // document.write('<a  style="display:none!important"  id="tanx-a-'+pid+'"></a>');
    var tanx_s = doc.createElement("script");
    tanx_s.type = "text/javascript";
    tanx_s.charset = "gbk";
    tanx_s.id = "tanx-s-" + pid;
    tanx_s.async = true;
    tanx_s.src = "http://p.tanx.com/ex?i=" + pid;
    var tanx_h = doc.getElementsByTagName("head")[0];
    if (tanx_h) tanx_h.insertBefore(tanx_s, tanx_h.firstChild);
    ali('709', p);
    sax(saxlist[pid]);
})(document, window);
