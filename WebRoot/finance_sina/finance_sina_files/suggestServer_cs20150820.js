var SuggestServer = function ()
{
    this._stringOriginalUrl = "http://suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@";
    this._stringUrl = "";
    this._elementScriptLoader = null;
    this._elementContainer = null;
    this._elementMore = null;
    this._stringOriginalValue = "";
    this._stringLastValue = "";
    this._functionCallback = null;
    this._elementLineCurrent = null;
    this._objectHtml = {};
    this._objectData = {};
    this._booleanHideDelay = false;
    this._stringBrowserType = "";
    this._objectType = {
        "11": "A 股","12": "B 股","13": "权证","14": "期货","15": "债券",
        "21": "开基","22": "ETF","23": "LOF","24": "货基","25": "QDII","26": "封基",
        "31": "港股","32": "窝轮","33":"港指数",
        "41": "美股","42": "外期",
		'81':'债券','82':'债券',"111":"A股","71":"外汇"
    };
    this._objectConfig = {
        "input": null,
        "loader": null,
        "value": null,
        "default": null,
        "type": 0,
        "max": 10,
        "width": 220,
        "link": null,
        "target": "_blank",
        "head": ["选项","代码","名称"],
        "body": [-1,2,4],
        "fix": {
            "firefox": [1,1]
        },
        "onshow": function () { },
        "onhide": function () { },
        "hideSelectForIE6": false,
        "callback": null
    };
    this._getElement = function (__stringId)
    {
        return document.getElementById(__stringId);
    };
    this._getRandom = function ()
    {
        return (new Date()).getTime();
    };
    this._bind = function (__functionBind,__argumentsBind)
    {
        var __this = this;
        return function ()
        {
            var __arguments = null;
            if(typeof __argumentsBind != "undefined")
            {
                for(var i = 0;i < arguments.length;i++)
                {
                    __argumentsBind.push(arguments[i]);
                }
                __arguments = __argumentsBind;
            }
            else
            {
                __arguments = arguments;
            }
            return __functionBind.apply(__this,__arguments);
        };
    };
    this._aevent = function (__elementTarget,__stringType,__functionEvent)
    {
        if(window.addEventListener)
        {
            __elementTarget.addEventListener(__stringType,__functionEvent,false);
        } else if(window.attachEvent)
        {
            __elementTarget.attachEvent("on" + __stringType,__functionEvent);
        }
    };
    this._position = function ()
    {
        var __intPositionTop = 0;
        var __intPositionLeft = 0;
        var __elementTarget = this._elementInput;
        do
        {
            __intPositionTop += __elementTarget.offsetTop || 0;
            __intPositionLeft += __elementTarget.offsetLeft || 0;
            if(__elementTarget.style.position != "relative")
            {
                break;
            }
            __elementTarget = __elementTarget.offsetParent;
        } while(__elementTarget);
        var __arrayBorders = [this._elementInput.parentNode.style.borderTopWidth.replace("px","") * 1,this._elementInput.parentNode.style.borderLeftWidth.replace("px","") * 1];
        __arrayPositionFix = [0,0];
        if(this._elementContainer.style.top != __intPositionTop + "px")
        {
            this._elementContainer.style.top = __intPositionTop - __arrayBorders[0] + __arrayPositionFix[0] + "px";
        }
        if(this._elementContainer.style.left != __intPositionLeft + "px")
        {
            this._elementContainer.style.left = __intPositionLeft - __arrayBorders[1] + __arrayPositionFix[1] + "px";
        }
        var __stringInputBorderTopWidth = this._elementInput.style.borderTopWidth;
        var __stringInputBorderBottomWidth = this._elementInput.style.borderBottomWidth;
        var __intInputMarginTop = this._elementInput.clientHeight;
        __intInputMarginTop += __stringInputBorderTopWidth != "" ? __stringInputBorderTopWidth.replace("px","") * 1 : 2;
        __intInputMarginTop += __stringInputBorderBottomWidth != "" ? __stringInputBorderBottomWidth.replace("px","") * 1 : 2;
        if(this._elementContainer.style.marginTop != __intInputMarginTop + "px")
        {
            this._elementContainer.style.marginTop = __intInputMarginTop + "px";
        }
    };
    this._getType = function (__stringType)
    {
        return { "1": "stock","2": "fund","3": "hk","4": "us","7":"71"}[__stringType.substr(0,1)];
    };
    this._fill = function ()
    {   var self = this;
        var __stringValue = this._elementInput.value;
        if(("key_" + __stringValue) in this._objectData && this._objectData["key_" + __stringValue] != "")
        {
            if(this._elementContainer == null)
            {
                this._elementContainer = document.createElement("div");
                this._elementContainer.className=this._objectConfig["addclass"]||'';
                this._elementContainer.style.cssText += "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" + this._objectConfig["width"] + "px; z-index:999;";
                this._elementInput.parentNode.insertBefore(this._elementContainer,this._elementInput);
                this._elementContainer["suggest"] = this;
            }
            this._position();
            var __stringTable = '';
            __stringTable += '<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:' + (this._objectConfig["width"] - 2) + 'px; border-bottom:none;">'
            if(this._objectConfig["head"] != null)
            {
                __stringTable += '<tr style="background-color:#F3F3F3;">';
                for(var i in this._objectConfig["head"])
                {
                    if (this._objectConfig["head"].hasOwnProperty(i)) {
                        if (this._objectConfig["head"][i] == '类型') //消除样式折行
                        {
                            __stringTable += '<td width="30px">' + this._objectConfig["head"][i] + '</td>';

                        } else {
                            __stringTable += '<td>' + this._objectConfig["head"][i] + '</td>';
                        }

                    }
                }
                __stringTable += '</tr>';
            }
            var __arrayData = (this._objectData["key_" + __stringValue] || "").replace(/&amp;/g,"&").replace(/;$/,"").split(";");
            var __intMax = __arrayData.length > this._objectConfig["max"] ? this._objectConfig["max"] : __arrayData.length;
            var __stringSuggest = 'parentNode.parentNode.parentNode[\'suggest\']';
            for(var i = 0;i < __intMax;i++)
            {
                var __arrayDataItem = __arrayData[i].split(",");
                __arrayDataItem[-1] = __arrayDataItem[0].replace(new RegExp(__stringValue.toLowerCase().replace(/(^\s*)|(\s*$)/g,'').replace(/\./g,function ($1) { return '\\' + $1; }),'gi'),function ($1) { return '<span style="color:#F00;">' + $1 + '</span>' });
                __arrayDataItem[-2] = __arrayDataItem[1] in this._objectType ? this._objectType[__arrayDataItem[1]] : "——";
                if(this._objectConfig["link"] == null || this._objectConfig["link"] == "")
                {
                    var __arrayTd = ['<td style="padding:0px;"><span style="display:block; padding:1px;">','</span></td>'];
                }
                else
                {
                	var __stringHref = this._objectConfig["link"].replace(/@type@/g,this._getType(__arrayDataItem[1]) || __arrayDataItem[1]).replace(/@code@/g,this._objectConfig.upperType && this._objectConfig.upperType.test(__arrayDataItem[1]) ? this._getFullCode(__arrayDataItem).toUpperCase() : this._getFullCode(__arrayDataItem));
                    for(var j in __arrayDataItem)
                    {
                    	if(__arrayDataItem.hasOwnProperty(j))
                    	{
                    		__stringHref = __stringHref.replace((new RegExp("@" + j + "@","g")),__arrayDataItem[j]);
                    	}
                    }
                    var __arrayTd = ['<td style="padding:0px;"><a href="' + __stringHref + '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' + __stringSuggest + '[\'hidepause\'](this);" onclick="return this.parentNode.parentNode.' + __stringSuggest + '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' + this._objectConfig["target"] + '">','</a></td>'];
                }
                __stringTable += '<tr id="' + __arrayData[i] + '" style="cursor:pointer;" onmouseover="this.' + __stringSuggest + '[\'mouseoverLine\'](this);" onmouseout="this.' + __stringSuggest + '[\'mouseoutLine\'](this);" onmousedown="this.' + __stringSuggest + '[\'setLineMouse\'](this);">';
                for(var j in this._objectConfig["body"])
                {
                	if(this._objectConfig["body"].hasOwnProperty(j))
                	{
                		__stringTable += __arrayTd[0] + __arrayDataItem[this._objectConfig["body"][j]] + __arrayTd[1];
                	}
                }
                __stringTable += '</tr>';
            }
            if(this._objectConfig["type"]=='7')
            __stringTable += '</table><span id="fcSuggest_140418" style="position:relative;top:-1px;display:block;width:' + (this._objectConfig["width"] - 2) + 'px;background-color:#fff;padding:2px 0 4px;text-align:right;border:solid 1px #eee;border-top:0;"><a onmousedown="window.open(\'http://vip.stock.finance.sina.com.cn/mkt/?f=caishou#all_forex\')"  href="http://vip.stock.finance.sina.com.cn/mkt/?f=caishou#all_forex" target="_blank" style="padding-right:24px;color:#cfcffa;">搜索更多<a/></span>';
            else
            __stringTable += '</table><span id="fcSuggest_140418" style="position:relative;top:-1px;display:block;width:' + (this._objectConfig["width"] - 2) + 'px;background-color:#fff;padding:2px 0 4px;text-align:right;border:solid 1px #eee;border-top:0;"><a onmousedown="window.open(\'http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=&q=' + this._elementInput.value + '\')" href="http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=&q=' + this._elementInput.value + '" target="_blank" style="padding-right:24px;color:#cfcffa;">搜索更多<a/></span>';
            
            this._objectHtml["key_" + __stringValue] = __stringTable;
            this._elementLineCurrent = null;
            var __div = document.createElement("div");
            this._elementContainer.innerHTML = this._objectHtml["key_" + __stringValue];
            this._show();
        }
        else
        {
            this._hide();
        }
        if (typeof __arrayData !== 'undefined') {
            return __arrayData[0].split(',');
        }
        return '';
    };
    this._color = function (__elementTr)
    {
        var __stringColor = "";
        if(__elementTr._booleanArrow && __elementTr._booleanMouse)
        {
            __stringColor = "#F8FBDF";
        }
        else if(__elementTr._booleanArrow)
        {
            __stringColor = "#F1F5FC";
        }
        else if(__elementTr._booleanMouse)
        {
            __stringColor = "#FCFEDF";
        }
        if(__elementTr.style.backgroundColor != __stringColor)
        {
            __elementTr.style.backgroundColor = __stringColor;
        }
    };
    this["mouseoverLine"] = function (__elementTr)
    {
        __elementTr._booleanMouse = true;
        this._color(__elementTr);
    };
    this["mouseoutLine"] = function (__elementTr)
    {
        __elementTr._booleanMouse = false;
        this._color(__elementTr);
    };
    this["setLineMouse"] = function (__elementTr)
    {
        this["setLine"](__elementTr);
        if(this._functionCallback != null)
        {
            this._functionCallback(this._elementInput.value,__elementTr.id.split(','));
        }
    };
    this._getFullCode = function (__arrayLineData)
    {
        switch(__arrayLineData[1])
        {
            case "11":
                return __arrayLineData[3];
                break;
            case "111":
                return __arrayLineData[3];
                break;
            case "12":
                return __arrayLineData[3];
                break;
            case "13":
                return __arrayLineData[3];
                break;
            case "14":
                return __arrayLineData[3];
                break;
            case "15":
                return __arrayLineData[3];
                break;
            case "21":
                return __arrayLineData[3];
                break;
            case "22":
                return __arrayLineData[3];
                break;
            case "23":
                return __arrayLineData[3];
                break;
            case "24":
                return __arrayLineData[3];
                break;
            case "25":
                return __arrayLineData[3];
                break;
            case "26":
                return __arrayLineData[3];
                break;
            default:
                return __arrayLineData[2];
                break;
        }
    };
    this["setLine"] = function (__elementTr)
    {
        var __arrayLineData = __elementTr.id.split(",");
        var __stringValueTemplate = this._objectConfig["value"];
        if(__stringValueTemplate != null && __stringValueTemplate != "")
        {
            for(var i = 0;i < __arrayLineData.length;i++)
            {
                __stringValueTemplate = __stringValueTemplate.replace(new RegExp("@" + i + "@","g"),__arrayLineData[i]);
            }
            var __stringKey = __stringValueTemplate;
        }
        else
        {
            var __stringKey = this._getFullCode(__arrayLineData);
        }
        var __stringValue = __elementTr.id;
        /*只对股票代码、名称缓存，简称不缓存，以免重复的*/
        for(var i = 2;i < 5;i++)
        {
            this._objectData["key_" + __arrayLineData[i]] = __stringValue + ";";
        }
        this._stringLastValue = __stringKey;
        this._elementInput.value = __stringKey;
        if(this._elementLineCurrent != null)
        {
            this._elementLineCurrent._booleanArrow = false;
            this._color(this._elementLineCurrent);
        }
        __elementTr._booleanArrow = true;
        this._color(__elementTr);
        this._elementLineCurrent = __elementTr;
    };
    this._show = function ()
    {
        if(this._elementContainer != null)
        {
            // this.setLine(this._elementContainer.getElementsByTagName('tbody')[0].rows[1]);
            if (typeof this._elementContainer.getElementsByTagName('tbody')[0] !== 'undefined') {
                var fanchenTableElement = this._elementContainer.getElementsByTagName('tbody')[0].rows;
                fanchenTableElement[1]._booleanArrow = true;
                this._color(fanchenTableElement[1]);
                if (fanchenTableElement.length<=9) {
                    this._elementContainer.getElementsByTagName('table')[0].style.borderBottom = '2px solid #EEE';
                    this._getElement('fcSuggest_140418').style.display = 'none';
                };
            };

            this._elementContainer.style.display = "";
            this._objectConfig["onshow"]();
            if(this._objectConfig["hideSelectForIE6"] && this._stringBrowserType == "ie6")
            {
                var __arraySelect = document.getElementsByTagName("select");
                for(var i = 0;i < __arraySelect.length;i++)
                {
                    __arraySelect[i].style.visibility = "hidden";
                }
            }
        }
    };
    this["hidepause"] = function ()
    {
        this._booleanHideDelay = true;
    };
    this["hideresume"] = function ()
    {
        this._booleanHideDelay = false;
        this._hideNow();
    };
    this._hide = function ()
    {
        if(this._booleanHideDelay == false)
        {
            this._hideNow();
        }
    };
    this._hideNow = function ()
    {
        if(this._elementContainer != null)
        {
            this._elementContainer.style.display = "none";
            this._objectConfig["onhide"]();
            if(this._objectConfig["hideSelectForIE6"] && this._stringBrowserType == "ie6")
            {
                var __arraySelect = document.getElementsByTagName("select");
                for(var i = 0;i < __arraySelect.length;i++)
                {
                    __arraySelect[i].style.visibility = "visible";
                }
            }
        }

    };
    this._load = function (__stringValue,__functionCallbackTrue,__functionCallbackFalse)
    {
        if(this._elementScriptLoader == null)
        {
            this._elementScriptLoader = document.createElement("div");
            this._elementScriptLoader.style.display = "none";
            this._elementInput.parentNode.insertBefore(this._elementScriptLoader,this._elementInput);
        }
        var __stringName = "suggestdata_" + this._getRandom();
        var __elementScript = document.createElement("script");
        __elementScript.type = "text/javascript";
        __elementScript.charset = "gb2312";
        __elementScript.src = this._stringUrl.replace("@NAME@",__stringName).replace("@KEY@",encodeURIComponent(__stringValue.toLowerCase()));
        __elementScript._object = this;
        if(__functionCallbackTrue)
        {
            __elementScript._functionCallbackTrue = __functionCallbackTrue;
        }
        if(__functionCallbackFalse)
        {
            __elementScript._functionCallbackFalse = __functionCallbackFalse;
        }
        __elementScript._stringValue = __stringValue;
        __elementScript._stringName = __stringName;
        __elementScript[document.all ? "onreadystatechange" : "onload"] = function ()
        {
            if(document.all && this.readyState != "loaded" && this.readyState != "complete")
            {
                return;
            }
            var __stringData = window[this._stringName];
            if(typeof __stringData != "undefined")
            {
                this._object._objectData["key_" + this._stringValue] = __stringData;
                this._functionCallbackTrue(__stringData);
                window[this._stringName] = null;
            }
            else if(this._functionCallbackFasle)
            {
                this._functionCallbackFasle("");
            }
            this._object = null;
            this._stringValue = null;
            this._stringName = null;
            this[document.all ? "onreadystatechange" : "onload"] = null;
            this.parentNode.removeChild(this);
        };
        this._elementScriptLoader.appendChild(__elementScript);
    };
    this._check = function ()
    {
        var __stringValue = this._elementInput.value;
        if(this._stringLastValue != __stringValue)
        {
            this._stringLastValue = __stringValue;
            if(__stringValue != "")
            {
                //if(("key_" + __stringValue) in this._objectData)
                //{
                 //   this._fill();
                //}
               // else
                //{
                    this._load(__stringValue,this._bind(this._fill),this._bind(this._hide));
               // }
            }
            else
            {
                if(this._elementContainer != null)
                {
                    this._elementLineCurrent = null;
                    this._elementContainer.innerHTML = "";
                }
                this._hide();
            }
        }
        else
        {
            this._show();
        }
    };
    this._eventFocus = function ()
    {
        if(this._elementInput.value == this._stringOriginalValue)
        {
            this._elementInput.value = "";
        }
        this._stringLastValue = "";
        this._check();
    };
    this._eventBlur = function ()
    {
        if(this._elementInput.value == "")
        {
            this._elementInput.value = this._stringOriginalValue;
        }
        this._stringLastValue = "";
        this._hide();
    };
    this._eventButtonUp = function ()
    {
        var __event = arguments[0] || window.event;
        var __intFirst = this._objectConfig["head"] == null ? 0 : 1;
        switch(__event.keyCode)
        {
            case 38: //up
                if(this._elementContainer != null && this._elementContainer.firstChild != null)
                {
                    this["setLine"](this._elementContainer.firstChild.rows[(!this._elementLineCurrent || this._elementLineCurrent.rowIndex == __intFirst) ? this._elementContainer.firstChild.rows.length - 1 : this._elementLineCurrent.rowIndex - 1]);
                }
                break;
            case 40: //down
                if(this._elementContainer != null && this._elementContainer.firstChild != null)
                {
                    if (this._elementLineCurrent === null) {
                        this["setLine"](this._elementContainer.firstChild.rows[1]);
                    };
                    this["setLine"](this._elementContainer.firstChild.rows[(!this._elementLineCurrent || this._elementLineCurrent.rowIndex == this._elementContainer.firstChild.rows.length - 1) ? __intFirst : this._elementLineCurrent.rowIndex + 1]);
                }
                break;
            case 13: //Enter
                if(this._elementContainer != null && this._elementContainer.firstChild != null)
                {
                    if(this._elementLineCurrent != null)
                    {
                        this["setLine"](this._elementLineCurrent);
                    }
if (this._elementLineCurrent === null) {
                        this["setLine"](this._elementContainer.firstChild.rows[1]);
                    };

                    if(this._functionCallback != null)
                    {
                    	this._functionCallback(this._elementInput.value,this._elementLineCurrent ? this._elementLineCurrent.id.split(',') : []);
                    }
this._elementInput.blur();
                }
                this._hide();
                break;
            default:
                this._check();
                break;
        }
    };
    this.getCodeFromCache = function (__stringValue)
    {
        if(("key_" + __stringValue) in this._objectData)
        {
            return this._objectData["key_" + __stringValue];
        }
    };
    this.getCode = function (__stringValue,__functionCallback)
    {
        if(("key_" + __stringValue) in this._objectData)
        {
            __functionCallback(this._objectData["key_" + __stringValue]);
        }
        else
        {
            this._load(__stringValue,__functionCallback,__functionCallback);
        }
    };
    this.changeType = function (__stringType)
    {
        this._objectHtml = {};
        this._objectData = {};
        this._elementInput.value = this._stringOriginalValue;
        if(typeof __stringType != "undefined")
        {
            var __stringTypeCode = "";
            switch(__stringType.toLowerCase())
            {
                case "stock":
                    __stringTypeCode = "11,12,13,14,15";
                    break;
                case "fund":
                    __stringTypeCode = "21,22,23,24,25,26";
                    break;
                case "hkstock":
                    __stringTypeCode = "31";
                    break;
                case "hk":
                    __stringTypeCode = "31,33,32";
                    break;
                case "usstock":
                    __stringTypeCode = "41";
                    break;
                case "us":
                    __stringTypeCode = "41,42";
                    break;
                case "7" :
                    __stringTypeCode = "71";
                    break;
                default:
                    __stringTypeCode = __stringType;
                    break;
            }
            this._stringUrl = this._stringOriginalUrl.replace("@TYPE@",__stringTypeCode);
        }
        else
        {
            this._stringUrl = this._stringOriginalUrl.replace("type=@TYPE@&","");
        }
        this._objectConfig["type"] = __stringType;
    };
    this.changeLink = function (__stringLink)
    {
        this._objectConfig["link"] = __stringLink;
        this._fill();
        this._hide();
    };
    this.clear = function ()
    {
        this._stringLastValue = null;
        this._elementInput.value = "";
        this._check();
        this._elementInput.value = this._stringOriginalValue;
    };
    this.bind = function (__objectConfig)
    {
        if(typeof __objectConfig != "undefined")
        {
            for(var i in __objectConfig)
            {
                this._objectConfig[i] = __objectConfig[i];
            }
        }
        this._elementInput = typeof this._objectConfig["input"] == "string" ? document.getElementById(this._objectConfig["input"]) : this._objectConfig["input"];
        if(this._objectConfig["loader"] != null)
        {
            this._elementScriptLoader = typeof this._objectConfig["loader"] == "string" ? document.getElementById(this._objectConfig["loader"]) : this._objectConfig["loader"];
        }
        if(this._elementInput)
        {
            this._stringOriginalValue = (this._objectConfig["default"] == null || this._objectConfig["default"] == "") ? this._elementInput.value : this._objectConfig["default"];
            this.changeType(this._objectConfig["type"]);
            this._elementInput.value = this._stringOriginalValue;
            this._elementInput.setAttribute("autocomplete","off");
            this._elementInput.autoComplete = "off";
            this._aevent(this._elementInput,"focus",this._bind(this._eventFocus));
            this._aevent(this._elementInput,"blur",this._bind(this._eventBlur));
            this._aevent(this._elementInput,"keyup",this._bind(this._eventButtonUp));
            //~ this._aevent(this._elementInput, "keydown", this._bind(this._eventButtonUp));
            this._aevent(this._elementInput,"mouseup",this._bind(this._eventButtonUp));
            this._functionCallback = this._objectConfig["callback"];
        }
    };
};