window.onload = function(){
	//定义两个变量来记录传参时间
	var timestr1 = "";
	var timestr2 = "";
	//定义一个页码起始位置
	var pagefrom = 0;
	//定义变量保存页面数据条数总数
	var dataNumtotal = 0;
	//当前页
	var currentPage = 1;
	//本地获取UAid
	var UserAid = localStorage.getItem("UAid");
	
	//页面元素绑定日历插件
	//执行一个laydate日期实例
	laydate.render({
	    elem: '#timeSp8',//指定元素
	    type: 'date',
	    range: true,
	    format: 'yyyy-MM-dd',
	    done: function(){
	    	checkDate();
	    }   
	});
	
	//点顶部时间上的当日、当月、半年、一年
	$("#timeSeletUl li").unbind('click').click(function(){
		$(this).addClass('timeSeleted').siblings().removeClass('timeSeleted');
		$("#timeSp1").removeClass('timeSeleted');
		var str1 = "";
		var str2 = "";
		//alert($("#timeSp8").html().trim().length);
		if($("#timeSp3").hasClass("timeSeleted")){
			str1 = getToDay().trim();
			str2 = getToDay().trim();
			$("#timeSp8").html(str1+" - "+str2);
		}else if($("#timeSp4").hasClass("timeSeleted")){
			str1 = getCurrMonthDay().timea.trim();
			str2 = getCurrMonthDay().timeb.trim();
			$("#timeSp8").html(str1+" - "+str2);
		}else if($("#timeSp5").hasClass("timeSeleted")){
			str1 = getHalfYear().trim();
			str2 = getToDay().trim();
			$("#timeSp8").html(str1+" - "+str2);
		}else{
			str1 = getOneYearAgo().trim();
			str2 = getToDay().trim();
			$("#timeSp8").html(str1+" - "+str2);
		}
	});
	
	//点顶部时间上的全部
	$("#timeSp1").unbind('click').click(function(){
		$("#timeSp1").addClass('timeSeleted');
		$("#timeSeletUl li").removeClass('timeSeleted');
		$("#timeSp8").empty();
	});
	
	//获取yyyy-MM-dd格式当前日期
	function getToDay(){
	    var now = new Date();
	    var nowYear = now.getFullYear();
	    var nowMonth = now.getMonth();
	    var nowDate = now.getDate();
	    newdate = new Date(nowYear,nowMonth,nowDate);
	    nowMonth = doHandleMonth(nowMonth + 1);
	    nowDate = doHandleMonth(nowDate);
	    nowMonth = nowMonth < 10 ? ('0' + nowMonth) : nowMonth;
		nowDate = nowDate < 10 ? ('0' + nowDate) : nowDate;
	    return nowYear+"-"+nowMonth+"-"+nowDate;
	};
	function doHandleMonth(month){
	    if(month.toString().length == 1){
	        month = "0" + month;
	    }
	    return month;
	};
	
	//获取当月的第一天和最后一天
	function getCurrMonthDay(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var firstDate = year+"-"+month+"-"+"01";
        var lastDay = getLastDay(year,month);
        var lastDate = year+"-"+month+"-"+lastDay;
        return {timea:firstDate,timeb:lastDate};
    };
    //获取一个月的最后一天
    function getLastDay(year,month){       
        var new_year = year;        //取当前的年份       
        var new_month = month++;    //取下一个月的第一天，方便计算（最后一天不固定）       
        if(month>12){               //如果当前大于12月，则年份转到下一年       
            new_month -=12;         //月份减       
            new_year++;             //年份增       
        }       
        var new_date = new Date(new_year,new_month,1);   // 取当年当月的 下个 月中的第一天  
        // 获取当月最后一天日期            
        return (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    };
    
    //获取半年前的当前日期
    function getHalfYear(){
    	var date = new Date();
    	date.setMonth(date.getMonth()-6);
    	var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
    	return (y + "-" + m + "-" +d);
    }
    
    //获取一年前的当前日期
    function getOneYearAgo(){
    	var date = new Date();
    	date.setMonth(date.getMonth()-12);
    	var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
    	return (y + "-" + m + "-" +d);
    }
    
    //自定义时间选择完成后的回调事件
    function checkDate(){
    	$("#timeSeletUl li,#timeSp1").removeClass('timeSeleted');
    };
    
    //已进入页面，默认按全部时间及其其他默认参数获取数据
    GetFormdata(pagefrom);
    
    //点击查询按钮
    $("#TopSearch").unbind('click').click(function(){
    	GetFormdata(pagefrom);
	});
	
	//点击下一页
	$("#nextPage").unbind('click').click(function(){
		//判断和页面总数关系
		if(parseInt(dataNumtotal) % parseInt($("#PageSizeSelect").val()) == 0) {
			Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val()));
		} else {
			Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val())) + 1;
		}
		if(pagefrom + 1 > Pagetotal - 1){
			return false;
		}else{
			//页码加一
		    pagefrom += 1;
		    //当前页加一
			currentPage += 1;
			GetFormdata(pagefrom);
		}	
	});
	//点击上一页
	$("#prePage").unbind('click').click(function(){
		//判断和页面总数关系
		if(parseInt(dataNumtotal) % parseInt($("#PageSizeSelect").val()) == 0) {
			Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val()));
		} else {
			Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val())) + 1;
		}
		if(pagefrom - 1 < 0){
			return false;
		}else{
			//页码加一
		    pagefrom -= 1;
		    //当前页加一
			currentPage -= 1;
			GetFormdata(pagefrom);
		}	
	});
    //跳转到指定页
    $("#GoidPageGo").unbind('click').click(function(){
    	if($("#GoidPageInp").val() == "" || $("#GoidPageInp").val() == null || $("#GoidPageInp").val() == "undefined"){
    		alert("请输入有效的页码!");
    	}else{
    		//页面总数
			if(parseInt(dataNumtotal) % parseInt($("#PageSizeSelect").val()) == 0) {
				Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val()));
			} else {
				Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val())) + 1;
			}
    		if($("#GoidPageInp").val() <= 0 || $("#GoidPageInp").val() > Pagetotal){
    		    alert("输入不合法!");	
    		}else{
    			//页码赋值
			    pagefrom = parseInt($("#GoidPageInp").val())-1;
			    //当前页赋值
				currentPage = $("#GoidPageInp").val();
				GetFormdata(pagefrom);
    		}
    	}
    });
    
    //改变每页显示条数
    $("#PageSizeSelect").change(function(){
    	pagefrom = 0;
    	GetFormdata(pagefrom);
    });
    
    //ajax函数获取表格数据
	function GetFormdata(a){
		//获取起止时间参数
    	var timestr = "";
    	var startTime = "";
    	var endTime = "";
    	if($("#timeSp8").html() == "" || $("#timeSp8").html() == null || $("#timeSp8").html() == "undefined"){
    		timestr = "";
    		startTime = "";
    		endTime = "";
    	}else{
    		timestr = $("#timeSp8").html().trim();  
    		startTime = timestr.substring(0,10);
    		endTime = timestr.substring(13,23);
    	}
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetRegistEntrust",
			data: {
				Aid: UserAid,
				State: $("#CustomStatusSelect").val(),
				STime: startTime,
				ETime: endTime,
				Page: a,
				PageSize: $("#PageSizeSelect").val(),
				EnterpriseType: $("#QiyeTypeSelect").val(),
				RegistAddress: $("#AreaSelect").val(),
				IsUrgent: $("#UrgentRegistSelect").val(),
				Licence: $("#LicenceSelect").val(),
				Account: $("#AccountInp").val().trim()
			},
			success: function(result) {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				if(result.code == "00000"){
					//清除之前的数据列表
					$("#BottomTableInformationBody").empty();
					var datareturn = result.data;
					//记录数据总条数
					dataNumtotal = datareturn.Count;
					//页面总数
					var Pagetotal = 0;
					if(parseInt(dataNumtotal) % parseInt($("#PageSizeSelect").val()) == 0) {
						Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val()));
					} else {
						Pagetotal = parseInt(parseInt(dataNumtotal) / parseInt($("#PageSizeSelect").val())) + 1;
					}
					//底部分页显示
					currentPage = parseInt(currentPage);
					$("#curAndtotalPage").html(currentPage + "/" + Pagetotal);
					var str="";
					//动态生成表格数据
					var obj1 = datareturn.Data;
					$.each(obj1,function(index, obj){
						//企业类型定参
					    var qiyeType = "";
					    if(obj.EnterpriseType == 1){
					    	qiyeType = "内资企业";
					    }else if(obj.EnterpriseType == 2){
					    	qiyeType = "外资独资";
					    }else if(obj.EnterpriseType == 3){
					    	qiyeType = "中外合资";
					    }else if(obj.EnterpriseType == 4){
					    	qiyeType = "外商代表处";
					    }else{
					    	qiyeType = obj.EnterpriseType;
					    }
					    //注册地址定参
					    var areaSelect = "";
					    if(obj.RegistAddress == 1){
					    	areaSelect = "账米提供";
					    }else if(obj.RegistAddress == 2){
					    	areaSelect = "自有地址";
					    }else{
					    	areaSelect = obj.RegistAddress;
					    }
					    //加急注册定参
					    var UrgentRegist = "";
					    if(obj.IsUrgent == 1){
					    	UrgentRegist = "需要";
					    }else if(obj.IsUrgent == 2){
					    	UrgentRegist = "不需要";
					    }else{
					    	UrgentRegist = obj.IsUrgent;
					    }
					    //许可证办理定参
					    var theLicence = "";
					    if(obj.Licence == 1){
					    	theLicence = "需要";
					    }else if(obj.Licence == 2){
					    	theLicence = "不需要";
					    }else{
					    	theLicence = obj.Licence;
					    }
					    //许可人员资质定参
					    var peopleLicence = "";
					    if(obj.LicencePeople == 1){
					    	peopleLicence = "具备";
					    }else if(obj.LicencePeople == 2){
					    	peopleLicence = "不具备";
					    }else{
					    	peopleLicence = obj.LicencePeople;
					    }
					    //许可办公场所
					    var workPlace = "";
					    if(obj.LicencePlace == 1){
					    	workPlace = "具备";
					    }else if(obj.LicencePlace == 2){
					    	workPlace = "不具备";
					    }else{
					    	workPlace = obj.LicencePlace;
					    }
					    //定制状态
					    var CustomStatus = "";
					    if(obj.ProcessingState == 0){
					    	CustomStatus = "未受理";
					    }else if(obj.ProcessingState == 1){
					    	CustomStatus = "处理中";
					    }else if(obj.ProcessingState == 2){
					    	CustomStatus = "已完成";
					    }else if(obj.ProcessingState == 3){
					    	CustomStatus = "已取消";
					    }else{
					    	CustomStatus = obj.ProcessingState;
					    }
						str+='<tr><td style="border-left: 1px solid black;">'+'<input class="TdPartSelect" type="checkbox"></td>'+'<td>'+formatDateTime(obj.CreateDateTime)+'</td>'+
						'<td>'+obj.PhoneNumber.substr(0, 3)+'****'+obj.PhoneNumber.substr(7)+'</td>'+'<td>'+obj.Name+'</td>'+'<td>'+qiyeType+'</td>'+'<td>'+obj.RegistProvince+obj.RegistCity+obj.RegistArea+'</td>'+
						'<td>'+areaSelect+'</td>'+'<td>'+UrgentRegist+'</td>'+'<td>'+theLicence+'</td>'+'<td>'+peopleLicence+'</td>'+'<td>'+workPlace+'</td>'+
						'<td>'+obj.CancelCause+'</td>'+'<td>'+CustomStatus+'</td>'+'<td>'+obj.CustomereName+'</td>'+
						'<td><span class="Admissible">受理</span><span><i class="fa fa-phone"></i></span>'+'</td></tr>';
					});
					$("#BottomTableInformationBody").append(str);
					//点击全选按钮
					$(".TdAllSelect").unbind('click').click(function(){
						if($(".TdAllSelect").is(':checked')){
							$(".TdPartSelect").prop("checked",true);
						}else{
							$(".TdPartSelect").prop("checked",false);
						}
					});
				}else{
					alert("未知状态:"+result.code);
				}
			},
			error: function() {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
	
	
	//13位时间戳转换日期格式 yyyy-MM-dd HH:mm
	function formatDateTime(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
		//return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
	};
}
