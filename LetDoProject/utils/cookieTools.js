/*
 * 保存、
 * 获取、
 * 以及删除cookie数据函数
 * 
 */
//设置cookie
function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};
//获取cookie
function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
};
//删除cookie
function delCookie(name){
    setCookie(name,null,-1);
};


//二级登录设置cookie
function setCookieLT(name,value,miunes){
	var date = new Date();
    date.setTime(date.getTime()+miunes*60*1000);
    document.cookie = name + '=' + value + ';expires='+ date.toGMTString();
}
