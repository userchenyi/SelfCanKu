window.onload = function(){
	var Uername = $(".userName");
	var Uerpsd = $(".userPsd");
	var Uerrember = $(".remberToggle");
	//输入框聚焦
	$(".userName").focus(function(){
		$(".nameNull").css("display","none");	
	});
	$(".userPsd").focus(function(){
		$(".psdNull").css("display","none");	
	});
	//输入框失焦校验
	$(".userName").blur(function(){
		if($(this).val() == ""){
			$(".nameNull").html("用户名不能为空！");
			$(this).siblings('span').css("display","block");
		}
//		else{
//			//正则校验
//      	var Trimuser = $.trim($(".userName").val());
//          var myReg = /^[0-9a-zA-Z_]{1,}$/;
//          if(!myReg.test(Trimuser)){
//          	$(".nameNull").html("字母、数字、下划线组合！").css("display","block");
//              return;
//          };
//          $(this).siblings('span').css("display","none");
//		}
	});
	$(".userPsd").blur(function(){
		if($(this).val() == ""){
		    $(".psdNull").html("密码不能为空！");
			$(this).siblings('span').css("display","block");
		}
//		else{
//			//正则校验
//      	var Trimpsd = $.trim($(".userPsd").val());
//          var myReg = /^[0-9a-zA-Z_]{1,}$/;
//          if(!myReg.test(Trimpsd)){
//          	$(".psdNull").html("字母、数字、下划线组合！").css("display","block");
//              return;
//          };
//          $(this).siblings('span').css("display","none");
//		}
	});
	//页面初始化时，如果帐号密码cookie存在则填充
    if(getCookie('user') && getCookie('pswd')){
        Uername.val(getCookie('user'));
        Uerpsd.val(getCookie('pswd'));
        Uerrember.prop('checked',true);
    }
    //复选框勾选状态发生改变时，如果未勾选则清除cookie
    Uerrember.change(function(){
    	if(!this.checked){
	        delCookie('user');
	        delCookie('pswd');
	    }
    });
    //点击登录
	$(".logbtn").click(function(){
		//校验
        if(Uername.val() == "" && Uerpsd.val() == ""){
        	$(".nameNull").html("用户名不能为空！");
		    $(".psdNull").html("密码不能为空！");
        	$(".nameNull,.psdNull").css("display","block");
        }else if(Uername.val() == ""){
        	$(".nameNull").html("用户名不能为空！").css("display","block");
        }else if(Uerpsd.val() == ""){
        	$(".psdNull").html("密码不能为空！").css("display","block");
        }else{
        	//第一步校验通过
        	$(".nameNull,.psdNull").css("display","none");
        	//正则校验
        	var Trimuser = $.trim($(".userName").val()),
                Trimpsd = $.trim($(".userPsd").val());
            var myReg = /^[0-9a-zA-Z_]{1,}$/;
//          if(!myReg.test(Trimuser)){
//          	$(".nameNull").html("字母、数字、下划线组合！").css("display","block");
//              return;
//          };
//          if(!myReg.test(Trimpsd)){
//          	$(".psdNull").html("字母、数字、下划线组合！").css("display","block");
//              return;
//          };
            
        	//如果选择记住账户信息，保存cookie
        	if(Uerrember.prop('checked') == true){ 
	            setCookie('user',Uername.val(),7); //保存帐号到cookie，有效期7天
	            setCookie('pswd',Uerpsd.val(),7); //保存密码到cookie，有效期7天
	        }
        	//本地存储用户信息
        	localStorage.setItem("Uname",$(".userName").val());
            //信息完整，请求后台登录
            $.ajax({
            	beforeSend: function () {
	                $(".LoadingImg").addClass("fa fa-spinner fa-spin");
			        $(".loadwraper").css("display", "block");
	            },
          	    async: true,
				type:'post',
				url:CTX_PATHNG+"admin/login",
				data:{
				    username: $(".userName").val(),
			        password: $(".userPsd").val()
			    },
				success:function(result){
					console.log(result);
					var datareturn = result.data;
					if(result.code == "0"){
						//本地存储token值
						localStorage.setItem("Utoken",datareturn.token);
	                    $(".LoadingImg").removeClass("fa fa-spinner fa-spin");
			            $(".loadwraper").css("display", "none");
	                    window.location.href = "./index.html";
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
	//回车登录
    $(document).keydown(function (event) {
        event = arguments.callee.caller.arguments[0] || window.event; // 消除浏览器差异
        if (event.keyCode == 13) {
            $(".logbtn").click(); //登录事件
        }
    });
 
};
