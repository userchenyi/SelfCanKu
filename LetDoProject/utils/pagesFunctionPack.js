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