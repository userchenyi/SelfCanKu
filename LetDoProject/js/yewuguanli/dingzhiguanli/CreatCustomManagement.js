window.onload = function(){
	//定制确认检索行业名
    var CustomSureArry = [];
	
	
	//本地获取UAid
	var UserAid = localStorage.getItem("UAid");
	//获取顶部定制信息
	GetFormdata();
	function GetFormdata(){	
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/GetEntrustInfo",
			data: {
				Aid: UserAid,
				Id: "1"
			},
			success: function(result) {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				if(result.code == "00000"){
					//清除之前的数据列表
					$(".makeTimeShowDiv,.makeZhanghaoInp,.makeNameInp").empty();
					var datareturn = result.data;
					//页面赋值
					$(".makeTimeShowDiv").html(formatDateTime(datareturn.entrust.CreateDateTime));
					$(".makeZhanghaoInp").val(datareturn.entrust.PhoneNumber);
					$(".makeNameInp").val(datareturn.entrust.Name);
				}else{
					alert("未知状态:"+result.code);
				}
			},
			error: function() {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
	
	//获取注册区域三级联动下拉列表
	GetThreeAreaData();
	function GetThreeAreaData() {
        $.ajax({
        	beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
            type:"get",
            async:true,
            url: "http://139.196.136.36/Api/GetArea",
            data: {
                Aid: UserAid
            },
            success:function (data) {
                //console.log(data);
                $("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
                // 纯JS省市区三级联动
                var provinceList =data.data;
                var addressInit = function(_cmbProvince, _cmbCity, _cmbArea){
                    var cmbProvince = document.getElementById(_cmbProvince);
                    var cmbCity = document.getElementById(_cmbCity);
                    var cmbArea = document.getElementById(_cmbArea);
                    function cmbSelect(cmb, str){
                        for(var i=0; i<cmb.options.length; i++)
                        {
                            if(cmb.options[i].value == str)
                            {
                                cmb.selectedIndex = i;
                                return;
                            }
                        }
                    }
                    function cmbAddOption(cmb, str,str2,obj){
                        var option = document.createElement("OPTION");
                        cmb.options.add(option);
                        option.innerText = str;
                        option.value = str2;
                        option.obj = obj;
                    }

                    function changeCity(){
                        cmbArea.options.length = 0;
                        if(cmbCity.selectedIndex == -1)return;
                        var item = cmbCity.options[cmbCity.selectedIndex].obj;
                        for(var i=0; i<item.AreaList.length; i++)
                        {
                            cmbAddOption(cmbArea, item.AreaList[i].Area,item.AreaList[i].Id,null);
                        }
                        cmbSelect(cmbArea);
                    }
                    function changeProvince(){
                        cmbCity.options.length = 0;
                        cmbCity.onchange = null;
                        if(cmbProvince.selectedIndex == -1)return;
                        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
                        console.log(item);
                        for(var i=0; i<item.CityList.length; i++)
                        {
                            cmbAddOption(cmbCity, item.CityList[i].City,item.CityList[i].City, item.CityList[i]);
                        }
                        cmbSelect(cmbCity);
                        changeCity();
                        cmbCity.onchange = changeCity;
                    }

                    for(var i=0; i<provinceList.length; i++){
                        cmbAddOption(cmbProvince, provinceList[i].Province,provinceList[i].Province, provinceList[i]);
                    }
                    cmbSelect(cmbProvince);
                    changeProvince();
                    cmbProvince.onchange = changeProvince;

                };
                addressInit('makeRegistPlaceSelect1', 'makeRegistPlaceSelect2', 'makeRegistPlaceSelect3');
            },
            error:function () {
            	$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
                alert("网络错误!");
            }
        })
    };

	
	//点击定制信息模块上的保存
	$(".makeSave").unbind('click').click(function(){
		SendInformation();
	});
	//保存数据函数
	function SendInformation(){
		alert($("#makeRegistPlaceSelect1").find("option:selected").text().trim());
		alert($("#makeRegistPlaceSelect2").find("option:selected").text().trim());
		alert($("#makeRegistPlaceSelect3").find("option:selected").text().trim());
		alert($(".makeMarkText").val().trim());
		alert($(".makeNameInp").val().trim());
		//数据请求
		$.ajax({
			beforeSend: function(){
                $("#SearchLoadingImg").addClass("fa fa-spinner fa-spin");
                $("#searchMengcheng").css("display","block");
            },
			async: true,
			type: 'get',
			url: "http://139.196.136.36/Api/EditRegistEntrust",
			data: {
				Aid: UserAid,
				Id: "1",
				Name: $(".makeNameInp").val().trim(),
				EnterpriseType: "2",
				IsUrgent: "1",
				RegistAddress: "1",
				Licence: "2",
				Province: $("#makeRegistPlaceSelect1").find("option:selected").text().trim(),
				City: $("#makeRegistPlaceSelect2").find("option:selected").text().trim(),
				Area: $("#makeRegistPlaceSelect3").find("option:selected").text().trim(),
				Remarks: $(".makeMarkText").val().trim(),
				Addr: "账米提供",
				LicencePeople: "1",
				LicencePlace: "1",
				LicenceContent: "许可1类"
			},
			success: function(result) {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				console.log(result);
				if(result.code == "00000"){
					alert("保存成功!")
				}else{
					alert("未知状态:"+result.code+"保存失败!");
				}
			},
			error: function() {
				$("#searchMengcheng").css("display","none");
				$("#SearchLoadingImg").removeClass("fa fa-spinner fa-spin");
				alert("网络错误！");
			}
		});
	};
	
	//13位时间戳转换日期格式 yyyy-MM-dd HH:mm
	function formatDateTime(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
		//return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
	};
	
	
	
	//定制确认选择行业名下拉索检函数
	function EntrustGetSearchIndustryKey() {
		var $searchInput = $('.makeSureHangyeNameInp');
		//关闭浏览器提供给输入框的自动完成
		$searchInput.attr('autocomplete', 'off');
		//创建自动完成的下拉列表，用于显示服务器返回的数据,插入在搜索按钮的后面，等显示的时候再调整位置
		var $autocomplete = $('<div class="autocomplete"></div>').hide().insertAfter('.makeSureHangyeNameInp');
		//清空下拉列表的内容并且隐藏下拉列表区
		var clear = function() {
			$autocomplete.empty().hide();
		};
		//注册事件，当输入框失去焦点的时候清空下拉列表并隐藏
		$searchInput.blur(function() {
			setTimeout(clear, 500);
		});
		//下拉列表中高亮的项目的索引，当显示下拉列表项的时候，移动鼠标或者键盘的上下键就会移动高亮的项目，像百度搜索那样
		var selectedItem = null;
		//timeout的ID
		var timeoutid = null;
		//设置下拉项的高亮背景
		var setSelectedItem = function(item) {
			//更新索引变量
			selectedItem = item;
			//按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
			if(selectedItem < 0) {
				selectedItem = $autocomplete.find('li').length - 1;
			} else if(selectedItem > $autocomplete.find('li').length - 1) {
				selectedItem = 0;
			}
			//首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
			$autocomplete.find('li').removeClass('highlight')
				.eq(selectedItem).addClass('highlight');
		};
		var ajax_request = function() {
			//ajax服务端通信
			$.ajax({
				type: "get",
				async: true,
				url: "http://139.196.136.36/Api/EntrustGetSearchIndustryKey",
				data: {
					Aid: UserAid,
					Key: $searchInput.val(),
					SearchModel: 1
				},
				success: function(data) {
					console.log(data);
					var returndata = data.data;
					if(returndata.length) {
						$.each(returndata, function(index, term) {
							//创建li标签,添加到下拉列表中
							$('<li></li>').text(term.Name).appendTo($autocomplete).addClass('clickable').hover(function() {
									//下拉列表每一项的事件，鼠标移进去的操作
									$(this).siblings().removeClass('highlight');
									$(this).addClass('highlight');
									selectedItem = index;
								}, function() {
									//下拉列表每一项的事件，鼠标离开的操作
									$(this).removeClass('highlight')
									//当鼠标离开时索引置-1，当作标记
									selectedItem = -1;
								})
								.click(function() {
									//鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
									$searchInput.val(term.Name);
									$searchInput.attr("data_id", term.Sid);
									var hangyeId = $searchInput.attr("data_id");
									CustomSureArry = [];
									CustomSureArry.push(hangyeId.substring(0, 3));
									CustomSureArry.push(hangyeId.substring(0, 6));
									CustomSureArry.push(hangyeId);
									
//									$(".makeSureHangyeSelect1").val(IndustryArry[0]);
//									$(".makeSureHangyeSelect1").trigger("change");
//									$(".makeSureHangyeSelect2").val(IndustryArry[1]);
//									$(".makeSureHangyeSelect2").trigger("change");
//									$(".makeSureHangyeSelect3").val(IndustryArry[2]);
									//清空并隐藏下拉列表
									$autocomplete.empty().hide();
								});
						}); //事件注册完毕
						setSelectedItem(0);
						//显示下拉列表
						$autocomplete.show();
					}
				}
			});
		};
		//对输入框进行事件注册
		$searchInput.keyup(function(event) {
				//字母数字，退格，空格
				if(event.keyCode > 40 || event.keyCode == 8 || event.keyCode == 32) {
					//首先删除下拉列表中的信息
					$autocomplete.empty().hide();
					clearTimeout(timeoutid);
					timeoutid = setTimeout(ajax_request, 100);
				} else if(event.keyCode == 38) {
					//上
					//selectedItem = -1 代表鼠标离开
					if(selectedItem == -1) {
						setSelectedItem($autocomplete.find('li').length - 1);
					} else {
						//索引减1
						setSelectedItem(selectedItem - 1);
					}
					event.preventDefault();
				} else if(event.keyCode == 40) {
					//下
					//selectedItem = -1 代表鼠标离开
					if(selectedItem == -1) {
						setSelectedItem(0);
					} else {
						//索引加1
						setSelectedItem(selectedItem + 1);
					}
					event.preventDefault();
				}
			})
			.keypress(function(event) {
				//enter键
				if(event.keyCode == 13) {
					//列表为空或者鼠标离开导致当前没有索引值
					if($autocomplete.find('li').length == 0 || selectedItem == -1) {
						return;
					}
					$searchInput.val($autocomplete.find('li').eq(selectedItem).text());
					//清空并隐藏下拉列表
					$autocomplete.empty().hide();
					event.preventDefault();
				}
			})
			.keydown(function(event) {
				//esc键
				if(event.keyCode == 27) {
					//清空并隐藏下拉列表
					$autocomplete.empty().hide();
					event.preventDefault();
				}
			});
	};
	EntrustGetSearchIndustryKey();
	
	
	//点击新增方案(未找到方案)
	$(".creatNewPlans").unbind('click').click(function(){
		$(".CreatNewPlanAlert").css("display","block");
		$(".FailDealCauseAlert").css("display","none");
	});
	//点击新增方案弹窗上的X或返回按钮
	$(".CreatNewPlanAlertDel,.AlertCreatNewGoBack").unbind('click').click(function(){
		$(".CreatNewPlanAlert").css("display","none");
	});
	
	//点击成交失败
	$(".failDeal").unbind('click').click(function(){
		$(".FailDealCauseAlert").css("display","block");
		$(".CreatNewPlanAlert").css("display","none");
	});
	//点击成交失败弹窗上的X或返回按钮
	$(".FailDealCauseAlertDel,.AlertFailDealCauseGoBack").unbind('click').click(function(){
		$(".FailDealCauseAlert").css("display","none");
	});
	
	
}
