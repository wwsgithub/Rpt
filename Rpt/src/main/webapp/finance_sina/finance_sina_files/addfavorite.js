(function(){
    var btn_addfav = _id('btn_addfav');
    var addfav_pop = _id('addfav_pop');
    var addfav_close = _id('addfav_close');
    var addfav_key = _id('addfav_key');
    var org_favpop_cls;
    var isMac = _isMac();
    if(isMac){
        org_favpop_cls = addfav_pop.className = 'addfav_pop addfav_pop_nowin';
        addfav_key.innerHTML = '\u2318+D';
    }
    else{
        org_favpop_cls = 'addfav_pop';
    }
    _addEvent(btn_addfav, 'click', function () {
        var popCls = addfav_pop.className;
        if(popCls.indexOf('pullDown') > -1){
            addfav_pop.className = org_favpop_cls;
        }
        else{
            addfav_pop.className = org_favpop_cls + ' pullDown';
        }
    });
    _addEvent(addfav_close, 'click', function () {
        addfav_pop.className = org_favpop_cls;
    });
    function _id (id) {
        return document.getElementById(id);
    }
    function _isMac(){
        if(navigator.userAgent.indexOf("Mac OS X") > 0 && navigator.userAgent.indexOf("Windows") == -1) {  
            return true;  
        }
    }
    function _addEvent (obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj[type + fn] = function() {
                obj["e" + type + fn](window.event);
            }
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    }
})();