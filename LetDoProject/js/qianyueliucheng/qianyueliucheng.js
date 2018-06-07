window.onload = function(){
	//本地获取token值
	var Mytoken = localStorage.getItem("Utoken");
	console.log(Mytoken);
	getMenu();
	function getMenu(){
    	$.ajax({
	  	    async: true,
			type:'post',
			url:"http://127.0.0.1/api/admin/user/updatePwd",
			data:{
				oldPassword:"1",
				password1:"2",
				password2: "3"
			},
			success:function(result){
				console.log(result);
				var datareturn = result.data.navbar;
				if(result.code == "0"){
					
		       }else{
		        	alert(result.message);
		        }
		    }, 
		  	error:function(){	  		
		  		alert("网络错误！");	
		  	}	 
	    });
    };
	
	
	
	
	
}
