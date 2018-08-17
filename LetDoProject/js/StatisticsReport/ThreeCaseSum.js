window.onload = function(){
	//定义变量保存屏蔽人员名单（非上海本公司）
	var MaskPeople = ['陈旭','杨晓旭','毛赤宇','周通顺','施林冲','戴树珍','严赟','张开柱','陆芳芳','夏丹丹','刘伟一','林卫华','庄会清','郭云武','周永挺','刘立权',
	'陈思燕','赵得乾','石晓霞','张海东','占涛涛','吴晓丽','张一青','韩佩霞','范忆敏','赵超斌','陈增宝','黄俊峰','张静','程涛','李海','曹伟','刘晓艳','谢飞君','江晓州',
	'平达','江盈盈','胡涛','汪静容','李微阳','陈兰兰','陈沐乔','史芳洁','吕玲','金以群','李现珍','唐正敏','张华','闻亚君','吴婧媖','展疆','张智霖','杨培','陈校良',
	'王秀琦','鲁蔚华','周品岳','王雪芬','杨柳','朱颖','邹瑜','吴斌斌','陈佼祯','徐长静','项超','贾振莲','樊永盛','张露伟','常正欣','李彪','姜向真','吕浩','毛云敏',
	'尹璐','何伟','金丽莉','徐怡娜','张鹤钟','朱宝仙','魏贝贝','汤自勤','徐凌焱','吴爱英','徐玥','夏佳美','朱俊磊','潘慧文','张淼','尹婧','吴莺瑛','韩路明','王涛',
	'盛晓岚','寿继敏','楼林锋','章亮','钱微微','张晋','陈琳','林海洁','俞莎','赵果','蔡林峰','邹洁','朱莎莎','董海娜','王丹','葛欢','崔文荣','孙瑞瑞','张玉鑫','余东洲',
	'林欢','姚梅','张卫国','丁建波','刘高伟','沈石明','刘彭海','吴海华','周晓俊','刘雨萌','周亚玲','王金金','蒋伟兰','王晶晶','蔡丽平','朱舒舒','王丽君','江燕',
	'杨军','王倩','孟新建','陶俊栋','付萍','李梦','来锋烽','刘丹','黄晨圆','程星','盛叶琼','曹显峰','张瑾','王文天','张玲','陈杨','苏迦迦','王松钢','邹腾鹏','岳丽丽',
	'周宗萍','夏中义'];
	//console.log(MaskPeople);
	//console.log(MaskPeople.length);
	var listMsg = []; //该数组为存储需要发送邮件人员日期和名单
	var listMsgClick = []; //该数组为选中checkbox时保持的需要发送邮件人员日期和名单
    // 获取当前的时间
	var now = new Date();
	var y = now.getFullYear();
	var month = now.getMonth()+1;
	var d = now.getDate(); 
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	//获取当前月第一天
	var monthFirst = now.setDate(1);//此处获得的每个月第一天时间为13位时间戳格式，用到的地方需做转换
	// 如果时间值是一位数，前面加个0，顺便改成字符串类型
	month = month < 10? "0" + month : "" + month;
	d = d < 10? "0" + d : "" + d;
	h = h < 10? "0" + h : "" + h;
	m = m < 10? "0" + m : "" + m;
	s = s < 10? "0" + s : "" + s;
	var defalutTime = formatDateTime(monthFirst)+" ~ "+y+"-"+month+"-"+d;
	//初始化时间laydate
    laydate.render({ 
	    elem: '.TimeSel',
	    //range: true //或 range: '~' 来自定义分割字符
	    range: '~',
	    isInitValue: true, //是否允许填充初始值，默认为 true       
	    value: defalutTime,
	    done: function(value, date, endDate){
            if(value == ""){
            	return false;
            }else{
            	$("#reportTable").bootstrapTable('destroy');
	    	    CreatTable(value,$(".NameSel").val());
            }     	   
		}
    });
    //回车姓名搜索输入框
    $(".NameSel").keydown(function (event) {
        event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
        if (event.keyCode == 13) {
            if($(".TimeSel").val() == ""){
	    		alert("请选择时间区间！");
	    	}else{
	            $("#reportTable").bootstrapTable('destroy');
	            CreatTable($(".TimeSel").val(),$(".NameSel").val());
	        }
        }
    });
    //回车部门搜索输入框
//  $(".DeptSel").keydown(function (event) {
//      event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
//      if (event.keyCode == 13) {
//          $('#reportTable').bootstrapTable('refresh');
//      }
//  });
    //点击导出
    $(".modelExportAll").click(function() {
		$('#reportTable').tableExport({
			type: 'excel',
			escape: 'false',
			fileName: $(".TimeSel").val()+'迟到、早退、旷工汇总表'
		});
	});
	//设置表格内容区域高度
	$("#reportTableDiv").height($(window).height() - $(".selectCont").height() - 20 + "px");	
	//tableHeight函数
	function tableHeight() {
		//可以根据自己页面情况进行调整
		return $("#reportTableDiv").height();
	};
    function mergeCells(data,fieldName,colspan){
	    //声明一个map计算相同属性值在data对象出现的次数和
	    var sortMap = {};
	    for(var i = 0 ; i < data.length ; i++){
	        for(var prop in data[i]){
	            if(prop == fieldName){
	                var key = data[i][prop];
	                if(sortMap.hasOwnProperty(key)){
	                    sortMap[key] = sortMap[key] * 1 + 1;
	                } else {
	                    sortMap[key] = 1;
	                }
	                break;
	            } 
	        }
	    }
	    var index = 0;
	    for(var prop in sortMap){
	        var count = sortMap[prop] * 1;
	        $table.bootstrapTable('mergeCells',{index:index, field:fieldName, colspan: colspan, rowspan: count});   
	        index += count;
	    }
	};
	function mergeCellsRow(data,colspan){
	    //声明一个map计算相同属性值在data对象出现的次数和
	    var sortMapl = {};
	    for(var j = 0 ; j < data.length ; j++){
	        for(var prop in data[j]){
	            if(prop == "name"){
	                var key = data[j][prop];
	                if(sortMapl.hasOwnProperty(key)){
	                    sortMapl[key] = sortMapl[key] * 1 + 1;
	                } else {
	                    sortMapl[key] = 1;
	                }
	                break;
	            } 
	        }
	    }
	    var indexl = 0;
	    for(var prop in sortMapl){
	        var countl = sortMapl[prop] * 1;
	        $table.bootstrapTable('mergeCells',{index:indexl, field:"num", colspan: colspan, rowspan: countl});   
	        indexl += countl;
	    }
	};
	//表格部分
	var $table; 
	//保存选中ids 
	var selectionIds = []; 
	CreatTable($(".TimeSel").val(),$(".NameSel").val());
	function CreatTable(parmTime,parmName){
		$table = $('#reportTable').bootstrapTable({
			method: 'POST',
			url:CTX_PATHZHJCS+"late",		
			dataType: "JSON",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			height: tableHeight(),
			striped: false, //隔行变色
	        idField:"productinformationid", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: true, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
	        columns:[
	            {
					field: 'checkStatus',
					width: 25,
					checkbox: true,
					align: 'center',
					valign: 'middle'
				},
	            {
					title: "序号",
					align: "center",
					valign: "middle",
					formatter: function(value, row, index){
		                return index+1;
					},
					colspan: 1,  //占几列
					rowspan: 1   //占几行
				},
				{
					field: "deptName",
					title: "部门",
					align: "center",
					valign: "middle"		
				},
				{
					field: "name",
					title: "姓名",
					align: "center",
					valign: "middle"
				},{
					field: "date",
					title: "打卡时间",
					align: "center",
					valign: "middle"
				},{
					field: "hourLength",
					title: "迟到/早退/旷工时间（分钟）",
					align: "center",
					valign: "middle"
				},{
					field: "num",
					title: "迟到/早退/旷工次数",
					align: "center",
					valign: "middle"
				},{
					field: "CD2",
					title: "绩效处罚",
					align: "center",
					valign: "middle",
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}
			],	
			locale: 'zh-CN', //中文支持
			//queryParamsType: '', //默认值为 'limit',传参为：offset,limit,sort //设置为 ''传参为：pageSize,pageNumber
			queryParams: queryParams(parmTime,parmName),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
			//sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）
			responseHandler:function (res) {  //在渲染页面数据之前执行的方法
				//console.log(res);
				if(res.status != 0){
			        alert(res.message);
			        return;
			    }
				//console.log(setData(res.data));
				//如果没有错误则返回数据，渲染表格
			    return {
			        data : setData(res.data) //行数据，前面的key要与之前设置的dataField的值一致.
			    };
	        },
	        //点击每一个单选框时触发的操作
	        onCheck:function(row){
	            //console.log(row.name);
	            //按条件保存需要发送邮件人员名单及日期
				//if($.inArray(row.name, MaskPeople) == '-1' && row.hourLength == '旷工'){
				if($.inArray(row.name, MaskPeople) == '-1'){
					var msgClickObj = {};
					msgClickObj.account = row.name;
					msgClickObj.date = row.date;
					//判断是否已经存在数组内，去重操作
					if(JSON.stringify(listMsgClick).indexOf(JSON.stringify(msgClickObj)) != '-1'){
						return false;
					}else{
						listMsgClick.push(msgClickObj);
					    //console.log(listMsgClick);
					}
				}
	        },
	        //取消每一个单选框时对应的操作；
	        onUncheck:function(row){
	            //console.log(row);   
	            //按条件保存需要发送邮件人员名单及日期
				//if($.inArray(row.name, MaskPeople) == '-1' && row.hourLength == '旷工'){
				if($.inArray(row.name, MaskPeople) == '-1'){
		            if(listMsgClick.length <= 0){
		            	return false;
		            }else{ 	
		            	var msgDelObj = {};
		            	msgDelObj.account = row.name;
						msgDelObj.date = row.date;
						$.each(listMsgClick, function(index,obj) {
							if(msgDelObj.account == obj.account && msgDelObj.date == obj.date){
								listMsgClick.splice(index,1);
								//console.log(listMsgClick);
								return false;
							}
						});
		            }  
		        }
	        },
			onPageChange: function(size, number) {
				//console.log("页面元素变化");	
			},
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('#reportTable').bootstrapTable('removeAll');  
			},
			onLoadSuccess: function (data) {
				//mergeCells(data.data, "deptName", 1);//部门行合并
				mergeCells(data.data, "name", 1);//姓名行合并
				mergeCellsRow(data.data,1); //合并迟到/早退/旷工次数,这里的合并根据姓名的次数作参考
			}
	    });
	}
	//表格全选事件
	$('#reportTable').on('check-all.bs.table', function (e,dataArr) {
		//console.log(dataArr);
		//按条件保存需要发送邮件人员名单及日期
		listMsgClick = [];
		for(v=0; v<dataArr.length; v++){
			//if($.inArray(dataArr[v].name, MaskPeople) == '-1' && dataArr[v].hourLength == '旷工'){
			if($.inArray(dataArr[v].name, MaskPeople) == '-1'){
				var msgObjAll = {};
				msgObjAll.account = dataArr[v].name;
				msgObjAll.date = dataArr[v].date;
				listMsgClick.push(msgObjAll);
			}
		}
        //console.log(listMsgClick);
    });
	//表格取消全选事件
	$('#reportTable').on('uncheck-all.bs.table', function (e,dataArr) {
        listMsgClick = [];	          
	    //console.log(listMsgClick);
    });
    $(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});
    //请求服务数据时所传参数
	function queryParams(params1,params2){
	    return JSON.stringify({
	    	'startDate': params1.substring(0,10),
	    	'endDate':  params1.substring(13),
	    	checkName: params2  //姓名参数
	    	//deptName: $(".DeptSel").val()  //部门参数
	    })
	};
	//点击发送邮件
	$('.SendMsg').click(function(){
		//console.log(listMsgClick);
		//校验
        if(listMsgClick.length <= 0){
        	alert("请勾选数据！")
        }else{
        	//信息完整，请求后台登录
            $.ajax({
            	beforeSend: function () {
	                $(".LoadingImg").addClass("fa fa-spinner fa-spin");
			        $(".loadwraper").css("display", "block");
	            },
          	    async: true,
				type:'POST',
				contentType:'application/json;charset=UTF-8',
				dataType: "JSON",
				traditional:true,
				//url:CTX_PATHZHJCS+"email?name="+encodeURI(encodeURI(localStorage.getItem("Uname"))),
				url:CTX_PATHZHJCS+"email?name="+localStorage.getItem("Uname"),
				data:JSON.stringify(listMsgClick),
				success:function(result){		
					//console.log(result);
					if(result.status == 0 && !result.data){
						alert("邮件已发送成功！");
					}else if(result.status == 500){
						alert(result.message);
					}else{
						alert(result.data);
					}
			    }, 
			  	error:function(){
			  		$(".LoadingImg").removeClass("fa fa-spinner fa-spin");
			        $(".loadwraper").css("display", "none");
			  		alert("网络错误！");	
			  	}	 
		    });	
        }
	});
	
	function setData(obj){
		var data = obj;
		var map = {};
		var arr = [];
		var dest = [];
		var list = [];    //该数组为页面数据展示数组
		listMsg = []; //该数组为存储需要发送邮件人员日期和名单
		//第一层循环给部门加stringNameLen表示字段,根据数组长度标识部门行rowspan的数值
		for(var i=0;i<obj.length;i++){
			var lenBM = obj[i].lateList.length;
			for(var j=0;j<lenBM;j++){
				if(obj[i].lateList[j]){
					obj[i].lateList[j].stringNameLen = 0;	
					obj[i].lateList[0].stringNameLen = lenBM;
					arr.push(obj[i].lateList[j]);
				}						
			}
		}
		//将公出人员名字相同的数据条放在一个对象数组(dest)里面分类保存				
		for(var i = 0; i < arr.length; i++){
		    var ai = arr[i];
		    if(!map[ai.name]){
		        dest.push({
		            name: ai.name,
		            data: [ai]
		        });
		        map[ai.name] = ai;
		    }else{
		        for(var j = 0; j < dest.length; j++){
		            var dj = dest[j];
		            if(dj.name == ai.name){
		                dj.data.push(ai);
		                break;
		            }
		        }
		    }
		}				
		//console.log(dest);
		//遍历对象数组(dest),第二层循环给公出人员加nameLen表示字段,根据数组长度标识公出人员rowspan的数值
		for(i=0;i<dest.length;i++){
			//var lenRY = dest[i].data.length;
			for(var j=0;j<dest[i].data.length;j++){				
				//是否要屏蔽该条数据
				if($.inArray(dest[i].data[j].name, MaskPeople) == '-1'){
					list.push(dest[i].data[j]);
					//这里设置nameLen长度比实际少1，实际用到时需加1操作
					dest[i].data[0].nameLen += 1;
				}
				//按条件保存需要发送邮件人员名单及日期
				//if($.inArray(dest[i].data[j].name, MaskPeople) == '-1' && dest[i].data[j].hourLength == '旷工'){
				if($.inArray(dest[i].data[j].name, MaskPeople) == '-1'){
					var msgObj = {};
					msgObj.account = dest[i].data[j].name;
					msgObj.date = dest[i].data[j].date;
					listMsg.push(msgObj);
				}
				dest[i].data[j].nameLen = 0;
				//dest[i].data[0].nameLen = lenRY;
			}
		}
		//console.log(list);
		//console.log(listMsg);
        return list;
	}
	
	
}
