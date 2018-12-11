function visitorSys(){
//	console.log("visitor")
	$(".memChoose").click(function(){
		closeMem()
	})
	$(".memCon").click(function(e){
		e.stopPropagation()
	})
	var calendar = new datePicker();
	calendar.init({
		'trigger': '#timePicker', /*按钮选择器，用于触发弹出插件*/
		'type': 'datetime',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
		'minDate':'2015-1-1',/*最小日期*/
		'maxDate':'2100-12-31',/*最大日期*/
		'onSubmit':function(){/*确认时触发事件*/
			var theSelectData=calendar.value;
		},
		'onClose':function(){/*取消时触发事件*/
		}
	});
}
function showMem(){
	$(".memChoose").show();
	$(".department ul").html("")
	$.ajax({
		type:"post",
		url:"/api/Event/get_all_depart",
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},success:function(res){
			var dat=res.HttpData.data;
			getMember('',dat[0].department)
			for(var i=0;i<dat.length;i++){
				if(i==0){
					var html='<li class="cli" onclick="getMember(this,\''+dat[i].department+'\')">'+dat[i].department+'</li>';
				}else{
					var html='<li  onclick="getMember(this,\''+dat[i].department+'\')">'+dat[i].department+'</li>';
				}
				
				$(".department ul").append(html)
			}
		}
	});
}
function getMember(dom,txt){
	$(dom).addClass("cli").siblings().removeClass("cli");
	$(".memList ul").html("")
	$.ajax({
		type:"post",
		url:"/api/Event/get_mem_dep",
		data:{
			department:txt
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		async:true,
		success:function(res){
//			console.log(res)
			var dat=res.HttpData.data
			for(var i=0;i<dat.length;i++){
				var html=' <li>'+
						      '<label class="label-checkbox item-content" onclick="sureThisMem(this,\''+dat[i].workNo+'\')">'+
						        '<input type="checkbox" name="my-checkbox" value="'+dat[i].workNo+'" />'+
						       ' <div class="item-media">'+
						          '<i class="icon icon-form-checkbox"></i>'+
						       ' </div>'+
						        '<div class="item-inner">'+
						         ' <div class="item-title">'+dat[i].name+'</div>'+
						       ' </div>'+
						     ' </label>'+
						   ' </li>';
				$(".memList ul").append(html)
			}
		}
	});
}
function sureThisMem(dom,id){
	$(dom).parent().siblings().find("input").prop("checked",false)
	var dat=get_mem_infor(id);
	$("#name").val(dat[3]).attr("nameId",id);
	$("#tel").val(dat[4]);
	$("#part").val(dat[1]);
	$("#carNum").val(dat[0]);
}
function closeMem(){
	$(".memChoose").hide()
	$("#visitorSys .page-content").css({overflow:"auto"})
}
function upVisitor(){
	var time= $("#timePicker").val(),
		name= $("#viName").val(),
		cardId= $("#cardId").val(),
		reason= $("#reason").val(),
		viTel= $("#viTel").val(),
		followNum= $("#followNum").val(),
		floor=$("#floor").val(),
		nameId=$("#name").attr("nameId");
//	console.log(time,name,cardId,reason,viTel,followNum,nameId)
	if(time==""){
		myApp.alert("时间不能为空","温馨提示");
		return;
	}else if(name==""){
		myApp.alert("来访人姓名不能为空","温馨提示");
		return;
	}else if(viTel==""){
		myApp.alert("来访人电话不能为空","温馨提示");
		return;
	}else if(nameId==""){
		myApp.alert("被访人不能为空","温馨提示");
		return;
	}else{
		$.ajax({
			type:"post",
			url:"/api/Event/add_reservation",
			async:true,
			headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
			data:{
				name :name,
				time :time,
				phone :viTel,
				license :cardId,
				events :reason,
				followUp :followNum,
				floor:floor,
				memberId :nameId
			},
			success:function(res){
				if(res.HttpData.data==1){
					myApp.alert("预约成功","温馨提示",function(){
						mainView.router.loadPage("home.html")
					})
					
					
				}
			}
		});
	}
	
}
