window.onload = function() {
	//五个参数分别对应待办事项的序号
	var ai = 0;
	var bi = 0;
	var ci = 0;
	var di = 0;
	var ei = 0;
	//定义参数记录待办事项分页页码
	var daibanPage = 0;
	var fuwuPage = 0;
	var weituoPage = 0;
	var dingzhiPage = 0;
	var shengjiPage = 0;
	//订单、服务、委托、定制、升级待办事项td的class、size、total、currentpage
	var pagesize = 5;
	var daibanClassi = 0;
	var daibanPagetotal = 0;
	var daibanCurrentPage = 0;
	var fuwuClassi = 0;
	var fuwuPagetotal = 0;
	var fuwuCurrentPage = 0;
	var weituoClassi = 0;
	var weituoPagetotal = 0;
	var weituoCurrentPage = 0;
	var dingzhiClassi = 0;
	var dingzhiPagetotal = 0;
	var dingzhiCurrentPage = 0;
	var shengjiClassi = 0;
	var shengjiPagetotal = 0;
	var shengjiCurrentPage = 0;
	//定义一个变量记录用户点击选取的是五个待办事项的那一项
	var daibanstatu = 1;
	//定义数组来保存待办事项需要倒计时项的td的class名
	var CountClassArry1 = [];
	var CountClassArry2 = [];
	var CountClassArry3 = [];
	var CountClassArry4 = [];
	var CountClassArry5 = [];
	//对应的再定义数组来保存待办事项需要倒计时项的td的时间段
	var CountTimeArry1 = [];
	var CountTimeArry2 = [];
	var CountTimeArry3 = [];
	var CountTimeArry4 = [];
	var CountTimeArry5 = [];
	//定义四个参数记录待办事项tab选项是否第一次进入
	var fuwufirstIn = true;
	var weituofirstIn = true;
	var dingzhifirstIn = true;
	var shengjifirstIn = true;
	//定义一个参数判断物流查询栏是否第一次进入
	var wuliusearchfirstIn = true;
	//定义一个参数判右下角第二个模块栏是否第一次进入
	var RinghtBottomModelTwofirstIn = true;
    
    //点击左上角待办事项选项卡
	$("#ThingsWillDoTab span").unbind('click').click(function() {
		$(this).css({ "background": "#FFFFFF", "border-bottom": "none" }).siblings().css({ "background": "#EDEDED", "border-bottom": "1px solid gray" });
		if($(this).attr("class") == "thingsDoTab1") {
			//改变选中状态值
			daibanstatu = 1;
			$("#TabTwoSeletPage,#TabThreeSeletPage,#TabFourSeletPage,#TabFiveSeletPage").css("z-index","5");
			$("#TabOneSeletPage").css("z-index", "6");
			$("#TabOneInformation").css("display", "block");
			$("#TabTwoInformation,#TabThreeInformation,#TabFourInformation,#TabFiveInformation").css("display", "none");
		} else if($(this).attr("class") == "thingsDoTab2") {
			//改变选中状态值
			daibanstatu = 2;
			$("#TabOneSeletPage,#TabThreeSeletPage,#TabFourSeletPage,#TabFiveSeletPage").css("z-index","5");
			$("#TabTwoSeletPage").css("z-index", "6");
			$("#TabTwoInformation").css("display", "block");
			$("#TabOneInformation,#TabThreeInformation,#TabFourInformation,#TabFiveInformation").css("display", "none");
			//判断是否第一次进入
			if(fuwufirstIn){
				GetFuwuWillDoTab();
			}
		} else if($(this).attr("class") == "thingsDoTab3") {
			//改变选中状态值
			daibanstatu = 3;
			$("#TabOneSeletPage,#TabTwoSeletPage,#TabFourSeletPage,#TabFiveSeletPage").css("z-index","5");
			$("#TabThreeSeletPage").css("z-index", "6");
			$("#TabThreeInformation").css("display", "block");
			$("#TabOneInformation,#TabTwoInformation,#TabFourInformation,#TabFiveInformation").css("display", "none");
			//判断是否第一次进入
			if(weituofirstIn){
				GetWeituoWillDoTab();
			}
		} else if($(this).attr("class") == "thingsDoTab4") {
			//改变选中状态值
			daibanstatu = 4;
			$("#TabOneSeletPage,#TabTwoSeletPage,#TabThreeSeletPage,#TabFiveSeletPage").css("z-index","5");
			$("#TabFourSeletPage").css("z-index", "6");
			$("#TabFourInformation").css("display", "block");
			$("#TabOneInformation,#TabTwoInformation,#TabThreeInformation,#TabFiveInformation").css("display", "none");	
			//判断是否第一次进入
			if(dingzhifirstIn){
				GetDingzhiWillDoTab();
			}
		} else{
			//改变选中状态值
			daibanstatu = 5;
			$("#TabOneSeletPage,#TabTwoSeletPage,#TabThreeSeletPage,#TabFourSeletPage").css("z-index","5");
			$("#TabFiveSeletPage").css("z-index", "6");
			$("#TabFiveInformation").css("display", "block");
			$("#TabOneInformation,#TabTwoInformation,#TabThreeInformation,#TabFourInformation").css("display", "none");	
			//判断是否第一次进入
			if(shengjifirstIn){
				GetShengjiWillDoTab();
			}
		}
	});
    //进入页面默认显示并加载订单待办事项表格----------------------------------------------------------------------------方便开发需调试
	$("#TabOneSeletPage").css("z-index", "6");
	$("#TabOneInformation").css("display", "block");
	$('.thingsDoTab1').css({ "background": "#FFFFFF", "border-bottom": "none" }).siblings().css({ "background": "#EDEDED", "border-bottom": "1px solid gray" });
	//本地获取UAid
	var UserAid = localStorage.getItem("UAid");
	//获取左上角待办事项顶部tab选项卡显示具体消息条数
	GetFiveWillDotingsTotal();
	//获取订单待办表格数据生成列表
	GetDingdanWillDoTab();
	function GetFiveWillDotingsTotal() {
		$.ajax({
			beforeSend: function(){
                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#ThingsWillDoMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/CountAgency",
			data: {
				Aid: UserAid,
				Project: "1,2,3,4,5"
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				//console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					$(".thingsDoTab1 i").html("(" + datareturn.Order + ")");
					$(".thingsDoTab2 i").html("(" + datareturn.Service + ")");
					$(".thingsDoTab3 i").html("(" + datareturn.Entrust + ")");
					$(".thingsDoTab4 i").html("(" + datareturn.RegistEntrust + ")");
					$(".thingsDoTab5 i").html("(" + datareturn.Upgrade + ")");
				}
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
	
	//获取左上角订单待办表格数据
	function GetDingdanWillDoTab() {
		//清空数组
		CountClassArry1 = [];
		CountTimeArry1 = [];
		$.ajax({
			beforeSend: function(){
                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#ThingsWillDoMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetOrderAgency",
			data: {
				Aid: UserAid,
				Page: daibanPage,
				PageSize: pagesize
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				//console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					//清除之前的数据列表
					$("#DingdanTableBody").empty();
					//当前页赋值
					daibanCurrentPage = 1;
					//页面总数
					if(datareturn.Count % pagesize == 0) {
						daibanPagetotal = parseInt(datareturn.Count / pagesize);
					} else {
						daibanPagetotal = parseInt(datareturn.Count / pagesize) + 1;
					}
					//底部分页显示
					$("#curAndtotalPage1").html(daibanCurrentPage + "/" + daibanPagetotal);
					//获取本地当前时间戳
					var Nowtimestamp = new Date().getTime();
					//动态生成表格数据
					var obj1 = datareturn.Data;
					var str = "";
					$.each(obj1, function(index, obj) {
						var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 / 60);
						var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 % 60);
						//处理状态定参
						var dostatus = "";
						//支付状态定参
						var paystatus = "";
						//下单时间定参
						var paytime = "";
						paytime = formatDateTime(Math.floor(parseInt(obj.StartDateTime) / 1000));
						//根据支付状态码填写中文状态
						if(obj.OrderStatus == 2) {
							paystatus = "已支付";
						} else if(obj.OrderStatus == -2) {
							paystatus = "订单超时";
						} else if(obj.OrderStatus == 0) {
							paystatus = "未支付";
						} else if(obj.OrderStatus == -1) {
							paystatus = "用户取消订单";
						} else {
							paystatus = obj.OrderStatus;
						}
						//判断如果处理状态为0，该行开始倒计时
						if(obj.ProcessingState == 0) {
							dostatus = "待处理";
							CountClassArry1.push("a" + (daibanClassi + 1));
							CountTimeArry1.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))));
							str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
							'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
							'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 1) {
							dostatus = "处理中";
							str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
							'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
							'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 2) {
							dostatus = "处理完成";
							str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
							'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
							'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else {
							dostatus = obj.ProcessingState;
							str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
							'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
							'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						}
		
					});
					$("#DingdanTableBody").append(str);
					//console.log(CountClassArry1);
					//console.log(CountTimeArry1);
					//循环数组调用函数开始倒计时
					for(var j = 0; j < CountClassArry1.length; j++) {
						CountDel(CountClassArry1[j], CountTimeArry1[j]);
					}
				}
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};

	//订单待办栏点击下一页
	$("#nextPage1").unbind('click').click(function() {
		DingdanNextPage();
	});
	//订单待办下一页函数
	function DingdanNextPage() {
		//判断当前页面是否等于总页数
		if(daibanPage == daibanPagetotal - 1) {
			return false;
		} else {
			//清空数组
			CountClassArry1 = [];
			CountTimeArry1 = [];
			//页码加一
			daibanPage += 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetOrderAgency",
				data: {
					Aid: UserAid,
					Page: daibanPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号改变
						ai = daibanPage * parseInt(pagesize);
						//底部分页栏当前页码加一
						daibanCurrentPage = parseInt(daibanCurrentPage) + 1;
						//清除之前的数据列表
						$("#DingdanTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							daibanPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							daibanPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage1").html(daibanCurrentPage + "/" + daibanPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 % 60);
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartDateTime) / 1000));
							//根据支付状态码填写中文状态
							if(obj.OrderStatus == 2) {
								paystatus = "已支付";
							} else if(obj.OrderStatus == -2) {
								paystatus = "订单超时";
							} else if(obj.OrderStatus == 0) {
								paystatus = "未支付";
							} else if(obj.OrderStatus == -1) {
								paystatus = "用户取消订单";
							} else {
								paystatus = obj.OrderStatus;
							}
							//判断如果处理状态为0，该行开始倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "待处理";
								CountClassArry1.push("a" + (daibanClassi + 1));
								CountTimeArry1.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
		
						});
						$("#DingdanTableBody").append(str);
						//console.log(CountClassArry1);
						//console.log(CountTimeArry1);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry1.length; j++) {
							CountDel(CountClassArry1[j], CountTimeArry1[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}

			});

		}

	};

	//订单待办栏点击上一页
	$("#prePage1").unbind('click').click(function() {
		DingdanPrePage();
	});
	//订单待办上一页函数
	function DingdanPrePage() {
		//判断当前页面是否等于0
		if(daibanPage == 0) {
			return false;
		} else {
			//清空数组
			CountClassArry1 = [];
			CountTimeArry1 = [];
			//页码减一
			daibanPage -= 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetOrderAgency",
				data: {
					Aid: UserAid,
					Page: daibanPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					//序号改变
					ai = daibanPage * parseInt(pagesize);
					daibanClassi = daibanPage * parseInt(pagesize);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//底部分页栏当前页码减一
						daibanCurrentPage = parseInt(daibanCurrentPage) - 1;
						//清除之前的数据列表
						$("#DingdanTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							daibanPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							daibanPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage1").html(daibanCurrentPage + "/" + daibanPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 % 60);
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartDateTime) / 1000));
							//根据支付状态码填写中文状态
							if(obj.OrderStatus == 2) {
								paystatus = "已支付";
							} else if(obj.OrderStatus == -2) {
								paystatus = "订单超时";
							} else if(obj.OrderStatus == 0) {
								paystatus = "未支付";
							} else if(obj.OrderStatus == -1) {
								paystatus = "用户取消订单";
							} else {
								paystatus = obj.OrderStatus;
							}
							//判断如果处理状态为0，该行开始倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "待处理";
								CountClassArry1.push("a" + (daibanClassi + 1));
								CountTimeArry1.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
										
						});
						$("#DingdanTableBody").append(str);
						//console.log(CountClassArry1);
						//console.log(CountTimeArry1);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry1.length; j++) {
							CountDel(CountClassArry1[j], CountTimeArry1[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};

	//订单待办栏点击跳转到指定页
	$("#GoidPageGo1").unbind('click').click(function() {
		DingdanGoPage();	
	});
	//订单待办跳转到指定页函数
	function DingdanGoPage() {
		var daibanSelectPage = parseInt($('#GoidPageInp1').val());
		if(daibanSelectPage <= 0 || daibanSelectPage > daibanPagetotal || $('#GoidPageInp1').val() == "" || $('#GoidPageInp1').val() == "undefined") {
			alert("页码输入不合法!");
		} else {
			//清空数组
			CountClassArry1 = [];
			CountTimeArry1 = [];
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetOrderAgency",
				data: {
					Aid: UserAid,
					Page: daibanSelectPage - 1,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号对应改变
						daibanPage = daibanSelectPage - 1;
						ai = daibanPage * parseInt(pagesize);
						daibanClassi = daibanPage * parseInt(pagesize);
						//当前页码赋值
						daibanCurrentPage = daibanSelectPage;
						//清除之前的数据列表
						$("#DingdanTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							daibanPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							daibanPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage1").html(daibanCurrentPage + "/" + daibanPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))) / 1000 % 60);
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartDateTime) / 1000));
							//根据支付状态码填写中文状态
							if(obj.OrderStatus == 2) {
								paystatus = "已支付";
							} else if(obj.OrderStatus == -2) {
								paystatus = "订单超时";
							} else if(obj.OrderStatus == 0) {
								paystatus = "未支付";
							} else if(obj.OrderStatus == -1) {
								paystatus = "用户取消订单";
							} else {
								paystatus = obj.OrderStatus;
							}
							//判断如果处理状态为0，该行开始倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "待处理";
								CountClassArry1.push("a" + (daibanClassi + 1));
								CountTimeArry1.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ai += 1) + '</td>' + '<td class="' + "a" + (daibanClassi += 1) + '">' + '</td>' + '<td>' + obj.Id + '</td>' + '<td>' + paytime + '</td>' +
								'<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.OrderName + '</td>' + '<td>' + obj.ServiceAmount + '</td>' + '<td>' + paystatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' +
								'<td>' + obj.AdviserName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
								
						});
						$("#DingdanTableBody").append(str);
						//console.log(CountClassArry1);
						//console.log(CountTimeArry1);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry1.length; j++) {
							CountDel(CountClassArry1[j], CountTimeArry1[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});

		}
	};

    //----------------------------------------服务待办部分逻辑代码-------------------------------------------------------
    //获取左上角服务待办表格数据
    //GetFuwuWillDoTab();
	function GetFuwuWillDoTab() {
		//清空数组
		CountClassArry2 = [];
		CountTimeArry2 = [];
		$.ajax({
			beforeSend: function(){
                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#ThingsWillDoMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetServiceAgency",
			data: {
				Aid: UserAid,
				Page: fuwuPage,
				PageSize: pagesize
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					//清除之前的数据列表
					$("#FuwuTableBody").empty();
					//当前页赋值
					fuwuCurrentPage = 1;
					//页面总数
					if(datareturn.Count % pagesize == 0) {
						fuwuPagetotal = parseInt(datareturn.Count / pagesize);
					} else {
						fuwuPagetotal = parseInt(datareturn.Count / pagesize) + 1;
					}
					//底部分页显示
					$("#curAndtotalPage2").html(fuwuCurrentPage + "/" + fuwuPagetotal);
					//获取本地当前时间戳
					var Nowtimestamp = new Date().getTime();
					//动态生成表格数据
					var obj1 = datareturn.Data;
					var str = "";
					$.each(obj1, function(index, obj) {
						var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 / 60);
						var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 % 60);
						//服务进度定参
						var serverstatus = "";
						//处理状态定参
						var dostatus = "";
						//支付状态定参
						var paystatus = "";
						//下单时间定参
						var paytime = "";
						paytime = formatDateTime(Math.floor(parseInt(obj.StartTime) / 1000));
						//判断状态值填充中文
						if(obj.Statue == 0) {
							dostatus = "处理中";			
						} else if(obj.Statue == 1) {
							dostatus = "升级中";
						} else if(obj.Statue == 2) {
							dostatus = "已完成";
						} else {
							dostatus = obj.Statue;
						}
						//根据服务进度来判断是否倒计时
						if(obj.ProcessingState == 0) {
							serverstatus = "未分配";
						} else if(obj.ProcessingState == 1) {
							serverstatus = "未处理";
							//此种情况开始倒计时
							CountClassArry2.push("b" + (fuwuClassi + 1));
							CountTimeArry2.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))));
							str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
							'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 2) {
							serverstatus = "服务处理中";
							str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
							'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 3) {
							serverstatus = "服务暂停";
							str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
							'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 4) {
							serverstatus = "服务处理完成";
							str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
							'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else {
							serverstatus = obj.ProcessingState;
							str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
							'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						}
		
					});
					$("#FuwuTableBody").append(str);
					//console.log(CountClassArry2);
					//console.log(CountTimeArry2);
					//循环数组调用函数开始倒计时
					for(var j = 0; j < CountClassArry2.length; j++) {
						CountDel(CountClassArry2[j], CountTimeArry2[j]);
					}
				}
				//第一次进入状态设否
				fuwufirstIn = false;
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};

    //服务待办栏点击下一页
	$("#nextPage2").unbind('click').click(function() {
        FuwuNextPage();
	});
	//服务待办下一页函数
	function FuwuNextPage() {
		//判断当前页面是否等于总页数
		if(fuwuPage == fuwuPagetotal - 1) {
			return false;
		} else {
			//清空数组
			CountClassArry2 = [];
			CountTimeArry2 = [];
			//页码加一
			fuwuPage += 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetServiceAgency",
				data: {
					Aid: UserAid,
					Page: fuwuPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号改变
						bi = fuwuPage * parseInt(pagesize);
						//底部分页栏当前页码加一
						fuwuCurrentPage = parseInt(fuwuCurrentPage) + 1;
						//清除之前的数据列表
						$("#FuwuTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage2").html(fuwuCurrentPage + "/" + fuwuPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 % 60);
							//服务进度定参
							var serverstatus = "";
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartTime) / 1000));
							//判断状态值填充中文
							if(obj.Statue == 0) {
								dostatus = "处理中";			
							} else if(obj.Statue == 1) {
								dostatus = "升级中";
							} else if(obj.Statue == 2) {
								dostatus = "已完成";
							} else {
								dostatus = obj.Statue;
							}
							//根据服务进度来判断是否倒计时
							if(obj.ProcessingState == 0) {
								serverstatus = "未分配";
							} else if(obj.ProcessingState == 1) {
								serverstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry2.push("b" + (fuwuClassi + 1));
								CountTimeArry2.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								serverstatus = "服务处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 3) {
								serverstatus = "服务暂停";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 4) {
								serverstatus = "服务处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								serverstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
		
						});
						$("#FuwuTableBody").append(str);
						//console.log(CountClassArry2);
						//console.log(CountTimeArry2);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry2.length; j++) {
							CountDel(CountClassArry2[j], CountTimeArry2[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
	
	//服务待办栏点击上一页
	$("#prePage2").unbind('click').click(function() {
        FuwuPrePage();
	});
	//服务待办上一页函数
	function FuwuPrePage() {
		//判断当前页面是否等于0
		if(fuwuPage == 0) {
			return false;
		} else {
			//清空数组
			CountClassArry2 = [];
			CountTimeArry2 = [];
			//页码减一
			fuwuPage -= 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetServiceAgency",
				data: {
					Aid: UserAid,
					Page: fuwuPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					//序号改变
					bi = fuwuPage * parseInt(pagesize);
					fuwuClassi = fuwuPage * parseInt(pagesize);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//底部分页栏当前页码减一
						fuwuCurrentPage = parseInt(fuwuCurrentPage) - 1;
						//清除之前的数据列表
						$("#FuwuTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage2").html(fuwuCurrentPage + "/" + fuwuPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 % 60);
							//服务进度定参
							var serverstatus = "";
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartTime) / 1000));
							//判断状态值填充中文
							if(obj.Statue == 0) {
								dostatus = "处理中";			
							} else if(obj.Statue == 1) {
								dostatus = "升级中";
							} else if(obj.Statue == 2) {
								dostatus = "已完成";
							} else {
								dostatus = obj.Statue;
							}
							//根据服务进度来判断是否倒计时
							if(obj.ProcessingState == 0) {
								serverstatus = "未分配";
							} else if(obj.ProcessingState == 1) {
								serverstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry2.push("b" + (fuwuClassi + 1));
								CountTimeArry2.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								serverstatus = "服务处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 3) {
								serverstatus = "服务暂停";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 4) {
								serverstatus = "服务处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								serverstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "a" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
										
						});
						$("#FuwuTableBody").append(str);
						//console.log(CountClassArry2);
						//console.log(CountTimeArry2);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry2.length; j++) {
							CountDel(CountClassArry2[j], CountTimeArry2[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};

    //服务待办栏点击跳转到指定页
	$("#GoidPageGo2").unbind('click').click(function() {
        FuwuGoPage();	
	});
	//服务待办跳转到指定页函数
	function FuwuGoPage() {
		var fuwuSelectPage = parseInt($('#GoidPageInp2').val());
		if(fuwuSelectPage <= 0 || fuwuSelectPage > fuwuPagetotal || $('#GoidPageInp2').val() == "" || $('#GoidPageInp2').val() == "undefined") {
			alert("页码输入不合法!");
		} else {
			//清空数组
			CountClassArry2 = [];
			CountTimeArry2 = [];
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetServiceAgency",
				data: {
					Aid: UserAid,
					Page: fuwuSelectPage - 1,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号对应改变
						fuwuPage = fuwuSelectPage - 1;
						bi = fuwuPage * parseInt(pagesize);
						fuwuClassi = fuwuPage * parseInt(pagesize);
						//当前页码赋值
						fuwuCurrentPage = fuwuSelectPage;
						//清除之前的数据列表
						$("#FuwuTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							fuwuPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage2").html(fuwuCurrentPage + "/" + fuwuPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))) / 1000 % 60);
							//服务进度定参
							var serverstatus = "";
							//处理状态定参
							var dostatus = "";
							//支付状态定参
							var paystatus = "";
							//下单时间定参
							var paytime = "";
							paytime = formatDateTime(Math.floor(parseInt(obj.StartTime) / 1000));
							//判断状态值填充中文
							if(obj.Statue == 0) {
								dostatus = "处理中";			
							} else if(obj.Statue == 1) {
								dostatus = "升级中";
							} else if(obj.Statue == 2) {
								dostatus = "已完成";
							} else {
								dostatus = obj.Statue;
							}
							//根据服务进度来判断是否倒计时
							if(obj.ProcessingState == 0) {
								serverstatus = "未分配";
							} else if(obj.ProcessingState == 1) {
								serverstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry2.push("b" + (fuwuClassi + 1));
								CountTimeArry2.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.StartTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								serverstatus = "服务处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 3) {
								serverstatus = "服务暂停";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 4) {
								serverstatus = "服务处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								serverstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (bi += 1) + '</td>' + '<td class="' + "b" + (fuwuClassi += 1) + '">' + '</td>' + '<td>' + paytime + '</td>' + '<td>' + obj.EnterpriseName + '</td>' +
								'<td>' + obj.OrderName + '</td>' + '<td>' + obj.OrderPhoneNumber + '</td>' + '<td>' + obj.Title + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + serverstatus + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
								
						});
						$("#FuwuTableBody").append(str);
						//console.log(CountClassArry2);
						//console.log(CountTimeArry2);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry2.length; j++) {
							CountDel(CountClassArry2[j], CountTimeArry2[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});

		}
	};
    
    //----------------------------------------委托待办部分逻辑代码-------------------------------------------------------
    //获取左上角委托待办表格数据
    //GetWeituoWillDoTab();
	function GetWeituoWillDoTab() {
		//清空数组
		CountClassArry3 = [];
		CountTimeArry3 = [];
		$.ajax({
			beforeSend: function(){
                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#ThingsWillDoMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetEntrustAgency",
			data: {
				Aid: UserAid,
				Page: weituoPage,
				PageSize: pagesize
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					//清除之前的数据列表
					$("#WeituoTableBody").empty();
					//当前页赋值
					weituoCurrentPage = 1;
					//页面总数
					if(datareturn.Count % pagesize == 0) {
						weituoPagetotal = parseInt(datareturn.Count / pagesize);
					} else {
						weituoPagetotal = parseInt(datareturn.Count / pagesize) + 1;
					}
					//底部分页显示
					$("#curAndtotalPage3").html(weituoCurrentPage + "/" + weituoPagetotal);
					//获取本地当前时间戳
					var Nowtimestamp = new Date().getTime();
					//动态生成表格数据
					var obj1 = datareturn.Data;
					var str = "";
					$.each(obj1, function(index, obj) {
						var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
						var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
						//注册类型定参
						var leixingstatus = "";
						//委托状态(处理)状态定参
						var dostatus = "";						
						//委托时间定参
						var weituotime = "";
						weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
						//根据委托状态值来判断是否倒计时
						if(obj.EntrustType == 0) {
							leixingstatus = "注册委托";	
						} else if(obj.EntrustType == 2) {
							leixingstatus = "服务委托";
						} else if(obj.EntrustType == 3) {
							leixingstatus = "套餐页面服务委托";
						} else if(obj.EntrustType == 4) {
							leixingstatus = "智能查询委托";
						} else {
							leixingstatus = obj.EntrustType;
						}
						//根据处理状态值来判断是否倒计时
						if(obj.ProcessingState == 0) {
							dostatus = "未处理";
							//此种情况开始倒计时
							CountClassArry3.push("c" + (weituoClassi + 1));
							CountTimeArry3.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
							str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
						} else if(obj.ProcessingState == 1) {
							dostatus = "处理中";
							str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
						} else if(obj.ProcessingState == 2) {
							dostatus = "处理完成";
							str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else {
							dostatus = obj.ProcessingState;
							str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						}
		
					});
					$("#WeituoTableBody").append(str);
					//console.log(CountClassArry3);
					//console.log(CountTimeArry3);
					//循环数组调用函数开始倒计时
					for(var j = 0; j < CountClassArry3.length; j++) {
						CountDel(CountClassArry3[j], CountTimeArry3[j]);
					}
				}
				//第一次进入状态设否
				weituofirstIn = false;
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
    
    //委托待办栏点击下一页
	$("#nextPage3").unbind('click').click(function() {
        WeituoNextPage();
	});
	//委托待办下一页函数
	function WeituoNextPage() {
		//判断当前页面是否等于总页数
		if(weituoPage == weituoPagetotal - 1) {
			return false;
		} else {
			//清空数组
			CountClassArry3 = [];
			CountTimeArry3 = [];
			//页码加一
			weituoPage += 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetEntrustAgency",
				data: {
					Aid: UserAid,
					Page: weituoPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号改变
						ci = weituoPage * parseInt(pagesize);
						//底部分页栏当前页码加一
						weituoCurrentPage = parseInt(weituoCurrentPage) + 1;
						//清除之前的数据列表
						$("#WeituoTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							weituoPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							weituoPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage3").html(weituoCurrentPage + "/" + weituoPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//注册类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//根据委托状态值来判断是否倒计时
							if(obj.EntrustType == 0) {
								leixingstatus = "注册委托";	
							} else if(obj.EntrustType == 2) {
								leixingstatus = "服务委托";
							} else if(obj.EntrustType == 3) {
								leixingstatus = "套餐页面服务委托";
							} else if(obj.EntrustType == 4) {
								leixingstatus = "智能查询委托";
							} else {
								leixingstatus = obj.EntrustType;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry3.push("c" + (weituoClassi + 1));
								CountTimeArry3.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
		
						});
						$("#WeituoTableBody").append(str);
						//console.log(CountClassArry3);
						//console.log(CountTimeArry3);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry3.length; j++) {
							CountDel(CountClassArry3[j], CountTimeArry3[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //委托待办栏点击上一页
	$("#prePage3").unbind('click').click(function() {
        WeituoPrePage();
	});
	//委托待办上一页函数
	function WeituoPrePage() {
		//判断当前页面是否等于0
		if(weituoPage == 0) {
			return false;
		} else {
			//清空数组
			CountClassArry3 = [];
			CountTimeArry3 = [];
			//页码减一
			weituoPage -= 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetEntrustAgency",
				data: {
					Aid: UserAid,
					Page: weituoPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					//序号改变
					ci = weituoPage * parseInt(pagesize);
					weituoClassi = weituoPage * parseInt(pagesize);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//底部分页栏当前页码减一
						weituoCurrentPage = parseInt(weituoCurrentPage) - 1;
						//清除之前的数据列表
						$("#WeituoTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							weituoPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							weituoPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage3").html(weituoCurrentPage + "/" + weituoPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//注册类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//根据委托状态值来判断是否倒计时
							if(obj.EntrustType == 0) {
								leixingstatus = "注册委托";	
							} else if(obj.EntrustType == 2) {
								leixingstatus = "服务委托";
							} else if(obj.EntrustType == 3) {
								leixingstatus = "套餐页面服务委托";
							} else if(obj.EntrustType == 4) {
								leixingstatus = "智能查询委托";
							} else {
								leixingstatus = obj.EntrustType;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry3.push("c" + (weituoClassi + 1));
								CountTimeArry3.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
										
						});
						$("#WeituoTableBody").append(str);
						//console.log(CountClassArry3);
						//console.log(CountTimeArry3);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry3.length; j++) {
							CountDel(CountClassArry3[j], CountTimeArry3[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //委托待办栏点击跳转到指定页
	$("#GoidPageGo3").unbind('click').click(function() {
        WeituoGoPage();	
	});
	//委托待办跳转到指定页函数
	function WeituoGoPage() {
		var weituoSelectPage = parseInt($('#GoidPageInp3').val());
		if(weituoSelectPage <= 0 || weituoSelectPage > weituoPagetotal || $('#GoidPageInp3').val() == "" || $('#GoidPageInp3').val() == "undefined") {
			alert("页码输入不合法!");
		} else {
			//清空数组
			CountClassArry3 = [];
			CountTimeArry3 = [];
			//数据请求
			$.ajax({
				beforeSend: function(){
	                $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	                $("#ThingsWillDoMengcheng").css("display","block");
	            },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetEntrustAgency",
				data: {
					Aid: UserAid,
					Page: weituoSelectPage - 1,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号对应改变
						weituoPage = weituoSelectPage - 1;
						ci = weituoPage * parseInt(pagesize);
						weituoClassi = weituoPage * parseInt(pagesize);
						//当前页码赋值
						weituoCurrentPage = weituoSelectPage;
						//清除之前的数据列表
						$("#WeituoTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							weituoPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							weituoPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage3").html(weituoCurrentPage + "/" + weituoPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//注册类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//根据委托状态值来判断是否倒计时
							if(obj.EntrustType == 0) {
								leixingstatus = "注册委托";	
							} else if(obj.EntrustType == 2) {
								leixingstatus = "服务委托";
							} else if(obj.EntrustType == 3) {
								leixingstatus = "套餐页面服务委托";
							} else if(obj.EntrustType == 4) {
								leixingstatus = "智能查询委托";
							} else {
								leixingstatus = obj.EntrustType;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry3.push("c" + (weituoClassi + 1));
								CountTimeArry3.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ci += 1) + '</td>' + '<td class="' + "c" + (weituoClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + dostatus + '</td>' + '<td>' + obj.CustomereName + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
								
						});
						$("#WeituoTableBody").append(str);
						//console.log(CountClassArry3);
						//console.log(CountTimeArry3);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry3.length; j++) {
							CountDel(CountClassArry3[j], CountTimeArry3[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});

		}
	};
    
    //----------------------------------------定制待办部分逻辑代码-------------------------------------------------------
    //获取左上角定制待办表格数据
    //GetDingzhiWillDoTab();
	function GetDingzhiWillDoTab() {
		//清空数组
		CountClassArry4 = [];
		CountTimeArry4 = [];
		$.ajax({
			beforeSend: function(){
	            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	            $("#ThingsWillDoMengcheng").css("display","block");
	        },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetRegistEntrustAgency",
			data: {
				Aid: UserAid,
				Page: dingzhiPage,
				PageSize: pagesize
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					//清除之前的数据列表
					$("#DingzhiTableBody").empty();
					//当前页赋值
					dingzhiCurrentPage = 1;
					//页面总数
					if(datareturn.Count % pagesize == 0) {
						dingzhiPagetotal = parseInt(datareturn.Count / pagesize);
					} else {
						dingzhiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
					}
					//底部分页显示
					$("#curAndtotalPage4").html(dingzhiCurrentPage + "/" + dingzhiPagetotal);
					//获取本地当前时间戳
					var Nowtimestamp = new Date().getTime();
					//动态生成表格数据
					var obj1 = datareturn.Data;
					var str = "";
					$.each(obj1, function(index, obj) {
						var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
						var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
						//企业类型定参
						var leixingstatus = "";
						//委托状态(处理)状态定参
						var dostatus = "";						
						//委托时间定参
						var weituotime = "";
						//注册地址类型定参
						var registareastatus = "";
						//是否加急定参
						var jiaji = "";
						//是否办理许可证定参
						var xuke = "";
						weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
						//判断企业类型
						if(obj.EnterpriseType == 1) {
							leixingstatus = "内资企业";	
						} else if(obj.EnterpriseType == 2) {
							leixingstatus = "外资独资";
						} else if(obj.EnterpriseType == 3) {
							leixingstatus = "中外合资";
						} else if(obj.EnterpriseType == 4) {
							leixingstatus = "外商代表处";
						} else {
							leixingstatus = obj.EnterpriseType;
						}
						//注册地址判断
						if(obj.RegistAddress == 1) {
							registareastatus = "内资企业";	
						} else if(obj.RegistAddress == 2) {
							registareastatus = "外资独资";
						} else {
							registareastatus = obj.RegistAddress;
						}
						//加急判断
						if(obj.IsUrgent == 1) {
							jiaji = "加急";	
						} else if(obj.IsUrgent == 2) {
							jiaji = "不需要加急";
						} else {
							jiaji = obj.IsUrgent;
						}
						//是否办理许可证
						if(obj.Licence == 1) {
							xuke = "需要";	
						} else if(obj.Licence == 2) {
							xuke = "不需要";
						} else {
							xuke = obj.Licence;
						}
						//根据处理状态值来判断是否倒计时
						if(obj.ProcessingState == 0) {
							dostatus = "未处理";
							//此种情况开始倒计时
							CountClassArry4.push("d" + (dingzhiClassi + 1));
							CountTimeArry4.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
							str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 1) {
							dostatus = "处理中";
							str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
						} else if(obj.ProcessingState == 2) {
							dostatus = "处理完成";
							str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
						} else {
							dostatus = obj.ProcessingState;
							str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
							'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
						}
		
					});
					$("#DingzhiTableBody").append(str);
					//console.log(CountClassArry4);
					//console.log(CountTimeArry4);
					//循环数组调用函数开始倒计时
					for(var j = 0; j < CountClassArry4.length; j++) {
						CountDel(CountClassArry4[j], CountTimeArry4[j]);
					}
				}
				//第一次进入状态设否
				dingzhifirstIn = false;
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
    
    //定制待办栏点击下一页
	$("#nextPage4").unbind('click').click(function() {
        DingzhiNextPage();
	});
	//定制待办下一页函数
	function DingzhiNextPage() {
		//判断当前页面是否等于总页数
		if(dingzhiPage == dingzhiPagetotal - 1) {
			return false;
		} else {
			//清空数组
			CountClassArry4 = [];
			CountTimeArry4 = [];
			//页码加一
			dingzhiPage += 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetRegistEntrustAgency",
				data: {
					Aid: UserAid,
					Page: dingzhiPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号改变
						di = dingzhiPage * parseInt(pagesize);
						//底部分页栏当前页码加一
						dingzhiCurrentPage = parseInt(dingzhiCurrentPage) + 1;
						//清除之前的数据列表
						$("#DingzhiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage4").html(dingzhiCurrentPage + "/" + dingzhiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//企业类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							//注册地址类型定参
							var registareastatus = "";
							//是否加急定参
							var jiaji = "";
							//是否办理许可证定参
							var xuke = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//判断企业类型
							if(obj.EnterpriseType == 1) {
								leixingstatus = "内资企业";	
							} else if(obj.EnterpriseType == 2) {
								leixingstatus = "外资独资";
							} else if(obj.EnterpriseType == 3) {
								leixingstatus = "中外合资";
							} else if(obj.EnterpriseType == 4) {
								leixingstatus = "外商代表处";
							} else {
								leixingstatus = obj.EnterpriseType;
							}
							//注册地址判断
							if(obj.RegistAddress == 1) {
								registareastatus = "内资企业";	
							} else if(obj.RegistAddress == 2) {
								registareastatus = "外资独资";
							} else {
								registareastatus = obj.RegistAddress;
							}
							//加急判断
							if(obj.IsUrgent == 1) {
								jiaji = "加急";	
							} else if(obj.IsUrgent == 2) {
								jiaji = "不需要加急";
							} else {
								jiaji = obj.IsUrgent;
							}
							//是否办理许可证
							if(obj.Licence == 1) {
								xuke = "需要";	
							} else if(obj.Licence == 2) {
								xuke = "不需要";
							} else {
								xuke = obj.Licence;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry4.push("d" + (dingzhiClassi + 1));
								CountTimeArry4.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							}
		
						});
						$("#DingzhiTableBody").append(str);
						//console.log(CountClassArry4);
						//console.log(CountTimeArry4);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry4.length; j++) {
							CountDel(CountClassArry4[j], CountTimeArry4[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //定制待办栏点击上一页
	$("#prePage4").unbind('click').click(function() {
        DingzhiPrePage();
	});
	//定制待办上一页函数
	function DingzhiPrePage() {
		//判断当前页面是否等于0
		if(dingzhiPage == 0) {
			return false;
		} else {
			//清空数组
			CountClassArry4 = [];
			CountTimeArry4 = [];
			//页码减一
			dingzhiPage -= 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetRegistEntrustAgency",
				data: {
					Aid: UserAid,
					Page: dingzhiPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					//序号改变
					di = dingzhiPage * parseInt(pagesize);
					dingzhiClassi = dingzhiPage * parseInt(pagesize);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//底部分页栏当前页码减一
						dingzhiCurrentPage = parseInt(dingzhiCurrentPage) - 1;
						//清除之前的数据列表
						$("#DingzhiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage4").html(dingzhiCurrentPage + "/" + dingzhiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//企业类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							//注册地址类型定参
							var registareastatus = "";
							//是否加急定参
							var jiaji = "";
							//是否办理许可证定参
							var xuke = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//判断企业类型
							if(obj.EnterpriseType == 1) {
								leixingstatus = "内资企业";	
							} else if(obj.EnterpriseType == 2) {
								leixingstatus = "外资独资";
							} else if(obj.EnterpriseType == 3) {
								leixingstatus = "中外合资";
							} else if(obj.EnterpriseType == 4) {
								leixingstatus = "外商代表处";
							} else {
								leixingstatus = obj.EnterpriseType;
							}
							//注册地址判断
							if(obj.RegistAddress == 1) {
								registareastatus = "内资企业";	
							} else if(obj.RegistAddress == 2) {
								registareastatus = "外资独资";
							} else {
								registareastatus = obj.RegistAddress;
							}
							//加急判断
							if(obj.IsUrgent == 1) {
								jiaji = "加急";	
							} else if(obj.IsUrgent == 2) {
								jiaji = "不需要加急";
							} else {
								jiaji = obj.IsUrgent;
							}
							//是否办理许可证
							if(obj.Licence == 1) {
								xuke = "需要";	
							} else if(obj.Licence == 2) {
								xuke = "不需要";
							} else {
								xuke = obj.Licence;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry4.push("d" + (dingzhiClassi + 1));
								CountTimeArry4.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							}
										
						});
						$("#DingzhiTableBody").append(str);
						//console.log(CountClassArry4);
						//console.log(CountTimeArry4);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry4.length; j++) {
							CountDel(CountClassArry4[j], CountTimeArry4[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //定制待办栏点击跳转到指定页
	$("#GoidPageGo4").unbind('click').click(function() {
        DingzhiGoPage();	
	});
	//定制待办跳转到指定页函数
	function DingzhiGoPage() {
		var dingzhiSelectPage = parseInt($('#GoidPageInp4').val());
		if(dingzhiSelectPage <= 0 || dingzhiSelectPage > dingzhiPagetotal || $('#GoidPageInp4').val() == "" || $('#GoidPageInp4').val() == "undefined") {
			alert("页码输入不合法!");
		} else {
			//清空数组
			CountClassArry4 = [];
			CountTimeArry4 = [];
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetRegistEntrustAgency",
				data: {
					Aid: UserAid,
					Page: dingzhiSelectPage - 1,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号对应改变
						dingzhiPage = dingzhiSelectPage - 1;
						di = dingzhiPage * parseInt(pagesize);
						dingzhiClassi = dingzhiPage * parseInt(pagesize);
						//当前页码赋值
						dingzhiCurrentPage = dingzhiSelectPage;
						//清除之前的数据列表
						$("#DingzhiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							dingzhiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage4").html(dingzhiCurrentPage + "/" + dingzhiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//企业类型定参
							var leixingstatus = "";
							//委托状态(处理)状态定参
							var dostatus = "";						
							//委托时间定参
							var weituotime = "";
							//注册地址类型定参
							var registareastatus = "";
							//是否加急定参
							var jiaji = "";
							//是否办理许可证定参
							var xuke = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//判断企业类型
							if(obj.EnterpriseType == 1) {
								leixingstatus = "内资企业";	
							} else if(obj.EnterpriseType == 2) {
								leixingstatus = "外资独资";
							} else if(obj.EnterpriseType == 3) {
								leixingstatus = "中外合资";
							} else if(obj.EnterpriseType == 4) {
								leixingstatus = "外商代表处";
							} else {
								leixingstatus = obj.EnterpriseType;
							}
							//注册地址判断
							if(obj.RegistAddress == 1) {
								registareastatus = "内资企业";	
							} else if(obj.RegistAddress == 2) {
								registareastatus = "外资独资";
							} else {
								registareastatus = obj.RegistAddress;
							}
							//加急判断
							if(obj.IsUrgent == 1) {
								jiaji = "加急";	
							} else if(obj.IsUrgent == 2) {
								jiaji = "不需要加急";
							} else {
								jiaji = obj.IsUrgent;
							}
							//是否办理许可证
							if(obj.Licence == 1) {
								xuke = "需要";	
							} else if(obj.Licence == 2) {
								xuke = "不需要";
							} else {
								xuke = obj.Licence;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								dostatus = "未处理";
								//此种情况开始倒计时
								CountClassArry4.push("d" + (dingzhiClassi + 1));
								CountTimeArry4.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								dostatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else if(obj.ProcessingState == 2) {
								dostatus = "处理完成";
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							} else {
								dostatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (di += 1) + '</td>' + '<td class="' + "d" + (dingzhiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.PhoneNumber + '</td>' + '<td>' + leixingstatus + '</td>' + '<td>' + obj.RegistArea + '</td>' + '<td>' + registareastatus + '</td>' + '<td>' + jiaji + '</td>' + '<td>' + xuke + '</td>' + '<td>' + dostatus + '</td>' +
								'<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';	
							}
								
						});
						$("#DingzhiTableBody").append(str);
						//console.log(CountClassArry4);
						//console.log(CountTimeArry4);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry4.length; j++) {
							CountDel(CountClassArry4[j], CountTimeArry4[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});

		}
	};
    
    //----------------------------------------升级待办部分逻辑代码-------------------------------------------------------
    //获取左上角升级待办表格数据
    //GetShengjiWillDoTab();
	function GetShengjiWillDoTab() {
		//清空数组
		CountClassArry5 = [];
		CountTimeArry5 = [];
		$.ajax({
			beforeSend: function(){
	            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
	            $("#ThingsWillDoMengcheng").css("display","block");
	        },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetUpgradeAgency",
			data: {
				Aid: UserAid,
				Page: shengjiPage,
				PageSize: pagesize
			},
			success: function(result) {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				var datareturn = result.data;
				if(result.msg == "成功") {
					//清除之前的数据列表
					$("#ShengjiTableBody").empty();
					//当前页赋值
					shengjiCurrentPage = 1;
					//页面总数
					if(datareturn.Count % pagesize == 0) {
						shengjiPagetotal = parseInt(datareturn.Count / pagesize);
					} else {
						shengjiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
					}
					//底部分页显示
					$("#curAndtotalPage5").html(shengjiCurrentPage + "/" + shengjiPagetotal);
					//获取本地当前时间戳
					var Nowtimestamp = new Date().getTime();
					//动态生成表格数据
					var obj1 = datareturn.Data;
					var str = "";
					$.each(obj1, function(index, obj) {
						var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
						var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
						//升级状态(处理)状态定参
						var upstatus = "";						
						//委托时间定参
						var weituotime = "";
						//升级时间定参
						var uptime = "";
						weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
						//注册地址判断
						if(obj.StartMounth == 0) {
							uptime = "当月";	
						} else if(obj.StartMounth == 1) {
							uptime = "次月";
						} else {
							uptime = obj.StartMounth;
						}
						//根据处理状态值来判断是否倒计时
						if(obj.ProcessingState == 0) {
							upstatus = "未处理";
							//此种情况开始倒计时
							CountClassArry5.push("e" + (shengjiClassi + 1));
							CountTimeArry5.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
							str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
							'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 1) {
							upstatus = "已处理";
							str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
							'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else if(obj.ProcessingState == 2) {
							upstatus = "处理中";
							str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
							'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						} else {
							upstatus = obj.ProcessingState;
							str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
							'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
							'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
						}
		
					});
					$("#ShengjiTableBody").append(str);
					//console.log(CountClassArry5);
					//console.log(CountTimeArry5);
					//循环数组调用函数开始倒计时
					for(var j = 0; j < CountClassArry5.length; j++) {
						CountDel(CountClassArry5[j], CountTimeArry5[j]);
					}
				}
				//第一次进入状态设否
				shengjifirstIn = false;
			},
			error: function() {
				$("#ThingsWillDoMengcheng").css("display","none");
				$("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
    
    //升级待办栏点击下一页
	$("#nextPage5").unbind('click').click(function() {
        ShengjiNextPage();
	});
	//升级待办下一页函数
	function ShengjiNextPage() {
		//判断当前页面是否等于总页数
		if(shengjiPage == shengjiPagetotal - 1) {
			return false;
		} else {
			//清空数组
			CountClassArry5 = [];
			CountTimeArry5 = [];
			//页码加一
			shengjiPage += 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetUpgradeAgency",
				data: {
					Aid: UserAid,
					Page: shengjiPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号改变
						ei = shengjiPage * parseInt(pagesize);
						//底部分页栏当前页码加一
						shengjiCurrentPage = parseInt(shengjiCurrentPage) + 1;
						//清除之前的数据列表
						$("#ShengjiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage5").html(shengjiCurrentPage + "/" + shengjiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//升级状态(处理)状态定参
							var upstatus = "";						
							//委托时间定参
							var weituotime = "";
							//升级时间定参
							var uptime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//注册地址判断
							if(obj.StartMounth == 0) {
								uptime = "当月";	
							} else if(obj.StartMounth == 1) {
								uptime = "次月";
							} else {
								uptime = obj.StartMounth;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								upstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry5.push("e" + (shengjiClassi + 1));
								CountTimeArry5.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								upstatus = "已处理";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								upstatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								upstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
		
						});
						$("#ShengjiTableBody").append(str);
						//console.log(CountClassArry5);
						//console.log(CountTimeArry5);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry5.length; j++) {
							CountDel(CountClassArry5[j], CountTimeArry5[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //升级待办栏点击上一页
	$("#prePage5").unbind('click').click(function() {
        ShengjiPrePage();
	});
	//定制待办上一页函数
	function ShengjiPrePage() {
		//判断当前页面是否等于0
		if(shengjiPage == 0) {
			return false;
		} else {
			//清空数组
			CountClassArry5 = [];
			CountTimeArry5 = [];
			//页码减一
			shengjiPage -= 1;
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetUpgradeAgency",
				data: {
					Aid: UserAid,
					Page: shengjiPage,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					//序号改变
					ei = shengjiPage * parseInt(pagesize);
					shengjiClassi = shengjiPage * parseInt(pagesize);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//底部分页栏当前页码减一
						shengjiCurrentPage = parseInt(shengjiCurrentPage) - 1;
						//清除之前的数据列表
						$("#ShengjiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage5").html(shengjiCurrentPage + "/" + shengjiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//升级状态(处理)状态定参
							var upstatus = "";						
							//委托时间定参
							var weituotime = "";
							//升级时间定参
							var uptime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//注册地址判断
							if(obj.StartMounth == 0) {
								uptime = "当月";	
							} else if(obj.StartMounth == 1) {
								uptime = "次月";
							} else {
								uptime = obj.StartMounth;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								upstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry5.push("e" + (shengjiClassi + 1));
								CountTimeArry5.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								upstatus = "已处理";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								upstatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								upstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
										
						});
						$("#ShengjiTableBody").append(str);
						//console.log(CountClassArry5);
						//console.log(CountTimeArry5);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry5.length; j++) {
							CountDel(CountClassArry5[j], CountTimeArry5[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});
		}
	};
    
    //升级待办栏点击跳转到指定页
	$("#GoidPageGo5").unbind('click').click(function() {
        ShengjiGoPage();	
	});
	//升级待办跳转到指定页函数
	function ShengjiGoPage() {
		var shengjiSelectPage = parseInt($('#GoidPageInp5').val());
		if(shengjiSelectPage <= 0 || shengjiSelectPage > shengjiPagetotal || $('#GoidPageInp5').val() == "" || $('#GoidPageInp5').val() == "undefined") {
			alert("页码输入不合法!");
		} else {
			//清空数组
			CountClassArry5 = [];
			CountTimeArry5 = [];
			//数据请求
			$.ajax({
				beforeSend: function(){
		            $("#ThingsWillDoLoadingImg").addClass("fa fa-spinner fa-spin");
		            $("#ThingsWillDoMengcheng").css("display","block");
		        },
				async: true,
				type: 'get',
				url: "http://139.196.136.36/Api/GetUpgradeAgency",
				data: {
					Aid: UserAid,
					Page: shengjiSelectPage - 1,
					PageSize: pagesize
				},
				success: function(result) {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					console.log(result);
					var datareturn = result.data;
					if(result.msg == "成功") {
						//序号对应改变
						shengjiPage = shengjiSelectPage - 1;
						ei = shengjiPage * parseInt(pagesize);
						shengjiClassi = shengjiPage * parseInt(pagesize);
						//当前页码赋值
						shengjiCurrentPage = shengjiSelectPage;
						//清除之前的数据列表
						$("#ShengjiTableBody").empty();
						//页面总数
						if(datareturn.Count % pagesize == 0) {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize);
						} else {
							shengjiPagetotal = parseInt(datareturn.Count / pagesize) + 1;
						}
						//底部分页显示
						$("#curAndtotalPage5").html(shengjiCurrentPage + "/" + shengjiPagetotal);
						//获取本地当前时间戳
						var Nowtimestamp = new Date().getTime();
						//动态生成表格数据
						var obj1 = datareturn.Data;
						var str = "";
						$.each(obj1, function(index, obj) {
							var countTimeM = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 / 60);
							var countTimeS = Math.floor((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))) / 1000 % 60);	
							//升级状态(处理)状态定参
							var upstatus = "";						
							//委托时间定参
							var weituotime = "";
							//升级时间定参
							var uptime = "";
							weituotime = formatDateTime(Math.floor(parseInt(obj.CreateDateTime) / 1000));
							//注册地址判断
							if(obj.StartMounth == 0) {
								uptime = "当月";	
							} else if(obj.StartMounth == 1) {
								uptime = "次月";
							} else {
								uptime = obj.StartMounth;
							}
							//根据处理状态值来判断是否倒计时
							if(obj.ProcessingState == 0) {
								upstatus = "未处理";
								//此种情况开始倒计时
								CountClassArry5.push("e" + (shengjiClassi + 1));
								CountTimeArry5.push((1800000 - (parseInt(Nowtimestamp) - parseInt(obj.CreateDateTime))));
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + countTimeM + ":" + countTimeS + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 1) {
								upstatus = "已处理";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else if(obj.ProcessingState == 2) {
								upstatus = "处理中";
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							} else {
								upstatus = obj.ProcessingState;
								str += '<tr><td style="border-left: 1px solid black;">' + (ei += 1) + '</td>' + '<td class="' + "e" + (shengjiClassi += 1) + '">' + '</td>' + '<td>' + weituotime + '</td>' + '<td>' + obj.Name + '</td>' +
								'<td>' + obj.Phone + '</td>' + '<td>' + obj.CorporateName + '</td>' + '<td>' + obj.NowServiceName + '</td>' + '<td>' + obj.Area + '</td>' + '<td>' + obj.ServiceTimeStr + '</td>' + '<td>' + obj.UpServiceName + '</td>' + 
								'<td>' + uptime + '</td>' + '<td>' + upstatus + '</td>' + '<td>' + '<i class="fa fa-pencil"></i>' + '</td></tr>';
							}
								
						});
						$("#ShengjiTableBody").append(str);
						//console.log(CountClassArry5);
						//console.log(CountTimeArry5);
						//循环数组调用函数开始倒计时
						for(var j = 0; j < CountClassArry5.length; j++) {
							CountDel(CountClassArry5[j], CountTimeArry5[j]);
						}
					}
				},
				error: function() {
					$("#ThingsWillDoMengcheng").css("display","none");
				    $("#ThingsWillDoLoadingImg").removeClass("fa fa-spinner fa-spin");
					alert("网络错误！");
				}
			});

		}
	};
	
	//倒计时执行函数
	function CountDel(a, b) {
		var className = a;
		var m = 0;
		var s = 0;
		var timetotal = parseInt(b / 1000);
		DotDel(className);
		$("." + a).addClass("active");

		function DotDel(c) {
			if(parseInt(timetotal) > 0) {
				timetotal = parseInt(timetotal) - 1;
				m = Math.floor(timetotal / 60 % 60);
				s = Math.floor(timetotal % 60);
				//时间格式转换
				m = m < 10 ? "0" + m : "" + m;
				s = s < 10 ? "0" + s : "" + s;
				$("." + c).html(m + ":" + s);
			}else{
				clearInterval(timer);
				$("." + c).css("color", "#666666").removeClass('active').html("已超时");
			}
		}
		var timer = setInterval(DotDel, 1000);
	};

	//10位时间戳转换日期格式
	function formatDateTime(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp * 1000);
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
	//13位时间戳转换日期格式 年月日
	function formatDateTimeL(timeStamp) {
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
		return y + '年' + m + '月' + d + '日';
		//return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
		//return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
	};
	
	//右上角查询模块----------------------------------------------------------右上角查询部分--------------------------
	//默认将订单查询部分模块展示出来
	    $("#DingdanSearchContant").css("display","block");
	//顶部查询tab点击切换
	$("#ThingsSearchTab span").unbind('click').click(function() {
		$(this).css({ "background": "#FFFFFF", "border-bottom": "none" }).siblings().css({ "background": "#EDEDED", "border-bottom": "1px solid gray" });
		if($(this).attr("class") == "thingsSearchTab1") {
            $("#DingdanSearchContant").css("display","block");
            $("#FuwuSearchContant,#QiyeSearchContant,#UserSearchContant,#WuliuSearchContant").css("display","none");
            //隐藏物流查询弹窗
            $("#WuliuMsgAlert").css('display','none');
		} else if($(this).attr("class") == "thingsSearchTab2") {
			$("#DingdanSearchContant,#QiyeSearchContant,#UserSearchContant,#WuliuSearchContant").css("display","none");
            $("#FuwuSearchContant").css("display","block");
            //隐藏物流查询弹窗
            $("#WuliuMsgAlert").css('display','none');	
		} else if($(this).attr("class") == "thingsSearchTab3") {
            $("#DingdanSearchContant,#FuwuSearchContant,#UserSearchContant,#WuliuSearchContant").css("display","none");
			$("#QiyeSearchContant").css("display","block");
			//隐藏物流查询弹窗
            $("#WuliuMsgAlert").css('display','none');
		} else if($(this).attr("class") == "thingsSearchTab4") {
			$("#DingdanSearchContant,#FuwuSearchContant,#QiyeSearchContant,#WuliuSearchContant").css("display","none");
			$("#UserSearchContant").css("display","block");
			//隐藏物流查询弹窗
            $("#WuliuMsgAlert").css('display','none');
		} else{
			$("#DingdanSearchContant,#FuwuSearchContant,#QiyeSearchContant,#UserSearchContant").css("display","none");
			//隐藏物流查询弹窗
            $("#WuliuMsgAlert").css('display','none');
			$("#WuliuSearchContant").css("display","block");
		}
	});
	
	//订单查询输入框点击X小图标
	$("#dingdansearchDel").unbind('click').click(function(){
	    $("#dingdansearchInput").val("");
	    $("#DingdanSearchNoData").css("display","none");
	});
	
	//第一个订单查询,订单查询回车事件绑定  
    $("#dingdansearchInput").keydown(function(e){
        if(e.keyCode == 13){//触发键盘事件enter 防止冒泡产生
        	if($("#dingdansearchInput").val() == ""){
        		alert("请输入订单号!")
        	}else{
        		//执行订单查询函数
                DingdanSearch();
        	}
            return false;
        }
    });
    //监听订单查询框值的变化
    $('#dingdansearchInput').bind('input propertychange', function() {  
	    $("#DingdanSearchNoData").css("display","none");  
	});  
	//订单查询函数
    function DingdanSearch(){
    	//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableSearchOrder",
			data: {
				Aid: UserAid,
				Id: $("#dingdansearchInput").val().trim()
			},
			success: function(result) {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				if(result.code == "00047"){
					$("#DingdanSearchNoData").css("display","block");
				}else if(result.code == "00000"){
					$("#DingdanSearchNoData").css("display","none");
					alert("查询有该条数据，将跳转相应详情页面!");
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
    //服务查询输入框点击X小图标
	$("#fuwusearchDel").unbind('click').click(function(){
	    $("#fuwusearchInput").val("");
	    $("#fuwuSearchNoData").css("display","none");
	});
    //第二个服务查询,服务查询回车事件绑定  
    $("#fuwusearchInput").keydown(function(e){
        if(e.keyCode == 13){//触发键盘事件enter 防止冒泡产生
        	if($("#fuwusearchInput").val() == ""){
        		alert("请输入服务号!")
        	}else{
        		//执行服务查询函数
                FuwuSearch();
        	}
            return false;
        }
    });
    
    //监听服务查询框值的变化
    $('#fuwusearchInput').bind('input propertychange', function() {  
	    $("#fuwuSearchNoData").css("display","none");  
	});  
	//服务查询函数
    function FuwuSearch(){
    	//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableSearchService",
			data: {
				Aid: UserAid,
				Id: $("#fuwusearchInput").val().trim()
			},
			success: function(result) {
				console.log(result);
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				if(result.code == "00047"){
					$("#fuwuSearchNoData").css("display","block");
				}else if(result.code == "00000"){
					$("#fuwuSearchNoData").css("display","none");
					alert("查询有该条服务，将跳转相应详情页面!");
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
	 
	//第三个企业查询,企业查询回车事件绑定  
	$("#qiyesearchInput").keydown(function(e){
        if(e.keyCode == 13){//触发键盘事件enter 防止冒泡产生
        	if($("#qiyesearchInput").val() == ""){
        		$("#qiyeSearchNoData").css("display","none");
        		alert("请输入企业名称!");
        	}else if($("#qiyesearchInput").val().length < 2){
        		alert("必须两个字以上!");
        	}else{
        		//执行企业查询函数
                QiyeSearch();
        	}
            return false;
        }
    });
    //企业查询输入框点击X小图标
	$("#qiyeusearchDel").unbind('click').click(function(){
	    $("#qiyesearchInput").val("");
	    $("#qiyeSearchNoData").css("display","none");
	});
    //监听企业查询框值的变化
    $('#qiyesearchInput').bind('input propertychange', function() {  
	    $("#qiyeSearchNoData").css("display","none");  
	}); 
	//企业查询函数
	function QiyeSearch(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableSearchEnterprise",
			data: {
				Aid: UserAid,
				Key: $("#qiyesearchInput").val().trim()
			},
			success: function(result) {
				console.log(result);
				$("#QiyeNameSearchContent").empty();
				var datareturn = result.data;
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				if(result.code == "00047"){
					$("#QiyeNameSearchContent").css("display","none");
					$("#qiyesearchInput").css("top","22%");
					$("#qiyesearchImg,#qiyeusearchDel").css("top","26%");
					$("#qiyeSearchNoData").css("display","block");
				}else if(result.code == "00000"){
					$("#qiyeSearchNoData").css("display","none");
					$("#QiyeNameSearchContent").css("display","block");
					$("#qiyesearchInput").css("top","6%");
					$("#qiyesearchImg,#qiyeusearchDel").css("top","10%");
					//动态生成表格数据
					var obj1 = datareturn;
					var str = "";
					$.each(obj1, function(index, obj) {
						str += '<p class="qiyelist"><span class="qiyelistName">'+obj.CorporateName+'</span>'+'<span class="qiyelistNum">'+obj.Id+'</span>'+
						'<span class="checkqiyejibenmsg">'+'基本信息查看'+'</span>'+'<span class="checkqiyeshuiwumsg">'+'税务信息查看'+'</span>'+
						'<span class="checkqiyedanganmsg">'+'档案信息查看'+'</span></p>';
					});
					$("#QiyetotalNumber").html("找到"+datareturn.length+"条记录");
					$("#QiyeNameSearchContent").append(str);
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
	
	//第四个用户查询,用户查询回车事件绑定  
	$("#usersearchInput").keydown(function(e){
        if(e.keyCode == 13){//触发键盘事件enter 防止冒泡产生
        	if($("#usersearchInput").val() == ""){
        		$("#userSearchNoData").css("display","none");
        		alert("请输入用户账号信息!");
        	}else{
        		//执行用户查询函数
                UserSearch();
        	}
            return false;
        }
    });
    //用户查询输入框点击X小图标
	$("#usersearchDel").unbind('click').click(function(){
	    $("#usersearchInput").val("");
	    $("#userSearchNoData").css("display","none");
	});
    //监听用户查询框值的变化
    $('#usersearchInput').bind('input propertychange', function() {  
	    $("#userSearchNoData").css("display","none");  
	}); 
	//用户查询函数
	function UserSearch(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableSearchUserInfo",
			data: {
				Aid: UserAid,
				Account: $("#usersearchInput").val().trim()
			},
			success: function(result) {
				console.log(result);
				var datareturn = result.data;
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				if(result.code == "00047"){
					$("#UserSearchTableContainer").css("display","none");
					$("#usersearchInput").css("top","22%");
					$("#UsersearchImg,#usersearchDel").css("top","26%");
					$("#userSearchNoData").css("display","block");
				}else if(result.code == "00000"){
					$("#UserSearchTableBody").empty();
				    $("#UserSearchTableContainer").css("display","block");
					$("#userSearchNoData").css("display","none");
					$("#usersearchInput").css("top","6%");
					$("#UsersearchImg,#usersearchDel").css("top","10%");
					//动态生成表格数据
					var obj1 = datareturn.EnterpriseInfo;
					var str = "";
					$.each(obj1, function(index, obj) {
						str += '<tr><td style="border-left: 1px solid black;">'+datareturn.Name+'</td>'+'<td>'+datareturn.Account+'</td>'+'<td>'+obj.EnterpriseName+'</td>'+
						'<td>'+obj.Rank+'</td>'+'<td style="color: red; cursor: pointer;">'+"查看"+'</td>';
					});
					$("#UserSearchTableBody").append(str);
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
	
	//物流查询输入框点击X小图标
	$("#wuliusearchDel").unbind('click').click(function(){
	    $("#wuliusearchInput").val("");
	    $("#WuliuSearchNoData").css("display","none");
	});
	
	//第五个物流查询,用户查询回车事件绑定  
	$("#wuliusearchInput").keydown(function(e){
        if(e.keyCode == 13){//触发键盘事件enter 防止冒泡产生
        	if($("#wuliusearchInput").val() == ""){
        		alert("请输入物流单号!");
        	}else{
        		//执行物流查询函数
                WuliuSearch();
        	}
            return false;
        }
    });
    //监听物流查询框值的变化
    $('#wuliusearchInput').bind('input propertychange', function() {  
	    $("#WuliuSearchNoData").css("display","none");
	}); 
	//物流查询函数
	function WuliuSearch(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/SearchLogistics",
			data: {
				Aid: UserAid,
				Number: $("#wuliusearchInput").val().trim()
			},
			success: function(result) {
				console.log(result);
				$(".wuliumsglistUl").empty();
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				
				var datareturn = result.data;
				var str = "";
				if(result.code == "00000"){
					var obj1 = datareturn.Logistics.showapi_res_body.data;
					console.log(obj1);
					//str = obj1;
					if(obj1 == "" || obj1 == "undefined" || obj1 == null){
						$("#WuliuSearchNoData").css("display","block");
					}else{
						//展示物流信息弹窗
				        $("#WuliuMsgAlert").css("display","block");
						$("#WuliuSearchNoData").css("display","none");
						$.each(obj1, function(index, obj) {
							str += '<li><span class="wuliumsglistTime">'+formatDateTime(Math.floor(parseInt(obj.time)/1000))+'</span>'+'<span class="wuliumsglistStatu">'+obj.context+'</span></li>';
						});
					}
				}else{
					alert("未知状态:"+result.code);
				}
				$(".wuliumsglistUl").append(str);
			},
			error: function() {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
	};
	
	//点击物流弹窗上的X，隐藏物流弹窗
	$("#WuliuMsgAlertDel").unbind('click').click(function(){
		$("#WuliuMsgAlert").css('display','none');
	});
	
	//物流公司查询函数
//	function WuliuCanpanySearch(){
//		//数据请求
//		$.ajax({
//			beforeSend: function(){
//              $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
//              $("#searchMengcheng").css("display","block");
//          },
//			async: true,
//			type: 'get',
//			url: "http://139.196.136.36/Api/GetLogistics",
//			data: {
//				Aid: UserAid
//			},
//			success: function(result) {
//				console.log(result);
//				$("#searchMengcheng").css("display","none");
//				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
//				var datareturn = result.data;
//				if(result.code == "00000"){
//					var obj1 = datareturn;
//					var str = "";
//					$.each(obj1, function(index, obj) {
//						str += '<option value ="'+obj.ComCode+'">'+obj.ComStr+'</option>';
//					});
//					$("#wuliuCanpany").append(str);
//					wuliusearchfirstIn = false;
//				}else{
//					alert("未知状态:"+result.code);
//				}	
//			},
//			error: function() {
//				$("#searchMengcheng").css("display","none");
//				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
//				alert("网络错误！");
//			}
//		});	
//	};
	
	//左下角知识库模块----------------------------------------------------------左下角知识库部分--------------------------
	//最新词汇部分数据调用函数
	LatestWord();
	function LatestWord(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#LatestLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#latestMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableGetNewKnowledgeTag",
			data: {
				Aid: UserAid
			},
			success: function(result) {
				//console.log(result);
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				var str = "";
				var datareturn = result.data;
				if(result.code == "00000"){
					if(datareturn.length == 0){
						return false;
					}else{
						var obj1 = datareturn;
						var str = "";
						for(var j=0; j<obj1.length; j++){
							str += '<span class="latestWord">'+obj1[j]+'</span>';
						}	
						$("#latestWordContainer").append(str);
						//点击最新词汇查询
						$(".latestWord").unbind('click').click(function(){
							$("#KnowledgeBaseSearchIpt").val(this.innerHTML);
							
						});
					}					
				}else{
					alert("未知状态:"+result.code);
				}	
			},
			error: function() {
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
	};
	
	//点击搜索框里面的X，清除输入框里面数据
	$("#KnowledgeBaseSearchDel").unbind('click').click(function(){
		$("#KnowledgeBaseSearchIpt").val("");
	});
	
	//点击搜索按钮
	$("#KnowledgeBaseButton").unbind('click').click(function(){
		if($("#KnowledgeBaseSearchIpt").val() == ""){
			alert("请输入关键词");
		}else{
			if($('#Checkboxxiala').is(':checked')){
				//再次判断第三级下拉菜单选中项是否有Id
				if($("#KnowledgeXiaLaThree").val() == "" || $("#KnowledgeXiaLaThree").val() == "undefined" || $("#KnowledgeXiaLaThree").val() == null){
					alert("第三级下拉菜单value存在问题");
				}else{
					GetZhishiKuMsgList($("#KnowledgeXiaLaThree").val());
				}
			}else{
				GetZhishiKuMsgList(0);
			}
		}
	});
	
	//获取知识库资料列表函数
	function GetZhishiKuMsgList(prama){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#LatestLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#latestMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/SearchText",
			data: {
				Aid: UserAid,
				Key: $("#KnowledgeBaseSearchIpt").val().trim(),
				Project: "1",
				Category: prama
			},
			success: function(result) {
				console.log(result);
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				var datareturn = result.data;
				if(result.code == "00000"){
					//清空列表
					$("#ZhishikuListUl").empty();
					if(datareturn.length == 0){
						$("#ZhishikuListUl").html("<li class='ZhishikuListNodata'><strong>查询无数据!</strong></li>");
						$("#ZhishikuList").css("display","block");
					}else{
						var obj1 = datareturn;
						var str = "";
						$.each(obj1, function(index, obj) {
							str += '<li class="ZhishikuListLi"><span class="ZhishikuListTitle">'+obj.Title+'</span>'+'<span class="ZhishikuListTagList1">'+obj.TagList[0]+'</span>'+
							'<span class="ZhishikuListTagList2">'+obj.TagList[1]+'</span>'+'<span class="ZhishikuListTagList3">'+obj.TagList[2]+'</span>'+'<span class="ZhishikuListAuthor">'+obj.UserName+'</span>'+
							'<span class="ZhishikuListReaderNum">'+"阅读量:"+obj.ReadCount+'</span>'+'<span class="ZhishikuListSee" id="'+obj.Id+'">'+"查看"+'</span></li>';
						});	
						$("#ZhishikuListUl").append(str);
						$("#ZhishikuList").css("display","block");
					}
					
				}else{
					alert("未知状态:"+result.code);
				}
				//点击列表里面的查看
				$(".ZhishikuListSee").unbind('click').click(function(){
					LookZhishikuListContent(this.id);
				});
			},
			error: function() {
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
    };
    
    //点击知识库具体内容alert弹窗上的X
    $("#ZhishikuListContentDel").unbind('click').click(function(){
    	$("#ZhishikuListContent").css("display","none");
    });
    
    //知识库列表查看某一条数据函数
    function LookZhishikuListContent(parma){
    	//数据请求
		$.ajax({
			beforeSend: function(){
                $("#LatestLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#latestMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetTextInfo",
			data: {
				Aid: UserAid,
				Id: parma
			},
			success: function(result) {
				console.log(result);
				$("#ZhishikuListContent").css("display","block");
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				var datareturn = result.data;
				if(result.code == "00000"){
					//清空列表
					$("#ZhishikuListContentTop span,#ZhishikuListContentBottom").empty();
					$("#ZhishikuListContentTitle").html(datareturn.Title);
					$("#ZhishikuListContentLeibie").html(datareturn.Source);
					$("#ZhishikuListContentAuthor").html(datareturn.UserName);
					$("#ZhishikuListContentTime").html(formatDateTimeL(datareturn.UpdateDateTime));
					$("#ZhishikuListReadCount").html("阅读量:"+datareturn.ReadCount);
					$("#ZhishikuListContentTagList1").html(datareturn.TagList[0]);
					$("#ZhishikuListContentTagList2").html(datareturn.TagList[1]);
					$("#ZhishikuListContentTagList3").html(datareturn.TagList[2]);
					$("#ZhishikuListContentBottom").html(datareturn.Body);
				}else{
					alert("未知状态:"+result.code);
				}
			},
			error: function() {
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
    };
    
    //点击知识库列表上的X
    $("#ZhishikuListDel").unbind('click').click(function(){
    	$("#ZhishikuList").css("display","none");
    });
	
	GetThreeXialaData();
	//三个下拉选择框数据获取函数
	function GetThreeXialaData(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#LatestLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#latestMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableGetKnowledgeTree",
			data: {
				Aid: UserAid
			},
			success: function(result) {
				//console.log(result);
				//console.log(JSON.stringify(result));
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				if(result.code == "00000"){
					//获取三个下拉菜单列表
					showProv(result);			
				}else{
					alert("未知状态:"+result.code);
				}	
			},
			error: function() {
				$("#latestMengcheng").css("display","none");
				$("#LatestLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
	};
	
	//一级下拉菜单加载函数
	function showProv(parms){	
		// 获取第一个select标签
		var sele1 = document.getElementById('KnowledgeXiaLaOne');
		// 拿到存放每个一级对象的数组
		var provinces = parms.data;
		// 遍历所有一级菜单
		for(var i = 0; i < provinces.length; i++){
			// 获取一级菜单的名称
			var provName = provinces[i].Name;
			// 生成一个option标签
			var opt = document.createElement('option');
			opt.value = provinces[i].Id;
			// 将一级菜单名称放到标签中
			opt.innerHTML = provName;
			// 将option标签放到第一个select标签中
			sele1.appendChild(opt);
		}
		//for循环结束后将第一级菜单默认显示第一个
		$("#KnowledgeXiaLaOne").val(provinces[0].Id);
		//调用二级菜单函数
		showCity(provinces,provinces[0].Id);
		//一级菜单改变
		sele1.onchange = function (){
			// 清空第三个select中原有的信息
			$("#KnowledgeXiaLaThree").html("");
			//console.log(this.value);
			showCity(provinces,this.value);
			//alert(this.value);
		}
	};
	//二级下拉菜单加载函数
	function showCity(prov1,prov2){
		// 获取第二个select标签
		var sele2 = document.getElementById('KnowledgeXiaLaTwo');
		// 拿到存放一级菜单对象的数组
		var provinces = prov1;
		// 遍历
		for(var i = 0; i < provinces.length; i++){
			// 获取一级菜单的Id
			var provId = provinces[i].Id;
			// 判断是不是想要的一级菜单
			if(provId == prov2 && provinces[i].Child){
				// 清空第二个select中的信息
				sele2.innerHTML = "";
				// 获取该一级菜单下所有三级菜单的数组
				var cities = provinces[i].Child;
				// 遍历所有地市
				for(var j = 0; j < cities.length; j++){
					// 拿到地市名
					var cityName = cities[j].Name;
					// 生成一个option
					var opt = document.createElement('option');
					opt.value = cities[j].Id;
					opt.innerHTML = cityName;
					// 将该option标签放到sele2中
					sele2.appendChild(opt);
				}
				//for循环结束后将第二级菜单默认显示第一个
		        $("#KnowledgeXiaLaTwo").val(cities[0].Id);
		        //调用三级菜单函数
		        showCountry(provinces,prov2,cities[0].Id);
				break;							
			}
		}
		//二级菜单改变
		sele2.onchange = function (){
			showCountry(provinces,prov2, this.value);
		}
	};
	//三级下拉菜单加载函数
	function showCountry(prov1,prov2,city){
		// 获取第三个select标签
		var sele3 = document.getElementById('KnowledgeXiaLaThree');		
		// 拿到存放一级菜单对象的数组
		var provinces = prov1;
		// 遍历所有的一级菜单
		for(var i = 0; i < provinces.length; i++){
			var provId = provinces[i].Id;
			if(provId == prov2){
				var cities = provinces[i].Child;
				for(var j = 0; j < cities.length; j++){
					// 获取二级菜单的名称
					var cityName = cities[j].Id;
					// 判断该二级菜单是否是想要的二级菜单
					if(cityName == city){
						// 清空第三个select中原有的三级菜单信息
						sele3.innerHTML = "";
						// 获取该市所有三级菜单的数组
						var countries = cities[j].Child;
						// 遍历所有的三级菜单
						for(var k = 0; k < countries.length; k++){
							// 获取某个三级菜单的名称
							var countryName = countries[k].Name;
							// 生成一个option
							var opt = document.createElement('option');
							opt.value = countries[k].Id;
							opt.innerHTML = countryName;
							// 将该option放到第三个select中
							sele3.appendChild(opt);
						}
						//for循环结束后将第三级菜单默认显示第一个
		                $("#KnowledgeXiaLaThree").val(countries[0].Id);
						break;
					}
				}
				break;
			}
		}
	};
	
	//右下角政策、资讯模块----------------------------------------------------------右下角政策、资讯部分--------------------------
	GetPolicyAndMsgTitleId();
	function GetPolicyAndMsgTitleId(){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#PolicyAndMsgLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#PolicyAndMsgMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/WorkTableGetEnterInfoCategory",
			data: {
				Aid: UserAid
			},
			success: function(result) {
				console.log(result);
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
				var datareturn = result.data;
				if(result.code == "00000"){
					$(".PolicyAndMsgTitleL").html(datareturn[0].Name).attr('id',datareturn[0].Id);
					$(".PolicyAndMsgTitleR").html(datareturn[1].Name).attr('id',datareturn[1].Id);	
					//获取右下角第一个模块数据
					GetRightBottomFistData(datareturn[0].Id);
					//右下角Tab切换
					$(".PolicyAndMsgTitleL").unbind('click').click(function(){
						$("#PolicyAndMsgBottomOne").css("display","block");
						$("#PolicyAndMsgBottomTwo").css("display","none");
						$(".PolicyAndMsgTitleL").css({"background":"#ffffff","border-bottom":"none"});
						$(".PolicyAndMsgTitleR").css({"background":"#EDEDED","border-bottom":"1px solid gray"});
					});
					$(".PolicyAndMsgTitleR").unbind('click').click(function(){
						$("#PolicyAndMsgBottomTwo").css("display","block");
						$("#PolicyAndMsgBottomOne").css("display","none");
						$(".PolicyAndMsgTitleR").css({"background":"#ffffff","border-bottom":"none"});
						$(".PolicyAndMsgTitleL").css({"background":"#EDEDED","border-bottom":"1px solid gray"});
						//判断是否第一次进入
						if(RinghtBottomModelTwofirstIn){
							GetRightBottomSecondData(this.id);
						}
					});
				}else{
					alert("未知状态:"+result.code);
				}	
			},
			error: function() {
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
	};
	
	//获取右下角第一个模块数据函数
	function GetRightBottomFistData(prama){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#PolicyAndMsgLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#PolicyAndMsgMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/SearchText",
			data: {
				Aid: UserAid,
				Project: "3",
				Category: prama
			},
			success: function(result) {
				console.log(result);
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
//				var str = "";
//				var datareturn = result.data;
//				if(result.code == "00000"){
//					if(datareturn.length == 0){
//						return false;
//					}else{
//						var obj1 = datareturn;
//						var str = "";
//						for(var j=0; j<obj1.length; j++){
//							str += '<span class="latestWord">'+obj1[j]+'</span>';
//						}	
//						$("#latestWordContainer").append(str);
//						//点击最新词汇查询
//						$(".latestWord").unbind('click').click(function(){
//							$("#KnowledgeBaseSearchIpt").val(this.innerHTML);
//							
//						});
//					}					
//				}else{
//					alert("未知状态:"+result.code);
//				}	
			},
			error: function() {
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
    };
	
	
	//获取右下角第二个模块数据函数
	function GetRightBottomSecondData(prama){
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#PolicyAndMsgLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#PolicyAndMsgMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/SearchText",
			data: {
				Aid: UserAid,
				Project: "3",
				Category: prama
			},
			success: function(result) {
				console.log(result);
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
//				var str = "";
//				var datareturn = result.data;
//				if(result.code == "00000"){
//					if(datareturn.length == 0){
//						return false;
//					}else{
//						var obj1 = datareturn;
//						var str = "";
//						for(var j=0; j<obj1.length; j++){
//							str += '<span class="latestWord">'+obj1[j]+'</span>';
//						}	
//						$("#latestWordContainer").append(str);
//						//点击最新词汇查询
//						$(".latestWord").unbind('click').click(function(){
//							$("#KnowledgeBaseSearchIpt").val(this.innerHTML);
//							
//						});
//					}					
//				}else{
//					alert("未知状态:"+result.code);
//				}	
                RinghtBottomModelTwofirstIn = false;
			},
			error: function() {
				$("#PolicyAndMsgMengcheng").css("display","none");
				$("#PolicyAndMsgLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});	
    };
	
	
	
	
	
	
	
	
	

}