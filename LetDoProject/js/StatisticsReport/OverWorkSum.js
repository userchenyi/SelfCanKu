window.onload = function(){
    // 获取当前的时间
	var now = new Date();
	var y = now.getFullYear();
	var month = now.getMonth();
	var d = now.getDate(); 
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	// 如果时间值是一位数，前面加个0，顺便改成字符串类型
	month = month < 10? "0" + month : "" + month;
	d = d < 10? "0" + d : "" + d;
	h = h < 10? "0" + h : "" + h;
	m = m < 10? "0" + m : "" + m;
	s = s < 10? "0" + s : "" + s;
	//设置时间选择默认值
	$(".TimeSel").val(y+"-"+month);
	//初始化时间插件实例
    $('.TimeSel').datetimepicker({
        format:'yyyy-mm',
        weekStart: 1,  
	    autoclose: true,  
	    startView: 3,  
	    minView: 3,  
	    forceParse: false,  
	    language: 'zh-CN'  
    }); 
    //监听时间输入框变化
    $(".TimeSel").bind('input propertychange change',function(){
    	$('#reportTable').bootstrapTable('refresh');
    });
    //回车姓名搜索输入框
    $(".NameSel").keydown(function (event) {
        event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
        if (event.keyCode == 13) {
            $('#reportTable').bootstrapTable('refresh');
        }
    });
    //点击导出
    $(".modelExportAll").click(function() {
		$('#reportTable').tableExport({
			type: 'excel',
			escape: 'false',
			fileName: $(".TimeSel").val()+'月加班汇总表'
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
	//表格部分
	var $table; 
	//保存选中ids 
	var selectionIds = []; 
	$table = $('#reportTable').bootstrapTable({
		method: 'get',
		url:"http://192.168.17.57:8080/overTime",		
		dataType: "json",
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
			},{
				field: "deptName",
				title: "部门",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 2
			},{
				field: "name",
				title: "姓名",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 2
			},{
				title: "加班时间",
				align: "center",
				valign: "middle",
				colspan: 3,
				rowspan: 1			
			},{
				title: "加班时段（小时）",
				align: "center",
				valign: "middle",
				colspan: 3,
				rowspan: 1
			}],
		    [{
				field: "startDate",
				title: "日期",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 1
			}, {
				field: "startHourDate",
				title: "开始时间",
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
			}, {
				field: "sjjbsj_a",
				title: "工作日",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 1
			}, {
				field: "sjjbsj_b",
				title: "双休日",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 1
			}, {
				field: "sjjbsj_c",
				title: "法定日",
				align: "center",
				valign: "middle",
				colspan: 1,
				rowspan: 1
			}]
		],	
		locale: 'zh-CN', //中文支持
		//queryParamsType: '', //默认值为 'limit',传参为：offset,limit,sort //设置为 ''传参为：pageSize,pageNumber
		queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
		//sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）
		responseHandler:function (res) {  //在渲染页面数据之前执行的方法
			console.log(res);
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
			mergeCells(data.data, "deptName", 1);//部门行合并
			mergeCells(data.data, "name", 1);//公出人员行合并
		}
    });
    $(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});

    //请求服务数据时所传参数
	function queryParams(params){
	    return {
	    	monthString: $(".TimeSel").val(), //时间参数
	    	checkName: $(".NameSel").val(),  //姓名参数
	    	status:"2"
	    }
	};	
	function setData(obj){
		var data = obj;
		var map = {};
		var arr = [];
		var dest = [];
		var list = [];
		//第一层循环给部门加stringNameLen表示字段,根据数组长度标识部门行rowspan的数值
		for(var i=0;i<obj.length;i++){
			var lenBM = obj[i].overTimeList.length;
			for(var j=0;j<lenBM;j++){
				if(obj[i].overTimeList[j]){
					obj[i].overTimeList[j].stringNameLen = 0;	
					obj[i].overTimeList[0].stringNameLen = lenBM;
					arr.push(obj[i].overTimeList[j]);
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
        return list;
	}
	
	
}
