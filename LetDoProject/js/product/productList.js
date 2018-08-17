window.onload = function(){
	//定义一个变量，记录用户权限
	var TorF;
	if(sessionStorage.getItem("LCSWrite") == "true"){
		TorF = true;
	}else{
		TorF = false;
	}
	if(TorF == true){
		//判断如果用户拥有编辑权限，生成新建产品button
	    $(".selectCont").append('<input class="XJCSBUTEN" type="button" value="新建产品" />');
	}
	//定义变量，根据产品状态来判定页面是否具有编辑修改权限
	var PTorF = true;
	//定义变量，控制产品状态为停用时后面五个富文本编辑框的权限
	var StopTorF = false;
	//定义一个变量用来保存当前为哪款产品的详细信息模块
	var currentProduct = "";
	//定义一个变量用来保存当前所查看产品数据对应ID
	var currentProductId = "";
	//定义变量保存用户新建产品类型
	var AddProductName;
	
	//下拉选择框初始化
	$('.selectpicker1,.selectpicker2').selectpicker();	
	//选择框chang事件
	$('#select1,#select2').on('changed.bs.select', function (e) {
	    // do something...
	    $('#reportTable').bootstrapTable('refresh');
	});
	//初始化时间插件实例
    $('.TheCreatTime,.PEcretime,.FOFCLRQInp,.TheCreatTimeADD,.PEcretimeADD,.FOFCLRQInpADD').datetimepicker({
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

	//产品详情内容区域高度以及新建产品详情内容区域高度
	$(".detailWrapper").height($(window).height() - $(".detailTitle").height());
	$(".ADDdetailWrapper").height($(window).height() - $(".AddTitle").height());

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
		url:CTX_PATHNG+"admin/product/index",
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
		search: false,
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
				}else if(value == 206299999){
					CPstatus = "停用";
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
			//console.log(res);
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
		//var seartype;
		//判断search模糊查询的是否为空
		//if(params.searchText.trim() == ""){
		//	seartype = null;
		//}else{
		//	seartype = params.searchText;
		//}
	    return {
	        limit : params.pageSize, //每一页的数据行数，默认是上面设置的10(pageSize)
	        offset : parseInt(params.pageNumber - 1) * parseInt(params.pageSize), //当前第几条数据,（后台默认重0开始）
	        //search: seartype,
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
	/*---------------------------------------------------------产品详情页部分逻辑代码-------------------------------------------*/
	//关闭详情页
	$(".productDetailWrapper .close").click(function(){
    	$(".productDetailWrapper").hide({duration: 500});
    	//销毁募集账户信息、业绩比较基准信息、产品公告表格
    	$("#reportMJZHTable,#reportYJBJTable,#reportCPGGTable,.FJViewTable").bootstrapTable('destroy'); 	
    });
	//此处监听产品公告编辑模态框消失事件
	$('.CPGGWritAlert').on('hide.bs.modal', function (){
		//销毁产品公告编辑弹窗历史附件表格
        $(".WritLSFJViewTable").bootstrapTable('destroy');
    });
	//查看产品信息详情函数
    function checkDetailPage(parama_1){
    	//console.log(parama_1);
    	var URLselet = "";
    	//先将当前模块变量初始化
    	currentProduct = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		URLselet = CTX_PATHNG+"admin/product/edit/one";
    	}else{
    		URLselet = CTX_PATHNG+"admin/product/index/one"
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
				//console.log(result);
				if(result.code == "0"){
					//展示详细页
					$(".productDetailWrapper").show({duration: 500});
					var datareturn = result.data;
					//常规信息字段页面填充
					$(".ProductNameInp").val(datareturn.name); //产品名称
					$(".ProductMangerInp").val(datareturn.owneridname); //产品经理
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
						    $(".TZLXslect").val(datareturn.investmenttype);                  //投资类型
						    $(".FOFBABMInp").val(datareturn.filingcode);                     //备案编码						    
						    $(".CPLXslect").val(datareturn.fofproducttype);                  //产品类型						    
						    $(".FOFGLTDInp").val(datareturn.managementteam);                 //管理团队						    
						    $(".FOFJJGLRInp").val(datareturn.fundmanager);                   //基金管理人					    
						    $(".FOFJJTGRInp").val(datareturn.custodian);                     //基金托管人					    
						    $(".FOFTZGWInp").val(datareturn.invest_advisor);                 //投资顾问						    
						    $(".FOFZQJJSInp").val(datareturn.securitiesbroker);              //证券经纪商						    
						    $(".FOFQHJJSInp").val(datareturn.futuresbroker);                 //期货经纪商					    
						    $(".FOFGLRGLFLInp").val(datareturn.managementfeerate);           //管理人管理费率					    
						    $(".FOFYJBCInp").val(datareturn.payback1);                       //业绩报酬（%）					    
						    $(".FOFGLJGInp").val(datareturn.fofadministrativeorganization);  //管理机构					    
						    $(".FOFJJJLInp").val(datareturn.foffundmanager);                 //基金经理					    
						    $(".FOFKFRInp").val(datareturn.opendate);                        //开放日					    
						    $(".FOFFBQInp").val(datareturn.enddate);                         //封闭期						    
						    $(".FOFRGFLInp").val(datareturn.subscriptionfee);                //认购费率（%）						    
						    $(".FOFSHFLInp").val(datareturn.redemptionrate);                 //赎回费率（%）					    
						    $(".FOFYJXInp").val(datareturn.warningline);                     //预警线（%）						    
						    $(".FOFZSXInp").val(datareturn.stopline);                        //止损线（%）						    
						    $(".FOFTGFInp").val(datareturn.fee3);                            //托管费（%）						    
						    $(".FOFXZGLFInp").val(datareturn.fee4);                          //行政管理费（%）				    
						    $(".FOFCLRQInp").val(datareturn.establishmentdate);              //成立日期						    
						    $(".SFSXslect").val(datareturn.umbrellatype);                    //是否伞型						    
						    $(".SFFJslect").val(datareturn.whetherclassification);           //是否分级						    
						    $(".FOFTGJJInp").val(datareturn.foftrusteeshipbody);             //托管机构						    
						    $(".FOFJJFYInp").val(datareturn.foffundcost);                    //基金费用
                            editor1.txt.text(datareturn.fofnetworthannouncement);            //净值公布  
                            editor2.txt.text(datareturn.fofinvestmentscope);                 //投资范围
                            editor3.txt.text(datareturn.fofparticipationexit);               //参与退出
                            editor4.txt.text(datareturn.fofproducthighlights);               //产品亮点
                            editor5.txt.text(datareturn.fofriskmeasures);                    //风险措施
                            editor6.txt.text(datareturn.fofinvestmenttarget);                //投资目标
                            editor7.txt.text(datareturn.fofinvestmentstrategy);              //投资策略
                            editor8.txt.text(datareturn.fofqualifiedinvestors);              //合格投资者
                            editor9.txt.text(datareturn.foftargetaccount);                   //目标开户
                            editor10.txt.text(datareturn.fofremarks);                        //备注
                            editor11.txt.text(datareturn.riskwarning);                       //风险提示
                            editor12.txt.text(datareturn.sourceguaranteerepayment);          //还款来源
                            editor13.txt.text(datareturn.proceedsuse);                       //资金用途
						    break;
						case 206290002:  //(OTC产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".GDSYcontentWrap").css("display","block");
						    $(".PPPcontentWrap,.FOFcontentWrap,.PEcontentWrap").css("display","none");
						    currentProduct = "OTC";  //设置当前模块变量值
						    //OTC类详细信息页面字段填充
						    $(".GDTGZHInp").val(datareturn.account1);                //托管账户
						    $(".GDJCZCLXInp").val(datareturn.underlyingtype);        //基础资产类型				    
						    $(".GDZRFInp").val(datareturn.transferor);               //转让方					    
						    //$(".GDZJYTInp").val(datareturn.proceedsuse);//资金用途
						    $(".GDZRGWInp").val(datareturn.transferconsultant);      //转让顾问
						    $(".GDFHInp").val(datareturn.fee2);                      //分红
						    editor14.txt.text(datareturn.participationexit);         //参与退出
						    editor15.txt.text(datareturn.incomedistribution);        //收益分配方式
						    editor16.txt.text(datareturn.investmentscope);           //投资范围
						    editor17.txt.text(datareturn.sourceguaranteerepayment);  //还款来源及保障
						    editor18.txt.text(datareturn.projectintroduction);       //项目方介绍
						    editor19.txt.text(datareturn.financingintroduction);     //融资方介绍
						    editor20.txt.text(datareturn.trustmeasures);             //增信措施
						    //editor21.txt.text(datareturn.fee2);//分红
						    editor21.txt.text(datareturn.other);                     //其它
						    editor22.txt.text(datareturn.riskwarning);               //风险提示
						    editor23.txt.text(datareturn.producthighlights);         //产品亮点
						    editor24.txt.text(datareturn.riskcontrol);               //风险控制
						    editor46.txt.text(datareturn.proceedsuse);               //资金用途
						    break;
						case 206290001:  //(PPP产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".PPPcontentWrap").css("display","block");
						    $(".GDSYcontentWrap,.FOFcontentWrap,.PEcontentWrap").css("display","none");	
						    currentProduct = "PPP";  //设置当前模块变量值
						    //PPP类产品详细信息页面字段填充
						    $(".PTGJGInp").val(datareturn.trustee);                     //托管机构
						    $(".PJGGLInp").val(datareturn.administrativeorganization);  //管理机构				    
						    $(".PTGZHInp").val(datareturn.account1);                    //托管账户				    
						    $(".PJJGLFInp").val(datareturn.fundmanagementfee);          //基金管理费
						    $(".PFHInp").val(datareturn.fee2);                          //分红
						    editor25.txt.text(datareturn.participationexit);            //参与退出
						    editor26.txt.text(datareturn.incomedistribution);           //收益分配方式
						    editor27.txt.text(datareturn.investmentscope);              //投资范围
						    editor28.txt.text(datareturn.sourceguaranteerepayment);     //还款来源及保障
						    editor29.txt.text(datareturn.projectintroduction);          //项目方介绍
						    editor30.txt.text(datareturn.financingintroduction);        //融资方介绍
						    editor31.txt.text(datareturn.trustmeasures);                //增信措施
						    //editor33.txt.text(datareturn.fee2); //分红
						    editor32.txt.text(datareturn.other);                        //其它
						    editor33.txt.text(datareturn.riskwarning);                  //风险提示
						    editor34.txt.text(datareturn.producthighlights);            //产品亮点
						    editor35.txt.text(datareturn.riskcontrol);                  //风险控制
						    editor36.txt.text(datareturn.proceedsuse);                  //资金用途
						    break;
						case 206290003:  //(PE股权产品)
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".PEcontentWrap").css("display","block");
						    $(".PPPcontentWrap,.FOFcontentWrap,.GDSYcontentWrap").css("display","none");
						    currentProduct = "PE";  //设置当前模块变量值
						    //PE股权类产品详细信息页面字段填充
						    $(".PGMJQInp").val(datareturn.perecruitment);              //募集期
						    $(".PGGLTDInp").val(datareturn.pemanagementteam);          //管理团队				    
						    $(".PGJJTGRInp").val(datareturn.pecustodian);              //基金托管人		    
						    $(".PGJJGLRInp").val(datareturn.pefundmanager);            //基金管理人
						    $(".CPJGslect").val(datareturn.peproductmix);              //产品结构
						    $(".PGCPJGXQInp").val(datareturn.pemixdetails);            //产品结构详情			    
						    $(".SFGTslect").val(datareturn.pewhether);                 //是否跟投
						    $(".PGGTXQInp").val(datareturn.pefollowdetails);           //跟投详情
						    editor37.txt.text(datareturn.pedistributionmode);          //分配方式
						    editor38.txt.text(datareturn.peinvestmentdirection);       //投资方向
						    editor39.txt.text(datareturn.peinformationdis);            //信息披露
						    editor40.txt.text(datareturn.pereserveitem);               //储备项目
						    editor41.txt.text(datareturn.periskcontrol);               //风控措施
						    editor42.txt.text(datareturn.riskwarning);                 //风险提示
						    editor43.txt.text(datareturn.producthighlights);           //产品亮点
						    editor44.txt.text(datareturn.sourceguaranteerepayment);    //还款来源
						    editor45.txt.text(datareturn.proceedsuse);                 //资金用途	    
						    break;
						default:
						    $(".ProductTypeInp").val(datareturn.producttype);
						    $(".FOFcontentWrap,.GDSYcontentWrap,.PPPcontentWrap,.PEcontentWrap").css("display","none");
					}
					switch (datareturn.productstate){  //产品状态
						case 206290000:
							$(".ProductStatusInp").val('未提交');
							PTorF = true;
							StopTorF = false;
							break;
						case 206290001:
							$(".ProductStatusInp").val('未审核');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290002:
							$(".ProductStatusInp").val('产品部驳回');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290003:
							$(".ProductStatusInp").val('发行中');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290004:
							$(".ProductStatusInp").val('已成立');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290005:
							$(".ProductStatusInp").val('产品部通过');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290006:
							$(".ProductStatusInp").val('销售部通过');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290007:
							$(".ProductStatusInp").val('销售部驳回');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290008:
							$(".ProductStatusInp").val('产品作业部驳回');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290009:
							$(".ProductStatusInp").val('募集完成');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290010:
							$(".ProductStatusInp").val('清算完成');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290011:
							$(".ProductStatusInp").val('兑付完成');
							PTorF = false;
							StopTorF = false;
							break;
						case 206290012:
							$(".ProductStatusInp").val('暂停');
							PTorF = false;
							StopTorF = false;
							break;
						case 206299999:
							$(".ProductStatusInp").val('停用');
							PTorF = false;
							StopTorF = true;
							break;
						default:
						    $(".ProductStatusInp").val(datareturn.productstate); 
						    PTorF = false;
						    StopTorF = false;
					}
					//控制富文本编辑模块权限
				    $.each(editorObjArry, function(index,item) {				    	
				        //判断用户是否具有编辑功能
				        if(TorF == false){
				        	// 禁用编辑功能
				            item.$textElem.attr('contenteditable', false);
				            // 关闭提交/激活按钮
				            $(".ProductSubmit").hide();
				        }else if(TorF == true && PTorF == true && StopTorF == false){
				        	// 开启编辑功能
				        	item.$textElem.attr('contenteditable', true);
				        	// 显示提交/激活按钮
				        	$(".ProductSubmit").show();
				        	$(".ProductSubmit").show().html("提交");
				        }else{
				        	// 禁用编辑功能
				            item.$textElem.attr('contenteditable', false);
				            // 关闭提交/激活按钮
				            $(".ProductSubmit").hide();
				        }
				    });	
				    //再次根据用户是否具有编辑权限判断后面五类富文本编辑器编辑权限可编辑性
				    $.each(editorObjFiveArry, function(index,item) {				    	
				        //判断用户是否具有编辑功能
				        if(TorF == true && StopTorF == false){
				        	// 开启编辑功能
				        	item.$textElem.attr('contenteditable', true);
				        }else{
				        	// 禁用编辑功能
				            item.$textElem.attr('contenteditable', false);
				        }
				    });	 
					$(".HostOutCostInp").val(datareturn.fee1);                                //托管外包费%				
					$(".ManagerFeeInp").val(datareturn.managementexpense);                    //管理费%
					$(".TheCreatTime").val(datareturn.duedate);                               //成立时间				
					$(".EstablishedInp").val(dealNumber(datareturn.establishedquota,1));      //已成立额度				
					$(".MJGMInp").val(dealNumber(datareturn.sumamount,1));                    //募集规模			
					$(".MJGMInpZs").val(charMoney(datareturn.sumamount));                     //募集规模(大写)				
					$(".PublicPoolInp").val(dealNumber(datareturn.commonpool,1));             //公共池			
					$(".ZDRGJEInp").val(dealNumber(datareturn.subscriptionstartingpoint,1));  //最低认购金额
					$(".ZDRGJEInpZs").val(charMoney(datareturn.subscriptionstartingpoint));   //最低认购金额(大写)	
					$(".VIPQuotaInp").val(datareturn.vipquota);                               //vip额度					
					$(".ZJQDInp").val(dealNumber(datareturn.additionalstartingpoint,1));      //追加起点					
					$(".ZJQDInpZs").val(charMoney(datareturn.additionalstartingpoint));       //追加起点(大写)					
					$(".KFPEDInp").val(dealNumber(datareturn.limit,1));                       //可分配额度					
					$(".YFPEDInp").val(dealNumber(datareturn.allocatedamount,1));             //已分配额度					
					$(".EDJDTInp").val(datareturn.limitper);                                  //额度进度条					
					$(".KYYEDInp").val(dealNumber(datareturn.reservelimit,1));                //可预约额度					
					$(".YYYEDInp").val(dealNumber(datareturn.reservedquota,1));               //已预约额度				
					$(".YYZJDTInp").val(datareturn.subper);                                   //预约总进度条
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
				    if(TorF == false ||  PTorF == false || StopTorF == true){ //无修改权限情况
                        //设置下拉选择框不可选状态
                        $(".markSelect").attr("disabled",true);
				    	//设置所有带WRInpt类名的input标签为不可编辑
				    	$(".WRInpt").prop("readonly",true);
				    	//隐藏保存按钮
				    	//$(".modalTiltleSave").hide();
				    }else{
				    	//设置下拉选择框为可选状态
				    	$(".markSelect").attr("disabled",false);
				    	//设置所有带WRInpt类名的input标签为可编辑
				    	$(".WRInpt").prop("readonly",false);
				    	//显示保存按钮
				    	//$(".modalTiltleSave").show();
				    }
				    //这里只根据用户是否具有编辑权限，不考虑产品状态来控制前面常规和详细信息保存按钮显示或隐藏
				    if(TorF && StopTorF == false){
				    	$(".modalTiltleSave").show();
				    }else{
				    	$(".modalTiltleSave").hide();
				    }
				    //如果存在修改权限，启用时间选择框
				    if(TorF == true && PTorF == true && StopTorF == false){
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
		        	return false;
		        }
				//根据用户权限状态以及产品状态来控制募集账户信息新增、业绩比较基准信息新增、公示信息保存、上传二维码等是否显示
				if(StopTorF == false){
					if(TorF && PTorF){
				    	$(".MJZHXXAdd").show(); 
				    	$(".YJBJJZAdd").show();
				    	//设置公示信息保存按钮id为空
						$(".GSXXSave").attr('id',"");
				    	$(".GSXXSave").show();
				    	$(".fileConter").show();
				    	$(".GSXXRSpan").prop("readonly",false);
				    	$(".FJIR,.FJSCSave,.dropzoneCont").show();
				    	$(".CPGGAdd").show();
				    }else if(TorF == true && PTorF == false){
				    	$(".MJZHXXAdd").hide();                    //募集账户信息模块
				    	$(".YJBJJZAdd").hide();                    //业绩比较基准信息模块
				    	//设置公示信息保存按钮id为空
						$(".GSXXSave").attr('id',"");
				    	$(".GSXXSave").show();                     //公示信息模块
				    	$(".fileConter").show();                   //公示信息模块
				    	$(".GSXXRSpan").prop("readonly",false);    //公示信息模块
				    	$(".FJIR,.FJSCSave,.dropzoneCont").show(); //附件上传部分
				    	$(".CPGGAdd").show();                      //产品公告模块
				    }else{
				    	$(".MJZHXXAdd").hide();
				    	$(".YJBJJZAdd").hide();
				    	$(".CPGGAdd").hide();
				    	//设置公示信息保存按钮id为空
						$(".GSXXSave").attr('id',"");
				    	$(".GSXXSave").hide();
				    	$(".fileConter").hide();
				    	$(".GSXXRSpan").prop("readonly",true);
				    	$(".FJIR,.FJSCSave,.dropzoneCont").hide();
				    }
				}else{
					$(".MJZHXXAdd").hide();
			    	$(".YJBJJZAdd").hide();
			    	$(".CPGGAdd").hide();
			    	//设置公示信息保存按钮id为空
					$(".GSXXSave").attr('id',"");
			    	$(".GSXXSave").hide();
			    	$(".fileConter").hide();
			    	$(".GSXXRSpan").prop("readonly",true);
			    	$(".FJIR,.FJSCSave,.dropzoneCont").hide();
			    	//将提交按钮改为激活
			    	$(".ProductSubmit").show().html("激活");
				}
			    
			    //初始化募集账户信息表格
			    CreatMJZHTable(parama_1);
			    //初始化业绩比较基准信息表格
			    CreatYJBJTable(parama_1);
			    //初始化产品公告信息表格
			    CreatCPGGTable(parama_1);
			    //公示信息模块加载数据
			    LoadGSXXModal(parama_1);
			    //附件模块加载数据
			    GetFJfiler(parama_1);
			}, 
		  	error:function(){
		  		alert("网络错误！");	
		  	}	 
	    });	    
    }
    //募集账户信息表格生成函数
    function CreatMJZHTable(productid){
    	var $tableMJZH; 
		$tableMJZH = $('#reportMJZHTable').bootstrapTable({
			method: 'get',
			url:CTX_PATHNG+"admin/product/index/account",
			ajaxOptions:{
		        headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")}
		    },		
			dataType: "json",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			striped: false, //隔行变色			
	        idField:"product", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
			columns: [
			{
				field: 'product', //产品id
				visible:false
			},
			{
				field: 'accountinformationid', //募集账户id
				visible:false
			},
//			{
//				field: "numid",
//				title: "序号",
//				align: "center",
//				valign: "middle",
//				//sortable: "true",
//				formatter: function(value, row, index){
//					var pageSize=$('#reportTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条  
//	                var pageNumber=$('#reportTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页  
//	                return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号 
//				}
//			}, 
			{
				field: "collectionaccount",
				title: "募集账户",
				align: "center",
				valign: "middle"
			}, {
				field: "name",
				title: "募集户",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var bMark = '<span style="color:#4A8BC2;cursor:pointer">'+value+'</span>';
					return bMark;
				}
			}, {
				field: "product_name",
				title: "募集产品",
				align: "center",
				valign: "middle"
			},   
	        {
				field: "opening_bank",
				title: "开户行",
				align: "center",
				valign: "middle"
			}],		
			locale: 'zh-CN', //中文支持
			//queryParamsType: '', //默认值为 'limit',传参为：offset,limit,sort //设置为 ''传参为：pageSize,pageNumber
			queryParams: queryParamsMJZH(productid),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
			//sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
			responseHandler:function (res) {  //在渲染页面数据之前执行的方法
				//console.log(res);
				if(res.code == "-10"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录！");
			        window.parent.location.href = "../../login.html";
				}else if(res.code == "-11"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录CRM账号！");
					parent.$(".secondLogin").modal('show');
				}else if(res.code == "0"){
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
	        //单击某一格(这里指对点击操作列里面的募集户)
	        onClickCell: function(field, value, row, $element){
	        	//console.log(row.product);
	        	//console.log(row.accountinformationid);
	        	//$(".MJZHXXAlert").modal('show');
	        	//根据用户权限状态以及产品状态来控制是否调用编辑弹窗数据填充函数
			    if(field == "name" && TorF && PTorF && StopTorF == false){
			    	//编辑弹窗数据填充函数
	        	    EditorCollectData(row.accountinformationid);
			    }else{
			    	return false;
			    }
	        },
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('#reportMJZHTable').bootstrapTable('removeAll');  
			}
	    });
	    
    };
    //募集账户信息Table请求服务数据时所传参数
	function queryParamsMJZH(csProductid){
	    return {
	        limit : 10000,
	        productinformationid:csProductid
	    }
	};
    //点击募集账户新增
    $(".MJZHXXAdd").click(function(){
    	//清空文本框
    	$(".CollectZHinp,.CollectCPinp,.BankNuminp,.OpenBankinp").val("");
    	//将募集产品新增弹窗募集产品栏赋值
	    $(".CollectCPinp").val($(".ProductNameInp").val());
    	$(".MJZHXXAlert").modal('show');		
    });
    //点击募集账户新增弹窗确定按钮
    $(".CollectY").click(function(){
    	//校验
    	if($(".CollectZHinp").val() == '' || $(".CollectCPinp").val() == '' || $(".BankNuminp").val() == '' || $(".OpenBankinp").val() == ''){
    		alert("请完善信息！");
    	}else{
    		//请求接口新增数据
	    	$.ajax({
	      	    async: true,
				type:'post',
				url:CTX_PATHNG+"admin/product/new/account",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    createdby: sessionStorage.getItem("LCSID"),
				    modifiedby: sessionStorage.getItem("LCSID"),
				    ownerid: sessionStorage.getItem("LCSID"),
				    owningbusinessunit: sessionStorage.getItem("LCSBMID"),
				    name: $(".BankNuminp").val(),
				    opening_bank: $(".OpenBankinp").val(),
				    collectionaccount: $(".CollectZHinp").val(),
				    product: currentProductId
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						//刷新表格
						$('#reportMJZHTable').bootstrapTable('refresh');  
						//隐藏新增弹窗
						$(".MJZHXXAlert").modal('hide');
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
    });
    //募集账户信息编辑弹窗数据填充函数
    function EditorCollectData(prm1){
    	//console.log(prm1);
    	var URLseletMJ = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		URLseletMJ = CTX_PATHNG+"admin/product/edit/account/one";
    	}else{
    		URLseletMJ = CTX_PATHNG+"admin/product/index/account/one";
    	}
    	//请求数据填充弹窗
    	$.ajax({
      	    async: true,
			type:'get',
			url:URLseletMJ,
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data:{
			    accountinformationid: prm1
		    },
			success:function(result){
				//console.log(result);
				if(result.code == "0"){
					//清空文本框
					$(".WritCollectZHinp,.WritCollectCPinp,.WritBankNuminp,.WritOpenBankinp").val("");
					//募集账户填充
					$(".WritCollectZHinp").val(result.data.collectionaccount);
					//募集产品填充
					$(".WritCollectCPinp").val(result.data.product_name);
					//银行卡号
					$(".WritBankNuminp").val(result.data.name);
					//开户行
					$(".WritOpenBankinp").val(result.data.opening_bank);
					//显示弹窗
					$(".WritMJZHXXAlert").modal('show');
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
	    //设置编辑弹窗确定按钮id以便传参
	    $(".WritCollectY").prop('id',prm1);
    }
    //点击募集账户信息编辑弹窗确定按钮
    $(".WritCollectY").click(function(){
    	//校验
    	if($(".WritCollectZHinp").val() == '' || $(".WritCollectCPinp").val() == '' || $(".WritBankNuminp").val() == '' || $(".WritOpenBankinp").val() == ''){
    		alert("请完善信息！");
    	}else{
    		//请求接口新增数据
	    	$.ajax({
	      	    async: true,
				type:'post',
				url:CTX_PATHNG+"admin/product/edit/account",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    modifiedby: sessionStorage.getItem("LCSID"),
				    name: $(".WritBankNuminp").val(),
				    opening_bank: $(".WritOpenBankinp").val(),
				    collectionaccount: $(".WritCollectZHinp").val(),
				    accountinformationid: $(".WritCollectY").attr('id'),
				    product: currentProductId
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						//刷新表格
						$('#reportMJZHTable').bootstrapTable('refresh');  
						//隐藏编辑弹窗
						$(".WritMJZHXXAlert").modal('hide');
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
    });
    //业绩比较基准信息表格生成函数
    function CreatYJBJTable(productid){
    	//console.log(productid);
    	var $tableYJBJ; 
		$tableYJBJ = $('#reportYJBJTable').bootstrapTable({
			method: 'get',
			url:CTX_PATHNG+"admin/product/index/benefit",
			ajaxOptions:{
		        headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")}
		    },		
			dataType: "json",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			striped: false, //隔行变色
	        idField:"product", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
			columns: [
			{
				field: 'productid', //产品id
				visible:false
			},{
				field: 'benefitlevelid', //业绩比较基准信息id
				visible:false
			},			{
				field: "name",
				title: "编号",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var aMark = '<span style="color:#4A8BC2;cursor:pointer">'+value+'</span>';
					return aMark;
				}
			},{
				field: "product_name",
				title: "产品名称",
				align: "center",
				valign: "middle"
			},{
				field: "duration",
				title: "续存期限",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					if(value == 0){
						return "永续"
					}else{
						return value + "个月";
					}	
				}
			},{
				field: "upamount",
				title: "金额上限",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					return dealNumber(value,1);
				}
			},{
				field: "downamount",
				title: "金额下限",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					return dealNumber(value,1);
				}
			},{
				field: "rate",
				title: "预期收益率(%)",
				align: "center",
				valign: "middle"
			}],		
			locale: 'zh-CN', //中文支持
			queryParams: queryParamsYJBJ(productid),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
			responseHandler:function (res) {  //在渲染页面数据之前执行的方法
				//console.log(res);
				if(res.code == "-10"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录！");
			        window.parent.location.href = "../../login.html";
				}else if(res.code == "-11"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录CRM账号！");
					parent.$(".secondLogin").modal('show');
				}else if(res.code == "0"){
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
	        //单击某一格(这里指对点击操作列里面的编号)
	        onClickCell: function(field, value, row, $element){
	        	//根据用户权限状态以及产品状态来控制是否调用编辑弹窗数据填充函数
			    if(field == "name" && TorF && PTorF && StopTorF == false){
			    	//编辑弹窗数据填充函数
	        	    PerformanceCompare(row.benefitlevelid);
			    }else{
			    	return false;
			    }
	        },
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('#reportYJBJTable').bootstrapTable('removeAll');  
			}
	    });    
    };
    //业绩比较基准信息Table请求服务数据时所传参数
	function queryParamsYJBJ(csProductid){
	    return {
	        limit : 10000,
	        productinformationid:csProductid
	    }
	};
	//业绩比较基准信息编辑弹窗填充数据函数
	function PerformanceCompare(csBenefitlevelid){
		var URLseletYJ = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		URLseletYJ = CTX_PATHNG+"admin/product/edit/benefit/one";
    	}else{
    		URLseletYJ = CTX_PATHNG+"admin/product/index/benefit/one";
    	}
		//请求数据填充弹窗
    	$.ajax({
      	    async: true,
			type:'get',
			url:URLseletYJ,
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data:{
			    benefitlevelid: csBenefitlevelid
		    },
			success:function(result){
				//console.log(result);
				if(result.code == "0"){
					//清空文本框
					$(".WritSerialNuminp,.WritYJBJCPMCinp,.WritYJBJJESXinp,.WritYJBJJESXDXinp,.WritYJBJJEXXinp,.WritYJBJJEXXDXinp,.WritYJBJJZinp").val("");
					//编号填充
					$(".WritSerialNuminp").val(result.data.name);
					//产品名称填充
					$(".WritYJBJCPMCinp").val(result.data.product_name);
					//金额上限填充
					$(".WritYJBJJESXinp").val(dealNumber(result.data.upamount,1));
					//金额上限(大写)填充
					$(".WritYJBJJESXDXinp").val(result.data.upamountcapitals);
					//金额下限填充
					$(".WritYJBJJEXXinp").val(dealNumber(result.data.downamount,1));
					//金额下限大写填充
					$(".WritYJBJJEXXDXinp").val(result.data.downamountcapitals);
					//业绩比较基准填充
					$(".WritYJBJJZinp").val(result.data.rate);
					//存续期限填充
					$(".WritYJBJCXQXinp").val(result.data.duration);
					//备注填充
					$(".WritYJBJBZinp").val(result.data.comment);
					//显示编辑弹窗
					$(".WritYJBJXXAlert").modal('show');
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
	    //设置编辑弹窗确定按钮id以便传参
	    $(".WritYJBJXXY").prop('id',csBenefitlevelid);
	}
	//监听业绩比较基准信息编辑,金额上限输入框
	LisingValUp("WritYJBJJESXinp","WritYJBJJESXDXinp");
    //监听业绩比较基准信息编辑,金额下限输入框
    LisingValUp("WritYJBJJEXXinp","WritYJBJJEXXDXinp");

    //点击业绩比较基准信息编辑弹窗上的确定
    $(".WritYJBJXXY").click(function(){
    	//校验
    	if($(".WritSerialNuminp").val() == '' || $(".WritYJBJCPMCinp").val() == ''){
    		alert("请完善信息！(带*号为必填)");
    	}else{
    		//请求接口新增数据
	    	$.ajax({
	      	    async: true,
				type:'post',
				url:CTX_PATHNG+"admin/product/edit/benefit",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    modifiedby: sessionStorage.getItem("LCSID"),            //当前用户id
				    benefitlevelid: $(".WritYJBJXXY").attr('id'),           //业绩比较基准信息id
				    productid: currentProductId,                            //产品id
				    name: $(".WritSerialNuminp").val(),                     //编号
				    comment: $(".WritYJBJBZinp").val(),                     //备注
				    downamount: dealNumberFX($(".WritYJBJJEXXinp").val()),  //金额下限
				    downamountcapitals: $(".WritYJBJJEXXDXinp").val(),      //金额下限大写
				    upamount: dealNumberFX($(".WritYJBJJESXinp").val()),    //金额上限
				    upamountcapitals: $(".WritYJBJJESXDXinp").val(),        //金额上限大写
				    rate: $(".WritYJBJJZinp").val(),                        //预期收益率(%)
				    duration: $(".WritYJBJCXQXinp").val()                   //存续期限
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						//刷新表格
						$('#reportYJBJTable').bootstrapTable('refresh');  
						//隐藏编辑弹窗
						$(".WritYJBJXXAlert").modal('hide');
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
    });    
    //点击业绩比较基准信息新增
    $(".YJBJJZAdd").click(function(){
    	//清空文本框
    	$(".SerialNuminp,.YJBJCPMCinp,.YJBJJESXinp,.YJBJJESXDXinp,.YJBJJEXXinp,.YJBJJEXXDXinp,.YJBJJZinp,.YJBJBZinp").val("");
    	//将业绩比较基准信息新增弹窗产品名称栏赋值
	    $(".YJBJCPMCinp").val($(".ProductNameInp").val());
    	$(".YJBJXXAlert").modal('show');		
    });
    //监听业绩比较基准信息新增,金额上限输入框
    LisingValUp("YJBJJESXinp","YJBJJESXDXinp");
    //监听业绩比较基准信息新增,金额下限输入框
    LisingValUp("YJBJJEXXinp","YJBJJEXXDXinp");
    
    //点击业绩比较基准信息新增弹窗确定按钮
    $(".YJBJXXY").click(function(){
    	//校验
    	if($(".SerialNuminp").val() == '' || $(".YJBJCPMCinp").val() == ''){
    		alert("请完善信息！(带*号为必填)");
    	}else{
    		//请求接口新增数据
	    	$.ajax({
	      	    async: true,
				type:'post',
				url:CTX_PATHNG+"admin/product/new/benefit",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    createdby: sessionStorage.getItem("LCSID"),
				    modifiedby: sessionStorage.getItem("LCSID"),
				    ownerid: sessionStorage.getItem("LCSID"),
				    owningbusinessunit: sessionStorage.getItem("LCSBMID"),
				    name: $(".SerialNuminp").val(),                     //编号
				    comment: $(".YJBJBZinp").val(),                     //备注
				    downamount: dealNumberFX($(".YJBJJEXXinp").val()),  //金额下限
				    downamountcapitals: $(".YJBJJEXXDXinp").val(),      //金额下限大写
				    upamount: dealNumberFX($(".YJBJJESXinp").val()),    //金额上限
				    upamountcapitals: $(".YJBJJESXDXinp").val(),        //金额上限大写
				    rate: $(".YJBJJZinp").val(),                        //预期收益率(%)
				    duration: $(".YJBJCXQXinp").val(),                  //存续期限
				    productid: currentProductId                         //产品id
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						//刷新表格
						$('#reportYJBJTable').bootstrapTable('refresh');  
						//隐藏新增弹窗
						$(".YJBJXXAlert").modal('hide');
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
    });
    
    //产品公告表格生成函数
    function CreatCPGGTable(CPproductid){
    	var $tableCPGG; 
		$tableCPGG = $('#reportCPGGTable').bootstrapTable({
			method: 'get',
			url:CTX_PATHNG+"admin/product/index/notice",
			ajaxOptions:{
		        headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")}
		    },		
			dataType: "json",
			dataField: "data",//这是返回的json数组的key.默认好像是"rows".这里前后端约定好就行
			cache: false, //设置为 false 禁用 AJAX 数据缓存
			striped: false, //隔行变色
	        idField:"noticeinfoid", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
			columns: [
			{
				field: 'noticeinfoid', //公告id
				visible:false
			},{
				field: "noticeno",
				title: "编号",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var cMark = '<span style="color:#4A8BC2;cursor:pointer">'+value+'</span>';
					return cMark;
				}
			},{
				field: "title",
				title: "标题",
				align: "center",
				valign: "middle"
			},{
				field: "noticedate",
				title: "公告日期",
				align: "center",
				valign: "middle"
			}],		
			locale: 'zh-CN', //中文支持
			queryParams: queryParamsCPGG(CPproductid),//前端调用服务时，会默认传递上边提到的参数，如添加自定义参数，自定义一个函数返回请求参数
			responseHandler:function (res) {  //在渲染页面数据之前执行的方法
				//console.log(res);
				if(res.code == "-10"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录！");
			        window.parent.location.href = "../../login.html";
				}else if(res.code == "-11"){
					sessionStorage.clear();  //清除session
					alert(res.message+"，请重新登录CRM账号！");
					parent.$(".secondLogin").modal('show');
				}else if(res.code == "0"){
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
	        //单击某一格(这里指对点击操作列里面的编号)
	        onClickCell: function(field, value, row, $element){
	        	//根据用户权限状态以及产品状态来控制是否调用编辑弹窗数据填充函数
			    //if(field == "noticeno" && TorF && PTorF){
			    //根据用户权限状态来控制是否调用编辑弹窗数据填充函数
			    if(field == "noticeno" && TorF && StopTorF == false){
			    	//编辑弹窗数据填充函数
	        	    CPGGBJTCCompare(row.noticeinfoid);
			    }else{
			    	return false;
			    }
	        },
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('#reportCPGGTable').bootstrapTable('removeAll');  
			}
	    });    
    };
    //产品公告信息Table请求服务数据时所传参数
	function queryParamsCPGG(cpProductid){
	    return {
	        limit : 10000,
	        productinformationid:cpProductid
	    }
	};
	//产品公告点击编号，查询单个产品公告详情函数
	//定义一个数组及对象保存产品公告编辑弹窗上传附件参数
	var CPGGFJWtArry = [];
	var CPGGFJWtObj = {};
	function CPGGBJTCCompare(cpggID){
		//console.log(cpggID);
		var CPGGDGURL = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		CPGGDGURL = CTX_PATHNG+"admin/product/edit/notice/one";
    	}else{
    		CPGGDGURL = CTX_PATHNG+"admin/product/index/notice/one";
    	}
		//请求数据填充弹窗
    	$.ajax({
      	    async: true,
			type:'get',
			url:CPGGDGURL,
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data:{
			    noticeinfoid: cpggID
		    },
			success:function(result){
				//console.log(result);
				if(result.code == "0"){
					//先清空ul列表
	    		    //$(".CPGGLSFJUL").empty();
	    		    //清空数组
	    		    CPGGFJWtArry = [];
	    		    var WTFJList = result.data.attachments;
	    		    //有历史文件
		    		if(WTFJList && WTFJList.length > 0){
		    			var str = "";
			    		$.each(WTFJList, function(index,obj) {
			    			CPGGFJWtObj = {};
			    			CPGGFJWtObj.attachmentid = obj.attachmentid;
			    			CPGGFJWtObj.name = obj.name;
			    			CPGGFJWtObj.url = obj.url;
			    			CPGGFJWtObj.openToCFP = obj.openToCFP;
		    			    CPGGFJWtObj.openToCustomer = obj.openToCustomer;
			    			CPGGFJWtArry.push(CPGGFJWtObj);
			    			//str+='<li><i class="fa fa-file-pdf-o GGWFJIL"></i><a href="'+obj.url+'" target="_blank">'+obj.name+'</a><i title="移除" id="'+obj.attachmentid+'" class="fa fa-trash GGWFJIR"></i></li>';
			    		});
			    		//console.log(CPGGFJWtArry);
			    		//调用函数生成产品公告部分历史附件列表
		    		    HistoryFJWrittable(CPGGFJWtArry);
//			    		$(".CPGGLSFJUL").append(str);
//			    		//点击移除pdf文件
//			    		$(".GGWFJIR").click(function(){
//			    			var GGFJWromoveThis = $(this);
//			    			$.each(CPGGFJWtArry,function(index,obj){
//			    				if(GGFJWromoveThis.attr('id') == obj.attachmentid){
//			    				    CPGGFJWtArry.splice(index,1);
//			    				    GGFJWromoveThis.parent().remove();
//			    				    return false;
//			    			    }
//			    			});
//			    			console.log(CPGGFJWtArry);
//			    		});
		    	    }else{
		    			HistoryFJWrittable(CPGGFJWtArry);
		    		}
		    		//清空文本框
					$(".CPGGWritBHinp,.CPGGWritBTinp").val("");
					//清空编辑器内容
					editorCPW.txt.clear();
                    //编号填充
                    $(".CPGGWritBHinp").val(result.data.noticeno);
                    //标题填充
                    $(".CPGGWritBTinp").val(result.data.title);
                    //公告详情填充
                    editorCPW.txt.html(result.data.details);
					//显示编辑弹窗
					$(".CPGGWritAlert").modal('show');
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
	    //设置编辑弹窗确定按钮id以便传参
	    $(".CPGGWritY").prop('id',cpggID);	
	}
	
	//产品公告编辑弹窗历史附件表格生成函数
	function HistoryFJWrittable(CPGGFJWtArryX){
		var $tableLSFJW; 
		$tableLSFJW = $('.WritLSFJViewTable').bootstrapTable({
			data: CPGGFJWtArryX,
			striped: false, //隔行变色
	        idField:"url", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
			columns: [
			{
				field: 'attachmentid', //附件唯一id
				visible:false
			},{
				title:"序号",
				field:"MyOrder",
				align:"center",
				valign:"middle",
				formatter: function(value, row, index){
					return index+1;
				}
			},{
				field: 'url', //附件url
				visible:false
			},{
				field: "name",
				title: "附件名称",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var eMark = '<a href="'+row.url+'" target="_blank" style="color:#4A8BC2;cursor:pointer">'+value+'</a>';
					return eMark;
				}
			},{
				field: "openToCFP",
				title: "对理财师开放",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					if(value){
						return '<input class="FJWstatu" type="checkbox" checked="checked" />';
					}else{
						return '<input class="FJWstatu" type="checkbox" />';
					}
				}
			},{
				field: "openToCustomer",
				title: "对会员开放",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					if(value){
						return '<input class="FJWstatu" type="checkbox" checked="checked" />';
					}else{
						return '<input class="FJWstatu" type="checkbox" />';
					}
				}
			},{
				title: "操作",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var drow = '<i class="FJWremove" id="'+row.attachmentid+'" data_id="'+row.url+'" style="color:#4A8BC2;cursor:pointer">删除</i>';
					return drow;
				}
			}],
			locale: 'zh-CN', //中文支持
	        //单击某一格(这里指对点击操作列里面的对理财师开放)
	        onClickCell: function(field, value, row, $element){
	        	//根据用户权限状态以及产品状态来控制是否能点击改变
	        	if(field == "openToCFP" && TorF && StopTorF == false){
	    			//将复选框的值赋值给数组对应数据值(是否对理财师开放)
	    			CPGGFJWtArry[$element.context.parentElement.dataset.index].openToCFP = $element.context.childNodes[0].checked;	
	        	}else if(field == "openToCustomer" && TorF && StopTorF == false){
	        		//将复选框的值赋值给数组对应数据值(是否对会员开放)
	    			CPGGFJWtArry[$element.context.parentElement.dataset.index].openToCustomer = $element.context.childNodes[0].checked;
	        	}else{
	        		return false;
	        	}
	        },
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('.WritLSFJViewTable').bootstrapTable('removeAll');  
			}
	    });  
	}
	//点击上述模块历史附件删除
	$(".WritLSFJViewTable").on('click','.FJWremove',function(){
		//console.log($(this).attr('data_id'));
		FJWritonRemove($(this).attr('id'),$(this).attr('data_id'));
	});
	//删除历史附件函数
	function FJWritonRemove(WTheattachmentid,WTheattachmentdataid){
		$('.WritLSFJViewTable').bootstrapTable('remove',{
			field: "url",
			values: [WTheattachmentdataid]
		});
	    $.each(CPGGFJWtArry,function(index,obj){
	    	if(WTheattachmentdataid == obj.url){
	    		CPGGFJWtArry.splice(index,1);
		    	return false;
	    	}
		});
		//console.log(CPGGFJWtArry);
    }
	//产品公告编辑弹窗附件上传模块
	$("#GGWritFJinputfile").fileinput({
        uploadUrl: CTX_PATHNG+"file/upload",
        language: 'zh',
        allowedFileExtensions: ['pdf','docx','doc','xls','xlsx','png','jpg','ppt','pptx'], //选择文件类型
        overwriteInitial: false,
        dropZoneEnabled: false, //是否显示拖拽区域
        showRemove: true, //显示移除按钮
        showPreview: true, //是否显示预览
        showCaption: true,//是否显示文件标题，默认为true
        minFileCount: 0, //每次上传允许的最少文件数。如果设置为0，则表示文件数是可选的。默认为0
        maxFileCount: 5, //每次上传允许的最大文件数。如果设置为0，则表示允许的文件数是无限制的。默认为0 
        uploadAsync: true, //默认为true异步
        browseClass: "btn btn-primary", //按钮样式
        maxFileSize: 10240,//单位为kb，如果为0表示不限制文件大小,这里暂时限制大小为10M
        removeFromPreviewOnError:true, //当文件不符合规则，就不显示预览
        enctype:'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    });	
    //选中文件自动上传
    $("#GGWritFJinputfile").on("filebatchselected", function (event, data, previewId, index) {  //选中文件
    	//$(this).fileinput("upload");
    });
    //异步上传成功结果处理
    $("#GGWritFJinputfile").on("fileuploaded", function (event, data, previewId, index) {
    	//console.log(data);
    	if(data.response.code == 0){
    		var returnList = data.response.data[0];
    		CPGGFJWtObj = {};
			CPGGFJWtObj.attachmentid = returnList.attachmentid;
			CPGGFJWtObj.name = returnList.name;
			CPGGFJWtObj.url = returnList.url;
			CPGGFJWtObj.openToCFP = false;
		    CPGGFJWtObj.openToCustomer = false;
			CPGGFJWtArry.push(CPGGFJWtObj);	
			//销毁产品公告编辑弹窗历史附件表格
            $(".WritLSFJViewTable").bootstrapTable('destroy');
            //表格再次生成
            HistoryFJWrittable(CPGGFJWtArry);
    	}else{
    		alert(data.response.message);
    	}
    });
    //异步上传错误结果处理
    $('#GGWritFJinputfile').on('fileerror', function(event, data, msg) {
        alert(msg);
    });
	//点击产品公告编辑确定按钮
	$(".CPGGWritY").click(function(){
		if($(".CPGGWritBHinp").val() == "" || $(".CPGGWritBTinp").val() == ""){
			alert("请完善信息!");
		}else{
	    	$.ajax({
			    async: true,
			    type:'POST',
				url: CTX_PATHNG+"admin/product/edit/notice",
				contentType:'application/json;charset=UTF-8',
				dataType: "JSON",
				traditional:true,
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:JSON.stringify({		
					createdby: sessionStorage.getItem("LCSID"),             //当前用户id
					modifiedby: sessionStorage.getItem("LCSID"),            //当前用户id
					ownerid: sessionStorage.getItem("LCSID"),               //当前用户id
					owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id							
					product: currentProductId,                              //产品id
					category: "206290001",                                  //附件分类>>产品资料：206290000；公告资料：206290001
					attachments: CPGGFJWtArry,                              //附件数组
					noticeinfoid: $(".CPGGWritY").attr("id"),               //公告id
					noticeno: $(".CPGGWritBHinp").val(),                    //公告编号
					details: editorCPW.txt.html(),                          //公告详情
					title: $(".CPGGWritBTinp").val()                        //标题	
				}),
			    success:function(result){
			    	//console.log(result);
			    	if(result.code == 0){
			    		$("#GGWritFJinputfile").fileinput('refresh');
			    		$("#reportCPGGTable").bootstrapTable('refresh');
			    		//关闭编辑弹窗
					    $(".CPGGWritAlert").modal('hide');
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
			})
		}	
	});
	
	//点击产品公告新增按钮
	$(".CPGGAdd").click(function(){
		//清空数组
		GGFJADDArry = [];
		//清空新增弹窗里面内容
		$(".CPGGADDBHinp,.CPGGADDBTinp").val("");
		editorCPA.txt.clear();
		$(".CPGGADDAlert").modal('show');
	});
    //产品公告新增弹窗附件上传模块
    //定义一个数组及对象保存产品公告新增上传附件参数
    var GGFJADDArry = [];
    var GGFJADDObj = {};
    $("#GGFJinputfile").fileinput({
        uploadUrl: CTX_PATHNG+"file/upload",
        language: 'zh',
        allowedFileExtensions: ['pdf','docx','doc','xls','xlsx','png','jpg','ppt','pptx'], //选择文件类型
        overwriteInitial: false,
        dropZoneEnabled: false, //是否显示拖拽区域
        showUpload: false, //是否显示上传
		showClose: true, //是否显示关闭
        showRemove: false, //显示移除按钮
        showPreview: true, //是否显示预览
        showCaption: true,//是否显示文件标题，默认为true
        minFileCount: 0, //每次上传允许的最少文件数。如果设置为0，则表示文件数是可选的。默认为0
        maxFileCount: 5, //每次上传允许的最大文件数。如果设置为0，则表示允许的文件数是无限制的。默认为0 
        uploadAsync: true, //默认为true异步
        browseClass: "btn btn-primary", //按钮样式
        maxFileSize: 10240,//单位为kb，如果为0表示不限制文件大小,这里暂时限制大小为10M
        removeFromPreviewOnError:true, //当文件不符合规则，就不显示预览
        enctype:'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    });	
    //选中文件自动上传
    $("#GGFJinputfile").on("filebatchselected", function (event, data, previewId, index) {  //选中文件
    	$(this).fileinput("upload");
    });
    //异步上传成功结果处理
    $("#GGFJinputfile").on("fileuploaded", function (event, data, previewId, index) {
    	//console.log(data);
    	if(data.response.code == 0){
    		var returnList = data.response.data[0];
    		GGFJADDObj = {};
			GGFJADDObj.attachmentid = returnList.attachmentid;
			GGFJADDObj.name = returnList.name;
			GGFJADDObj.url = returnList.url;
			GGFJADDArry.push(GGFJADDObj);	
    	}else{
    		alert(data.response.message);
    	}
    });
    //异步上传错误结果处理
    $('#GGFJinputfile').on('fileerror', function(event, data, msg) {
        alert(msg);
    });
    //点击公告新增确定按钮
    $(".CPGGADDY").click(function(){
    	//校验
    	if($(".CPGGADDBHinp").val() == "" || $(".CPGGADDBTinp").val() == ""){
    		alert("请完善信息！");
    	}else{
    		//数组对象内存入附件开放状态
    		$.each(GGFJADDArry, function(index,obj) {
    			obj.openToCFP = $(".ADDLCSKFSELTInp").val();                //是否对理财师开放
    			obj.openToCustomer = $(".ADDHYKFSELTInp").val();            //是否对会员开放
    		});
    		$.ajax({
			    async: true,
			    type:'POST',
				url: CTX_PATHNG+"admin/product/new/notice",
				contentType:'application/json;charset=UTF-8',
				dataType: "JSON",
				traditional:true,
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:JSON.stringify({
					createdby: sessionStorage.getItem("LCSID"),             //当前用户id
					modifiedby: sessionStorage.getItem("LCSID"),            //当前用户id
					ownerid: sessionStorage.getItem("LCSID"),               //当前用户id
					owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id		
					product: currentProductId,                              //产品id
					category: "206290001",                                  //附件分类>>产品资料：206290000；公告资料：206290001
					attachments: GGFJADDArry,                               //附件数组对象
					noticeno: $(".CPGGADDBHinp").val(),                     //公告编号
					details: editorCPA.txt.html(),                          //公告详情
					title: $(".CPGGADDBTinp").val()                         //公告标题
				}),
			    success:function(result){
			    	//console.log(result);
			    	if(result.code == 0){
			    		$("#GGFJinputfile").fileinput('refresh');
			    		//刷新表格
						$('#reportCPGGTable').bootstrapTable('refresh');  
						//关闭新增弹窗
						$(".CPGGADDAlert").modal('hide');
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
			})
    	}
    });
    
    //公示信息加载数据表格
    function LoadGSXXModal(LoadProdId){
    	//请求数据填充弹窗
    	$.ajax({
      	    async: true,
			type:'get',
			url:CTX_PATHNG+"admin/product/index/publicity",
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data:{
			    productinformationid: LoadProdId,
			    limit: 9999
		    },
			success:function(result){
				//console.log(result);
				if(result.code == "0"){
					if(result.data.list.length > 0){
						var datareturn = result.data.list[0];
						//清空文本框
						$(".GSJJMCINP,.GSJJBHINP,.GSJJGLRMCINP,.GSTGRXM").val("");
						//数据填充
						$(".GSJJMCINP").val(datareturn.name);    //基金名称
						$(".GSJJBHINP").val(datareturn.fundno);    //基金编号
						$(".GSJJGLRMCINP").val(datareturn.fundmanager); //基金管理人名称
						$(".GSTGRXM").val(datareturn.custodian);      //托管人姓名
						if(datareturn.qrcode){
							$(".GSGSEWM").attr('src',datareturn.qrcode);   //公示二维码
							$(".GSGSEWM").show();
						}else{
							$(".GSGSEWM").hide();
							$(".GSGSEWM").attr('src',"");
						}
						//设置公示信息保存按钮id为公示id，以便传参
						$(".GSXXSave").attr('id',datareturn.publicityinfoid);
					}else{
						//清空文本框
						$(".GSJJMCINP,.GSJJBHINP,.GSJJGLRMCINP,.GSTGRXM").val("");
						$(".GSGSEWM").attr('src',"");
						$(".GSGSEWM").hide();
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
    //点击上传二维码选中图片
    //在input file内容改变的时候触发事件
	$('.TMinpFile').change(function(){
		//获取input file的files文件数组;
		//$('#filed')获取的是jQuery对象，.get(0)转为原生对象;
		//这边默认只能选一个，但是存放形式仍然是数组，所以取第一个元素使用[0];
		var file = $('.TMinpFile').get(0).files[0];
		//创建用来读取此文件的对象
		var reader = new FileReader();
		//使用该对象读取file文件
		reader.readAsDataURL(file);
		//读取文件成功后执行的方法函数
		reader.onload=function(e){
		    //读取成功后返回的一个参数e，整个的一个进度事件
		    //console.log(e);
		    //选择所要显示图片的img，要赋值给img的src就是e中target下result里面的base64编码格式的地址
		    //$('.GSGSEWM').get(0).src = e.target.result;
		    //上传图片到后台接口
		    var fileObj = document.getElementById("fileField").files[0]; // js 获取文件对象
			if(fileObj){
				var form = new FormData();
				form.append("file", fileObj);
				$.ajax({      
					url: CTX_PATHNG+"fileUpload/file",
				    type:'POST',
				    cache:true,
				    data:form,
					enctype: "multipart/form-data",
					processData:  false,
					contentType:  false,
					success:function (res){
						//console.log(res);
						if(res.code == 0){
							$('.GSGSEWM').attr("src",res.data[0].url);
							$(".GSGSEWM").show();
						}else{
							alert(res.message);
						}   
					},
					error:function(){
                        alert("网络错误！");
					}  
				}); 
			}   
		}
	});
	//点击公示信息保存按钮
	$(".GSXXSave").click(function(){
		$.ajax({
		    async: true,
		    type:'POST',
			url:CTX_PATHNG+'admin/product/edit/publicity',
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data: {
				createdby: sessionStorage.getItem("LCSID"),
				ownerid: sessionStorage.getItem("LCSID"),
				owningbusinessunit: sessionStorage.getItem("LCSBMID"),
				modifiedby: sessionStorage.getItem("LCSID"),		//当前用户id
				product: currentProductId,                          //产品id
				publicityinfoid: $(".GSXXSave").attr('id'),		    //公示id
				name: $(".GSJJMCINP").val(),		                //基金名称
				fundno: $(".GSJJBHINP").val(),		                //基金编号
				fundmanager: $(".GSJJGLRMCINP").val(),	        	//基金管理人名称
				custodian: $(".GSTGRXM").val(),		                //托管人名称
				qrcode:	$(".GSGSEWM").attr('src')	                //二维码
			},
		    success:function(result){
		    	//console.log(result);
		    	if(result.code == 0){
		    		alert("保存成功！");
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
		})    
	});
    
    //附件上传拉取附件信息函数
    //定义一个数组及对象保存产品详情最外层上传附件参数
    var FJArry = [];
    var FJObj = {};
    function GetFJfiler(FJproductid){
    	var URLseletFJ = "";
    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
    	if(TorF){
    		URLseletFJ = CTX_PATHNG+"admin/product/edit/download/more";
    	}else{
    		URLseletFJ = CTX_PATHNG+"admin/product/index/download/more";
    	}
    	$.ajax({
		    async: true,
		    type:'get',
			url: URLseletFJ,
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data: {
				productinformationid: FJproductid,    //产品id
				category: "206290000"
			},
		    success:function(result){
		    	//console.log(result);
		    	if(result.code == 0){
		    		//清空数组
		    		FJArry = [];
		    		var datareturnList = result.data.attachments;
		    		//有历史文件
		    		if(datareturnList && datareturnList.length > 0){
			    		$.each(datareturnList, function(index,obj) {
			    			FJObj = {};
			    			FJObj.attachmentid = obj.attachmentid;
			    			FJObj.name = obj.name;
			    			FJObj.url = obj.url;
			    			FJObj.openToCFP = obj.openToCFP;
			    			FJObj.openToCustomer = obj.openToCustomer;
			    			FJArry.push(FJObj);
			    		});
			    		//调用函数生成历史附件列表
			    		HistoryFJtable(FJArry);
		    		}else{
		    			HistoryFJtable(FJArry);
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
		})
    }
    //历史附件表格生成函数
    function HistoryFJtable(NumArry){
    	//console.log(NumArry);
    	var $tableLSFJ; 
		$tableLSFJ = $('.FJViewTable').bootstrapTable({
			data: NumArry,
			striped: false, //隔行变色
	        idField: "url", //标识哪个字段为id主键  
			showToggle: false,
			clickToSelect: false, //设置 true 将在点击行时，自动选择 rediobox 和 checkbox
			columns: [
			{
				field: 'attachmentid', //附件唯一id
				visible:false
			},{
				title:"序号",
				field:"MyOrder",
				align:"center",
				valign:"middle",
				formatter: function(value, row, index){
					return index+1;
				}
			},{
				field: 'url', //附件url
				visible:false
			},{
				field: "name",
				title: "附件名称",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var dMark = '<a href="'+row.url+'" target="_blank" style="color:#4A8BC2;cursor:pointer">'+value+'</a>';
					return dMark;
				}
			},{
				field: "openToCFP",
				title: "对理财师开放",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					if(value){
						return '<input class="FJstatu" type="checkbox" checked="checked" />';
					}else{
						return '<input class="FJstatu" type="checkbox" />';
					}
				}
			},{
				field: "openToCustomer",
				title: "对会员开放",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					if(value){
						return '<input class="FJstatu" type="checkbox" checked="checked" />';
					}else{
						return '<input class="FJstatu" type="checkbox" />';
					}
				}
			},{
				title: "操作",
				align: "center",
				valign: "middle",
				formatter: function(value, row, index){
					var drow = '<i class="FJremove" id="'+row.attachmentid+'" data_id="'+row.url+'" style="color:#4A8BC2;cursor:pointer">删除</i>';
					return drow;
				}
			}],
			locale: 'zh-CN', //中文支持
	        //单击某一格(这里指对点击操作列里面的对理财师开放)
	        onClickCell: function(field, value, row, $element){
	        	//根据用户权限状态以及产品状态来控制是否能点击改变
	        	if(field == "openToCFP" && TorF && StopTorF == false){
	    			//将复选框的值赋值给数组对应数据值(是否对理财师开放)
	    			FJArry[$element.context.parentElement.dataset.index].openToCFP = $element.context.childNodes[0].checked;	
	        	}else if(field == "openToCustomer" && TorF && StopTorF == false){
	        		//将复选框的值赋值给数组对应数据值(是否对会员开放)
	    			FJArry[$element.context.parentElement.dataset.index].openToCustomer = $element.context.childNodes[0].checked;
	        	}else{
	        		return false;
	        	}
	        },
			formatLoadingMessage: function () {  
			    return "请稍等，正在加载中...";  
			},  
			formatNoMatches: function() {
				return "无符合条件的记录";
			},
			onLoadError: function (data) {  
			    $('.FJViewTable').bootstrapTable('removeAll');  
			}
	    });  
    }
    //当用户没有编辑权限时,设置复选框为不可点
	$(".FJViewTable").on('click','.FJstatu',function(){
    	if(TorF == false || StopTorF == true){
    		return false;
    	}
    });
    //点击附件模块上历史附件删除函数
    $(".FJViewTable").on('click','.FJremove',function(){
    	if(TorF && StopTorF == false){
    		onRemove($(this).attr('id'),$(this).attr('data_id'));
    	}
    });
    //删除历史附件函数
	function onRemove(Theattachmentid,Theattachmentdataid){
    	$('.FJViewTable').bootstrapTable('remove',{
    		field: "url",
    		values: [Theattachmentdataid]
    	});
        $.each(FJArry,function(index,obj){
			if(Theattachmentdataid == obj.url){
			    FJArry.splice(index,1);
			    return false;
		    }
		});
		//console.log(FJArry);
    }	
		
    //附件上传点击保存
    $(".FJSCSave").click(function(){
    	//console.log(FJArry);
    	//if(FJArry.length <= 0){
    	//	alert("暂未有需要保存的数据!");
    	//}else{
    		var URLseletFJSV = "";
	    	//判断用户是否具有编辑权限，对应调用不同的URL(这两个接口里面字段内容都一样，配合后台防止权限逻辑错误)
	    	if(TorF){
	    		URLseletFJSV = CTX_PATHNG+"admin/product/edit/download";
	    	}else{
	    		URLseletFJSV = CTX_PATHNG+"admin/product/new/download";
	    	}
	    	$.ajax({
			    async: true,
			    type:'POST',
				url: URLseletFJSV,
				contentType:'application/json;charset=UTF-8',
				dataType: "JSON",
				traditional:true,
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:JSON.stringify({
					createdby: sessionStorage.getItem("LCSID"),             //当前用户id
					modifiedby: sessionStorage.getItem("LCSID"),            //当前用户id
					ownerid: sessionStorage.getItem("LCSID"),               //当前用户id
					owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id		
					product: currentProductId,                              //产品id
					category: "206290000",                                  //附件分类>>产品资料：206290000；公告资料：206290001
					attachments: FJArry
				}),
			    success:function(result){
			    	//console.log(result);
			    	if(result.code == 0){
			    		GetFJfiler(currentProductId);
			    		$("#FJinputfile").fileinput('refresh');
			    		alert("保存成功！");
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
			})
    	//}	
    });
    //bootstrap-fileinput附件上传demo(产品详情最外层附件上传模块)
    $("#FJinputfile").fileinput({
        uploadUrl: CTX_PATHNG+"file/upload",
        language: 'zh',
        allowedFileExtensions: ['pdf','docx','doc','xls','xlsx','png','jpg','ppt','pptx'], //选择文件类型
        overwriteInitial: false,
        dropZoneEnabled: true, //是否显示拖拽区域
        showRemove: true, //显示移除按钮
        showPreview: true, //是否显示预览
        showCaption: true,//是否显示文件标题，默认为true
        minFileCount: 0, //每次上传允许的最少文件数。如果设置为0，则表示文件数是可选的。默认为0
        maxFileCount: 5, //每次上传允许的最大文件数。如果设置为0，则表示允许的文件数是无限制的。默认为0 
        uploadAsync: true, //默认为true异步
        browseClass: "btn btn-primary", //按钮样式
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 200,//图片的最大宽度
        //maxImageHeight: 200,//图片的最大高度
        maxFileSize: 10240,//单位为kb，如果为0表示不限制文件大小,这里暂时限制大小为10M
        removeFromPreviewOnError:true, //当文件不符合规则，就不显示预览
        enctype:'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
//      uploadExtraData:function (previewId, index) { 
//      	var data = {
//              employeeCode: employeeCode,
//              result_id: resultId
//          };
//          return data;
//      }
    });	
    //选中文件自动上传
    $("#FJinputfile").on("filebatchselected", function (event, data, previewId, index) {
    	//$(this).fileinput("upload");
    });
    //异步上传成功结果处理
    $("#FJinputfile").on("fileuploaded", function (event, data, previewId, index) {
    	//console.log(data);
    	if(data.response.code == 0){
    		var returnList = data.response.data[0];
    		FJObj = {};
			FJObj.attachmentid = returnList.attachmentid;
			FJObj.name = returnList.name;
			FJObj.url = returnList.url;
			FJObj.openToCFP = false;
	        FJObj.openToCustomer = false;
			FJArry.push(FJObj);	
			//销毁附件上传历史附件表格
            $(".FJViewTable").bootstrapTable('destroy');
            //表格再次生成
            HistoryFJtable(FJArry);
    	}else{
    		alert(data.response.message);
    	}
    });
    //异步上传错误结果处理
    $('#FJinputfile').on('fileerror', function(event, data, msg) {
        alert(msg);
    });
    
    //定义一个数组，保存存续期限选中月份
    var monthArry=[];
    //定义一个对象，用来保存编辑提交时的data参数
	var editorParama = {};
    //常规信息存续期限的月份点击
    $(".monthDot").unbind('click').click(function(){
    	if(TorF && PTorF && StopTorF == false){ //存在修改权限
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
			case '停用':
				CYZTType = "206299999";
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
				productinformationid:currentProductId,                             //产品id
				//常规信息字段
				name: $(".ProductNameInp").val(),                                  //产品名称
				ownerid: $(".ProductMangerInp").val(),                             //产品经理
				sumamount: dealNumberFX($(".MJGMInp").val()),                      //募集规模
				sumamountcapitals: $(".MJGMInpZs").val(),                          //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInp").val()),               //公共池 
				assignmenttype: FenPeiType,                                        //分配类型
				producttype: $(".ProductTypeInp").val(),                           //产品类型
				productstate: CYZTType,                                            //产品状态		
				fee1: $(".HostOutCostInp").val(),                                  //托管外包费%
				managementexpense: $(".ManagerFeeInp").val(),                      //管理费%
				duedate: $(".TheCreatTime").val(),                                 //成立时间
				durationtext: monthArry,                                           //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInp").val()),    //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZs").val(),         //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInp").val()),        //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZs").val(),             //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInp").val()),                         //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInp").val()),               //已分配额度
				limitper: $(".EDJDTInp").val(),                                    //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInp").val()),                  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInp").val()),                 //已预约额度
				subper: $(".YYZJDTInp").val(),                                     //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInp").val()),        //已成立额度			
				transactioncurrencyid: MoneyType,                                  //货币
				prescription: $(".YYSXInp").val(),                                 //预约时效（H）
				vipquota: $(".VIPQuotaInp").val(),                                 //vip额度
				//详细信息字段
				account1: $(".GDTGZHInp").val(),                                   //托管账户
				underlyingtype: $(".GDJCZCLXInp").val(),                           //基础资产类型
				transferor: $(".GDZRFInp").val(),                                  //转让方
				//proceedsuse: $(".GDZJYTInp").val(),                              //资金用途
				transferconsultant: $(".GDZRGWInp").val(),                         //转让顾问
				participationexit: editor14.txt.text(),                            //参与退出
				incomedistribution: editor15.txt.text(),                           //收益分配方式
				investmentscope: editor16.txt.text(),                              //投资范围
				fee2: $(".GDFHInp").val(),                                         //分红
				sourceguaranteerepayment: editor17.txt.text(),                     //还款来源及保障
				projectintroduction: editor18.txt.text(),                          //项目方介绍
				financingintroduction: editor19.txt.text(),                        //融资方介绍
				other: editor21.txt.text(),                                        //其他
				trustmeasures: editor20.txt.text(),                                //增信措施
				riskwarning: editor22.txt.text(),                                  //风险提示
				producthighlights: editor23.txt.text(),                            //产品亮点
			    riskcontrol: editor24.txt.text(),                                  //风险控制
			    proceedsuse: editor46.txt.text()                                   //资金用途
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
	    //调用接口保存数据
	    $.ajax({
		    async: true,
		    type:'POST',
			url:CTX_PATHNG+'admin/product/edit',
			traditional :true,  //数组形式传参该参数是必须的
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data: editorParama,
		    success:function(result){
		    	//console.log(result);
		    	if(result.code == 0){
		    		//刷新产品列表表格
		    		$('#reportTable').bootstrapTable('refresh');
		    		alert("保存成功！");
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
		})    
    });
    
    //监听募集规模输入框
    LisingValUp("MJGMInp",'MJGMInpZs');
    //监听最低认购金额输入框
    LisingValUp("ZDRGJEInp",'ZDRGJEInpZs');
    //监听追加起点输入框
    LisingValUp("ZJQDInp",'ZJQDInpZs');

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
    
    //点击提交/激活
    $(".ProductSubmit").click(function(){
    	if($(".ProductSubmit").html() == "提交"){
    		$.ajax({
	      	    async: true,
				type:'get',
				url:CTX_PATHNG+"admin/product/edit/submit",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    productinformationid: currentProductId
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						alert("提交成功!");
						//刷新表格
						$('#reportTable').bootstrapTable('refresh');  
						//关闭产品详情弹窗
						$(".productDetailWrapper").hide({duration: 500});
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
    	}else{
    		$.ajax({
	      	    async: true,
				type:'get',
				url:CTX_PATHNG+"admin/product/edit/activate",
				headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
				data:{
				    productinformationid: currentProductId
			    },
				success:function(result){
					//console.log(result);
					if(result.code == "0"){
						alert("激活成功!");
						//刷新表格
						$('#reportTable').bootstrapTable('refresh');  
						//关闭产品详情弹窗
						$(".productDetailWrapper").hide({duration: 500});
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
    var editor46 = new E('#GEdiTorZJYTL1','#GEdiTorZJYTL2');
    var editorObjArry = [editor1,editor2,editor3,editor4,editor5,editor6,editor7,editor8,editor9,editor10,editor11,editor12,editor13,editor14,editor15,editor16,editor17,editor18,editor19,editor20,editor21,editor22,editor23,editor24,
    editor25,editor26,editor27,editor28,editor29,editor30,editor31,editor32,editor33,editor34,editor35,editor36,editor37,editor38,editor39,editor40,editor41,editor42,editor43,editor44,editor45,editor46];
    //再定义一个数组保存控制后五类(风险提示、产品亮点、还款来源、风险控制、资金用途)富文本编辑器的可编辑性
    var editorObjFiveArry = [editor11,editor12,editor13,editor4,editor5,editor22,editor23,editor24,editor17,editor46,editor33,editor34,editor28,editor35,editor36,editor42,editor3,editor44,editor41,editor45];
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
	    //生成
        item.create();
        //初始化编辑器内容为空
        item.txt.text('');
    });
    
    //实例化产品公告wangEditor对象(新增)
    var ECPGG = window.wangEditor;
	var editorCPA = new ECPGG('#CPGGEdiTorS1','#CPGGEdiTorS2');
	var editorCPADDArry = [editorCPA];
	$.each(editorCPADDArry, function(index,item) {
    	// 自定义菜单配置
      	item.customConfig.menus = [
    	      'head',           // 标题
              'bold',           // 粗体
	          'fontSize',       // 字号
	          'fontName',       // 字体
              'italic',         // 斜体
	          'underline',      // 下划线
	          'strikeThrough',  // 删除线
	          'foreColor',      // 文字颜色
	        //'backColor',      // 背景颜色
	          'link',           // 插入链接
	        //'list',           // 列表
	          'justify',        // 对齐方式
            //'quote',          // 引用
	        //'emoticon',       // 表情
	          'image',          // 插入图片
            //'table',          // 表格
            //'video',          // 插入视频
	        //'code',           // 插入代码
	          'undo',           // 撤销
	          'redo'            // 重复
    	];
	    //生成
        item.create();
        //初始化编辑器内容为空
        item.txt.text('');
    });
    
    //实例化产品公告wangEditor对象(编辑)
    var ECPGGWrite = window.wangEditor;
	var editorCPW = new ECPGGWrite('#CPGGWritEdiTorS1','#CPGGWritEdiTorS2');
	var editorCPWriteArry = [editorCPW];
	$.each(editorCPWriteArry, function(index,item) {
    	// 自定义菜单配置
      	item.customConfig.menus = [
    	      'head',           // 标题
              'bold',           // 粗体
	          'fontSize',       // 字号
	          'fontName',       // 字体
              'italic',         // 斜体
	          'underline',      // 下划线
	          'strikeThrough',  // 删除线
	          'foreColor',      // 文字颜色
	        //'backColor',      // 背景颜色
	          'link',           // 插入链接
	        //'list',           // 列表
	          'justify',        // 对齐方式
            //'quote',          // 引用
	        //'emoticon',       // 表情
	          'image',          // 插入图片
            //'table',          // 表格
            //'video',          // 插入视频
	        //'code',           // 插入代码
	          'undo',           // 撤销
	          'redo'            // 重复
    	];
	    //生成
        item.create();
        //初始化编辑器内容为空
        item.txt.text('');
    });
    
    /*-------------------------------------------------新建产品部分代码逻辑-------------------------------------*/
    //显示产品经理栏名字
    $(".ProductMangerInpADD").val(sessionStorage.getItem("LCSNAME"));
    //点击页面新建产品
    $(".XJCSBUTEN").click(function(){
    	$(".AddProductWrapper").show({duration: 500});
    });
    //点击关闭新建产品弹窗
    $(".AddTitle .close").click(function(){
    	$(".AddProductWrapper").hide({duration: 500});
    });
    //进入页面判断产品类型
    switch ($('.ProductTypeInpADD').val()){
    	case "206290000":  //(FOF产品)
		    $(".FOFcontentWrapADD").css("display","block"); 
		    $(".GDSYcontentWrapADD,.PPPcontentWrapADD,.PEcontentWrapADD").css("display","none");	
		    AddProductName = "FOF";  //保存当前模块产品类型
		    break;
		case "206290002":  //(OTC产品)
		    $(".GDSYcontentWrapADD").css("display","block");
		    $(".PPPcontentWrapADD,.FOFcontentWrapADD,.PEcontentWrapADD").css("display","none");
		    AddProductName = "OTC";  //保存当前模块产品类型
		    break;
		case "206290001":  //(PPP产品)
		    $(".PPPcontentWrapADD").css("display","block");
			$(".GDSYcontentWrapADD,.FOFcontentWrapADD,.PEcontentWrapADD").css("display","none");
		    AddProductName = "PPP";  //保存当前模块产品类型
		    break;
		case "206290003":  //(PE股权产品)
		    $(".PEcontentWrapADD").css("display","block");
			$(".PPPcontentWrapADD,.FOFcontentWrapADD,.GDSYcontentWrapADD").css("display","none");
		    AddProductName = "PE";  //保存当前模块产品类型
		    break;
		default:
		    $(".FOFcontentWrapADD,.GDSYcontentWrapADD,.PPPcontentWrapADD,.PEcontentWrapADD").css("display","none");
    }
    //监听常规信息模块产品类型下拉框的变化，控制详细信息相应模块的展示与隐藏
    $('.ProductTypeInpADD').change(function(){
        switch ($(this).val()){
        	case "206290000":  //(FOF产品)
			    $(".FOFcontentWrapADD").css("display","block"); 
			    $(".GDSYcontentWrapADD,.PPPcontentWrapADD,.PEcontentWrapADD").css("display","none");	
			    AddProductName = "FOF";  //保存当前模块产品类型
			    break;
			case "206290002":  //(OTC产品)
			    $(".GDSYcontentWrapADD").css("display","block");
			    $(".PPPcontentWrapADD,.FOFcontentWrapADD,.PEcontentWrapADD").css("display","none");
			    AddProductName = "OTC";  //保存当前模块产品类型
			    break;
			case "206290001":  //(PPP产品)
			    $(".PPPcontentWrapADD").css("display","block");
				$(".GDSYcontentWrapADD,.FOFcontentWrapADD,.PEcontentWrapADD").css("display","none");
			    AddProductName = "PPP";  //保存当前模块产品类型
			    break;
			case "206290003":  //(PE股权产品)
			    $(".PEcontentWrapADD").css("display","block");
				$(".PPPcontentWrapADD,.FOFcontentWrapADD,.GDSYcontentWrapADD").css("display","none");
			    AddProductName = "PE";  //保存当前模块产品类型
			    break;
			default:
		        $(".FOFcontentWrapADD,.GDSYcontentWrapADD,.PPPcontentWrapADD,.PEcontentWrapADD").css("display","none");
        }
    });
    //定义一个数组，保存存续期限选中月份
    var monthArryADD=[];
    //定义一个对象，用来保存新建产品保存时的data参数
	var editorParamaADD = {};
    //常规信息存续期限的月份点击
    $(".monthDotADD").unbind('click').click(function(){
    	if(TorF){ //存在修改权限
    	    if($(this).hasClass('monMaked')){
    	    	$(this).removeClass('monMaked');
    	    }else{
    	    	$(this).addClass('monMaked');
    	    }
        }else{
        	return false;
        }
    });
    //点击------产品新建保存------时，获取页面对应模块(常规、详细信息模块)相关信息，调用接口上传数据
    $(".ProductSubmitADD").click(function(){
    	//币种传值变量
    	var MoneyTypeADD = "";
    	if($(".CurrencyInpADD").val() == "人民币"){
			MoneyTypeADD = "64DF3650-D733-E711-80B9-549F350F546D";
		}else{
			MoneyTypeADD = $(".CurrencyInpADD").val();
		}
		//产品结构详情传值变量
		var CYJGXQValADD = "";
		if($(".CPJGslectADD").children('option:selected').val() == 930820000){
			CYJGXQValADD = $(".PGCPJGXQInpADD").val();
		}else{
			CYJGXQValADD = "";
		}
		//跟投详情传值变量
		var GTXQValADD = "";
		if($(".SFGTslectADD").children('option:selected').val() == 930820000){
			GTXQValADD = $(".PGGTXQInpADD").val();
		}else{
			GTXQValADD = "";
		}
		//初始化参数
    	monthArryADD=[];
    	editorParamaADD = {};
	    $(".monthDotADD").each(function(){
	    	if($(this).hasClass('monMaked')){
	    		monthArryADD.push($(this).attr('id').substring(6));
	    	}
	    });
	    //校验
    	if($(".ProductNameInpADD").val() == ""){
    		alert("产品名称不能为空!");
    		return false;
    	}else if($(".MJGMInpADD").val() == ""){
    		alert("必须提供募集规模的值!");
    		return false;
    	}else if($(".YYSXInpADD").val() == ""){
    		alert("预约时效不能为空!");
    		return false;
    	}else if(monthArryADD.length <= 0){
    		alert("请至少选一个续存期限!");
    		return false;
    	}
	    if(AddProductName == "FOF"){  //FOF类
			editorParamaADD = {
				createdby: sessionStorage.getItem("LCSID"),    //当前创建产品的用户id
				modifiedby: sessionStorage.getItem("LCSID"),   //当前用户id
				owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id
				//常规信息字段
				name: $(".ProductNameInpADD").val(),  //产品名称
				ownerid: sessionStorage.getItem("LCSID"),  //产品经理
				sumamount: dealNumberFX($(".MJGMInpADD").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZsADD").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInpADD").val()), //公共池 
				assignmenttype: "930820001",  //分配类型--这里默认为"统打类型"
				producttype: $(".ProductTypeInpADD").val(),  //产品类型
				productstate: "206290000",  //产品状态--这里默认为未提交		
				fee1: $(".HostOutCostInpADD").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInpADD").val(),  //管理费%
				duedate: $(".TheCreatTimeADD").val(),  //成立时间
				durationtext: monthArryADD,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInpADD").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZsADD").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInpADD").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZsADD").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInpADD").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInpADD").val()),  //已分配额度
				limitper: $(".EDJDTInpADD").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInpADD").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInpADD").val()),  //已预约额度
				subper: $(".YYZJDTInpADD").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInpADD").val()),  //已成立额度			
				transactioncurrencyid: MoneyTypeADD,  //货币
				prescription: $(".YYSXInpADD").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInpADD").val(),  //vip额度
				//详细信息字段
				investmenttype: $(".TZLXslectADD").val(),  //投资类型
				filingcode: $(".FOFBABMInpADD").val(),  //备案编码
				fofproducttype: $(".CPLXslectADD").val(),  //产品类型
				managementteam: $(".FOFGLTDInpADD").val(),  //管理团队
				fundmanager: $(".FOFJJGLRInpADD").val(),  //基金管理人
				custodian: $(".FOFJJTGRInpADD").val(),  //基金托管人
				invest_advisor: $(".FOFTZGWInpADD").val(),  //投资顾问
				securitiesbroker: $(".FOFZQJJSInpADD").val(),  //证券经纪商
				futuresbroker: $(".FOFQHJJSInpADD").val(),  //期货经纪商
				managementfeerate: $(".FOFGLRGLFLInpADD").val(),  //管理人管理费率
				payback1: $(".FOFYJBCInpADD").val(),  //业绩报酬（%）
				fofnetworthannouncement: editorADD1.txt.text(),  //净值公布
				fofadministrativeorganization: $(".FOFGLJGInpADD").val(),  //管理机构
				fofinvestmentscope: editorADD2.txt.text(),  //投资范围
				fofparticipationexit: editorADD3.txt.text(),  //参与退出
				fofproducthighlights: editorADD4.txt.text(),  //产品亮点
				fofriskmeasures: editorADD5.txt.text(),  //风险措施
				foffundmanager: $(".FOFJJJLInpADD").val(),  //基金经理
				opendate: $(".FOFKFRInpADD").val(),  //开放日
				enddate: $(".FOFFBQInpADD").val(),  //封闭期
				subscriptionfee: $(".FOFRGFLInpADD").val(),  //认购费率（%）
				redemptionrate: $(".FOFSHFLInpADD").val(),  //赎回费率（%）
				warningline: $(".FOFYJXInpADD").val(),  //预警线（%）
				stopline: $(".FOFZSXInpADD").val(),  //止损线（%）
				fee3: $(".FOFTGFInpADD").val(),  //托管费（%）
				fee4: $(".FOFXZGLFInpADD").val(),  //行政管理费（%）
				establishmentdate: $(".FOFCLRQInpADD").val(),  //成立日期
				umbrellatype: $(".SFSXslectADD").val(),  //是否伞型
				whetherclassification: $(".SFFJslectADD").val(),  //是否分级
				foftrusteeshipbody: $(".FOFTGJJInpADD").val(),  //托管机构
				foffundcost: $(".FOFJJFYInpADD").val(),  //基金费用
				fofinvestmenttarget: editorADD6.txt.text(),  //投资目标
				fofinvestmentstrategy: editorADD7.txt.text(),  //投资策略
				fofqualifiedinvestors: editorADD8.txt.text(),  //合格投资者
				foftargetaccount: editorADD9.txt.text(),  //目标开户
				fofremarks: editorADD10.txt.text(),  //备注
				riskwarning: editorADD11.txt.text(),  //风险提示
				sourceguaranteerepayment: editorADD12.txt.text(),  //还款来源
				proceedsuse: editorADD13.txt.text()  //资金用途			
			}
		}else if(AddProductName == "PPP"){  //PPP类
			editorParamaADD = {
				createdby: sessionStorage.getItem("LCSID"),    //当前创建产品的用户id
				modifiedby: sessionStorage.getItem("LCSID"),   //当前用户id
				owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id
				//常规信息字段
				name: $(".ProductNameInpADD").val(),  //产品名称
				ownerid: sessionStorage.getItem("LCSID"),  //产品经理
				sumamount: dealNumberFX($(".MJGMInpADD").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZsADD").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInpADD").val()), //公共池 
				assignmenttype:  "930820001",  //分配类型--这里默认为"统打类型"
				producttype: $(".ProductTypeInpADD").val(),  //产品类型
				productstate: "206290000",  //产品状态--这里默认为未提交
				fee1: $(".HostOutCostInpADD").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInpADD").val(),  //管理费%
				duedate: $(".TheCreatTimeADD").val(),  //成立时间
				durationtext: monthArryADD,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInpADD").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZsADD").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInpADD").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZsADD").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInpADD").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInpADD").val()),  //已分配额度
				limitper: $(".EDJDTInpADD").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInpADD").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInpADD").val()),  //已预约额度
				subper: $(".YYZJDTInpADD").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInpADD").val()),  //已成立额度			
				transactioncurrencyid: MoneyTypeADD,  //货币
				prescription: $(".YYSXInpADD").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInpADD").val(),  //vip额度
				//详细信息字段
				trustee: $(".PTGJGInpADD").val(),  //托管机构
				administrativeorganization: $(".PJGGLInpADD").val(),  //管理机构
				account1: $(".PTGZHInpADD").val(),  //托管账户
				fundmanagementfee: $(".PJJGLFInpADD").val(),  //基金管理费
				fee2: $(".PFHInpADD").val(),  //分红
				participationexit: editorADD25.txt.text(),  //参与退出
				incomedistribution: editorADD26.txt.text(),  //收益分配方式
				investmentscope: editorADD27.txt.text(),  //投资范围
				sourceguaranteerepayment: editorADD28.txt.text(),  //还款来源及保障
				projectintroduction: editorADD29.txt.text(),  //项目方介绍
				financingintroduction: editorADD30.txt.text(),  //融资方介绍
				other: editorADD32.txt.text(),  //其他
				trustmeasures: editorADD31.txt.text(),  //增信措施
				riskwarning: editorADD33.txt.text(),  //风险提示
				producthighlights: editorADD34.txt.text(),  //产品亮点
				riskcontrol: editorADD35.txt.text(),  //风险控制
				proceedsuse: editorADD36.txt.text()  //资金用途
			}
		}else if(AddProductName == "OTC"){  //OTC类
			editorParamaADD = {
				createdby: sessionStorage.getItem("LCSID"),    //当前创建产品的用户id
				modifiedby: sessionStorage.getItem("LCSID"),   //当前用户id
				owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id
				//常规信息字段
				name: $(".ProductNameInpADD").val(),                                  //产品名称
				ownerid: sessionStorage.getItem("LCSID"),                          //产品经理
				sumamount: dealNumberFX($(".MJGMInpADD").val()),                      //募集规模
				sumamountcapitals: $(".MJGMInpZsADD").val(),                          //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInpADD").val()),               //公共池 
				assignmenttype:  "930820001",                                      //分配类型
				producttype: $(".ProductTypeInpADD").val(),                           //产品类型
				productstate: "206290000",                                         //产品状态--这里默认为未提交		
				fee1: $(".HostOutCostInpADD").val(),                                  //托管外包费%
				managementexpense: $(".ManagerFeeInpADD").val(),                      //管理费%
				duedate: $(".TheCreatTimeADD").val(),                                 //成立时间
				durationtext: monthArryADD,                                           //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInpADD").val()),    //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZsADD").val(),         //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInpADD").val()),        //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZsADD").val(),             //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInpADD").val()),                         //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInpADD").val()),               //已分配额度
				limitper: $(".EDJDTInpADD").val(),                                    //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInpADD").val()),                  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInpADD").val()),                 //已预约额度
				subper: $(".YYZJDTInpADD").val(),                                     //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInpADD").val()),        //已成立额度			
				transactioncurrencyid: MoneyTypeADD,                                  //货币
				prescription: $(".YYSXInpADD").val(),                                 //预约时效（H）
				vipquota: $(".VIPQuotaInpADD").val(),                                 //vip额度
				//详细信息字段
				account1: $(".GDTGZHInpADD").val(),                                   //托管账户
				underlyingtype: $(".GDJCZCLXInpADD").val(),                           //基础资产类型
				transferor: $(".GDZRFInpADD").val(),                                  //转让方
				//proceedsuse: $(".GDZJYTInpADD").val(),                              //资金用途
				transferconsultant: $(".GDZRGWInpADD").val(),                         //转让顾问
				participationexit: editorADD14.txt.text(),                            //参与退出
				incomedistribution: editorADD15.txt.text(),                           //收益分配方式
				investmentscope: editorADD16.txt.text(),                              //投资范围
				fee2: $(".GDFHInpADD").val(),                                         //分红
				sourceguaranteerepayment: editorADD17.txt.text(),                     //还款来源及保障
				projectintroduction: editorADD18.txt.text(),                          //项目方介绍
				financingintroduction: editorADD19.txt.text(),                        //融资方介绍
				other: editorADD21.txt.text(),                                        //其他
				trustmeasures: editorADD20.txt.text(),                                //增信措施
				riskwarning: editorADD22.txt.text(),                                  //风险提示
				producthighlights: editorADD23.txt.text(),                            //产品亮点
			    riskcontrol: editorADD24.txt.text(),                                  //风险控制
			    proceedsuse: editorADD46.txt.text()                                   //资金用途
			}
		}else{  //PE类
			editorParamaADD = {
				createdby: sessionStorage.getItem("LCSID"),    //当前创建产品的用户id
				modifiedby: sessionStorage.getItem("LCSID"),   //当前用户id
				owningbusinessunit: sessionStorage.getItem("LCSBMID"),  //当前用户所属部门id
				//常规信息字段
				name: $(".ProductNameInpADD").val(),  //产品名称
				ownerid: sessionStorage.getItem("LCSID"),  //产品经理
				sumamount: dealNumberFX($(".MJGMInpADD").val()),  //募集规模
				sumamountcapitals: $(".MJGMInpZsADD").val(),  //募集规模(大写)
				commonpool: dealNumberFX($(".PublicPoolInpADD").val()), //公共池 
				assignmenttype:  "930820001",  //分配类型--这里默认为"统打类型"
				producttype: $(".ProductTypeInpADD").val(),  //产品类型
				productstate: "206290000",  //产品状态--这里默认为未提交				
				fee1: $(".HostOutCostInpADD").val(),  //托管外包费%
				managementexpense: $(".ManagerFeeInpADD").val(),  //管理费%
				duedate: $(".TheCreatTimeADD").val(),  //成立时间
				durationtext: monthArryADD,  //存续期限
				subscriptionstartingpoint: dealNumberFX($(".ZDRGJEInpADD").val()),  //最低认购金额
				subscriptionstartingpointcapital: $(".ZDRGJEInpZsADD").val(),  //最低认购金额(大写)
				additionalstartingpoint: dealNumberFX($(".ZJQDInpADD").val()),  //追加起点
				additionalstartingpointcapital: $(".ZJQDInpZsADD").val(),  //追加起点(大写)
				limit: dealNumberFX($(".KFPEDInpADD").val()),  //可分配额度
				allocatedamount: dealNumberFX($(".YFPEDInpADD").val()),  //已分配额度
				limitper: $(".EDJDTInpADD").val(),  //额度进度条
				reservelimit: dealNumberFX($(".KYYEDInpADD").val()),  //可预约额度
				reservedquota: dealNumberFX($(".YYYEDInpADD").val()),  //已预约额度
				subper: $(".YYZJDTInpADD").val(),  //预约总进度条
				establishedquota: dealNumberFX($(".EstablishedInpADD").val()),  //已成立额度			
				transactioncurrencyid: MoneyTypeADD,  //货币
				prescription: $(".YYSXInpADD").val(),  //预约时效（H）
				vipquota: $(".VIPQuotaInpADD").val(),  //vip额度
				//详细信息字段
				perecruitment: $(".PGMJQInpADD").val(),  //募集期
				pemanagementteam: $(".PGGLTDInpADD").val(),  //管理团队
				pedistributionmode: editorADD37.txt.text(),  //分配方式
				peinvestmentdirection: editorADD38.txt.text(),  //投资方向
				peinformationdis: editorADD39.txt.text(),  //信息披露
				pecustodian: $(".PGJJTGRInpADD").val(),  //基金托管人
				pefundmanager: $(".PGJJGLRInpADD").val(),  //基金管理人
				peproductmix: $(".CPJGslectADD").val(),  //产品结构
				pemixdetails: CYJGXQValADD,  //产品结构详情
				pewhether: $(".SFGTslectADD").val(),  //是否跟投
				pefollowdetails: GTXQValADD,  //跟投详情
				pereserveitem: editorADD40.txt.text(),  //储备项目
				periskcontrol: editorADD41.txt.text(),  //风控措施
				riskwarning: editorADD42.txt.text(),  //风险提示
				producthighlights: editorADD43.txt.text(),  //产品亮点
				sourceguaranteerepayment: editorADD44.txt.text(),  //还款来源
				proceedsuse: editorADD45.txt.text(),  //资金用途
			}
		}
	    //调用接口保存数据
	    $.ajax({
		    async: true,
		    type:'POST',
			url:CTX_PATHNG+'admin/product/new',
			traditional :true,  //数组形式传参该参数是必须的
			headers: {'Authorization': localStorage.getItem("Utoken"),'authToken': sessionStorage.getItem("CRMUtoken")},
			data: editorParamaADD,
		    success:function(result){
		    	//console.log(result);
		    	if(result.code == 0){
		    		alert("新建成功！");
		    		//关闭新建产品弹窗
					$(".AddProductWrapper").hide({duration: 500});
					//刷新产品列表表格
					$('#reportTable').bootstrapTable('refresh');
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
		})    
    });
    
    //监听募集规模输入框
    LisingValUp("MJGMInpADD",'MJGMInpZsADD');
    //监听最低认购金额输入框
    LisingValUp("ZDRGJEInpADD",'ZDRGJEInpZsADD');
    //监听追加起点输入框
    LisingValUp("ZJQDInpADD",'ZJQDInpZsADD');

    //PE股权类产品-产品结构下拉选择-产品结构栏对应显示隐藏功能模块
    $('.CPJGslectADD').change(function(){ 
	    var CPJGslectValADD = $(this).children('option:selected').val(); //这就是selected的值    
	    if(CPJGslectValADD == 930820000){        //组合型
	    	$(".ProductJGXQADD").show();
	    }else if(CPJGslectValADD == 930820001){
	    	$(".ProductJGXQADD").hide();
	    }
	});
	//PE股权类产品-是否跟投下拉选择-跟投详情栏对应显示隐藏功能模块
	$('.SFGTslectADD').change(function(){ 
	    var SFGTslectValADD = $(this).children('option:selected').val(); //这就是selected的值    
	    if(SFGTslectValADD == 930820000){        //组合型
	    	$(".SFGTWrapLiADD").show();
	    }else if(SFGTslectValADD == 930820001 || SFGTslectValADD == 930820002){
	    	$(".SFGTWrapLiADD").hide();
	    }
	});
    
    //进入新增页面初始化wangEditor实例化对象
    var EADD = window.wangEditor;
    var editorADD1 = new EADD('#FEdiTorJZGBADD1','#FEdiTorJZGBADD2');
    var editorADD2 = new EADD('#FEdiTorTZFWADD1','#FEdiTorTZFWADD2');
    var editorADD3 = new EADD('#FEdiTorCYTCADD1','#FEdiTorCYTCADD2');
    var editorADD4 = new EADD('#FEdiTorCPLDADD1','#FEdiTorCPLDADD2');
    var editorADD5 = new EADD('#FEdiTorFXCSADD1','#FEdiTorFXCSADD2');
    var editorADD6 = new EADD('#FEdiTorTZMBADD1','#FEdiTorTZMBADD2');
    var editorADD7 = new EADD('#FEdiTorTZCLADD1','#FEdiTorTZCLADD2');
    var editorADD8 = new EADD('#FEdiTorHGTZZADD1','#FEdiTorHGTZZADD2');
    var editorADD9 = new EADD('#FEdiTorMBKHADD1','#FEdiTorMBKHADD2');
    var editorADD10 = new EADD('#FEdiTorBZADD1','#FEdiTorBZADD2');
    var editorADD11 = new EADD('#FEdiTorFXTSADD1','#FEdiTorFXTSADD2');
    var editorADD12 = new EADD('#FEdiTorHKLYADD1','#FEdiTorHKLYADD2');
    var editorADD13 = new EADD('#FEdiTorZJYTADD1','#FEdiTorZJYTADD2');
    var editorADD14 = new EADD('#GEdiTorCYTCADD1','#GEdiTorCYTCADD2');
    var editorADD15 = new EADD('#GEdiTorSYFPADD1','#GEdiTorSYFPADD2');
    var editorADD16 = new EADD('#GEdiTorTZFWADD1','#GEdiTorTZFWADD2');
    var editorADD17 = new EADD('#GEdiTorHKLYADD1','#GEdiTorHKLYADD2');
    var editorADD18 = new EADD('#GEdiTorXMFJSADD1','#GEdiTorXMFJSADD2');
    var editorADD19 = new EADD('#GEdiTorRZFJSADD1','#GEdiTorRZFJSADD2');
    var editorADD20 = new EADD('#GEdiTorZXCSADD1','#GEdiTorZXCSADD2');
    //var editorADD21 = new EADD('#GEdiTorFHADD1','#GEdiTorFHADD2');
    var editorADD21 = new EADD('#GEdiTorQTADD1','#GEdiTorQTADD2');
    var editorADD22 = new EADD('#GEdiTorFXTSADD1','#GEdiTorFXTSADD2');
    var editorADD23 = new EADD('#GEdiTorCPLDADD1','#GEdiTorCPLDADD2');
    var editorADD24 = new EADD('#GEdiTorFXKZADD1','#GEdiTorFXKZADD2');
    var editorADD25 = new EADD('#PEdiTorCYTCADD1','#PEdiTorCYTCADD2');
    var editorADD26 = new EADD('#PEdiTorSYFPADD1','#PEdiTorSYFPADD2');
    var editorADD27 = new EADD('#PEdiTorTZFWADD1','#PEdiTorTZFWADD2');
    var editorADD28 = new EADD('#PEdiTorHKLYADD1','#PEdiTorHKLYADD2');
    var editorADD29 = new EADD('#PEdiTorXMFJSADD1','#PEdiTorXMFJSADD2');
    var editorADD30 = new EADD('#PEdiTorRZFJSADD1','#PEdiTorRZFJSADD2');
    var editorADD31 = new EADD('#PEdiTorZXCSADD1','#PEdiTorZXCSADD2');
    //var editorADD33 = new EADD('#PEdiTorFHADD1','#PEdiTorFHADD2');
    var editorADD32 = new EADD('#PEdiTorQTADD1','#PEdiTorQTADD2');
    var editorADD33 = new EADD('#PEdiTorFXTSADD1','#PEdiTorFXTSADD2');
    var editorADD34 = new EADD('#PEdiTorCPLDADD1','#PEdiTorCPLDADD2');
    var editorADD35 = new EADD('#PEdiTorFXKZADD1','#PEdiTorFXKZADD2');
    var editorADD36 = new EADD('#PEdiTorZJYTADD1','#PEdiTorZJYTADD2');
    var editorADD37 = new EADD('#PGEdiTorFPFSADD1','#PGEdiTorFPFSADD2');
    var editorADD38 = new EADD('#PGEdiTorTZFXADD1','#PGEdiTorTZFXADD2');
    var editorADD39 = new EADD('#PGEdiTorXXPLADD1','#PGEdiTorXXPLADD2');
    var editorADD40 = new EADD('#PGEdiTorCBXMADD1','#PGEdiTorCBXMADD2');
    var editorADD41 = new EADD('#PGEdiTorFKCSADD1','#PGEdiTorFKCSADD2');
    var editorADD42 = new EADD('#PGEdiTorFXTSADD1','#PGEdiTorFXTSADD2');
    var editorADD43 = new EADD('#PGEdiTorCPLDADD1','#PGEdiTorCPLDADD2');
    var editorADD44 = new EADD('#PGEdiTorHKLYADD1','#PGEdiTorHKLYADD2');
    var editorADD45 = new EADD('#PGEdiTorZJYTADD1','#PGEdiTorZJYTADD2');
    var editorADD46 = new EADD('#GEdiTorZJYTLADD1','#GEdiTorZJYTLADD2');
    var editorObjArryADD = [editorADD1,editorADD2,editorADD3,editorADD4,editorADD5,editorADD6,editorADD7,editorADD8,editorADD9,editorADD10,editorADD11,editorADD12,editorADD13,editorADD14,editorADD15,editorADD16,editorADD17,editorADD18,editorADD19,editorADD20,editorADD21,editorADD22,editorADD23,editorADD24,
    editorADD25,editorADD26,editorADD27,editorADD28,editorADD29,editorADD30,editorADD31,editorADD32,editorADD33,editorADD34,editorADD35,editorADD36,editorADD37,editorADD38,editorADD39,editorADD40,editorADD41,editorADD42,editorADD43,editorADD44,editorADD45,editorADD46];
    $.each(editorObjArryADD, function(index,item) {
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
	    //生成
        item.create();
        //初始化编辑器内容为空
        item.txt.text('');
    });
    
}
