$(function(){
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
	$("[name='switch-checkbox']").bootstrapSwitch({
		state:false, // state设置显示状态 Boolean
		onText:"AND",
		offText:"OR"
	});
	$(".checked-readonly").on('ifChanged', function(event){
		var checked = $(this).prop("checked");
		if(!checked){
			var val = $(this).val()-1;
			$("input[name='input']").eq(val).prop("readonly","readonly");
		}else{
			var val = $(this).val()-1;
			$("input[name='input']").eq(val).removeAttr("readonly").focus();
		}
	}); 
});
//
function readonly(obj){
	var that = $(this);
	var checked = that.attr("checked");
	console.log(checked);
}
