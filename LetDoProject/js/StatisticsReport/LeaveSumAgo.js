window.onload = function(){
    //回车姓名搜索输入框
    $(".NameSel").keydown(function (event) {
        event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
        if (event.keyCode == 13) {           
            $("#reportTable").bootstrapTable('destroy');
            CreatTable($(".NameSel").val());
        }
    });
    //点击导出
    $(".modelExportAll").click(function() {
		$('#reportTable').tableExport({
			type: 'excel',
			escape: 'false',
			fileName: $(".NameSel").val()+'请假汇总表(1-5)'
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
	CreatTable($(".NameSel").val());
	function CreatTable(parmName){
		$table = $('#reportTable').bootstrapTable({
			method: 'get',
			url:CTX_PATHZHJCS+"history",		
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
				},
//				{
//					title: "请假起止日期",
//					align: "center",
//					valign: "middle",
//					colspan: 2,
//					rowspan: 1			
//				},
                {
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
			    [
//			    {
//					field: "startDate",
//					title: "开始时间",
//					align: "center",
//					valign: "middle",
//					colspan: 1,
//					rowspan: 1
//				}, {
//					field: "endDate",
//					title: "结束时间",
//					align: "center",
//					valign: "middle",
//					colspan: 1,
//					rowspan: 1
//				}, 
				{
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
			queryParams: queryParams(parmName),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
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
				//mergeCells(data.data, "name", 1);//姓名行合并
			}
	    });
	}
    $(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});

    //请求服务数据时所传参数
	function queryParams(params1){
	    return {	    	
	    	'name': params1  //姓名参数	    	
	    };	
	};	
	function setData(obj){
		var data = obj;
		var map = {};
		var arr = [];
		var dest = [];
		var list = [];
		var listBetter = [];
		//第一层循环给部门加stringNameLen表示字段,根据数组长度标识部门行rowspan的数值
		for(var i=0;i<obj.length;i++){
			var lenBM = obj[i].historyList.length;
			for(var j=0;j<lenBM;j++){
				if(obj[i].historyList[j]){
					obj[i].historyList[j].stringNameLen = 0;	
					obj[i].historyList[0].stringNameLen = lenBM;
					arr.push(obj[i].historyList[j]);
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
		//console.log(list);
		for(k=0;k<list.length;k++){
			if(parseFloat(list[k].nameLen) > 0){
				//console.log(list[k].nameLen);
				list[k].hourtotal = 0;
				for(k1=0;k1<parseInt(list[k].nameLen);k1++){
					if(list[k+k1].hourLength_a){
						list[k].hourLength_a = list[k+k1].hourLength_a;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_a);
					}
					if(list[k+k1].hourLength_b){
						list[k].hourLength_b = list[k+k1].hourLength_b;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_b);
					}
					if(list[k+k1].hourLength_c){
						list[k].hourLength_c = list[k+k1].hourLength_c;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_c);
					}
					if(list[k+k1].hourLength_d){
						list[k].hourLength_d = list[k+k1].hourLength_d;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_d);
					}
					if(list[k+k1].hourLength_e){
						list[k].hourLength_e = list[k+k1].hourLength_e;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_e);
					}
					if(list[k+k1].hourLength_f){
						list[k].hourLength_f = list[k+k1].hourLength_f;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_f);
					}
					if(list[k+k1].hourLength_g){
						list[k].hourLength_g = list[k+k1].hourLength_g;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_g);
					}
					if(list[k+k1].hourLength_h){
						list[k].hourLength_h = list[k+k1].hourLength_h;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_h);
					}
					if(list[k+k1].hourLength_i){
						list[k].hourLength_i = list[k+k1].hourLength_i;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_i);
					}
					if(list[k+k1].hourLength_j){
						list[k].hourLength_j = list[k+k1].hourLength_j;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_j);
					}
					if(list[k+k1].hourLength_k){
						list[k].hourLength_k = list[k+k1].hourLength_k;
						list[k].hourtotal += parseFloat(list[k+k1].hourLength_k);
					}
				}
				listBetter.push(list[k]);
			}
		}
		//console.log(listBetter);
        return listBetter;
	}
	
	
}
