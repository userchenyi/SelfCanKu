window.onload = function(){
	//下拉选择框初始化
	$('.selectpicker1,.selectpicker2').selectpicker();
	//该种情况为下拉值从后台拉取过来
	var res = {
		account_arr:['按产品筛选,全部','元鑫旺天天赢现金管理二号','元鑫富FOF安心增强二号私募投资基金']
	}
    var str = "";
    //res.account_arr为后台接口接收到的数组
	for (var i = 0; i < res.account_arr.length; i++){
	    str += '<option value="'+ '1'+'-'+(i+1) +'">'+ res.account_arr[i] +'</option>'
	}
	$(".selectpicker1").html(str);
	$('.selectpicker1').selectpicker('refresh');//动态刷新
	
	//选择框chang事件
	$('#select').on('changed.bs.select', function (e) {
	    // do something...
	    console.log(this.value);
	    $('#reportTable').bootstrapTable('refresh');
	});
	
	//表格部分
	//设置表格外围容器高度
	$("#reportTableDiv").height($(window).height() - $(".selectCont").height() - $(".MindThings").height() - 10 + "px");
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
		//contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		//contentType:"application/json",
		//url: "http://192.168.17.50:8080/questionBank/listPage", //要请求数据的文件路径
		url:"http://127.0.0.1/api/personnelInformation/listPage",
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
           fileName: '客户信息导出表格',  //文件名称设置  
           worksheetName: 'sheet1',  //表格工作区名称  
           tableName: '客户信息',  
           excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
        },  
        idField:"id", //标识哪个字段为id主键  
		showToggle: false,
		clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
		columns: [{
			field: 'checkStatus',
			width: 25,
			checkbox: true,
			align: 'center',
			valign: 'middle'
		},{
			field: 'id',
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
			title: "姓名",
			align: "center",
			valign: "middle"
		}, {
			field: "sex",
			title: "性别",
			align: "center",
			valign: "middle",
			formatter: function(value, row, index){
				var theSex;
				if(value == 1){
					theSex = "男";
				}else if(value == 2){
					theSex = "女";
				}else{
					theSex = value;
				}
				return theSex;
			}
		}, {
			field: "age",
			title: "年龄",
			align: "center",
			valign: "middle"
		}, 
//		{
//			field: "c",
//			title: "证件类型",
//			align: "center",
//			valign: "middle"
////			sortable: "true"
//		}, 
		{
			field: "cardNoId",
			title: "证件号码",
			align: "center",
			valign: "middle"
		}, {
			field: "international",
			title: "国籍",
			align: "center",
			valign: "middle"
		}, {
			field: "occupation",
			title: "职业",
			align: "center",
			valign: "middle"
		}, {
			field: "address",
			title: "联系地址",
			align: "center",
			valign: "middle"
		},
		{
			field: 'userstatus_operate',
            title: '操作', 
            align: 'center',
            formatter:function(value,row,index){  
                var e = '<span id="'+row.id+'" class="look" style="color:#4A8BC2;cursor:pointer">查看</span> ';
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
		        alert(res.msg);
		        return;
		    }
			$.each(res.data.list, function (i, row) { 
		        row.checkStatus = $.inArray(row.id, selectionIds) != -1; //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true 
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
        		//调用查看详情函数，弹出详情页
        		checkDetailPage(row.id);
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
	        //param1: $("#select").val()
	        //param2: $("#select1").val()
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
	        return row.id; 
	    }); 
	    func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference'; 
	    selectionIds = _[func](selectionIds, ids); 
	    //console.log(selectionIds);
	    //此处为手动添加导出选中数据部分判断逻辑
	    if(selectionIds.length > 0){
	    	//如果存在导出选中按钮
	    	if($(".selectCont").find('.modelExportPart').length){
	    		//更新a链接的href属性，主要目的是更新selectionIds数组
	    		$(".modelExportPart").prop('href','http://127.0.0.1/api/personnelInformation/listPage?status=1&limit=10000&personnelId='+selectionIds+'');
	    	}else{
	    		//不存在导出选中按钮，动态生成到页面
	    		var stra='<a class="modelExportPart" href="http://127.0.0.1/api/personnelInformation/listPage?status=1&limit=10000&personnelId='+selectionIds+'">导出选中</a>';
	    		$(".selectCont").append(stra);
	    	}
	    //未选中行
	    }else{
	    	if($(".selectCont").find('.modelExportPart').length){
	    		$('.modelExportPart').remove();
	    	}else{
	    		return ;
	    	}
	    }
	}); 
    
	$(window).resize(function() {
		$('#reportTable').bootstrapTable('resetView');
	});
	
	/*---------------------------------------------------------客户详情页部分逻辑代码-------------------------------------------*/
	//页面加载将弹窗元素先隐藏再定位在屏幕右侧外围
	$(".customerDetailWrapper").css({"display":"none","left":$(window).width()});
	//设置客户信息详情页内容区的高度
	$(".detailWrapper").css("height",$(window).height() - 40 + "px");
    
    $(".close").click(function(){
    	$(".customerDetailWrapper").animate({"left": $(window).width()}, 200);
    	//$(".customerDetailWrapper").css("display",'none');
    });
    //查看客户信息详情函数
    function checkDetailPage(parama_1){
    	//console.log(parama_1);
    	$.ajax({
      	    async: true,
			type:'get',
			url:"http://127.0.0.1/api/personnelInformation/get",
			data:{
			    id: parama_1
		    },
			success:function(result){
				console.log(result);
				var str = "";
				var strl = "";
				var datareturn = result.data;
				$(".sprName").html(datareturn.name);
				if(result.code == "0"){
					//信息详情页赋值(第一个模块)
					if(datareturn.level == "C1"){
						$(".userlevel").html('（积极型）');
					}else if(datareturn.level == "C2"){
						$(".userlevel").html('（激进型）');
					}else if(datareturn.level == "C3"){
						$(".userlevel").html('（稳健型）');
					}else if(datareturn.level == "C4"){
						$(".userlevel").html('（谨慎型）');
					}else if(datareturn.level == "C5"){
						$(".userlevel").html('（极谨型）');
					}else{
						alert("用户类型评估字段level异常"+":"+datareturn.level);
					}
					if(datareturn.sex == "1"){
						$(".sprSex").html("男");
					}else if(datareturn.sex == "2"){
						$(".sprSex").html("女");
					}else{
						alert("性别错误代码！")
					}
					$(".sprAge").html(datareturn.age);
					$(".sprGj").html(datareturn.international);
					$(".sprZY").html(datareturn.occupation);
					$(".sprCardId").html(datareturn.cardNoId);
					$(".sprAdress").html(datareturn.address);
					//(第二个模块)
					//清空页面元素之前内容
					$(".seletAnswer").empty();
					var chooseSelectOptioins = [];
					//此处因不确定每个选择具体有几个选项，暂时指定ABCFDE五个选项且这5个选项不一定全存在，所以做五次判断依次保存到数组，再次遍历生成！
					$.each(datareturn.questionBankList,function(index,obj){
						chooseSelectOptioins = [];
						str = "";
						if(obj.chooseA){
							chooseSelectOptioins.push(obj.chooseA); 
						}
						if(obj.chooseB){
							chooseSelectOptioins.push(obj.chooseB); 
						}
						if(obj.chooseC){
							chooseSelectOptioins.push(obj.chooseC); 
						}
						if(obj.chooseD){
							chooseSelectOptioins.push(obj.chooseD); 
						}
						if(obj.chooseE){
							chooseSelectOptioins.push(obj.chooseE); 
						}
						for(var i=0;i<chooseSelectOptioins.length;i++){
						    str+='<li class="ansItem">'+chooseSelectOptioins[i]+'</li>';
						}
						strl+='<li>'+obj.id+'.'+obj.title+'</li>'+str;
					});
					$(".seletAnswer").append(strl);
					//(第三个模块)
					$(".cardJust").attr("src",datareturn.cardJustUrl);
					$(".cardBack").attr("src",datareturn.cardBackUrl);
					$(".cardHold").attr("src",datareturn.cardHoldUrl);
					$(".assets").attr("src",datareturn.urls);
//					$(".cardJust").attr("src","http://learningsitter.qiniudn.com/a1104240-2331-4920-87e3-fcb737355dce");
//					$(".cardBack").attr("src","http://learningsitter.qiniudn.com/a1104240-2331-4920-87e3-fcb737355dce");
//					$(".cardHold").attr("src","http://learningsitter.qiniudn.com/a1104240-2331-4920-87e3-fcb737355dce");
//					$(".assets").attr("src","http://learningsitter.qiniudn.com/a1104240-2331-4920-87e3-fcb737355dce");
					
					//将之前的容器回滚到顶部
					$('.ulContent').animate({scrollTop: '0px'}, 0);
					//展示详细页
					$(".customerDetailWrapper").css('display','block').animate({"left": "0px"}, 200);
		        }else{
		        	//$(".LoadingImg").removeClass("fa fa-spinner fa-spin");
		            //$(".loadwraper").css("display", "none");
		        	alert(result.message);
		        }
		    }, 
		  	error:function(){
		  		$(".LoadingImg").removeClass("fa fa-spinner fa-spin");
		        $(".loadwraper").css("display", "none");
		  		alert("网络错误！");	
		  	}	 
	    });	
    }
}
