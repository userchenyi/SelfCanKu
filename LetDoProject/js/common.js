/*sweetalert*/
//错误提示
function sweeterror(txt) {
	swal({
		text: txt,
		type: "error",
		confirmButtonText: '确认',
		timer: 1500,
		confirmButtonColor: '#f27474',
	})
}
//成功提示
function sweetsuccess(txt) {
	swal({
		text: txt,
		type: "success",
		confirmButtonText: '确认',
		timer: 1500,
		confirmButtonColor: '#4cd964',
	})
}


var setIp = "https://crm.yhxchina.com/API/"; //业绩查询、兑付查询
var loginIp = "https://dev.yhxchina.com/crm-rest-service/"; //登录、理财师信息、组织架构
//var loginIp = "http://127.0.0.1/api/crm-rest-service/"
