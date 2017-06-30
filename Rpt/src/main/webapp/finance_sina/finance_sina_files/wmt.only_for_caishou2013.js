if( typeof $ == 'undefined' )$ = function(t){return document.getElementById(t)};

if( typeof $C == 'undefined' )$C = function(t){return document.createElement(t)};

Function.prototype.Bind = function() { 
	var __m = this, object = arguments[0], args = new Array(); 
	for(var i = 1; i < arguments.length; i++){
		args.push(arguments[i]);
	}
	
	return function() {
		return __m.apply(object, args);
	}
};




var ScrTabCtrl = function () {
	this.Init.apply(this, arguments);
}
ScrTabCtrl.prototype = {
    nTimeout: 40,
    nRepeat: 8,
    nContentHeight: 128,
    nMoveTime: 0,
    Init: function (aData,callbacks,cfg)
    {
    	this.nContentHeight = cfg.nContentHeight || this.nContentHeight;
        this.oTitles = [];
        this.oContents = [];
        this.extraContents = [];
        this.oImgs = [];

        this._callbacks = callbacks;

        var tempDls = document.getElementById("wmt_" + aData.id).getElementsByTagName("DL");
        for(var i = 0;i < tempDls.length;i++)
        {
            if(tempDls[i].nodeType == 1 && aData.set[i][2] != "")
            {
                //				aData.set[i][2]不为空时，即配置项中没写图片地址时，不添加滚动效果
                for(var j = 0;j < tempDls[i].childNodes.length;j++)
                {
                    switch(tempDls[i].childNodes[j].tagName)
                    {
                        case "DT":
                            this.oTitles.push(tempDls[i].childNodes[j]);
                            break;
                    	case "DD":
                    		if(tempDls[i].childNodes[j].className)
                    		{
                    			this.extraContents.push(tempDls[i].childNodes[j]);
                    		}
                    		else
                    		{
                    			this.oContents.push(tempDls[i].childNodes[j]);
                    		}
                            break;
                    }
                };
            }
            else
            {
                var _arr = tempDls[i].className.split(' ');
                _arr.push('noscroll');
                tempDls[i].className = _arr.join(' ');
                //				不能滚动的列给出特别的样式提醒用户
            }
        };
        //		这个地方这样的写法有问题，如果一共有五个tab，中间两个没有图片，则接下来的tab会沿用本应跳过的序号
        //		导致接下来的回调加载图片无法获取对应的图片地址

        this.activeIndex = 0;


        for(var i = 0;i < this.oTitles.length;i++)
        {
            //			this.oTitles[i].onclick = this.start.Bind(this, i);
            this.oTitles[i].onmouseover = this.overCheck.Bind(this,i);
            this.oTitles[i].onmouseout = this.outCheck.Bind(this,i);
        };

        //		this.aColors = ColorCal.Init("ff0000", "ffd9d9", this.nRepeat);



        //		匀速滚动。如果要改回来，只需修改move方法中的两处
        //		this.nPace = this.nContentHeight / this.nRepeat;


        //		加速度滚动
        // obj_x += (cursor_x - obj_x) * k + (end_x - cursor_x)
        this.aPace = [];
        var _v = 0,k = 0.3,maxSteps = 20;
        for(var i = 0;i < maxSteps;i++)
        {
            var temp = _v;
            _v += (this.nContentHeight - _v) * k;
            this.aPace.push(Math.round(_v - temp));

            if(this.nContentHeight - _v < 3 || i == maxSteps - 1)
            {
                this.steps = this.aPace.length;
                break;
            }
        };

    },

    overCheck: function (i)
    {
        this.overTt = window.setTimeout(this.start.Bind(this,i),300);
    },

    outCheck: function ()
    {
        if(this.overTt)
        {
            window.clearTimeout(this.overTt);
        }
    },

    start: function (_index)
    {
        if(_index == this.activeIndex || this.bDisabled)
        {
            return;
        }
        if(this.oTitles[this.activeIndex])
        {
        	this.oTitles[this.activeIndex].className = this.oTitles[this.activeIndex].className.replace('active','');
        	this.extraContents[this.activeIndex] && (this.extraContents[this.activeIndex].style.display = 'none');
            //			this.oImgs[this.activeIndex].style.display = "none";
        }

        this.move(this.activeIndex,_index);

        this.activeIndex = _index;
        this.oTitles[this.activeIndex].className += " active";
        this.extraContents[this.activeIndex] && (this.extraContents[this.activeIndex].style.display = 'block');
        //		this.oImgs[this.activeIndex].style.display = "";
    },

    move: function (_activeIndex,_index)
    {
        if(this.nMoveTime == this.steps - 1)
        {
            //			this.oTitlePre.style.background = this.aColors[7];
            //			this.oTitleNow.style.background = this.aColors[0];
            this.oPre.style.height = "0px";
            this.oNow.style.height = this.nContentHeight + "px";
            //			window.clearTimeout(this.moveTO);
            this.nMoveTime = 0;
            this.bDisabled = 0;

            this._callbacks[this.activeIndex]();
            //			添加回调支持
            return;
        }
        if(this.nMoveTime == 0)
        {
            this.oPre = this.oContents[_activeIndex];
            this.oNow = this.oContents[_index];
            this.oTitlePre = this.oTitles[_activeIndex];
            this.oTitleNow = this.oTitles[_index];
            //			this.nMoveTime = 0;
            this.bDisabled = 1;
        }
        //		var a = this.oPre.clientHeight - this.nPace + "px";
        //		var b = this.oNow.clientHeight + this.nPace + "px";
        //		this.oTitlePre.style.background = this.aColors[this.nMoveTime + 1];
        //		this.oTitleNow.style.background = this.aColors[6 - this.nMoveTime];


        this.oPre.style.height = [this.oPre.clientHeight - this.aPace[this.nMoveTime],"px"].join('');
        this.oNow.style.height = [this.oNow.clientHeight + this.aPace[this.nMoveTime],"px"].join('');
        this.nMoveTime++;

        this.moveTO = window.setTimeout(this.move.Bind(this),this.nTimeout);
    }
}



//------------------------------------------------------------------------------
//tab switch
//鼠标over版本
//------------------------------------------------------------------------------
var TabSwitch = function(){
	this.Init.apply(this, arguments);
};
TabSwitch.prototype = {
	addEvent: function(obj,type,call)
	{
		if(obj.addEventListener)
		{
			obj.addEventListener(type,call,false);
		}
		else
		{
			obj.attachEvent('on' + type,call);
		}
	},
    Init: function (tabs,targets,type,subTargets,callbackObjArr)
    {
        this.tabs = [];
        var tempTabs = tabs.childNodes;
        for(var i = 0;i < tempTabs.length;i++)
        {
            if(tempTabs[i].nodeType == 1)
            {
                this.tabs.push(tempTabs[i]);
            }
        };
        this.activeTab = this.tabs[0];

        if(targets)
        {
            this.targets = [];
            var tempTargets = targets.childNodes;
            for(var j = 0;j < tempTargets.length;j++)
            {
                if(tempTargets[j].nodeType == 1)
                {
                    this.targets.push(tempTargets[j]);
                }
            };
            this.activeTarget = this.targets[0];
        }

        //		if (subTargets) {
        //			this.subTargets = [];
        //			var tempSubTargets = subTargets.childNodes;
        //			for (var h = 0; h < tempSubTargets.length; h++){
        //				if (tempSubTargets[h].nodeType == 1){
        //					this.subTargets.push(tempSubTargets[h]);
        //				}
        //			};
        //			this.activeSubTarget = this.subTargets[0];
        //		}

        if(callbackObjArr)
        {
            for(var k = 0;k < this.tabs.length;k++)
            {
            	this.addEvent(this.tabs[k],type || 'click',this.showTab.Bind(this,k,callbackObjArr[k]));
            }
        }
        else
        {
            if(type != "mouseover")
            {
                for(var k = 0;k < this.tabs.length;k++)
                {
                	this.addEvent(this.tabs[k],'click',this.showTab.Bind(this,k));
                }
            }
            else
            {
                for(var k = 0;k < this.tabs.length;k++)
                {
                	this.addEvent(this.tabs[k],'mouseover',this._over.Bind(this,k));
                	this.addEvent(this.tabs[k],'mouseout',this._hide.Bind(this,k));
                }
            }
        }
    },

    showTab: function (_index,callback)
    {
        if(this.tabs[_index] == this.activeTab)
        {
            return;
        }
        if(this.activeTab)
        {
        	this.activeTab.className = this.activeTab.className.replace('active','');
        }
        this.activeTab = this.tabs[_index];
        this.activeTab.className += " active";

        if(this.targets)
        {
            if(this.activeTarget)
            {
                this.activeTarget.style.display = "none";
            }
            this.activeTarget = this.targets[_index];
            this.activeTarget.style.display = "";
        }

        //		if (this.subTargets) {
        //			this.activeSubTarget.style.display = "none";
        //			this.activeSubTarget = this.subTargets[_index];
        //			this.activeSubTarget.style.display = "";
        //		}

        if(callback)
        {
            this.activeCallback = callback;
            callback();
        }
    },

    _over: function (obj,_index,callback)
    {
        this._timeout = window.setTimeout(this.showTab.Bind(this,obj,_index,callback),200);
    },

    _hide: function ()
    {
        if(this._timeout)
        {
            window.clearTimeout(this._timeout);
        }
    }
}



//http://finance.sina.com.cn/


var WmtHq_Ctrl = function(){
	this.Init.apply(this, arguments);
};
WmtHq_Ctrl.prototype = {
    _hqUrl: 'http://hq.sinajs.cn/rn=@RN@&list=',
    _hqTpl: '<ul class="@RG@"><li class="wmt_n">@TITLE@</li><li><span class="@PBG@">@P@</span></li><li><span class="@PBG@">@CG@</span></li><li><span class="@PBG@">@CGP@</span></li></ul>',
    _linkTpl: '<a href="@URL@" target="_blank">@NAME@</a>',
    _bfUrl: 'http://finance.sina.com.cn/',
    _nHqFqc: 5000,
    _nImgFqc: 60000,
	americaIndex:null,
    Init: function (oWmtdata)
    {
        this.oWmtdata = oWmtdata || window.oWmtdata;
        this._getIF();

        var _timeLoader = new SINAHQ_LOADER();
        _timeLoader.load("http://hq.sinajs.cn/?format=json&func=window.StandardBJTime=hq_json_sys_time;if%28typeof%28StandardBJTime_Callback%29==%27function%27%29StandardBJTime_Callback%28%29;&list=sys_time",this._start.Bind(this));

        //		3秒后如果时间接口没有返回，则默认启动亚洲tab
        this._alternativeStart = window.setTimeout(this.show.Bind(this,this.oWmtdata.asia),3000);
        if(this.oWmtdata.cfg)
        {
        	var _areaList = this.oWmtdata.cfg.areaList;
        	var _showList = [];
        	for(var i = 0;i < _areaList.length;i++)
        	{
        		if([_areaList[i]] == 'america')
        		{
        			this.americaIndex = i;
        		}
        		_showList.push(this.show.Bind(this,this.oWmtdata[_areaList[i]]));
        	}
        	this._tabCtrl = new TabSwitch(document.getElementById("wmt_tabs"),document.getElementById("wmt_contents"),this.oWmtdata.cfg.eventType || null,null,_showList);
        }
        else
        {
        	this._tabCtrl = new TabSwitch(document.getElementById("wmt_tabs"),document.getElementById("wmt_contents"),null,null,[this.show.Bind(this,this.oWmtdata.china),this.show.Bind(this,this.oWmtdata.asia),this.show.Bind(this,this.oWmtdata.america),this.show.Bind(this,this.oWmtdata.euro)]);
        }
		this.show(this.oWmtdata[this.oWmtdata.cfg.areaList[0]]);
    },

    _start: function ()
    {
        this.bjDate = new Date(window.StandardBJTime * 1000);
        //		21点25到7点切换至美股

        var _sTime = this.bjDate.getHours() * 100 + this.bjDate.getMinutes();
        var _day = this.bjDate.getDay();
        //		_sTime = 2210;
        //		_day = 0;

        if(_sTime >= 700 && _sTime < 2125)
        {
            this.show(this.oWmtdata.china);
        }
        else if(_day == 6 && _sTime <= 700)
        {
            this._tabCtrl.showTab(this.americaIndex,this.show.Bind(this,this.oWmtdata.america));

        }
        else if(_day != 0 && _day != 6)
        {
            this._tabCtrl.showTab(this.americaIndex,this.show.Bind(this,this.oWmtdata.america));
        }
        else
        {
            this.show(this.oWmtdata.china);
        }


    },


    //	这个方法专门用来获取最接近的期指代码，并替换到配置项当中去
    _getIF: function ()
    {
        if(window["hq_str_CFF_LIST"] && this.oWmtdata.china)
        {
            this._nextIF = window.hq_str_CFF_LIST.split(",")[0];

            for(var i = 0;i < this.oWmtdata.china.set.length;i++)
            {
                if(this.oWmtdata.china.set[i][1] == "期指")
                {
                    this.oWmtdata.china.set[i][0] = "CFF_" + this._nextIF;
                    this.oWmtdata.china.set[i][1] += this._nextIF.replace("IF","");
                    this.oWmtdata.china.set[i][2] = this.oWmtdata.china.set[i][2].replace("IF",this._nextIF);
                    this.oWmtdata.china.set[i][5] = this.oWmtdata.china.set[i][5].replace("IF",this._nextIF);
                    break;
                }
            };
        }
    },

    show: function (aData)
    {
        if(this._alternativeStart)
        {
            window.clearTimeout(this._alternativeStart);
        }

        this._sMarket = aData.id;
        this._oSetNow = aData.set;

        var _imgCallback = [];
        var _hqcodeNow = [];

        if(!this.oWmtdata[this._sMarket]._hqApi)
        {
            for(var i = 0;i < this._oSetNow.length;i++)
            {
                _imgCallback.push(this._loadImg.Bind(this,i));
                _hqcodeNow.push(this._oSetNow[i][0]);
            };
            this.oWmtdata[this._sMarket]._hqApi = this._hqUrl + _hqcodeNow.join(",");
        }


        if(!this.oWmtdata[this._sMarket]._containersNow)
        {
            this.oWmtdata[this._sMarket]._containersNow = [];
            var _tmpchilds = document.getElementById("wmt_" + aData.id).childNodes;

            for(var i = 0;i < _tmpchilds.length;i++)
            {
                if(_tmpchilds[i].nodeType == 1)
                {
                    this.oWmtdata[this._sMarket]._containersNow.push(_tmpchilds[i].firstChild.nodeType == 1 ? _tmpchilds[i].firstChild : _tmpchilds[i].firstChild.nextSibling);
                }
            };
        }


        this._loadhq();
        this._loadImg();

        if(!aData.hasscroll)
        {
        	aData.hasscroll = new ScrTabCtrl(aData,_imgCallback,{ nContentHeight: this.oWmtdata.cfg && this.oWmtdata.cfg.nContentHeight });
        }
    },

    _loadhq: function ()
    {
        if(this._hqtimeout)
        {
            window.clearTimeout(this._hqtimeout);
        }
        this._hqtimeout = window.setTimeout(this._loadhq.Bind(this),this._nHqFqc);

        if(!this._loader)
        {
            this._loader = new SINAHQ_LOADER();
        }
        this._loader.load(this.oWmtdata[this._sMarket]._hqApi.replace("@RN@",(new Date()).getTime()),this._fill.Bind(this));
    },

    _fill: function ()
    {
        for(var i = 0;i < this._oSetNow.length;i++)
        {
            //PATCH 20101229 切换页面导致script加载取消
            var str = window[["hq_str_",this._oSetNow[i][0]].join("")];
            if(str)
            {
                var sData = str.split(",");
                //			alert(sData);
                var _aHtml = this._parseData(sData,this._oSetNow[i],i);

                if(_aHtml[0] != "")
                {
                    if(_aHtml.length > 1)
                    {
                        this._setHtml(_aHtml[1],this.oWmtdata[this._sMarket]._containersNow[i]);
                        window.setTimeout(this._setHtml.Bind(this,_aHtml[0],this.oWmtdata[this._sMarket]._containersNow[i]),1000);
                    }
                    else
                    {
                        this._setHtml(_aHtml[0],this.oWmtdata[this._sMarket]._containersNow[i]);
                    }
                }
            }
            //			this.oWmtdata[this._sMarket]._containersNow[i].innerHTML = _aHtml[0];
        };
    },

    _setHtml: function (sHtml,oContainer)
    {
        oContainer.innerHTML = sHtml;
    },
    _makeUrl: function (base,more)
    {
        if(/^http/.test(more))
        {
            return more;
        }
        else
        {
            return base + more;
        }
    },
    _parseData: function (sData,aSet,index)
    {
        var _tmpHTML = '';

        switch(aSet[3])
        {
            case "cn":
                var _redorgreen = this._setColorClass((sData[2] * 1),aSet[4]);
                var _price = (sData[1] * 1).toFixed(2);

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",(sData[2] * 1) > 0 ? "+" + (sData[2] * 1).toFixed(2) : (sData[2] * 1).toFixed(2)],
					["@CGP@",(sData[3] * 1) > 0 ? ["+",sData[3],"%"].join("") : [sData[3],"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "hk":
                var _redorgreen = this._setColorClass((sData[7] * 1),aSet[4]);
                var _price = sData[6];

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",(sData[7] * 1) > 0 ? "+" + sData[7] : sData[7]],
					["@CGP@",(sData[8] * 1) > 0 ? ["+",sData[8],"%"].join("") : [sData[8],"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "bb":
                var _redorgreen = this._setColorClass((sData[2] * 1),aSet[4]);
                var _price = sData[1];

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",aSet[1]],
					["@P@",_price],
					["@CG@",(sData[2] * 1) > 0 ? "+" + sData[2] : sData[2]],
					["@CGP@",(sData[3] * 1) > 0 ? ["+",sData[3],"%"].join("") : [sData[3],"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "us":
                var _redorgreen = this._setColorClass((sData[2] * 1),aSet[4]);
                var _price = sData[1];

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",(sData[4] * 1) > 0 ? "+" + sData[4] : sData[4]],
					["@CGP@",(sData[2] * 1) > 0 ? ["+",sData[2],"%"].join("") : [sData[2],"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "fu":
                var _change = sData[0] - sData[7];
                var _redorgreen = this._setColorClass(_change,aSet[4]);
                var _price = (sData[0] * 1).toFixed(2);

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",_change > 0 ? "+" + _change.toFixed(2) : _change.toFixed(2)],
					["@CGP@",_change > 0 ? ["+",(_change / sData[7] * 100).toFixed(2),"%"].join("") : [(_change / sData[7] * 100).toFixed(2),"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "gzqh":
                var _change = sData[3] - sData[14];
                var _redorgreen = this._setColorClass(_change,aSet[4]);
                var _price = (sData[3] * 1).toFixed(2);

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",_change > 0 ? "+" + _change.toFixed(2) : _change.toFixed(2)],
					["@CGP@",_change > 0 ? ["+",(_change / sData[14] * 100).toFixed(2),"%"].join("") : [(_change / sData[14] * 100).toFixed(2),"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case "npqh":
                var _change = sData[8] - sData[10];
                var _redorgreen = this._setColorClass(_change,aSet[4]);
                var _price = (sData[8] * 1).toFixed(0);

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",_change > 0 ? "+" + _change.toFixed(0) : _change.toFixed(0)],
					["@CGP@",_change > 0 ? ["+",(_change / sData[10] * 100).toFixed(2),"%"].join("") : [(_change / sData[10] * 100).toFixed(2),"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
            case 'forex':
                var _change = sData[8] - sData[3];
                var _redorgreen = this._setColorClass(_change,aSet[4]);
                var _price = (sData[8] * 1).toFixed(4);

                if(this._oSetNow[index].prePrice && this._oSetNow[index].prePrice == _price)
                {
                    _tmpHTML = "";
                }
                else
                {
                    _tmpHTML = this._tplReplace(this._hqTpl,[
					["@TITLE@",this._linkTpl.replace("@URL@",this._makeUrl(this._bfUrl,aSet[5])).replace("@NAME@",aSet[1])],
					["@P@",_price],
					["@CG@",_change > 0 ? "+" + _change.toFixed(4) : _change.toFixed(4)],
					["@CGP@",_change > 0 ? ["+",(_change / sData[3] * 100).toFixed(4),"%"].join("") : [(_change / sData[3] * 100).toFixed(4),"%"].join("")],
					["@RG@",_redorgreen]
				]);
                }
                break;
        }


        //		加了箭头指示，缺陷是，箭头会一直存在，直至下一次价格有变动
        //		if (this._oSetNow[index].prePrice && this._oSetNow[index].prePrice - _price != 0) {
        //			var _arrow = this._oSetNow[index].prePrice - _price > 0 ? "↓" : "↑";
        //		}
        //		else {
        //			var _arrow = "";
        //		}
        //		_tmpHTML = _tmpHTML.replace("@AR@", _arrow);


        var _aHTML = this._oSetNow[index].prePrice ? [_tmpHTML.replace(/@PBG@/g,""),_tmpHTML.replace(/@PBG@/g,_redorgreen)] : [_tmpHTML.replace("@PBG@","")];
        //		var _aHTML = [_tmpHTML.replace(/@PBG@/g, ""), _tmpHTML.replace(/@PBG@/g, _redorgreen)];
        this._oSetNow[index].prePrice = _price;

        return _aHTML;
    },

    _checkPrice: function ()
    {
        alert("");
    },

    _setColorClass: function (value,rog)
    {
        switch(rog)
        {
            case "redup":
                return value != 0 ? (value > 0 ? "rup" : "gdown") : "";
                break;
            case "greenup":
                return value != 0 ? (value > 0 ? "gup" : "rdown") : "";
                break;
        }
    },

    _tplReplace: function (targetTpl,dataArr)
    {
        for(var i = 0;i < dataArr.length;i++)
        {
            targetTpl = targetTpl.replace(dataArr[i][0],dataArr[i][1]);
        };

        return targetTpl;
        //		targetContainer.innerHTML = targetTpl;
    },

    _loadImg: function (sID)
    {
        if(!this.oWmtdata[this._sMarket].activeImg)
        {
            this.oWmtdata[this._sMarket].activeImg = 0;
        }


        //		滑动时回调，传sID进来，若图已初始化，则不强行读取，由更新线程更新
        if(sID != undefined)
        {
            this.oWmtdata[this._sMarket].activeImg = sID;
            if(this._oSetNow[this.oWmtdata[this._sMarket].activeImg].imgLoaded)
            {
                return;
            }
        }


        if(this._imgtimeout)
        {
            window.clearTimeout(this._imgtimeout);
        }
        this._imgtimeout = window.setTimeout(this._loadImg.Bind(this),this._nImgFqc);

        var _index = this.oWmtdata[this._sMarket].activeImg;

        if(this._oSetNow[_index][2] != "")
        {
            this._fillImg(this._oSetNow[_index],_index)
        }

        //		表明已初始化
        if(!this._oSetNow[_index].imgLoaded)
        {
            this._oSetNow[_index].imgLoaded = true;
        }



    },

    _fillImg: function (aSet,index)
    {
    	var _oTemp = this.oWmtdata[this._sMarket]._containersNow[index].nextSibling;
    	while(_oTemp.nodeType != 1 || _oTemp.className)
    	{
    		_oTemp = _oTemp.nextSibling;
    	}
    	var _container = _oTemp;
        var _img = new Image();
        _img.src = [aSet[2],"?",(new Date()).getTime()].join("");
        if(isIE)
        {
            _img.onreadystatechange = this.insertBc.Bind(this,_container,_img,aSet[5]);
        }
        else
        {
            _img.onload = this.insertBc.Bind(this,_container,_img,aSet[5]);
        }
    },

    insertBc: function (_container,_img,_haslink)
    {
        if(_img.onreadystatechange)
        {
            if(_img.readyState != 'loaded' && _img.readyState != 'complete')
            {
                return;
            }
        }

        _container.innerHTML = "";

        if(_haslink != "")
        {
            var _link = $C("A");
            _link.target = "_blank";
            _link.href = this._makeUrl(this._bfUrl,_haslink);
            _link.appendChild(_img);
            _container.appendChild(_link);
        }
        else
        {
            _container.appendChild(_img);
        }
    }
}



var WmtHq_Ctrl_Multi = function ()
{
    this.Init.apply(this,arguments);
};
for(var p in WmtHq_Ctrl.prototype)
{
    WmtHq_Ctrl_Multi.prototype[p] = WmtHq_Ctrl.prototype[p];
}
WmtHq_Ctrl_Multi.prototype.Init = function (oWmtdata,objData)
{
    this.oWmtdata = oWmtdata || window.oWmtdata;
    this.objData = objData;
    this._getIF();

    var _timeLoader = new SINAHQ_LOADER();
    var _callArr = [];
    for(var p in this.oWmtdata)
    {
        _callArr.push(this.show.Bind(this,this.oWmtdata[p]));
    }
    this._tabCtrl = new TabSwitch(document.getElementById(this.objData.wmt_tabs),document.getElementById(this.objData.wmt_contents),null,null,_callArr);
    _callArr[0]();
};



var isIE = false;
var userAgent = navigator.userAgent.toLowerCase();
if ((userAgent.indexOf('msie') != -1) && (userAgent.indexOf('opera') == -1)) {
	isIE = true;
}


//if(typeof IO == 'undefined' )IO = {};
var SINAHQ_LOADER = function(){
	this.Init.apply(this, arguments);
};

SINAHQ_LOADER.prototype = {
	_scriptCharset: 'gb2312',
	_oScript: null,
	
	/**
	 * Constructor
	 * 
	 * @param {Object} opts
	 */
	Init : function(opts){
		this._setOptions(opts);
	},
	
	_setOptions: function(opts) {
		if (typeof opts != 'undefined') {
			if (opts['script_charset']) {
				this._scriptCharset = opts['script_charset'];
			}
		}
	},
	
	_clearScriptObj: function() {
		if (this._oScript) {
			try {
				this._oScript.onload = null;
				if (this._oScript.onreadystatechange) {
					this._oScript.onreadystatechange = null;
				}
				
				this._oScript.parentNode.removeChild(this._oScript);
				//this._oScript = null;
			} catch (e) {
				// Do nothing here
			}
		}
	},
	
	_callbackWrapper: function(callback) {
		if (this._oScript.onreadystatechange) {
			if (this._oScript.readyState != 'loaded' && this._oScript.readyState != 'complete') {
				return;
			}
		}
		
		if (typeof callback != 'undefined') {
			callback();
		}
		
		this._clearScriptObj();
	},
	
	load: function(url, callback){
		this._oScript = document.createElement('SCRIPT');
		this._oScript.type = "text/javascript";
		
		if (isIE) {
			this._oScript.onreadystatechange = this._callbackWrapper.Bind(this, callback);
		} else {
			this._oScript.onload = this._callbackWrapper.Bind(this, callback);
		}
		
		this._oScript.charset = this._scriptCharset;
		this._oScript.src = url;
		
		document.getElementById("wmt_loader").appendChild(this._oScript);
	}
} 


function wmtstart() {
	window.wmthqctrl = new WmtHq_Ctrl();
}