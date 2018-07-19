(function ($) {
    $.learuntab = {
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        refreshTab: function () {
            var currentId = $('.page-tabs-content').find('.active').attr('data-id');
            var target = $('.LRADMS_iframe[data-id="' + currentId + '"]');
            var url = target.attr('src');
            //$.loading(true);
            target.attr('src', url).load(function () {
                //$.loading(false);
            });
        },
        activeTab: function () {
            var currentId = $(this).data('id');
            if (!$(this).hasClass('active')) {
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.LRADMS_iframe').hide();
                        return false;
                    }
                });
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $.learuntab.scrollToTab(this);
            }
        },
        closeOtherTabs: function () {
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
            $('.page-tabs-content').css("margin-left", "0");
        },
        closeTab: function () {
            var closeTabId = $(this).parents('.menuTab').data('id');
            var currentWidth = $(this).parents('.menuTab').width();
            //判断关闭的是不是当前页面
            if ($(this).parents('.menuTab').hasClass('active')) {
            	//如果关闭的当前页面后面还有其他页面标签，关闭当前页面后打开紧挨的下一个页面
                if ($(this).parents('.menuTab').next('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                    $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');

                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                    if (marginLeftVal < 0) {
                        $('.page-tabs-content').animate({
                            marginLeft: (marginLeftVal + currentWidth) + 'px'
                        }, "fast");
                    }
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
                //如果关闭的当前页面前面还有其他页面标签，关闭当前页面后打开紧挨的上一个页面
                //$("p").prev(".selected") 检索每个段落，找到类名为 "selected" 的前一个同胞元素
                if ($(this).parents('.menuTab').prev('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').prev('.menuTab:last').data('id');
                    $(this).parents('.menuTab').prev('.menuTab:last').addClass('active');
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
            }else {
                $(this).parents('.menuTab').remove();
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        addTab: function () {
            $(".navbar-custom-menu>ul>li.open").removeClass("open");
            var dataId = $(this).attr('data-id');
            if (dataId != "") {
                //top.$.cookie('nfine_currentmoduleid', dataId, { path: "/" });
            }
            var dataUrl = $(this).attr('href');
            //console.log($(this).parent().parent().siblings('a').text());
            var PremenuName = $(this).parent().parent().siblings('a').text();
            var menuName = $.trim($(this).text());
            var flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
                return false;
            }
            $('.menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $.learuntab.scrollToTab(this);
                        $('.mainContent .LRADMS_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.LRADMS_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + PremenuName + '---' + menuName + ' <i class="fa fa-remove"></i></a>';
                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-remove"></i></a>';
                $('.menuTab').removeClass('active');
                var str1 = '<iframe class="LRADMS_iframe" id="iframe' + dataId + '" name="iframe' + dataId + '"  width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.mainContent').find('iframe.LRADMS_iframe').hide();
                $('.mainContent').append(str1);
                //$.loading(true);
                $('.mainContent iframe:visible').load(function () {
                    //$.loading(false);
                });
                $('.menuTabs .page-tabs-content').append(str);
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        scrollTabRight: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                if (scrollVal > 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: 0 - scrollVal + 'px'
                    }, "fast");
                }
            }
        },
        scrollTabLeft: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                if ($.learuntab.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                    while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).prev();
                    }
                    scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                }
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        scrollToTab: function (element) {
            var marginLeftVal = $.learuntab.calSumWidth($(element).prevAll()), marginRightVal = $.learuntab.calSumWidth($(element).nextAll());
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").outerWidth() < visibleWidth) {
                scrollVal = 0;
            } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
                if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                    scrollVal = marginLeftVal;
                    var tabElement = element;
                    while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                        scrollVal -= $(tabElement).prev().outerWidth();
                        tabElement = $(tabElement).prev();
                    }
                }
            } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
                scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        calSumWidth: function (element) {
            var width = 0;
            $(element).each(function () {
                width += $(this).outerWidth(true);
            });
            return width;
        },
        init: function () {
            $('.menuItem').on('click', $.learuntab.addTab);
            $('.menuTabs').on('click', '.menuTab i', $.learuntab.closeTab);
            $('.menuTabs').on('click', '.menuTab', $.learuntab.activeTab);
            $('.tabLeft').on('click', $.learuntab.scrollTabLeft);
            $('.tabRight').on('click', $.learuntab.scrollTabRight);
            $('.tabReload').on('click', $.learuntab.refreshTab);
            $('.tabCloseCurrent').on('click', function () {
                $('.page-tabs-content').find('.active i').trigger("click");
            });
            //页面标签全部关闭
            $('.tabCloseAll').on('click', function () {
                $('.page-tabs-content').children("[data-id]").find('.fa-remove').each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                    $(this).parents('a').remove();
                });
                $('.page-tabs-content').children("[data-id]:first").each(function () {
                    $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').show();
                    $(this).addClass("active");
                });
                $('.page-tabs-content').css("margin-left", "0");
            });
            //页面标签除此之外全部关闭
            $('.tabCloseOther').on('click', $.learuntab.closeOtherTabs);
            //全屏
            $('.fullscreen').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    $.learuntab.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen');
                    $.learuntab.exitFullscreen();
                }
            });
        }
    };
    //定义一个变量保存用户点击需要二次登录的一级标题
    var FirstMenuClick;
    $.learunindex = {
        load: function () {
            $("body").removeClass("hold-transition");
            $("#content-wrapper").find('.mainContent').height($(window).height() - 90);
            $(window).resize(function (e) {
                $("#content-wrapper").find('.mainContent').height($(window).height() - 90);
            });
            //左边菜单栏隐藏与显示按钮
            $(".sidebar-toggle").click(function () {
                if (!$("body").hasClass("sidebar-collapse")) {
                    $("body").addClass("sidebar-collapse");
                } else {
                    $("body").removeClass("sidebar-collapse");
                }
            })
            //$(window).load(function () {
                window.setTimeout(function () {
                    $('#ajax-loader').fadeOut();
                }, 300);
            //});
        },
        jsonWhere: function (data, action) {
            if (action == null) return;
            var reval = new Array();
            $(data).each(function (i, v) {
                if (action(v)) {
                    reval.push(v);
                }
            })
            return reval;
        },
        loadMenu: function () {
//  	    var data = [
//  	        {
//  	        	"f_ModuleId": "1", 
//			        "f_ParentId": "0", 
//			        "f_FullName": "客户信息管理", 
//			        "f_Icon": "fa fa-user", 
//			        "f_Children": false,
//			        "f_UrlAddress": "./html/ControlUserInformation/ControlUserInformation.html"
//  	        },
//			    {
//  	        	"f_ModuleId": "2", 
//			        "f_ParentId": "0", 
//			        "f_FullName": "签约流程管理", 
//			        "f_Icon": "fa fa-pencil", 
//			        "f_Children": false,
//			        "f_UrlAddress": "./405Page1.html"
//  	        }
//  	        
//  	    ];
            var data = menuData;            
            var _html = "";
            $.each(data, function (i) {
	            var row = data[i];
	            if (row.f_ParentId == "0" || row.f_ParentId == "1_2") {					
	                _html += '<li class="treeview">';                
	                //判断是否有儿子节点,并判断是否需要二次登录
	                if(row.f_Children && row.f_SecondaryLanding){
	                	_html += '<a href="#" id="userLog'+row.f_ModuleId+'" class="SecdLogin" style="position:relative"><i class="' + row.f_Icon + '"></i><span>' + row.f_FullName + '</span><i class="fa fa-angle-right" style="position:absolute;right:4%;top:10px;"></i></a>'
	                }else if(row.f_Children && !row.f_SecondaryLanding){
	                	_html += '<a href="#" style="position:relative"><i class="' + row.f_Icon + '"></i><span>' + row.f_FullName + '</span><i class="fa fa-angle-right" style="position:absolute;right:4%;top:10px;"></i></a>'
	                }else{
	                	_html += '<a style="position:relative" class="menuItem" data-id="' + row.f_ModuleId + '" href="' + row.f_UrlAddress + '">'+'<i class="' + row.f_Icon + '"></i><span>' + row.f_FullName + '</span></a>'
	                }	                
	                var childNodes = $.learunindex.jsonWhere(data, function (v) { return v.f_ParentId == row.f_ModuleId });
	                if (childNodes.length > 0) {
	                    _html += '<ul class="treeview-menu">';
	                    $.each(childNodes, function (i) {
	                        var subrow = childNodes[i];
	                        var subchildNodes = $.learunindex.jsonWhere(data, function (v) { return v.f_ParentId == subrow.f_ModuleId });
	                        _html += '<li>';
	                        if (subchildNodes.length > 0) {
	                            _html += '<a href="#"><i class="' + subrow.f_Icon + '"></i>' + subrow.f_FullName + '';
	                            _html += '<i class="fa fa-angle-right" style="position:absolute;right:4%;top:10px;"></i></a>';
	                            _html += '<ul class="treeview-menu">';
	                            $.each(subchildNodes, function (i) {
	                                var subchildNodesrow = subchildNodes[i];
	                                _html += '<li><a class="menuItem" data-id="' + subrow.f_ModuleId + '" href="' + subrow.f_UrlAddress + '"><i class="' + subchildNodesrow.f_Icon + '"></i>' + subchildNodesrow.f_FullName + '</a></li>';
	                            });
	                            _html += '</ul>';
	
	                        } else {
	                            _html += '<a class="menuItem" data-id="' + subrow.f_ModuleId + '" href="' + subrow.f_UrlAddress + '"><i class="' + subrow.f_Icon + '"></i>' + subrow.f_FullName + '</a>';
	                        }
	                        _html += '</li>';
	                    });
	                    _html += '</ul>';
	                }
	                _html += '</li>'
	            }
	        });
            $("#sidebar-menu").append(_html);
            //点击左侧菜单栏a标签(一级标题)
            $("#sidebar-menu li a").click(function () {         
            	//先判断是否需要二次登录
            	if($(this).hasClass('SecdLogin')){
            		FirstMenuClick = $(this);
            		//判断用户是否有过二次登录
            		//if(getCookie(FirstMenuClick.attr('id')) == "Yes"){
            		if(sessionStorage.getItem(FirstMenuClick.attr('id')) == "Yes"){
            			var d1 = $(this), e1 = d1.next();
		                if (e1.is(".treeview-menu") && e1.is(":visible")) {             	
		                    e1.slideUp(500, function () {
		                        e1.removeClass("menu-open")
		                    }),
		                    e1.parent("li").removeClass("active")
		                } else if (e1.is(".treeview-menu") && !e1.is(":visible")) {               	
		                    var f1 = d1.parents("ul").first(),
		                    g1 = f1.find("ul:visible").slideUp(500);
		                    g1.removeClass("menu-open");
		                    var h11 = d1.parent("li");
		                    e1.slideDown(500, function () {
		                        e1.addClass("menu-open"),
		                        f1.find("li.active").removeClass("active"),
		                        h11.addClass("active");
		                    })
		                } else if (!d1.parent().parent().is(".treeview-menu")){              	    
		               	    d1.parent("li").siblings().removeClass("active");
		               	    $(".treeview-menu").slideUp(500,function(){
		               	    	$(".treeview-menu").removeClass("menu-open")
		               	    })
		               	    d1.parent('li').addClass('active');
		                }
            		}else{
            			$(".secondLogin").modal('show');
            		}         		           		
            	}else{
            		var d = $(this), e = d.next();
	                if (e.is(".treeview-menu") && e.is(":visible")) {             	
	                    e.slideUp(500, function () {
	                        e.removeClass("menu-open")
	                    }),
	                    e.parent("li").removeClass("active")
	                } else if (e.is(".treeview-menu") && !e.is(":visible")) {               	
	                    var f = d.parents("ul").first(),
	                    g = f.find("ul:visible").slideUp(500);
	                    g.removeClass("menu-open");
	                    var h = d.parent("li");
	                    e.slideDown(500, function () {
	                        e.addClass("menu-open"),
	                        f.find("li.active").removeClass("active"),
	                        h.addClass("active");
	                    })
	                } else if (!d.parent().parent().is(".treeview-menu")){              	    
	               	    d.parent("li").siblings().removeClass("active");
	               	    $(".treeview-menu").slideUp(500,function(){
	               	    	$(".treeview-menu").removeClass("menu-open")
	               	    })
	               	    d.parent('li').addClass('active');
	                }
            	}                
            });
        }
    };
    //进入页面调用函数获取菜单列表
    getMenu();
    //console.log(localStorage.getItem("Utoken"));
    var menuData;
    function getMenu(){
    	$.ajax({
	  	    async: true,
			type:'get',
			url:"http://127.0.0.1/api/admin/navbar",
			headers: {'Authorization': localStorage.getItem("Utoken")},
			data:{
				username: localStorage.getItem("Uname")
			},
			success:function(result){
				console.log(result);
				var datareturn = result.data.navbar;
				if(result.code == "0"){
					menuData = datareturn;
					//请求菜单数据成功，加载页面
					$(function () {
				        $.learunindex.load();
				        $.learunindex.loadMenu();
				        $.learuntab.init();
				    });
		        }else if(result.code == "-10"){
		        	sessionStorage.clear();  //清除session
		        	alert(result.message+"，请重新登录！");
		        	window.location.href = "./login.html";
		        }else{
		        	alert(result.message);
		        }
		    }, 
		  	error:function(){	  		
		  		alert("网络错误！");	
		  	}	 
	    });
    };
    
    //本地获取用户昵称
    var Nickname = localStorage.getItem("Uname");
    //console.log(Nickname);
    $(".welComeUser").html("欢迎您，"+Nickname);
    //时间显示框
    function showTime(){
		//获取今天是周几
		var weekstr = "星期"+"日一二三四五六".charAt(new Date().getDay());
		// 获取当前的时间
		var now = new Date();
		var y = now.getFullYear();
		var month = now.getMonth()+1;
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

		//var timeStr = Nickname + " 您好！今天是" + y +"年" + month + "月" + d + "日" +"&nbsp;" + weekstr + "&nbsp" + h + ":" + m + ":" + s;
		var timeStr = y +"年" + month + "月" + d + "日" +"&nbsp;" + weekstr + "&nbsp" + h + ":" + m + ":" + s;
		document.getElementById('timeAndname').innerHTML = timeStr;
	}
	setInterval(showTime, 1000);
	
	//退出登录
	$(".signOut").on("click", function () {
		$("#LogOutAlert").modal('show');
    });
    $(".LogOutSure").bind('click',function(){
    	//调用接口通知后台
    	$.ajax({
      	    async: true,
			type:'get',
			url:"http://127.0.0.1/api/admin/logout",
			headers: {'Authorization': localStorage.getItem("Utoken")},
			data:{},
			success:function(result){
				console.log(result);
				if(result.code == "0"){
					localStorage.removeItem("Utoken");       //清除一级登录token
					//sessionStorage.removeItem("CRMUtoken");  //清除二级登录token
					//sessionStorage.removeItem("LCSID");      //清除二级登录理财师ID
					//sessionStorage.removeItem("LCSBMID");    //清除二级登录理财师部门ID
					sessionStorage.clear();  //清除session
					$("#LogOutAlert").modal('hide');
				    window.location.href = "./login.html";
		        }else{
		        	alert(result.message);
		        }
		    }, 
		  	error:function(){
		  		alert("网络错误！");	
		  	}	 
	    });	
    });
    
    //密码重置
    $(".changePsd").on("click", function () {
		$(".resetPassword").modal('show');
    });
    $(".resetPsdY").bind('click',function(){
    	if($(".InOldPsd").val() == "" || $(".InNewPsd").val() == "" || $(".AgainNewPsd").val() == ""){
    		alert("请完善信息！");
    	}else if($(".InOldPsd").val() == $(".InNewPsd").val()){
    		alert("新旧密码相同！");
    	}else if($(".InNewPsd").val() != $(".AgainNewPsd").val()){
    		alert("两次输入密码不一致！");
    	}else{
    		//信息完整，请求后台接口
            $.ajax({
          	    async: true,
				type:'post',
				url:"http://127.0.0.1/api/admin/user/updatePwd",
				headers: {'Authorization': localStorage.getItem("Utoken")},
				data:{
				    oldPassword: $(".InOldPsd").val(),
			        password1: $(".InNewPsd").val(),
			        password2: $(".AgainNewPsd").val()
			    },
				success:function(result){
					console.log(result);
					if(result.code == "0"){
						$(".resetPassword").modal('hide');
						sessionStorage.clear();  //清除session
						//密码修改成功后，清除登录cookie用户信息
						setCookie('user',null,-1); //一级登录用户名
	                    setCookie('pswd',null,-1); //一级登录用户密码
						alert("修改成功，请重新登录！")
						//密码修改成功，退出重新登录
						window.location.href = "./login.html";
			        }else if(result.code == "-10"){
			        	sessionStorage.clear();  //清除session
			        	alert(result.message+"，请重新登录！");
			        	window.location.href = "./login.html";
			        }else{
			        	alert(result.msg);
			        }
			    }, 
			  	error:function(){
			  		alert("网络错误！");	
			  	}	 
		    });	
    	}
    });
    
    //二次登录弹窗点击登录
    $(".secondLogInBtn").on("click", function () {
    	//alert(FirstMenuClick.attr('id'));
		//校验
        if($('.InSecondNam').val() == "" && $('.InSecondPsd').val() == ""){
        	alert("请完善信息！");
        }else if($('.InSecondNam').val() == ""){
        	$(".InSecondNam").html("姓名不能为空！");
        }else if($('.InSecondPsd').val() == ""){
        	$(".InSecondPsd").html("密码不能为空！");
        }else{
        	//信息完整，请求后台登录
            $.ajax({
            	beforeSend: function () {
	                $(".LoadingImg").addClass("fa fa-spinner fa-spin");
			        $(".loadwraper").css("display", "block");
	            },
          	    async: true,
				type:'post',
				url:"http://127.0.0.1/api/admin/crm/login",
				data:{
				    username: $(".InSecondNam").val(),
			        password: $(".InSecondPsd").val()
			    },
				success:function(result){
					console.log(result);
					var datareturn = result.data;
					if(result.code == "0"){
						//本地存储CRM登录token值
						sessionStorage.setItem("CRMUtoken",datareturn.authToken);
						//本地存储登录理财师ID以及存储理财师部门ID
						sessionStorage.setItem("LCSID",datareturn.userInfo.systemUserId);
						sessionStorage.setItem("LCSBMID",datareturn.userInfo.businessUnitId);
						//隐藏登录弹窗
						$(".secondLogin").modal('hide');
	                    $(".LoadingImg").removeClass("fa fa-spinner fa-spin");
			            $(".loadwraper").css("display", "none");			            
			            //本地存储登录理财师是否有编辑权限
			            sessionStorage.setItem("LCSWrite",datareturn.userInfo.writePerms);
			            //用户二次登录信息存本地session
			            sessionStorage.setItem(FirstMenuClick.attr('id'),"Yes");
                        //用户二次登录信息存本地CooKie,保存时间暂定--分钟
//                      setCookieLT(FirstMenuClick.attr('id'),"Yes",1);
//                      setInterval(function(){
//                      	console.log(getCookie(FirstMenuClick.attr('id')));
//                      },1000);
                        var d = FirstMenuClick, e = d.next();
		                if (e.is(".treeview-menu") && e.is(":visible")) {             	
		                    e.slideUp(500, function () {
		                        e.removeClass("menu-open")
		                    }),
		                    e.parent("li").removeClass("active")
		                } else if (e.is(".treeview-menu") && !e.is(":visible")) {               	
		                    var f = d.parents("ul").first(),
		                    g = f.find("ul:visible").slideUp(500);
		                    g.removeClass("menu-open");
		                    var h = d.parent("li");
		                    e.slideDown(500, function () {
		                        e.addClass("menu-open"),
		                        f.find("li.active").removeClass("active"),
		                        h.addClass("active");
		                    })
		                } else if (!d.parent().parent().is(".treeview-menu")){              	    
		               	    d.parent("li").siblings().removeClass("active");
		               	    $(".treeview-menu").slideUp(500,function(){
		               	    	$(".treeview-menu").removeClass("menu-open")
		               	    })
		               	    d.parent('li').addClass('active');
		                }
			        }else if(result.code == "-10"){
			        	sessionStorage.clear();  //清除session
			        	alert(result.message+"，请重新登录！");
			        	window.location.href = "./login.html";
			        }else{
			        	$(".LoadingImg").removeClass("fa fa-spinner fa-spin");
			            $(".loadwraper").css("display", "none");
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
    });
    
})(jQuery);