window.onload = function(){
	//定义一个变量，模拟用户权限
	var TorF;
	if(sessionStorage.getItem("LCSWrite")){
		TorF = true;
	}else{
		TorF = false;
	}
	//定义变量，根据产品状态来判定页面是否具有编辑修改权限
	var PTorF = true;
	//定义一个变量用来保存当前为哪款产品的详细信息模块
	var currentProduct = "";
	//定义一个变量用来保存当前所查看产品数据对应ID
	var currentProductId = "";
	
	//下拉选择框初始化
	$('.selectpicker1,.selectpicker2').selectpicker();	
	//选择框chang事件
	$('#select1,#select2').on('changed.bs.select', function (e) {
	    // do something...
	    console.log(this.value);
	    $('#reportTable').bootstrapTable('refresh');
	});
	//初始化时间插件实例
    $('.TheCreatTime,.PEcretime,.FOFCLRQInp').datetimepicker({
        minView: 'month',      //设置时间选择为年月日 去掉时分秒选择
        format:'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: 'zh-CN'      //设置时间控件为中文
    });
    
    
	//表格部分
	//设置表格外围容器高度
	$("#reportTableDiv").height($(window).height() - $(".selectCont").height() - 10 + "px");

	//产品详情内容区域高度
	$(".detailWrapper").height($(window).height() - $(".detailTitle").height());

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
		url:"http://127.0.0.1/api/admin/product/index",
		ajaxOptions:{
	        headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")}
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
//		{
//			field: "cardNoId",
//			title: "分配类型",
//			align: "center",
//			valign: "middle"
//		}, 
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
//		{
//			field: "address",
//			title: "额度进度条",
//			align: "center",
//			valign: "middle"
//		}, 
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
			if(res.code == "-10"){
				sessionStorage.clear();  //清除session
				alert(res.message+"，请重新登录！");
		        window.parent.location.href = "../../login.html";
			}else if(res.code == "-11"){
				sessionStorage.clear();  //清除session
				alert(res.message+"，请重新登录CRM账号！");
				parent.$(".secondLogin").modal('show');
			}else if(res.code == "0"){
				$.each(res.data.list, function (i, row) { 
			        row.checkStatus = $.inArray(row.productinformationid, selectionIds) != -1; //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true 
			    }); 
			    //return res; 
				//如果没有错误则返回数据，渲染表格
			    return {
			        total : res.data.totalNumber, //总页数,前面的key必须为"total"
			        data : res.data.list //行数据，前面的key要与之前设置的dataField的值一致.
			    };
			}else{
		        alert(res.message);
		        return;
		    }	
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
	        search: seartype,
            //order : params.sortOrder, //排序
            //orderBy: params.sortName  //按哪一列排序
	        //条件查询参数
	        productState: $("#select1").val(),
	        productType: $("#select2").val()
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
	    //此处为手动添加导出选中数据部分判断逻辑
	    if(selectionIds.length > 0){
	    	//如果存在导出选中按钮
	    	if($(".selectCont").find('.modelExportPart').length){
	    		//更新a链接的href属性，主要目的是更新selectionIds数组
	    		//$(".modelExportPart").prop('href','http://127.0.0.1/api/personnelInformation/listPage?status=1&limit=10000&personnelId='+selectionIds+'');
	    		$(".modelExportPart").prop('href','javascript:void(0)');
	    	}else{
	    		//不存在导出选中按钮，动态生成到页面
	    		//var stra='<a class="modelExportPart" href="http://127.0.0.1/api/personnelInformation/listPage?status=1&limit=10000&personnelId='+selectionIds+'">导出选中</a>';
	    		var stra='<a class="modelExportPart" href="javascript:void(0)">导出选中</a>';
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
	$(document).click(function(){
		//parent.$(".secondLogin").modal('show');
		//sessionStorage.clear();  //清除session
		//window.parent.location.href = "../../login.html";
	});
	/*---------------------------------------------------------产品详情页部分逻辑代码-------------------------------------------*/
	//页面加载将弹窗元素先隐藏再定位在屏幕右侧外围
	$(".productDetailWrapper").css({"display":"none","left":$(window).width()});
	//关闭详情页
	$(".close").click(function(){
    	$(".productDetailWrapper").animate({"left": $(window).width()}, 200);
    });
	
	//查看产品信息详情函数
    function checkDetailPage(parama_1){
    	//console.log(parama_1);
    	var URLselet = "";
    	//先将当前模块变量初始化
    	currentProduct = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		URLselet = "http://127.0.0.1/api/admin/product/edit/one";
    	}else{
    		URLselet = "http://127.0.0.1/api/admin/product/index/one"
    	}
    	$.ajax({
      	    async: true,
			type:'get',
			url:URLselet,
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data:{
			    productinformationid: parama_1
		    },
			success:function(result){
				console.log(result);
				if(result.code == "0"){
					//展示详细页
					$(".productDetailWrapper").css('display','block').animate({"left": "0px"}, 200);
					var datareturn = result.data;
					//常规信息字段页面填充
					$(".ProductNameInp").val(datareturn.name); //产品名称
					$(".ProductMangerInp").val(datareturn.ownerid); //产品经理
					switch (datareturn.assignmenttype){  //分配类型	
						case 930820000:
						    $(".DistribtTypeInp").val('常规');
						    break;
						case 930820001:
						    $(".DistribtTypeInp").val('统打');
						    break;
						default:
						    $(".DistribtTypeInp").val(datareturn.assignmenttype); 
					}			                       
					switch (datareturn.producttype){  //产品类型
						case 206290000:  //(FOF产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".FOFcontentWrap").css("display","block"); 
						    $(".GDSYcontentWrap,.PPPcontentWrap,.PEcontentWrap").css("display","none");	
						    currentProduct = "FOF";  //设置当前模块变量值
						    //FOF类详细信息页面字段填充
						    $(".TZLXslect").val(datareturn.investmenttype);  //投资类型
						    $(".FOFBABMInp").val(datareturn.filingcode);  //备案编码						    
						    $(".CPLXslect").val(datareturn.fofproducttype);  //产品类型						    
						    $(".FOFGLTDInp").val(datareturn.managementteam);  //管理团队						    
						    $(".FOFJJGLRInp").val(datareturn.fundmanager);  //基金管理人					    
						    $(".FOFJJTGRInp").val(datareturn.custodian);  //基金托管人					    
						    $(".FOFTZGWInp").val(datareturn.invest_advisor);  //投资顾问						    
						    $(".FOFZQJJSInp").val(datareturn.securitiesbroker);  //证券经纪商						    
						    $(".FOFQHJJSInp").val(datareturn.futuresbroker);  //期货经纪商					    
						    $(".FOFGLRGLFLInp").val(datareturn.managementfeerate);  //管理人管理费率					    
						    $(".FOFYJBCInp").val(datareturn.payback1);  //业绩报酬（%）					    
						    $(".FOFGLJGInp").val(datareturn.fofadministrativeorganization);  //管理机构					    
						    $(".FOFJJJLInp").val(datareturn.foffundmanager);  //基金经理					    
						    $(".FOFKFRInp").val(datareturn.opendate);  //开放日					    
						    $(".FOFFBQInp").val(datareturn.enddate);  //封闭期						    
						    $(".FOFRGFLInp").val(datareturn.subscriptionfee);  //认购费率（%）						    
						    $(".FOFSHFLInp").val(datareturn.redemptionrate);  //赎回费率（%）					    
						    $(".FOFYJXInp").val(datareturn.warningline);  //预警线（%）						    
						    $(".FOFZSXInp").val(datareturn.stopline);  //止损线（%）						    
						    $(".FOFTGFInp").val(datareturn.fee3);  //托管费（%）						    
						    $(".FOFXZGLFInp").val(datareturn.fee4);  //行政管理费（%）				    
						    $(".FOFCLRQInp").val(datareturn.establishmentdate);  //成立日期						    
						    $(".SFSXslect").val(datareturn.umbrellatype);  //是否伞型						    
						    $(".SFFJslect").val(datareturn.whetherclassification);  //是否分级						    
						    $(".FOFTGJJInp").val(datareturn.foftrusteeshipbody);  //托管机构						    
						    $(".FOFJJFYInp").val(datareturn.foffundcost);  //基金费用
                            editor1.txt.text(datareturn.fofnetworthannouncement); //净值公布  
                            editor2.txt.text(datareturn.fofinvestmentscope); //投资范围
                            editor3.txt.text(datareturn.fofparticipationexit); //参与退出
                            editor4.txt.text(datareturn.fofproducthighlights); //产品亮点
                            editor5.txt.text(datareturn.fofriskmeasures); //风险措施
                            editor6.txt.text(datareturn.fofinvestmenttarget); //投资目标
                            editor7.txt.text(datareturn.fofinvestmentstrategy); //投资策略
                            editor8.txt.text(datareturn.fofqualifiedinvestors); //合格投资者
                            editor9.txt.text(datareturn.foftargetaccount); //目标开户
                            editor10.txt.text(datareturn.fofremarks); //备注
                            editor11.txt.text(datareturn.riskwarning); //风险提示
                            editor12.txt.text(datareturn.sourceguaranteerepayment); //还款来源
                            editor13.txt.text(datareturn.proceedsuse); //资金用途
						    break;
						case 206290002:  //(OTC产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".GDSYcontentWrap").css("display","block");
						    $(".PPPcontentWrap,.FOFcontentWrap,.PEcontentWrap").css("display","none");
						    currentProduct = "OTC";  //设置当前模块变量值
						    //OTC类详细信息页面字段填充
						    $(".GDTGZHInp").val(datareturn.account1);  //托管账户
						    $(".GDJCZCLXInp").val(datareturn.underlyingtype);  //基础资产类型				    
						    $(".GDZRFInp").val(datareturn.transferor);  //转让方					    
						    $(".GDZJYTInp").val(datareturn.proceedsuse);  //资金用途
						    $(".GDZRGWInp").val(datareturn.transferconsultant);  //转让顾问
						    $(".GDFHInp").val(datareturn.fee2);  //分红
						    editor14.txt.text(datareturn.participationexit); //参与退出
						    editor15.txt.text(datareturn.incomedistribution); //收益分配方式
						    editor16.txt.text(datareturn.investmentscope); //投资范围
						    editor17.txt.text(datareturn.sourceguaranteerepayment); //还款来源及保障
						    editor18.txt.text(datareturn.projectintroduction); //项目方介绍
						    editor19.txt.text(datareturn.financingintroduction); //融资方介绍
						    editor20.txt.text(datareturn.trustmeasures); //增信措施
						    //editor21.txt.text(datareturn.fee2); //分红
						    editor21.txt.text(datareturn.other); //其它
						    editor22.txt.text(datareturn.riskwarning); //风险提示
						    editor23.txt.text(datareturn.producthighlights); //产品亮点
						    editor24.txt.text(datareturn.riskcontrol); //风险控制
						    break;
						case 206290001:  //(PPP产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".PPPcontentWrap").css("display","block");
						    $(".GDSYcontentWrap,.FOFcontentWrap,.PEcontentWrap").css("display","none");	
						    currentProduct = "PPP";  //设置当前模块变量值
						    //PPP类产品详细信息页面字段填充
						    $(".PTGJGInp").val(datareturn.trustee);  //托管机构
						    $(".PJGGLInp").val(datareturn.administrativeorganization);  //管理机构				    
						    $(".PTGZHInp").val(datareturn.account1);  //托管账户				    
						    $(".PJJGLFInp").val(datareturn.fundmanagementfee);  //基金管理费
						    $(".PFHInp").val(datareturn.fee2);  //分红
						    editor25.txt.text(datareturn.participationexit); //参与退出
						    editor26.txt.text(datareturn.incomedistribution); //收益分配方式
						    editor27.txt.text(datareturn.investmentscope); //投资范围
						    editor28.txt.text(datareturn.sourceguaranteerepayment); //还款来源及保障
						    editor29.txt.text(datareturn.projectintroduction); //项目方介绍
						    editor30.txt.text(datareturn.financingintroduction); //融资方介绍
						    editor31.txt.text(datareturn.trustmeasures); //增信措施
						    //editor33.txt.text(datareturn.fee2); //分红
						    editor32.txt.text(datareturn.other); //其它
						    editor33.txt.text(datareturn.riskwarning); //风险提示
						    editor34.txt.text(datareturn.producthighlights); //产品亮点
						    editor35.txt.text(datareturn.riskcontrol); //风险控制
						    editor36.txt.text(datareturn.proceedsuse); //资金用途
						    break;
						case 206290003:  //(PE股权产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".PEcontentWrap").css("display","block");
						    $(".PPPcontentWrap,.FOFcontentWrap,.GDSYcontentWrap").css("display","none");
						    currentProduct = "PE";  //设置当前模块变量值
						    //PE股权类产品详细信息页面字段填充
						    $(".PGMJQInp").val(datareturn.perecruitment);  //募集期
						    $(".PGGLTDInp").val(datareturn.pemanagementteam);  //管理团队				    
						    $(".PGJJTGRInp").val(datareturn.pecustodian);  //基金托管人		    
						    $(".PGJJGLRInp").val(datareturn.pefundmanager);  //基金管理人
						    $(".CPJGslect").val(datareturn.peproductmix);  //产品结构
						    $(".PGCPJGXQInp").val(datareturn.pemixdetails);  //产品结构详情			    
						    $(".SFGTslect").val(datareturn.pewhether);  //是否跟投
						    $(".PGGTXQInp").val(datareturn.pefollowdetails);  //跟投详情
						    editor37.txt.text(datareturn.pedistributionmode); //分配方式
						    editor38.txt.text(datareturn.peinvestmentdirection); //投资方向
						    editor39.txt.text(datareturn.peinformationdis); //信息披露
						    editor40.txt.text(datareturn.pereserveitem); //储备项目
						    editor41.txt.text(datareturn.periskcontrol); //风控措施
						    editor42.txt.text(datareturn.riskwarning); //风险提示
						    editor43.txt.text(datareturn.producthighlights); //产品亮点
						    editor44.txt.text(datareturn.sourceguaranteerepayment); //还款来源
						    editor45.txt.text(datareturn.proceedsuse); //资金用途	    
						    break;
						default:
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".FOFcontentWrap,.GDSYcontentWrap,.PPPcontentWrap,.PEcontentWrap").css("display","none");
					}
					switch (datareturn.productstate){  //产品状态
						case 206290000:
							$(".ProductStatusInp").val('未提交');
							PTorF = true;
							break;
						case 206290001:
							$(".ProductStatusInp").val('未审核');
							PTorF = false;
							break;
						case 206290002:
							$(".ProductStatusInp").val('产品部驳回');
							PTorF = false;
							break;
						case 206290003:
							$(".ProductStatusInp").val('发行中');
							PTorF = false;
							break;
						case 206290004:
							$(".ProductStatusInp").val('已成立');
							PTorF = false;
							break;
						case 206290005:
							$(".ProductStatusInp").val('产品部通过');
							PTorF = false;
							break;
						case 206290006:
							$(".ProductStatusInp").val('销售部通过');
							PTorF = false;
							break;
						case 206290007:
							$(".ProductStatusInp").val('销售部驳回');
							PTorF = false;
							break;
						case 206290008:
							$(".ProductStatusInp").val('产品作业部驳回');
							PTorF = false;
							break;
						case 206290009:
							$(".ProductStatusInp").val('募集完成');
							PTorF = false;
							break;
						case 206290010:
							$(".ProductStatusInp").val('清算完成');
							PTorF = false;
							break;
						case 206290011:
							$(".ProductStatusInp").val('兑付完成');
							PTorF = false;
							break;
						case 206290012:
							$(".ProductStatusInp").val('暂停');
							PTorF = false;
							break;
						default:
						    $(".ProductStatusInp").val(datareturn.productstate); 
						    PTorF = false;
					}
					//控制富文本编辑模块权限
				    $.each(editorObjArry, function(index,item) {				    	
				        //判断用户是否具有编辑功能
				        if(TorF == true && PTorF == true){
				        	// 开启编辑功能
				        	item.$textElem.attr('contenteditable', true);
				        }else{
				        	// 禁用编辑功能
				            item.$textElem.attr('contenteditable', false);
				        }
				    });										
					$(".HostOutCostInp").val(datareturn.fee1); //托管外包费%				
					$(".ManagerFeeInp").val(datareturn.managementexpense); //管理费%
					$(".TheCreatTime").val(datareturn.duedate); //成立时间				
					$(".EstablishedInp").val(dealNumber(datareturn.establishedquota,1)); //已成立额度				
					$(".MJGMInp").val(dealNumber(datareturn.sumamount,1)); //募集规模			
					$(".MJGMInpZs").val(charMoney(datareturn.sumamount)); //募集规模(大写)				
					$(".PublicPoolInp").val(dealNumber(datareturn.commonpool,1)); //公共池			
					$(".ZDRGJEInp").val(dealNumber(datareturn.subscriptionstartingpoint,1)); //最低认购金额
					$(".ZDRGJEInpZs").val(charMoney(datareturn.subscriptionstartingpoint)); //最低认购金额(大写)	
					$(".VIPQuotaInp").val(datareturn.vipquota); //vip额度					
					$(".ZJQDInp").val(dealNumber(datareturn.additionalstartingpoint,1)); //追加起点					
					$(".ZJQDInpZs").val(charMoney(datareturn.additionalstartingpoint)); //追加起点(大写)					
					$(".KFPEDInp").val(dealNumber(datareturn.limit,1)); //可分配额度					
					$(".YFPEDInp").val(dealNumber(datareturn.allocatedamount,1)); //已分配额度					
					$(".EDJDTInp").val(datareturn.limitper); //额度进度条					
					$(".KYYEDInp").val(dealNumber(datareturn.reservelimit,1)); //可预约额度					
					$(".YYYEDInp").val(dealNumber(datareturn.reservedquota,1)); //已预约额度				
					$(".YYZJDTInp").val(datareturn.subper); //预约总进度条
					if(datareturn.transactioncurrencyid == "64DF3650-D733-E711-80B9-549F350F546D"){  //货币
						$(".CurrencyInp").val("人民币"); 	
					}else{
						$(".CurrencyInp").val(datareturn.transactioncurrencyid);	
					}
					$(".YYSXInp").val(datareturn.prescription); //预约时效(H)
					//先移除存续期限内所有标签的标记；
					$(".monthDot").removeClass("monMaked");
					$.each(datareturn.durationtext, function (index, tarry) {   //存续期限
				        if($("#mon"+tarry).hasClass("monMaked")){
				        	return false;
				        }else{
				        	$("#mon"+tarry).addClass("monMaked");
				        }			        
				    });
				    //根据用户权限设置下拉框是否能选择
				    if(TorF == false ||  PTorF == false){ //无修改权限情况
                        //设置下拉选择框不可选状态
                        $(".markSelect").attr("disabled",true);
				    	//设置所有带WRInpt类名的input标签为不可编辑
				    	$(".WRInpt").prop("readonly",true);
				    	//隐藏保存按钮
				    	$(".modalTiltleSave").hide();
				    }else{
				    	//设置下拉选择框为可选状态
				    	$(".markSelect").attr("disabled",false);
				    	//设置所有带WRInpt类名的input标签为可编辑
				    	$(".WRInpt").prop("readonly",false);
				    	//显示保存按钮
				    	$(".modalTiltleSave").show();
				    }
				    //如果存在修改权限，启用时间选择框
				    if(TorF == true && PTorF == true){
				        $('.TheCreatTime,.PEcretime,.FOFCLRQInp').attr("disabled",false);
				    }else{
				    	$('.TheCreatTime,.PEcretime,.FOFCLRQInp').attr("disabled",true);
				    }			    
		        }else if(result.code == "-10"){
					sessionStorage.clear();  //清除session
					alert(result.message+"，请重新登录！");
			        window.parent.location.href = "../../login.html";
				}else if(result.code == "-11"){
					sessionStorage.clear();  //清除session
					alert(result.message+"，请重新登录CRM账号！");
					parent.$(".secondLogin").modal('show');
				}else{
		        	alert(result.message);
		        }
		    }, 
		  	error:function(){
		  		alert("网络错误！");	
		  	}	 
	    });	
    }
  
    //定义一个数组，保存存续期限选中月份
    var monthArry=[];
    //定义一个对象，用来保存编辑提交时的data参数
	var editorParama = {};
    //常规信息存续期限的月份点击
    $(".monthDot").unbind('click').click(function(){
    	if(TorF && PTorF){ //存在修改权限
    	    if($(this).hasClass('monMaked')){
    	    	$(this).removeClass('monMaked');
    	    }else{
    	    	$(this).addClass('monMaked');
    	    }
        }else{
        	return false;
        }
    });
    //点击--------------------保存提交------------------时，获取页面对应模块(常规、信息信息模块)相关信息，调用接口上传数据
    $(".modalTiltleSave").click(function(){
    	//console.log(currentProductId);
    	//币种传值变量
    	var MoneyType = "";
    	if($(".CurrencyInp").val() == "人民币"){
			MoneyType = "64DF3650-D733-E711-80B9-549F350F546D";
		}else{
			MoneyType = $(".CurrencyInp").val();
		}
		//分配类型传值变量
		var FenPeiType = "";
		if($(".DistribtTypeInp").val() == "统打"){
			FenPeiType = "930820001"
		}else if($(".DistribtTypeInp").val() == "常规"){
			FenPeiType ="930820000"
		}else{
			FenPeiType = $(".DistribtTypeInp").val()
		}
		//产品状态传值变量
		var CYZTType = "";
		switch ($(".ProductStatusInp").val()){  //产品状态
			case '未提交':
				CYZTType = "206290000";
				break;
			case '未审核':
				CYZTType = "206290001";
				break;
			case '产品部驳回':
				CYZTType = "206290002";
				break;
			case '发行中':
				CYZTType = "206290003";
				break;
			case '已成立':
				CYZTType = "206290004";
				break;
			case '产品部通过':
				CYZTType = "206290005";
				break;
			case '销售部通过':
				CYZTType = "206290006";
				break;
			case '销售部驳回':
				CYZTType = "206290007";
				break;
			case '产品作业部驳回':
				CYZTType = "206290008";
				break;
			case '募集完成':
				CYZTType = "206290009";
				break;
			case '清算完成':
				CYZTType = "206290010";
				break;
			case '兑付完成':
				CYZTType = "206290011";
				break;
			case '暂停':
				CYZTType = "206290012";
				break;
			default:
			    CYZTType = $(".ProductStatusInp").val(); 
		}					
		//产品结构详情传值变量
		var CYJGXQVal = "";
		if($(".CPJGslect").children('option:selected').val() == 930820000){
			CYJGXQVal = $(".PGCPJGXQInp").val();
		}else{
			CYJGXQVal = "";
		}
		//跟投详情传值变量
		var GTXQVal = "";
		if($(".SFGTslect").children('option:selected').val() == 930820000){
			GTXQVal = $(".PGGTXQInp").val();
		}else{
			GTXQVal = "";
		}
		//初始化参数
    	monthArry=[];
    	editorParama = {};
	    $(".monthDot").each(function(){
	    	if($(this).hasClass('monMaked')){
	    		monthArry.push($(this).attr('id').substring(3));
	    	}
	    });    
	    if(currentProduct == "FOF"){  //FOF类
			editorParama = {
				productinformationid:currentProductId,  //产品id
				//常规信息字段
				name: $(".ProductNameInp").val(),  //产品名称
				ownerid: $(".ProductMangerInp").val(),  //产品经理
				sumamount: dealNumberFX($(".MJGMInp").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZs").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInp").val()), //公共池 
				assignmenttype: FenPeiType,  //分配类型
				producttype: $(".ProductTypeInp").val(),  //产品类型
				productstate: CYZTType,  //产品状态		
				fee1: $(".HostOutCostInp").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInp").val(),  //管理费%
				duedate: $(".TheCreatTime").val(),  //成立时间
				durationtext: monthArry,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInp").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZs").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInp").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZs").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInp").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInp").val()),  //已分配额度
				limitper: $(".EDJDTInp").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInp").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInp").val()),  //已预约额度
				subper: $(".YYZJDTInp").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInp").val()),  //已成立额度			
				transactioncurrencyid: MoneyType,  //货币
				prescription: $(".YYSXInp").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInp").val(),  //vip额度
				//详细信息字段
				investmenttype: $(".TZLXslect").val(),  //投资类型
				filingcode: $(".FOFBABMInp").val(),  //备案编码
				fofproducttype: $(".CPLXslect").val(),  //产品类型
				managementteam: $(".FOFGLTDInp").val(),  //管理团队
				fundmanager: $(".FOFJJGLRInp").val(),  //基金管理人
				custodian: $(".FOFJJTGRInp").val(),  //基金托管人
				invest_advisor: $(".FOFTZGWInp").val(),  //投资顾问
				securitiesbroker: $(".FOFZQJJSInp").val(),  //证券经纪商
				futuresbroker: $(".FOFQHJJSInp").val(),  //期货经纪商
				managementfeerate: $(".FOFGLRGLFLInp").val(),  //管理人管理费率
				payback1: $(".FOFYJBCInp").val(),  //业绩报酬（%）
				fofnetworthannouncement: editor1.txt.text(),  //净值公布
				fofadministrativeorganization: $(".FOFGLJGInp").val(),  //管理机构
				fofinvestmentscope: editor2.txt.text(),  //投资范围
				fofparticipationexit: editor3.txt.text(),  //参与退出
				fofproducthighlights: editor4.txt.text(),  //产品亮点
				fofriskmeasures: editor5.txt.text(),  //风险措施
				foffundmanager: $(".FOFJJJLInp").val(),  //基金经理
				opendate: $(".FOFKFRInp").val(),  //开放日
				enddate: $(".FOFFBQInp").val(),  //封闭期
				subscriptionfee: $(".FOFRGFLInp").val(),  //认购费率（%）
				redemptionrate: $(".FOFSHFLInp").val(),  //赎回费率（%）
				warningline: $(".FOFYJXInp").val(),  //预警线（%）
				stopline: $(".FOFZSXInp").val(),  //止损线（%）
				fee3: $(".FOFTGFInp").val(),  //托管费（%）
				fee4: $(".FOFXZGLFInp").val(),  //行政管理费（%）
				establishmentdate: $(".FOFCLRQInp").val(),  //成立日期
				umbrellatype: $(".SFSXslect").val(),  //是否伞型
				whetherclassification: $(".SFFJslect").val(),  //是否分级
				foftrusteeshipbody: $(".FOFTGJJInp").val(),  //托管机构
				foffundcost: $(".FOFJJFYInp").val(),  //基金费用
				fofinvestmenttarget: editor6.txt.text(),  //投资目标
				fofinvestmentstrategy: editor7.txt.text(),  //投资策略
				fofqualifiedinvestors: editor8.txt.text(),  //合格投资者
				foftargetaccount: editor9.txt.text(),  //目标开户
				fofremarks: editor10.txt.text(),  //备注
				riskwarning: editor11.txt.text(),  //风险提示
				sourceguaranteerepayment: editor12.txt.text(),  //还款来源
				proceedsuse: editor13.txt.text()  //资金用途			
			}
		}else if(currentProduct == "PPP"){  //PPP类
			editorParama = {
				productinformationid:currentProductId,  //产品id
				//常规信息字段
				name: $(".ProductNameInp").val(),  //产品名称
				ownerid: $(".ProductMangerInp").val(),  //产品经理
				sumamount: dealNumberFX($(".MJGMInp").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZs").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInp").val()), //公共池 
				assignmenttype: FenPeiType,  //分配类型
				producttype: $(".ProductTypeInp").val(),  //产品类型
				productstate: CYZTType,  //产品状态		
				fee1: $(".HostOutCostInp").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInp").val(),  //管理费%
				duedate: $(".TheCreatTime").val(),  //成立时间
				durationtext: monthArry,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInp").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZs").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInp").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZs").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInp").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInp").val()),  //已分配额度
				limitper: $(".EDJDTInp").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInp").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInp").val()),  //已预约额度
				subper: $(".YYZJDTInp").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInp").val()),  //已成立额度			
				transactioncurrencyid: MoneyType,  //货币
				prescription: $(".YYSXInp").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInp").val(),  //vip额度
				//详细信息字段
				trustee: $(".PTGJGInp").val(),  //托管机构
				administrativeorganization: $(".PJGGLInp").val(),  //管理机构
				account1: $(".PTGZHInp").val(),  //托管账户
				fundmanagementfee: $(".PJJGLFInp").val(),  //基金管理费
				fee2: $(".PFHInp").val(),  //分红
				participationexit: editor25.txt.text(),  //参与退出
				incomedistribution: editor26.txt.text(),  //收益分配方式
				investmentscope: editor27.txt.text(),  //投资范围
				sourceguaranteerepayment: editor28.txt.text(),  //还款来源及保障
				projectintroduction: editor29.txt.text(),  //项目方介绍
				financingintroduction: editor30.txt.text(),  //融资方介绍
				other: editor32.txt.text(),  //其他
				trustmeasures: editor31.txt.text(),  //增信措施
				riskwarning: editor33.txt.text(),  //风险提示
				producthighlights: editor34.txt.text(),  //产品亮点
				riskcontrol: editor35.txt.text(),  //风险控制
				proceedsuse: editor36.txt.text()  //资金用途
			}
		}else if(currentProduct == "OTC"){  //OTC类
			editorParama = {
				productinformationid:currentProductId,  //产品id
				//常规信息字段
				name: $(".ProductNameInp").val(),  //产品名称
				ownerid: $(".ProductMangerInp").val(),  //产品经理
				sumamount: dealNumberFX($(".MJGMInp").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZs").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInp").val()), //公共池 
				assignmenttype: FenPeiType,  //分配类型
				producttype: $(".ProductTypeInp").val(),  //产品类型
				productstate: CYZTType,  //产品状态		
				fee1: $(".HostOutCostInp").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInp").val(),  //管理费%
				duedate: $(".TheCreatTime").val(),  //成立时间
				durationtext: monthArry,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInp").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZs").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInp").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZs").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInp").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInp").val()),  //已分配额度
				limitper: $(".EDJDTInp").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInp").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInp").val()),  //已预约额度
				subper: $(".YYZJDTInp").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInp").val()),  //已成立额度			
				transactioncurrencyid: MoneyType,  //货币
				prescription: $(".YYSXInp").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInp").val(),  //vip额度
				//详细信息字段
				account1: $(".GDTGZHInp").val(),  //托管账户
				underlyingtype: $(".GDJCZCLXInp").val(),  //基础资产类型
				transferor: $(".GDZRFInp").val(),  //转让方
				proceedsuse: $(".GDZJYTInp").val(),  //资金用途
				transferconsultant: $(".GDZRGWInp").val(),  //转让顾问
				participationexit: editor14.txt.text(),  //参与退出
				incomedistribution: editor15.txt.text(),  //收益分配方式
				investmentscope: editor16.txt.text(),  //投资范围
				fee2: $(".GDFHInp").val(),  //分红
				sourceguaranteerepayment: editor17.txt.text(),  //还款来源及保障
				projectintroduction: editor18.txt.text(),  //项目方介绍
				financingintroduction: editor19.txt.text(),  //融资方介绍
				other: editor21.txt.text(),  //其他
				trustmeasures: editor20.txt.text(),  //增信措施
				riskwarning: editor22.txt.text(),  //风险提示
				producthighlights: editor23.txt.text(),  //产品亮点
			    riskcontrol: editor24.txt.text()  //风险控制
			}
		}else{  //PE类
			editorParama = {
				modifiedby: sessionStorage.getItem("LCSID"),
				productinformationid:currentProductId,  //产品id
				//常规信息字段
				name: $(".ProductNameInp").val(),  //产品名称
				ownerid: $(".ProductMangerInp").val(),  //产品经理
				sumamount: dealNumberFX($(".MJGMInp").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZs").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInp").val()), //公共池 
				assignmenttype: FenPeiType,  //分配类型
				producttype: $(".ProductTypeInp").val(),  //产品类型
				productstate: CYZTType,  //产品状态		
				fee1: $(".HostOutCostInp").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInp").val(),  //管理费%
				duedate: $(".TheCreatTime").val(),  //成立时间
				durationtext: monthArry,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInp").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZs").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInp").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZs").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInp").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInp").val()),  //已分配额度
				limitper: $(".EDJDTInp").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInp").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInp").val()),  //已预约额度
				subper: $(".YYZJDTInp").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInp").val()),  //已成立额度			
				transactioncurrencyid: MoneyType,  //货币
				prescription: $(".YYSXInp").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInp").val(),  //vip额度
				//详细信息字段
				perecruitment: $(".PGMJQInp").val(),  //募集期
				pemanagementteam: $(".PGGLTDInp").val(),  //管理团队
				pedistributionmode: editor37.txt.text(),  //分配方式
				peinvestmentdirection: editor38.txt.text(),  //投资方向
				peinformationdis: editor39.txt.text(),  //信息披露
				pecustodian: $(".PGJJTGRInp").val(),  //基金托管人
				pefundmanager: $(".PGJJGLRInp").val(),  //基金管理人
				peproductmix: $(".CPJGslect").val(),  //产品结构
				pemixdetails: CYJGXQVal,  //产品结构详情
				pewhether: $(".SFGTslect").val(),  //是否跟投
				pefollowdetails: GTXQVal,  //跟投详情
				pereserveitem: editor40.txt.text(),  //储备项目
				periskcontrol: editor41.txt.text(),  //风控措施
				riskwarning: editor42.txt.text(),  //风险提示
				producthighlights: editor43.txt.text(),  //产品亮点
				sourceguaranteerepayment: editor44.txt.text(),  //还款来源
				proceedsuse: editor45.txt.text(),  //资金用途
			}
		}
	    //console.log(monthArry);
	    //console.log(editorParama);
	    //调用接口保存数据
	    $.ajax({
		    async: true,
		    type:'POST',
			url:'http://127.0.0.1/api/admin/product/edit',
			traditional :true,  //数组形式传参该参数是必须的
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data: editorParama,
		    success:function(result){
		    	console.log(result);
		    	if(result.code == 0){
		    		//刷新产品列表表格
		    		$('#reportTable').bootstrapTable('refresh');
		    		alert("保存成功！");
		    	}else if(res.code == "-10"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录！");
			        window.parent.location.href = "../../login.html";
				}else if(res.code == "-11"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录CRM账号！");
					parent.$(".secondLogin").modal('show');
				}else{
		    		alert(result.message);
		    	}
		    },
		    error:function(){
		  		alert("网络错误！");	
		  	}	 
		})    
    });
    
    //监听募集规模输入框
    $(".MJGMInp").bind('input propertychange change',function(){
    	var IntVal = $(".MJGMInp").val();
    	for (var m = IntVal.length - 1; m >= 0; m--) {
            IntVal = IntVal.replace(",", "")//替换tomoney()中的“,”
            IntVal = IntVal.replace("，", "")//替换tomoney()中的“，”
            IntVal = IntVal.replace(" ", "")//替换tomoney()中的空格
            IntVal = IntVal.replace("￥", "")//替换掉可能出现的￥字符
            IntVal = IntVal.replace("¥", "")//替换掉可能出现的¥字符
        }
    	IntVal = Math.abs(IntVal);
    	if(parseInt(IntVal) > 999999999999.99){
    		alert("输入金额过大！");
    		$(".MJGMInp,.MJGMInpZs").val("");
    		return;
    	}else if(isNaN(parseInt(IntVal))){
    		alert("您的输入有误！");
    		$(".MJGMInp,.MJGMInpZs").val("");
    		return;
    	}
    	$(".MJGMInp").blur(function(){
    		if(parseInt(IntVal) > 999999999999.99 || isNaN(parseInt(IntVal))){
    			return;
    		}else{
    			$(".MJGMInp").val(dealNumber($(".MJGMInp").val(),1));
    		}
	    	
	    });
    	$(".MJGMInpZs").val(charMoney(IntVal));
    });
    //监听最低认购金额输入框
    $(".ZDRGJEInp").bind('input propertychange change',function(){
    	var IntVall = $(".ZDRGJEInp").val();
    	for (var m = IntVall.length - 1; m >= 0; m--) {
            IntVall = IntVall.replace(",", "")//替换tomoney()中的“,”
            IntVall = IntVall.replace("，", "")//替换tomoney()中的“，”
            IntVall = IntVall.replace(" ", "")//替换tomoney()中的空格
            IntVall = IntVall.replace("￥", "")//替换掉可能出现的￥字符
            IntVall = IntVall.replace("¥", "")//替换掉可能出现的¥字符
        }
    	IntVall = Math.abs(IntVall);
    	if(parseInt(IntVall) > 999999999999.99){
    		alert("输入金额过大！");
    		$(".ZDRGJEInp,.ZDRGJEInpZs").val("");
    		return;
    	}else if(isNaN(parseInt(IntVall))){
    		alert("您的输入有误！");
    		$(".ZDRGJEInp,.ZDRGJEInpZs").val("");
    		return;
    	}
    	$(".ZDRGJEInp").blur(function(){
    		if(parseInt(IntVall) > 999999999999.99 || isNaN(parseInt(IntVall))){
    			return;
    		}else{
    			$(".ZDRGJEInp").val(dealNumber($(".ZDRGJEInp").val(),1));
    		}	
	    });
    	$(".ZDRGJEInpZs").val(charMoney(IntVall));
    });
    //监听追加起点输入框
    $(".ZJQDInp").bind('input propertychange change',function(){
    	var IntVall = $(".ZJQDInp").val();
    	for (var m = IntVall.length - 1; m >= 0; m--) {
            IntVall = IntVall.replace(",", "")//替换tomoney()中的“,”
            IntVall = IntVall.replace("，", "")//替换tomoney()中的“，”
            IntVall = IntVall.replace(" ", "")//替换tomoney()中的空格
            IntVall = IntVall.replace("￥", "")//替换掉可能出现的￥字符
            IntVall = IntVall.replace("¥", "")//替换掉可能出现的¥字符
        }
    	IntVall = Math.abs(IntVall);
    	if(parseInt(IntVall) > 999999999999.99){
    		alert("输入金额过大！");
    		$(".ZJQDInp,.ZJQDInpZs").val("");
    		return;
    	}else if(isNaN(parseInt(IntVall))){
    		alert("您的输入有误！");
    		$(".ZJQDInp,.ZJQDInpZs").val("");
    		return;
    	}
    	$(".ZJQDInp").blur(function(){
    		if(parseInt(IntVall) > 999999999999.99 || isNaN(parseInt(IntVall))){
    			return;
    		}else{
    			$(".ZJQDInp").val(dealNumber($(".ZJQDInp").val(),1));
    		}	
	    });
    	$(".ZJQDInpZs").val(charMoney(IntVall));
    });
    
    //PE股权类产品-产品结构下拉选择-产品结构栏对应显示隐藏功能模块
    $('.CPJGslect').change(function(){ 
	    var CPJGslectVal = $(this).children('option:selected').val(); //这就是selected的值    
	    if(CPJGslectVal == 930820000){        //组合型
	    	$(".ProductJGXQ").show();
	    }else if(CPJGslectVal == 930820001){
	    	$(".ProductJGXQ").hide();
	    }
	});
	//PE股权类产品-是否跟投下拉选择-跟投详情栏对应显示隐藏功能模块
	$('.SFGTslect').change(function(){ 
	    var SFGTslectVal = $(this).children('option:selected').val(); //这就是selected的值    
	    if(SFGTslectVal == 930820000){        //组合型
	    	$(".SFGTWrapLi").show();
	    }else if(SFGTslectVal == 930820001 || SFGTslectVal == 930820002){
	    	$(".SFGTWrapLi").hide();
	    }
	});
    
    //进入页面初始化wangEditor实例化对象
    var E = window.wangEditor;
    var editor1 = new E('#FEdiTorJZGB1','#FEdiTorJZGB2');
    var editor2 = new E('#FEdiTorTZFW1','#FEdiTorTZFW2');
    var editor3 = new E('#FEdiTorCYTC1','#FEdiTorCYTC2');
    var editor4 = new E('#FEdiTorCPLD1','#FEdiTorCPLD2');
    var editor5 = new E('#FEdiTorFXCS1','#FEdiTorFXCS2');
    var editor6 = new E('#FEdiTorTZMB1','#FEdiTorTZMB2');
    var editor7 = new E('#FEdiTorTZCL1','#FEdiTorTZCL2');
    var editor8 = new E('#FEdiTorHGTZZ1','#FEdiTorHGTZZ2');
    var editor9 = new E('#FEdiTorMBKH1','#FEdiTorMBKH2');
    var editor10 = new E('#FEdiTorBZ1','#FEdiTorBZ2');
    var editor11 = new E('#FEdiTorFXTS1','#FEdiTorFXTS2');
    var editor12 = new E('#FEdiTorHKLY1','#FEdiTorHKLY2');
    var editor13 = new E('#FEdiTorZJYT1','#FEdiTorZJYT2');
    var editor14 = new E('#GEdiTorCYTC1','#GEdiTorCYTC2');
    var editor15 = new E('#GEdiTorSYFP1','#GEdiTorSYFP2');
    var editor16 = new E('#GEdiTorTZFW1','#GEdiTorTZFW2');
    var editor17 = new E('#GEdiTorHKLY1','#GEdiTorHKLY2');
    var editor18 = new E('#GEdiTorXMFJS1','#GEdiTorXMFJS2');
    var editor19 = new E('#GEdiTorRZFJS1','#GEdiTorRZFJS2');
    var editor20 = new E('#GEdiTorZXCS1','#GEdiTorZXCS2');
    //var editor21 = new E('#GEdiTorFH1','#GEdiTorFH2');
    var editor21 = new E('#GEdiTorQT1','#GEdiTorQT2');
    var editor22 = new E('#GEdiTorFXTS1','#GEdiTorFXTS2');
    var editor23 = new E('#GEdiTorCPLD1','#GEdiTorCPLD2');
    var editor24 = new E('#GEdiTorFXKZ1','#GEdiTorFXKZ2');
    var editor25 = new E('#PEdiTorCYTC1','#PEdiTorCYTC2');
    var editor26 = new E('#PEdiTorSYFP1','#PEdiTorSYFP2');
    var editor27 = new E('#PEdiTorTZFW1','#PEdiTorTZFW2');
    var editor28 = new E('#PEdiTorHKLY1','#PEdiTorHKLY2');
    var editor29 = new E('#PEdiTorXMFJS1','#PEdiTorXMFJS2');
    var editor30 = new E('#PEdiTorRZFJS1','#PEdiTorRZFJS2');
    var editor31 = new E('#PEdiTorZXCS1','#PEdiTorZXCS2');
    //var editor33 = new E('#PEdiTorFH1','#PEdiTorFH2');
    var editor32 = new E('#PEdiTorQT1','#PEdiTorQT2');
    var editor33 = new E('#PEdiTorFXTS1','#PEdiTorFXTS2');
    var editor34 = new E('#PEdiTorCPLD1','#PEdiTorCPLD2');
    var editor35 = new E('#PEdiTorFXKZ1','#PEdiTorFXKZ2');
    var editor36 = new E('#PEdiTorZJYT1','#PEdiTorZJYT2');
    var editor37 = new E('#PGEdiTorFPFS1','#PGEdiTorFPFS2');
    var editor38 = new E('#PGEdiTorTZFX1','#PGEdiTorTZFX2');
    var editor39 = new E('#PGEdiTorXXPL1','#PGEdiTorXXPL2');
    var editor40 = new E('#PGEdiTorCBXM1','#PGEdiTorCBXM2');
    var editor41 = new E('#PGEdiTorFKCS1','#PGEdiTorFKCS2');
    var editor42 = new E('#PGEdiTorFXTS1','#PGEdiTorFXTS2');
    var editor43 = new E('#PGEdiTorCPLD1','#PGEdiTorCPLD2');
    var editor44 = new E('#PGEdiTorHKLY1','#PGEdiTorHKLY2');
    var editor45 = new E('#PGEdiTorZJYT1','#PGEdiTorZJYT2');
    var editorObjArry = [editor1,editor2,editor3,editor4,editor5,editor6,editor7,editor8,editor9,editor10,editor11,editor12,editor13,editor14,editor15,editor16,editor17,editor18,editor19,editor20,editor21,editor22,editor23,editor24,
    editor25,editor26,editor27,editor28,editor29,editor30,editor31,editor32,editor33,editor34,editor35,editor36,editor37,editor38,editor39,editor40,editor41,editor42,editor43,editor44,editor45];
    $.each(editorObjArry, function(index,item) {
    	// 自定义菜单配置
      	item.customConfig.menus = [
    	    //'head',  // 标题
		    'bold',  // 粗体
		    //'fontSize',  // 字号
		    //'fontName',  // 字体
		    'italic',  // 斜体
		    'underline',  // 下划线
		    'strikeThrough',  // 删除线
		    'foreColor',  // 文字颜色
		    //'backColor',  // 背景颜色
		    //'link',  // 插入链接
		    //'list',  // 列表
		    'justify',  // 对齐方式
		    //'quote',  // 引用
		    //'emoticon',  // 表情
		    //'image',  // 插入图片
		    //'table',  // 表格
		    //'video',  // 插入视频
		    //'code',  // 插入代码
		    'undo',  // 撤销
		    'redo'  // 重复
    	];
    	//判断是否有权限修改对应是否显示工具栏
//  	item.customConfig.onfocus = function () {
//      	if(TorF && PTorF){
//      		$(".toolbar"+(index+1)).show();
//      	}           
//	    };
//	    item.customConfig.onblur = function () {
//	    	if(TorF && PTorF){
//	    		$(".toolbar"+(index+1)).hide();
//	    	}	        
//	    };
	    //生成
        item.create();
//      //判断用户是否具有编辑功能
//      if(TorF && PTorF){
//      	// 开启编辑功能
//      	item.$textElem.attr('contenteditable', true);
//      }else{
//      	// 禁用编辑功能
//          item.$textElem.attr('contenteditable', false);
//      }
        //初始化编辑器内容为空
        item.txt.text('');
    });
    //先隐藏工具栏模块
    //$(".toolbar").hide();
}
