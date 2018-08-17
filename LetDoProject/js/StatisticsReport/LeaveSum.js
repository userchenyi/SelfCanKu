window.onload = function(){
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
    //点击导出
    $(".modelExportAll").click(function() {
		$('#reportTable').tableExport({
			type: 'excel',
			escape: 'false',
			fileName: $(".TimeSel").val()+'请假汇总表'
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
	function mergeCellsByNameLen(data,fieldName,colspan){
	    var index = 0;
	    for(var i = 0 ; i < data.length ; i++){
	    	if(parseInt(data[i].nameLen)>0){
	    		$table.bootstrapTable('mergeCells',{index:i, field:fieldName, colspan: colspan, rowspan: data[i].nameLen}); 
	    	}
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
			url:CTX_PATHZHJCS+"vacation",		
			dataType: "JSON",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			height: tableHeight(),
			striped: false, //隔行变色
	        idField:"productinformationid", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
	        columns:[
			    [{
					title: "序号",
					align: "center",
					valign: "middle",
					formatter: function(value, row, index){
		                return index+1;
					},
					colspan: 1,  //占几列
					rowspan: 2   //占几行
				},
				{
					field: "deptName",
					title: "部门",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 2
				},
				{
					field: "name",
					title: "姓名",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 2
				},{
					title: "请假起止日期",
					align: "center",
					valign: "middle",
					colspan: 2,
					rowspan: 1			
				},{
					title: "假别（小时）",
					align: "center",
					valign: "middle",
					colspan: 11,
					rowspan: 1
				},{
					field: "hourtotal",
					title: "累计（小时）",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 2
				}],
			    [{
					field: "startDate",
					title: "开始时间",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}, {
					field: "endDate",
					title: "结束时间",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}, {
					field: "hourLength_a",
					title: "事假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_b",
					title: "病假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_c",
					title: "调休",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_d",
					title: "年休假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_e",
					title: "婚假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_f",
					title: "产假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_g",
					title: "产检假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_h",
					title: "陪产假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_i",
					title: "工伤假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_j",
					title: "丧假",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}, {
					field: "hourLength_k",
					title: "其他",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1,
					formatter: function (value, row, index){
						if(value == "" || value == null || value == undefined || value == " " || value == "undefined"){
							return "";
						}else{
							return value;
						}
					}
				}]
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
				//如果没有错误则返回数据，渲染表格
			    return {
			        data : setData(res.data) //行数据，前面的key要与之前设置的dataField的值一致.
			    };
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
				mergeCellsByNameLen(data.data, "hourtotal", 1);//累计时间（小时）行合并hourtotal
			}
	    });
	}
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
	    });	
	};	
	function setData(obj){
		var data = obj;
		var map = {};
		var arr = [];
		var dest = [];
		var list = [];
		//第一层循环给部门加stringNameLen表示字段,根据数组长度标识部门行rowspan的数值
		for(var i=0;i<obj.length;i++){
			var lenBM = obj[i].leaveReportList.length;
			for(var j=0;j<lenBM;j++){
				if(obj[i].leaveReportList[j]){
					obj[i].leaveReportList[j].stringNameLen = 0;	
					obj[i].leaveReportList[0].stringNameLen = lenBM;
					arr.push(obj[i].leaveReportList[j]);
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
		//遍历对象数组(dest),第二层循环给公出人员加nameLen表示字段,根据数组长度标识公出人员rowspan的数值
		for(i=0;i<dest.length;i++){
			var lenRY = dest[i].data.length;
			for(var j=0;j<dest[i].data.length;j++){
				dest[i].data[j].nameLen = 0;
				dest[i].data[0].nameLen = lenRY;						
				list.push(dest[i].data[j]);
			}
		}
		for(k=0;k<list.length;k++){
			if(parseInt(list[k].nameLen) > 0){
				list[k].hourtotal = 0;
				//该循环累计一个人的请假时长
				for(k1=0;k1<parseInt(list[k].nameLen);k1++){
					if(list[k+k1].hourLength_a){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_a);
					}
					if(list[k+k1].hourLength_b){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_b);
					}
					if(list[k+k1].hourLength_c){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_c);
					}
					if(list[k+k1].hourLength_d){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_d);
					}
					if(list[k+k1].hourLength_e){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_e);
					}
					if(list[k+k1].hourLength_f){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_f);
					}
					if(list[k+k1].hourLength_g){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_g);
					}
					if(list[k+k1].hourLength_h){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_h);
					}
					if(list[k+k1].hourLength_i){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_i);
					}
					if(list[k+k1].hourLength_j){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_j);
					}
					if(list[k+k1].hourLength_k){
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_k);
					}
				}
			}
		}
		//console.log(list);
        return list;
	}
	
	
}
