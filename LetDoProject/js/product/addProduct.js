//	console.log(sessionStorage.getItem("CRMUtoken"));
//  console.log(sessionStorage.getItem("LCSNAME"));
//	console.log(sessionStorage.getItem("LCSID"));
//	console.log(sessionStorage.getItem("LCSBMID"));
window.onload = function(){
	//定义变量保存用户新建产品类型
	var AddProductName;
	//定义一个变量，记录用户权限
	var TorF;
	if(sessionStorage.getItem("LCSWrite")){
		TorF = true;
	}else{
		TorF = false;
	}
	//初始化时间插件实例
    $('.TheCreatTimeADD,.PEcretimeADD,.FOFCLRQInpADD').datetimepicker({
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
    //显示产品经理栏名字
    $(".ProductMangerInpADD").val(sessionStorage.getItem("LCSNAME"));
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
    //点击--------------------保存提交------------------时，获取页面对应模块(常规、详细信息模块)相关信息，调用接口上传数据
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
		    	console.log(result);
		    	if(result.code == 0){
		    		alert("新建成功！");
		    		//容器回滚到顶部
					//$('.OutContant').animate({scrollTop: '0px'}, 0);
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
