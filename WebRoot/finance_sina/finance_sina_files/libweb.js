/* location ads begin */
/* 2010-08-02 18:39:38 */

// libweb_getCookie
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 9(a){2 b=3.4.e(";",a);5(b==-1){b=3.4.6}7 g(3.4.f(a,b))}8 h(a){2 b=a+"=";2 c=b.6;2 d=3.4.6;2 i=0;k(i<d){2 j=i+c;5(3.4.f(i,j)==b){7 9(j)}i=3.4.e(" ",i)+1;5(i==0)l}7\'\'}',22,22,'||var|document|cookie|if|length|return|function|libweb_getCookieVal|||||indexOf|substring|unescape|libweb_getCookie|||while|break'.split('|'),0,{}));

var local_index = unescape(libweb_getCookie('dummy_ip_local_index'));
var location1 = unescape(libweb_getCookie('dummy_ip_location1'));
var location2 = unescape(libweb_getCookie('dummy_ip_location2'));

if (local_index == '') {
    // location info
    var dictLoc = {"安徽":0,"北京":1,"重庆":2,"福建":3,"甘肃":4,"广东":5,"广西":6,"贵州" :7,"海南":8,"河北":9,"黑龙江":10,"河南":11,"湖北":12,"湖南":13,"内蒙古":14,"江苏":15,"江西":16,"吉林":17,"辽宁":18,"宁夏":19,"青海":20,"山西":21,"陕西":22,"山东":23,"上海":24,"四川":25,"天津":26,"西藏":27,"新疆":28,"云南":29,"浙江":30,"香港":31,"澳门":32,"台湾":33};
    if(typeof remote_ip_info == "object" && remote_ip_info.ret == 1) {
    	local_index = dictLoc[remote_ip_info.province];

	if(typeof local_index == "undefined") {
		local_index = 1;
		location1 = "其它";
		location2 = "其它";
    	}else if(remote_ip_info.province == "北京" || remote_ip_info.province == "天津" || remote_ip_info.province == "上海" || remote_ip_info.province == "重庆") {
    		location1 = remote_ip_info.province + '市';
    		location2 = remote_ip_info.province;
    	}else if(remote_ip_info.province != "香港" && remote_ip_info.province != "澳门" && remote_ip_info.province != "广西" && remote_ip_info.province != "宁夏" && remote_ip_info.province != "内蒙古" && remote_ip_info.province != "西藏" && remote_ip_info.province != "新疆" && remote_ip_info.province != ""){
    		location1 = remote_ip_info.province + '省';
    		location2 = remote_ip_info.city;
    	}else{
    		location1 = remote_ip_info.province;
    		location2 = remote_ip_info.city;
    	}

	// 临时
	/*if(remote_ip_info.start == "180.95.128.0" || remote_ip_info.start == "180.95.224.0") {
		local_index = 4;
		location1 = "甘肃省";
		location2 = "兰州";
	}*/

    }else{
	// no result
    	local_index = 1;
	try{
		var ip = remote_ip_info.ip.split(".");
	}catch(e){

	}

	if(typeof ip != "undefined" && (ip[0] == "10" || (ip[0] == "172" && parseInt(ip[1]) >= 16 && parseInt(ip[1]) <= 31) || (ip[0] == "192" && ip[1] == "168"))) {
    		location1 = "北京市";
		location2 = "北京";
	}else{
		location1 = "其它";
    		location2 = "其它";
	}
    }
}

// webShow 1.2.8 for zhitou and pinpai, WSCSubstr 1.0.0
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1j 1x(){P.1k="1.2.8";P.X=1j(a,b,c){P.1k="1.0.0";4 d=(1l[3]==Q?Q:11);5(R a=="Y"||a=="")12 11;4 e=a.1y(\'\');4 f=0;4 g=e.6;9(4 i=0;i<g;i++){5(f>=c){1z}5(e[i].1A(0)<=1B){f++}M{f+=2}}5(f>c&&d!=Q){i--}12 a.1m(b,i)};4 h=S V();4 l=S V();4 m=S V();4 n=S V();4 o={\'O\':\'我也要在这里发布\',\'13\':\'1n://1C.15.1o.1p\',\'N\':\'1n://1D.15.1o.1p/1E/15/1F.1G\'};4 p=1l[0];5(R p=="16"){17{4 q=p.1H;4 r=p.1I;4 s=p.1J;4 t=p.Z;4 u=p.1K;4 v=p.1L;4 w=p.1M;4 x=p.18;4 y=p.19}1a(e){12 11}}4 z=(p.1q==T?Q:p.1q);4 A=(p.1r==T?"1s":p.1r);4 B=(p.W==T?"1t":p.W);4 C=(p.1u==T?11:p.1u);4 D=(p.1b==T?1:p.1b);4 E=u*v;5(R r=="16"){9(4 i 1N r){4 F=11;5(r[i].Z==T||r[i].Z==""){5(r[i].1b.1m(D,1)!=\'1\'){F=Q}}M{r[i].Z=","+r[i].Z+",";5(r[i].Z.1O(","+t+",")==-1){F=Q}}5((r[i].O==""&&B=="1t")||(r[i].N==""&&B=="N")||F==Q){5(z==Q)1P;M r[i]=o}5(R r[i].7!="Y"&&r[i].7!="")h[r[i].7]=r[i];M l[l.6]=r[i]}9(i=l.6;i<E;i++){l[l.6]=o}}5(A=="1s"||A=="1v"){4 G=1Q.1R("1S"+q);5(G.6>0){9(4 i=0;i<G.6;i++){5(G[i].1c("7")!=T&&G[i].1c("7")!="")m[G[i].1c("7")]=G[i];M n[n.6]=G[i]}}5(C==Q){5(h.6>0){9(4 i=0;i<h.6;i++){5(h[i]!=T){4 H=h[i];5(H.O!=""){5(B=="N"){m[H.7].10[0].U=\'<1d 1e="\'+H.N+\'" 1f="0" />\';m[H.7].10[1].U=P.X(H.O,0,w)}M{m[H.7].U=P.X(H.O,0,w)}m[H.7].1g=H.13;5(R H.W!="Y")m[H.7].1h("1i",H.W)}}}}}M{5(m.6>0){9(4 i=0;i<m.6;i++){5(m[i]!=T){5(R h[i]=="16"){H=h[i]}M{H=o}5(B=="N"){4 I=\'<1d 1e="\'+H.N+\'" 1w="\';5(x!="")I+=\'18:\'+x+\'14;\';5(y!="")I+=\'19:\'+y+\'14;\';I+=\'" 1f="0" />\';m[i].10[0].U=I;m[i].10[1].U=P.X(H.O,0,w)}M{m[i].U=P.X(H.O,0,w)}m[i].1g=H.13;5(R H.W!="Y")m[H.7].1h("1i",H.W)}}}}5(l.6>0){4 J=S V();4 K=S V();9(4 i=0,j=0;i<E;i++,j++){17{5(l[j].O==""){1T S 1U();}M{J[i]=l[j]}}1a(e){J[i]=o}}4 k=0;9(i=0;i<v;i++){K[i]=S V();9(4 j=0;j<u;j++){K[i][j]=J[k];k++}}k=0;9(i=0;i<u;i++){9(4 j=0;j<v;j++,k++){17{5(B=="N"){5(R K[j][i].N=="Y")K[j][i].N=K[j][i].1V;4 I=\'<1d 1e="\'+K[j][i].N+\'" 1w="\';5(x!="")I+=\'18:\'+x+\'14;\';5(y!="")I+=\'19:\'+y+\'14;\';I+=\'" 1f="0" />\';n[k].10[0].U=I;n[k].10[1].U=P.X(K[j][i].O,0,w)}M{n[k].U=P.X(K[j][i].O,0,w)}n[k].1g=K[j][i].13;5(R K[j][i].W!="Y")n[k].1h("1i",K[j][i].W)}1a(e){}}}}}5(A=="1W"||A=="1v"){4 L=S V();L[\'1X\']=h;L[\'1Y\']=l;12 L}}',62,123,'||||var|if|length|pos||for|||||||||||||||||||||||||||||||||||||||else|pic|title|this|true|typeof|new|null|innerHTML|Array|type|csubstr|undefined|city|childNodes|false|return|url|px|sina|object|try|width|height|catch|area|getAttribute|img|src|border|href|setAttribute|webtype|function|version|arguments|substr|http|com|cn|rearrange|action|padding|text|fixedinc|both|style|webShow|split|break|charCodeAt|255|p4p|d1|pfpghc|1217235599_75506058_zhitou|jpg|resid|webs|province|cols|rows|titlelen|in|indexOf|continue|document|getElementsByName|res|throw|Error|picpath|data|fixed|grid'.split('|'),0,{}));

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 9(a,b,c){1 d=(h[3]==5?5:6);4(j a=="k"||a=="")7 6;1 e=a.l(\'\');1 f=0;1 g=e.m;n(1 i=0;i<g;i++){4(f>=c){o}4(e[i].p(0)<=q){f++}r{f+=2}}4(f>c&&d!=5){i--}7 a.s(b,i)}',29,29,'|var|||if|true|false|return|function|WSCSubstr||||||||arguments||typeof|undefined|split|length|for|break|charCodeAt|255|else|substr'.split('|'),0,{}));


/* location ads end */
