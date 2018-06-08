var getProductSeriesList; //产品信息
$(function() {
	$.ajax({
		type: "post",
		url: loginIp + "productSeries/getSeriesTree",
		data: {
			"beginDate": "",
			"endDate": ""
		},
		async: false,
		success: function(data) {
			getProductSeriesList = data;
			console.log(data);
			var html = "";
			for(var i = 0; i < data.length; i++) {
				html += '<li>' +
					'<input type="radio" name="kinds" id="kinds[' + i + ']" value="' + i + '">' +
					'<label for="kinds[' + i + ']" style="margin-left:5px;">' + data[i].seriesName + '</label>' +
					'</li>'
			}
			$(".seriesList").empty();
			$(".seriesList").append(html);
		}
	});
	$('#start_time').datetimepicker({
		format: 'yyyy-mm-dd',
		language: "zh-CN", //汉化
		autoclose: true, //选择日期后自动关闭日期选择框
		todayBtn: false, //显示今天按钮
		todayHighlight: true, //当天高亮显示
		minView: "month",
		pickerPosition: "bottom-right",
		startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 365), //只显示一年的日期365天
	}).on('click', function(e) {
		$("#start_time").datetimepicker("setEndDate", $("#end_time").val());
	});
	$('#end_time').datetimepicker({
		format: 'yyyy-mm-dd',
		language: "zh-CN",
		todayBtn: "true",
		autoclose: true,
		todayBtn: false,
		todayHighlight: true,
		minView: "month",
		pickerPosition: "bottom-right",
		startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 365),
	}).on('click', function(e) {
		$("#end_time").datetimepicker("setStartDate", $("#start_time").val());
	});
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat-blue', // 注意square和blue的对应关系
		radioClass: 'iradio_square-blue'
	});
	$("body").on('ifChecked', 'input[type="radio"]', function(event) {
		var that = $(this);
		var index = parseInt($(this).val());
		$(".product_wrap").show();
		var txt = "";
		for(var j = 0; j < getProductSeriesList[index].productList.length; j++) {
			txt += '<li>' +
				'<input type="checkbox" id="baz[' + j + ']" value="' + getProductSeriesList[index].productList[j].productId + '" data-name="' + getProductSeriesList[index].productList[j].productName + '">' +
				'<label for="baz[' + j + ']" style="margin-left:5px;">' + getProductSeriesList[index].productList[j].productName + '</label>' +
				'</li>'
		}
		$(".productList").empty();
		$(".productList").append(txt);
		$('input').iCheck({
			checkboxClass: 'icheckbox_flat-blue', // 注意square和blue的对应关系
			radioClass: 'iradio_square-blue'
		});
	});

});
//查询
function search() {
	var start_time = $('#start_time').val();
	var end_time = $('#end_time').val();
	if(!start_time) {
		sweeterror("开始时间不得为空！");
		return false;
	}
	if(!end_time) {
		sweeterror("结束时间不得为空！");
		return false;
	}
}
//保存配置
function saveconfig() {
	var radioArr;
	$('input[type="radio"]:checked').each(function() {
		radioArr = $(this).val();
	});
	var productId = [];
	var productName = [];
	$('input[type="checkbox"]:checked').each(function() {
		productId.push($(this).val());
		productName.push($(this).attr("data-name"));
	});
	var seriesName = getProductSeriesList[radioArr].seriesName;
	var start_time = $("#start_time").val();
	var end_time = $("#end_time").val();
	var data = {
		"productId": productId,//JSON.stringify(productId)
		"productName":productName,//JSON.stringify(productName)
		"seriesName": seriesName,
		"beginTime": start_time,
		"endTime": end_time
	}
	/*var data = {
		"productIds":["465BB722-BE30-E811-80B9-1866DAF3CBC5","6356D828-5624-E811-80B9-1866DAF3CBC5"],
		"productNames":["华泰基金19号5期","华泰基金19号4期"],
		"seriesName":"股权系列",
		"beginTime":"2018-06-03",
		"endTime":"2018-06-07"
	};*/
	console.log(data);
	$.ajax({
		type: "post",  
		url: loginIp+"productSeries/add",
		data: JSON.stringify(data),
		contentType:"application/json",
		async: true,
		success: function(data) {
			console.log(data);
		}
	});
}