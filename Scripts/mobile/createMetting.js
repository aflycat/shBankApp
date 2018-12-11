var joinMem=[],joinName=[],server=[],serverId=[],notify=[];
function createMetting(){

	$(".roomPicker").click(function(){
		closeRoom()
	})
	$(".roomCon").click(function(e){
		e.stopPropagation()
	})
	$(".memChoose").click(function(){
		closeMem()
		
	})
	
	$(".memCon").click(function(e){
		e.stopPropagation()
	});
	
	$(".meettngSer").click(function(){
		$(this).css({display:"none"})
	})
	
	$("#creaDepart").val(get_mem_infor(window.localStorage.userNameApp)[1]);

	

//	
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
	var calendar = new datePicker();
	calendar.init({
		'trigger': '#timePicker2', /*按钮选择器，用于触发弹出插件*/
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

function joinMember(){
	$(".memChoose").show();
	$("#createMetting .page-content").css({overflow:"hidden"});
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
				
				$(".memChoose .department ul").append(html)
			}
		}
	});
	
}
function showMark(dom,num){
	$(dom).parent().siblings().find("input").attr("checked",false);
	var check=$(dom).find("input").attr("checked",false);
	$("#isLeader").val(num)

	if(num==0){
		$(".leaderMark").hide()
	}else{
		$(".leaderMark").css({display:'flex'})
	}
}
function closeMem(){
	$(".memChoose").hide()
	$("#createMetting .page-content").css({overflow:"auto"})
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
			var dat=res.HttpData.data
			for(var i=0;i<dat.length;i++){
				if(joinMem.indexOf(dat[i].workNo)!=-1){
					var check='<input type="checkbox" name="my-checkbox" checked="checked" value="'+dat[i].workNo+'" />';
				}else{
					var check= '<input type="checkbox" name="my-checkbox"  value="'+dat[i].workNo+'" />';
				}
				
				var html=' <li>'+
						      '<label class="label-checkbox item-content" onclick="sureThisPer(this,\''+dat[i].workNo+'\',\''+dat[i].name+'\')">'+
						      check+
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
function sureThisPer(dom,carNo,name){
//	joinMem=[],joinName=[];
	var check=$(dom).find("input").prop("checked");
	if (check) {
		//取消
		joinMem.remove(carNo);
		joinName.remove(name);
	} else{
		//添加
		joinMem.push(carNo);
		joinName.push(name);
	}
	$("#joinPerson").val(joinMem.toString())
	$("#others").val(joinName.toString())
}
function showKind(){
	$("#createMetting .roomPicker").show();
	$("#createMetting .page-content").css({overflow:"hidden"});
}
function closeRoom(){
	$("#createMetting .roomPicker").hide();
	$("#createMetting .page-content").css({overflow:"auto"});
}
function chooseKind(dom,type,con){
	$("#meetType").val(type);
	$(".meetType").val(con);
}
function chooseNotice(dom,type){
	var check=$(dom).find("input").prop("checked");
	if(check){
//		删除
		notify.remove(type)
	}else{
//		选中
		notify.push(type)
	}
	$("#notify").val(notify.toString())
}
function chooseServe(dom,txt,id){
	
	var check=$(dom).find("input").prop("checked");
	if (check) {
		//取消
		server.remove(txt);
		serverId.remove(id)
	} else{
		//添加
		server.push(txt);
		serverId.push(id);
	}
	$("#server").val(serverId.toString())
}
function meetSer(){
	$.ajax({
		type:"post",
		url:"/api/Event/get_meet_serve",
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		async:true,
		success:function(res){
			var dat=res.HttpData.data;
			for(var i=0;i<dat.length;i++){
				var html='<li>'+
							'<label class="label-checkbox item-content" onclick="chooseServe(this,\''+dat[i].text+'\','+dat[i].id+')">'+
						       ' <input type="checkbox" name="my-checkbox" value="'+dat[i].text+'">'+
						        '<div class="item-media" >'+
						          '<i class="icon icon-form-checkbox"></i>'+
						        '</div>'+
						        '<div class="item-inner" >'+
						          '<div class="item-title">'+dat[i].text+'</div>'+
						        '</div>'+
						    '</label>'+
						'</li>';
				$(".meettngSer ul").append(html)
			}
			
			$(".meettngSer").show()
			
		}
	})
}

function upThisMeeting(dom){
	var url=$("#url").val()
	

	$(this).addClass("disabled");
	var applicant=window.localStorage.userNameApp,
		others=$("#joinPerson").val(),//与会人员
		begintime=$("#timePicker").val(),//开始时间
		endTime=$("#timePicker2").val(),//结束时间
		meetType=$("#meetType").val(),//会议类型
		meetCon=$("#meetCon").val(),//会议内容
		contact=$("#contact").val(),
		contactPhone=$("#contactPhone").val(),
		isLeader=$("#isLeader").val(),
		mark=$("#leadMark").val(),
		server=$("#server").val(),
		topic =$("#meetTopic").val(),
		notify=$("#notify").val();
		

		if(begintime==""){
			myApp.alert("请选择开始时间","温馨提示");
		}else if(endTime==""){
			
			myApp.alert("请选择结束时间","温馨提示")
		}else if(contact==""){
			myApp.alert("请添加联系人","温馨提示")
		}else if(contactPhone==""){
			myApp.alert("请添加联系方式","温馨提示")
		}else{
			$.ajax({
			type:"post",
			url:"/api/Event/add_meet",
			async:true,
			data:{
				memberId:applicant, 
				others:others,
				begintime :begintime,
				endTime :endTime,
				meetType:meetType,
				contact :contact,
				contactPhone:contactPhone,
				service :server,
				content :meetCon,
				isLeader :isLeader,
				mark :mark,
				topic:topic,
				notify:notify
			},headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
			success:function(res){
				$(this).removeClass("disabled")
				if(res.HttpData.data==1){
					myApp.alert("会议申请成功","温馨提示",function(){
						mainView.router.back()
					})
				}else{
					myApp.alert("操作失败,请重试","温馨提示")
				}
			}
		});
		}



		
	
	
}
function closeServe(){
	$(".meettngSer").hide();
	$("#meetServe").val(server.toString())
}
