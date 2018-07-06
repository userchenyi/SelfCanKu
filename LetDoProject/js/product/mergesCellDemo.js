window.onload = function(){
	
	//表格部分
	//设置表格外围容器高度
	//$("#reportTableDiv").height($(window).height() - $(".selectCont").height() - 10 + "px");
	$("#reportTableDiv").height($(window).height() + "px");
	
	//tableHeight函数
	function tableHeight() {
		//可以根据自己页面情况进行调整
		return $("#reportTableDiv").height();
	};
	
	
	var $table; 
	//保存选中ids 
	var selectionIds = []; 
	$table = $('#reportTable').bootstrapTable({
		method: 'get',
		url:"http://127.0.0.1/api/admin/product/index",
		ajaxOptions:{
	        headers: {'Authorization': localStorage.getItem("Utoken")}
	    },		
		dataType: "json",
		dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
		cache: false, //设置为 false 禁用 AJAX 数据缓存
		height: tableHeight(),
		striped: false, //隔行变色
		pagination: true,
		pageSize: 10,
		pageNumber: 1,
		pageList: [10, 20, 50, 100, 200, 500],
		search: true,
		showColumns: true, //是否显示内容列下拉框
		showRefresh: true, //是否显示刷新按钮
		showExport: false, //是否显示导出
		exportDataType: "selected", //basic(当前)', 'all(所有)', 'selected(选中)'.
		exportTypes: ['excel'],
		exportOptions:{  
           ignoreColumn: [0],  //忽略某一列的索引  
           fileName: '产品信息导出表格',  //文件名称设置  
           worksheetName: 'sheet1',  //表格工作区名称  
           tableName: '产品信息',  
           excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
        },  
        idField:"productinformationid", //标识哪个字段为id主键  
		showToggle: false,
		clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
		columns: [{
			field: 'checkStatus',
			width: 25,
			checkbox: true,
			align: 'center',
			valign: 'middle'
		},{
			field: 'productinformationid',
			visible:false
		},{
			field: "numid",
			title: "序号",
			align: "center",
			valign: "middle",
			//sortable: "true",
			formatter: function(value, row, index){
				var pageSize=$('#reportTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条  
                var pageNumber=$('#reportTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页  
                return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号 
			}
		}, {
			field: "name",
			title: "名称",
			align: "center",
			valign: "middle"
		}, {
			field: "productState",
			title: "产品状态",
			align: "center",
			valign: "middle",
			formatter: function(value, row, index){
				var CPstatus;
				if(value == 206290000){
					CPstatus = "未提交";
				}else if(value == 206290001){
					CPstatus = "未审核";
				}else if(value == 206290002){
					CPstatus = "产品部驳回";
				}else if(value == 206290003){
					CPstatus = "发行中";
				}else if(value == 206290004){
					CPstatus = "已成立";
				}else if(value == 206290005){
					CPstatus = "产品部通过";
				}else if(value == 206290006){
					CPstatus = "销售部通过";
				}else if(value == 206290007){
					CPstatus = "销售部驳回";
				}else if(value == 206290008){
					CPstatus = "产品作业部驳回";
				}else if(value == 206290009){
					CPstatus = "募集完成";
				}else if(value == 206290010){
					CPstatus = "清算完成";
				}else if(value == 206290011){
					CPstatus = "兑付完成";
				}else if(value == 206290012){
					CPstatus = "暂停";
				}else{
					CPstatus = value;
				}
				return CPstatus;
			}
		}, {
			field: "productType",
			title: "产品类型",
			align: "center",
			valign: "middle",
			formatter: function(value, row, index){
				var CPtypes;
				if(value == 206290000){
					CPtypes = "FOF产品";
				}else if(value == 206290001){
					CPtypes = "PPP产品";
				}else if(value == 206290002){
					CPtypes = "OTC产品";
				}else if(value == 206290003){
					CPtypes = "PE股权产品";
				}else{
					CPtypes = value;
				}
				return CPtypes;
			}
		}, 
        {
			field: "issuesscale",
			title: "产品发行规模",
			align: "center",
			valign: "middle"
		}, {
			field: "sumAmount",
			title: "募集规模",
			align: "center",
			valign: "middle"
		}, {
			field: "limit",
			title: "可分配额度",
			align: "center",
			valign: "middle"
		}, {
			field: "allocatedAmount",
			title: "已分配额度",
			align: "center",
			valign: "middle"
		},
		{
			field: "establishedQuota",
			title: "已成立额度",
			align: "center",
			valign: "middle"
		}, {
			field: 'userstatus_operate',
            title: '操作', 
            align: 'center',
            formatter:function(value,row,index){  
                var e = '<span id="'+row.productinformationid+'" class="look" style="color:#4A8BC2;cursor:pointer">查看</span> ';
                return e;   
            }
        }],		
		locale: 'zh-CN', //中文支持
		queryParamsType: '', //默认值为 'limit',传参为：offset,limit,sort //设置为 ''传参为：pageSize,pageNumber
		queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
		sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
		responseHandler:function (res) {  //在渲染页面数据之前执行的方法
			console.log(res);
			if(res.code != 0){
		        alert(res.message);
		        return;
		    }
			$.each(res.data.list, function (i, row) { 
		        row.checkStatus = $.inArray(row.productinformationid, selectionIds) != -1; //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true 
		    }); 
		    //return res; 
			//如果没有错误则返回数据，渲染表格
		    return {
		        total : res.data.totalNumber, //总页数,前面的key必须为"total"
		        data : res.data.list //行数据，前面的key要与之前设置的dataField的值一致.
		    };
        },
        //单击某一格(这里指对点击操作列里面的查看)
        onClickCell: function(field, value, row, $element){
        	//console.log(field+"-"+value+"-"+row.id+"-"+$element);
        	if(field == "userstatus_operate"){
        		//给当前产品id赋值操作
        		currentProductId = row.productinformationid;
        		//调用查看详情函数，弹出详情页
        		checkDetailPage(row.productinformationid);
        	}else{
        		return false;
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
		}
    });
    //请求服务数据时所传参数
	function queryParams(params){
		var seartype;
		//判断search模糊查询的是否为空
		if(params.searchText.trim() == ""){
			seartype = null;
		}else{
			seartype = params.searchText;
		}
	    return {
	        limit : params.pageSize, //每一页的数据行数，默认是上面设置的10(pageSize)
	        offset : parseInt(params.pageNumber - 1) * parseInt(params.pageSize), //当前第几条数据,（后台默认重0开始）
	        search: seartype
            //order : params.sortOrder, //排序
            //orderBy: params.sortName  //按哪一列排序
	        //条件查询参数
	        //productState: $("#select1").val(),
	        //productType: $("#select2").val()
	    }
	};
    //选中事件操作数组 
	var union = function(array,ids){ 
	    $.each(ids, function (i, id) { 
		    if($.inArray(id,array)==-1){ 
		        array[array.length] = id; 
		    } 
	    }); 
	    return array; 
	}; 
	//取消选中事件操作数组 
	var difference = function(array,ids){ 
	    $.each(ids, function (i, id) { 
		    var index = $.inArray(id,array); 
		        if(index!=-1){ 
		        array.splice(index, 1); 
		    } 
	    }); 
	    return array; 
	}; 
	var _ = {"union":union,"difference":difference}; 
	//绑定选中事件、取消事件、全部选中、全部取消 
	$table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) { 
	    var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) { 
	        return row.productinformationid; 
	    }); 
	    func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference'; 
	    selectionIds = _[func](selectionIds, ids); 
	    //console.log(selectionIds);
	}); 
	$(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});
	
	
	
}
