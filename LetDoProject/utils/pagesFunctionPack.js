/*
 * 将100000转为¥100,000.00形式
 * 
 */
var dealNumber = function(money,type){  
    if(money && money!=null){  
        money = String(money);  
        var left=money.split('.')[0],right=money.split('.')[1];  
        right = right ? (right.length>=2 ? '.'+right.substr(0,5) : '.'+right+'0') : '.00';  
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g); 
        if(type == 1){
        	return '¥'+(Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right; 
        }else{
        	return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right; 
        }
        
    }else if(money===0 && type == 0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断  
        return '0.00';
    }else if(money===0 && type == 1){
    	return '¥0.00';
    }else{
        return "";  
    }  
};
/*
 * 将¥100,000.00转为100000形式
 * 
 */
function dealNumberFX(money){
	if (money == '' || money == null || money == undefined) { 
	  	return ''; 
	}else{
	  	for (var m = money.length - 1; m >= 0; m--) {
            money = money.replace(",", "")//替换tomoney()中的“,”
            money = money.replace("，", "")//替换tomoney()中的“，”
            money = money.replace(" ", "")//替换tomoney()中的空格
            money = money.replace("￥", "")//替换掉可能出现的￥字符
            money = money.replace("¥", "")//替换掉可能出现的¥字符
        }
	  	return money;
	}
}
/*
 *
 *金额小写转大写函数()
 * 
 */
function charMoney(money) {
	var fraction = ['角','分'];    
	var digit = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];    
	var unit = [['圆','万','亿','兆'],['','拾','佰','仟']];    
	//var head = money < 0?'欠':'';    
	if (money == '' || money == null || money == undefined) { 
	  	return ''; 
	}else{
	  	for (var m = money.length - 1; m >= 0; m--) {
            money = money.replace(",", "")//替换tomoney()中的“,”
            money = money.replace("，", "")//替换tomoney()中的“，”
            money = money.replace(" ", "")//替换tomoney()中的空格
            money = money.replace("￥", "")//替换掉可能出现的￥字符
            money = money.replace("¥", "")//替换掉可能出现的¥字符
        }
	}
	money = Math.abs(money);
	//console.log(money);
	//此处判断输入金额大小
	if(money > 999999999999.99){
		alert("输入金额过大!");
		return;
	}
	var s = '';
	for (var i = 0; i < fraction.length; i++) {    
	    s += (digit[Math.floor(money * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
	}    
	s = s || '整';    
	money = Math.floor(money);    
	for (var i = 0; i < unit[0].length && money > 0; i++) {    
	    var p = '';    
	    for (var j = 0; j < unit[1].length && money > 0; j++) {    
	        p = digit[money % 10] + unit[1][j] + p;    
	        money = Math.floor(money / 10);    
	    }    
	    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;    
	}    
	//var sum= head + s.replace(/(零.)*零元/,'元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	var sum= s.replace(/(零.)*零圆/,'圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整');
	return sum;
}
/*
 * 将13位时间戳转换为yyyy-MM-dd形式函数
 * 
 * 
 */
function formatDateTime(timeStamp) { 
    var date = new Date();
    date.setTime(timeStamp);
    var y1 = date.getFullYear();    
    var m1 = date.getMonth() + 1;    
    m1 = m1 < 10 ? ('0' + m1) : m1;    
    var d1 = date.getDate();    
    d1 = d1 < 10 ? ('0' + d1) : d1;    
    var h1 = date.getHours();  
    h1 = h1 < 10 ? ('0' + h1) : h1;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    //return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    return y1 + '-' + m1+ '-' + d1;
};  
/*
 *
 * 计算如2018/07/24 16:00减去2018/07/24 12:00时间差函数
 * 
 *
 */
function GetDelTime(timeStr1,timeStr2){
	timeStr1 = timeStr1.replace(/-/g,'/');
	timeStr2 = timeStr2.replace(/-/g,'/');
	//console.log(timeStr1+"*****"+timeStr2);
	//var date1 = new Date('2013/04/02 18:00');
	//var date2 = new Date('2013/04/02 19:22:21');
	var date1 = new Date(timeStr1);
	var date2 = new Date(timeStr2);
	 
	var s1 = date1.getTime(),s2 = date2.getTime();
	var total = (s1 - s2)/1000;
	 
	//var day = parseInt(total / (24*60*60));//计算整数天数
	//var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
	//var hour = parseInt(afterDay/(60*60));//计算整数小时数
	//var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
	//var min = parseInt(afterHour/60);//计算整数分
	//var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数

	//var Thour = Number(total/(60*60)).toFixed(1);
	
	//return Thour;
	workTime(timeStr2,timeStr1);
}

/*
 *
 * 计算时间段的工作时长
 *
 */
function workTime(timeStr1, timeStr2) {
    timeStr1 = timeStr1.replace(/-/g,'/');
    timeStr2 = timeStr2.replace(/-/g,'/');
    var start = new Date(timeStr2);
    var end = new Date(timeStr1);
    var at = 9,
        bt = 1,
        ct = 6,
        dt = 16,
        startDate = start.toLocaleDateString(), // 日期
	        endDate = end.toLocaleDateString();
        var res = (end - start) / 1000 / 3600;
 
        // 同一天
    if (startDate === endDate) {
        if (start.getHours() < 12 && end.getHours() > 12) {
          res = (res - bt).toFixed(1);
        }
    }else {
        // 相差一天
        res = res - at - ct;
        if(start.getHours() < 12) {
            res = (res - bt).toFixed(1);
        }
        if(end.getHours() > 12) {
            res = (res - bt).toFixed(1);
        }
        // 超过一天
        var cDate = (new Date(endDate) - new Date(startDate)) / 3600 / 24 / 1000;
        if (cDate > 1) {
            res = (res - dt * (cDate - 1)).toFixed(1);
        }
    }
    //console.log(res);
    return Number(res).toFixed(1);
    // 9:00上班，下午1:00上班，18:00点下班
}

/* 
 * 
 * 监听金额小写输入框数字同步大写显示框数字金额
 * eg: 小写输入框输入：10000 （输入框失焦金额会自动转换成货币格式: ￥10,000.00）
 *     大写显示框同步显示：壹万圆整
 *
 */
function LisingValUp(inputN,inputU){
	$("."+inputN).bind('input propertychange change',function(){
		var IntVallb = $("."+inputN).val();
		for (var mlb = IntVallb.length - 1; mlb >= 0; mlb--) {
	        IntVallb = IntVallb.replace(",", "")//替换tomoney()中的“,”
	        IntVallb = IntVallb.replace("，", "")//替换tomoney()中的“，”
	        IntVallb = IntVallb.replace(" ", "")//替换tomoney()中的空格
	        IntVallb = IntVallb.replace("￥", "")//替换掉可能出现的￥字符
	        IntVallb = IntVallb.replace("¥", "")//替换掉可能出现的¥字符
	    }
		IntVallb = Math.abs(IntVallb);
		if(parseInt(IntVallb) > 999999999999.99){
			alert("输入金额过大！");
			$("."+inputN).val("");
			$("."+inputU).val("");
			return;
		}else if(isNaN(parseInt(IntVallb))){
			alert("您的输入有误！");
			$("."+inputN).val("");
			$("."+inputU).val("");
			return;
		}
		$("."+inputN).blur(function(){
			if(parseInt(IntVallb) > 999999999999.99 || isNaN(parseInt(IntVallb))){
				return;
			}else{
				$("."+inputN).val(dealNumber($("."+inputN).val(),1));
			}
	    });
		$("."+inputU).val(charMoney(IntVallb));
	});
}
