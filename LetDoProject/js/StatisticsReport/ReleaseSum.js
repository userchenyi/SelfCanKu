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
	//console.log(monthFirst);
	var defalutTime = formatDateTime(monthFirst)+" ~ "+y+"-"+month+"-"+d;
	//console.log(defalutTime + "--" +defalutTime.length);
	//console.log(defalutTime.substring(0,10)+"&"+defalutTime.substring(0,10).length);
	//console.log(defalutTime.substring(13)+"&"+defalutTime.substring(13).length);
	//设置时间选择默认值
//	$(".TimeSel").val(y+"-"+month);
	//初始化时间插件实例
//  $('.TimeSel').datetimepicker({
//      format:'yyyy-mm',
//      weekStart: 1,  
//	    autoclose: true,  
//	    startView: 3,  
//	    minView: 3,  
//	    forceParse: false,  
//	    language: 'zh-CN'  
//  }); 
    //初始化时间laydate
    laydate.render({ 
	    elem: '.TimeSel',
	    //range: true //或 range: '~' 来自定义分割字符
	    range: '~',
	    isInitValue: true, //是否允许填充初始值，默认为 true
	    //value: '2017-07-01 ~ 2017-07-18'        
	    value: defalutTime,
	    done: function(value, date, endDate){
//	    	console.log(value);
//	    	$.ajax({
//              type: "post",
//              url:"http://192.168.17.199:8080/reportPublicSummary",
//              datType: "JSON",
//              contentType: "application/json",
//              data: JSON.stringify({
//			    	'startDate': value.substring(0,10),
//			    	'endDate':  value.substring(13),
//			    	'checkName': $(".NameSel").val(),  //姓名参数
//			    	'deptName': $(".DeptSel").val()  //部门参数
//			    }),             
//              success: function(res) {
//              	if(res.status != 0){
//				        alert(res.message);
//				        return;
//				    }
//              	console.log(res);
//					//console.log(setData(res.data));
//					//如果没有错误则返回数据，渲染表格
//				    //return {
//				        //total : res.data.totalNumber, //总页数,前面的key必须为"total"
//				        //data : setData(res.data) //行数据，前面的key要与之前设置的dataField的值一致.
//				    //};
//				    
//                  $("#reportTable").bootstrapTable('load', {
//                  	data:setData(res.data),
//                  	onLoadSuccess: function(data){
//                  		console.log(777);
//                  		mergeCells(data.data, "deptName", 1);//部门行合并
//				            mergeCells(data.data, "name", 1);//公出人员行合并
//                  	}
//                  });//主要是要这种写法
//              },
//              error: function(res){
//              	alert(res.massage);
//              }
//          });
//            console.log(value);
            if(value == ""){
            	return false;
            }else{
            	$("#reportTable").bootstrapTable('destroy');
	    	    CreatTable(value,$(".NameSel").val());
            }     
//	    	if($(".TimeSel").val() == ""){
//	    		return;
//	    	}else{
//	    		$('#reportTable').bootstrapTable('refresh');
//	    	}		   
		}
    });
    //回车姓名搜索输入框
    $(".NameSel").keydown(function (event) {
        event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
        if (event.keyCode == 13) {
            //$('#reportTable').bootstrapTable('refresh');
            $("#reportTable").bootstrapTable('destroy');
            CreatTable($(".TimeSel").val(),$(".NameSel").val());
        }
    });
    //回车部门搜索输入框
//  $(".DeptSel").keydown(function (event) {
//      event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
//      if (event.keyCode == 13) {
//          //$('#reportTable').bootstrapTable('refresh');
//          $("#reportTable").bootstrapTable('destroy');
//          CreatTable($(".TimeSel").val(),$(".NameSel").val(),$(".DeptSel").val());
//      }
//  });
    //点击导出
    $(".modelExportAll").click(function() {
		$('#reportTable').tableExport({
			type: 'excel',
			escape: 'false',
			fileName: $(".TimeSel").val()+'月公出汇总表'
		});
	});
	//设置表格内容区域高度
	$("#reportTableDiv").height($(window).height() - $(".selectCont").height() - 20 + "px");	
	//tableHeight函数
	function tableHeight() {
		//可以根据自己页面情况进行调整
		return $("#reportTableDiv").height();
	};
//	/**
//	* 合并行
//	* @param data 原始数据（在服务端完成排序）
//	* @param fieldName 合并属性名称数组
//	* @param colspan 列数
//	* @param target 目标表格对象
//	*/
//	function mergeCells(data, fieldName, colspan) {
//		if (data.length == 0) {
//			alert("不能传入空数据");
//			return;
//		}
//		var numArr = [];
//		var value = data[0][fieldName];
//		var num = 0;
//		for (var i = 0; i < data.length; i++) {
//			if (value != data[i][fieldName]) {
//				numArr.push(num);
//				value = data[i][fieldName];
//				num = 1;
//				continue;
//			}
//			num++;
//		}
//		var merIndex = 0;
//		for (var i = 0; i < numArr.length; i++) {
//			$table.bootstrapTable('mergeCells', { index: merIndex, field: fieldName, colspan: colspan, rowspan: numArr[i] })
//			merIndex += numArr[i];
//		}
//	};
//	/**
//	* 合并列
//	* @param data 原始数据（在服务端完成排序）
//	* @param fieldName 合并属性数组
//	* @param target 目标表格对象
//	*/
//	function mergeColspan(data, fieldNameArr, target) {
//		console.log(data);
//		console.log(fieldNameArr);
//		if (data.length == 0) {
//			alert("不能传入空数据");
//			return;
//		}
//		if (fieldNameArr.length == 0) {
//			alert("请传入属性值");
//			return;
//		}
//		var num = -1;
//		var index = 0;
//		for (var i = 0; i < data.length; i++) {
//			num++;
//			for (var v in fieldNameArr) {
//				index = 1;
//				if (data[i][fieldNameArr[v]] != data[i][fieldNameArr[0]]) {
//					index = 0;
//					break;
//				}
//			}
//			if (index == 0) {
//			    continue;
//			}
//			$(target).bootstrapTable('mergeCells', { index: num, field: fieldNameArr[0], colspan: fieldNameArr.length, rowspan: 1 });
//		}
//	};
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
	//表格部分
	var $table; 
	//保存选中ids 
	var selectionIds = [];
	CreatTable($(".TimeSel").val(),$(".NameSel").val());
	function CreatTable(parmTime,parmName){
		$table = $('#reportTable').bootstrapTable({
			method: 'POST',
			url:"http://192.168.17.199:8080/reportPublicSummary",
	//		ajaxOptions:{
	//	        headers: {'Authorization': localStorage.getItem("Utoken")}
	//	    },	
			dataType: "JSON",
			contentType: "application/json",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			height: tableHeight(),
			striped: false, //隔行变色
			//pagination: true,
			//pageSize: 10,
			//pageNumber: 1,
			//pageList: [10, 20, 50, 100, 200, 500],
			//search: true,
			//showColumns: true, //是否显示内容列下拉框
			//showRefresh: true, //是否显示刷新按钮
			//showExport: true, //是否显示导出
			//exportDataType: "all", //basic(当前)', 'all(所有)', 'selected(选中)'.
			//exportTypes: ['excel'],
			//exportOptions:{  
	        //   ignoreColumn: [0],  //忽略某一列的索引  
	        //   fileName: '公出信息导出表格',  //文件名称设置  
	        //   worksheetName: 'sheet1',  //表格工作区名称  
	        //   tableName: '公出信息',  
	        //   excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
	        //},  
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
//				{
//					field: "deptName",
//					title: "部门",
//					align: "center",
//					valign: "middle",
//					colspan: 1,
//					rowspan: 2
//				},
				{
					field: "name",
					title: "公出人员",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 2
				},{
					title: "公出时间",
					align: "center",
					valign: "middle",
					colspan: 4,
					rowspan: 1			
				},{
					field: "hourLength",
					title: "时长/小时",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 2
				}
			    ],
			    [{
					field: "startDate",
					title: "开始日期",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}, 
		        {
					field: "startHourDate",
					title: "开始时间",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}, {
					field: "endDate",
					title: "结束日期",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}, {
					field: "endHourDate",
					title: "结束时间",
					align: "center",
					valign: "middle",
					colspan: 1,
					rowspan: 1
				}]
			],	
			locale: 'zh-CN', //中文支持
			//queryParamsType: '', //默认值为 'limit',传参为：offset,limit,sort //设置为 ''传参为：pageSize,pageNumber
			queryParams: queryParams(parmTime,parmName),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
			//sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）
			responseHandler:function (res) { //在渲染页面数据之前执行的方法
				console.log(res);
				if(res.status != 0){
			        alert(res.message);
			        return;
			    }
				//console.log(setData(res.data));
				//如果没有错误则返回数据，渲染表格
			    return {
			        //total : res.data.totalNumber, //总页数,前面的key必须为"total"
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
				mergeCells(data.data, "name", 1);//公出人员行合并
			}
	    });
	}
	
    $(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});
//  var QueryParam = {
//  	'startDate': $(".TimeSel").val().substring(0,10),
//  	'endDate':  $(".TimeSel").val().substring(13),
//  	'checkName': $(".NameSel").val(),  //姓名参数
//  	'deptName': $(".DeptSel").val()  //部门参数
//  };
    //console.log(JSON.stringify(QueryParam));
    //console.log(typeof(JSON.stringify(QueryParam)));
    //请求服务数据时所传参数
	function queryParams(params1,params2){
		console.log(params1);
//		var seartype;
//		//判断search模糊查询的是否为空
//		if(params.searchText.trim() == ""){
//			seartype = null;
//		}else{
//			seartype = params.searchText;
//		}
	    return JSON.stringify({
	    	'startDate': params1.substring(0,10),
	    	'endDate':  params1.substring(13),
	    	'checkName': params2,  //姓名参数
	    	//'deptName': params3  //部门参数
	    });
//	    	//monthString: $(".TimeSel").val(), //时间参数
//	    	//status:"2"
//	        //limit : params.pageSize, //每一页的数据行数，默认是上面设置的10(pageSize)
//	        //offset : parseInt(params.pageNumber - 1) * parseInt(params.pageSize), //当前第几条数据,（后台默认重0开始）
//	        //search: seartype
//          //order : params.sortOrder, //排序
//          //orderBy: params.sortName  //按哪一列排序
//	        //条件查询参数
//	        //productState: $("#select1").val(),
//	        //productType: $("#select2").val()

	};
    
	
	function setData(obj){
		//console.log(obj);
		var data = obj;
		var map = {};
		var arr = [];
		var dest = [];
		var list = [];
		//第一层循环给部门加stringNameLen表示字段,根据数组长度标识部门行rowspan的数值
		for(var i=0;i<obj.length;i++){
			var lenBM = obj[i].publicSummaryModelList.length;
			for(var j=0;j<lenBM;j++){
				if(obj[i].publicSummaryModelList[j]){
					obj[i].publicSummaryModelList[j].stringNameLen = 0;	
					obj[i].publicSummaryModelList[0].stringNameLen = lenBM;
					arr.push(obj[i].publicSummaryModelList[j]);
				}						
			}
		}
		//console.log("arr",arr);
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
			var lenRY = dest[i].data.length;
			for(var j=0;j<dest[i].data.length;j++){
				dest[i].data[j].nameLen = 0;
				dest[i].data[0].nameLen = lenRY;						
				list.push(dest[i].data[j]);
			}
		}
        return list;
	}
	
	
}
