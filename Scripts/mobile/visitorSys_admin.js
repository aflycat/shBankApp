var memDefault=null;
function visitorSys_admin(){
	loadMemDefault()
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
//	getMember()
	$(".memChoose").click(function(){
		closeMem()
	})
	$(".memCon").click(function(e){
		e.stopPropagation()
	})
	
	$(".lookMore").click(function(){
		$(this).css({display:"none"})
	})
	$(".conWrap").click(function(event){
		event.stopPropagation()
	})
	loadVisiTorList();
	
	var ptrContent1 = $$('#today');
	ptrContent1.on('refresh', function (e) {
  
	    setTimeout(function () {
	    	loadVisiTorList()
		        myApp.pullToRefreshDone();
		    }, 2000);
	});
	$("#today .con").scroll(function(){
		if($(this).scrollTop()==0){
			
			myApp.initPullToRefresh(ptrContent1)
		}else{
			myApp.destroyPullToRefresh(ptrContent1)
		}
	})
	$("#getStartTimer").click(function(e){
		initTimer()
		e.stopPropagation()
	})
}
function loadMemDefault(){
	// get_mem_infor_pc
	$.ajax({
		type:"post",
		url:"/api/Event/get_mem_infor_pc",
		data:{		
			workNo:window.localStorage.userNameApp
		},
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			console.log(res)
			var dat=res.HttpData.data[0];
			$("#name").val(dat.name);
			$("#tel").val(dat.phone);
			$("#part").val(dat.department);
			$("#carNum").val(dat.workNo);
			memDefault=dat.workNo;
		}
	});
}
function loadVisiTorList(){
	var date=getToday();
	$.ajax({
		type:"post",
		url:"/api/Event/get_today_reser",
		data:{		
			time:date,
			workNo:window.localStorage.userNameApp
		},
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			var data=res.HttpData.data;
			loadVisitorHtml(data)
		}
	});
}

function loadVisitorHtml(data){
//	console.log(data)
	$("#today .con").html("")
	if(data.length!=0){
		for(var i=0;i<data.length;i++){
		
			var noArr='',status="已到访",qrcode="icon-yduierweimasaomiao",lookInfor='';
			if(!data[i].status){
				noArr='noArr';
				status="未到访";
				lookInfor='<div class="col-20" id="setSta" onclick="setSta('+data[i].id+',event)">到访</div>';
			}else{
				lookInfor='<div class="col-20"></div>';
			}
			var html=  '<div class="row no-gutter '+noArr+'" onclick="lookInfor('+data[i].id+',\''+data[i].memberId+'\')">'+
							'<div class="col-20">'+
								data[i].name+
							'</div>'+
							'<div class="col-20">'+
								data[i].time.split("T")[1]+
								
							'</div>'+
							'<div class="col-20">'+
								get_mem_infor(data[i].memberId)[3]+
							'</div>'+
							'<div class="col-20">'+
								status+
							'</div>'+
							lookInfor+
						'</div>';
			data[i].status=="0"?$("#today .con").prepend(html):$("#today .con").append(html);
	//		
		}
	}else{
		$("#today .con").prepend('<div class="row no-gutter "><div class="col-100">今日暂无预约</div></div>')
	}
	
}
function setSta(id,event){
	$("#visitorsId").val(id);
	$(".timeChoose").css({"zIndex":"999",opacity:1});
	event.stopPropagation();
	
}
function closethis(dom){
	$(dom).css({"zIndex":"-999",opacity:0});
}
function closeTime(){
	var id=$("#visitorsId").val();
	var data={
		id:id,
		status:1,
		visitTime:$("#picker-date").val()
	}
	$.ajax({
		type:"post",
		url:"/api/Event/upd_visitor_status",
		async:true,
		data:data,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			var dat=res.HttpData.data;
			
			$(".timeChoose").css({"zIndex":"-999",opacity:0});
			if(dat==1){
				myApp.alert("操作成功","温馨提示")
				var date=getToday();
				 $.ajax({
					type:"post",
					url:"/api/Event/get_today_reser",
					data:{		
						time:date,
						workNo:window.localStorage.userNameApp
					},
					async:true,
					headers:{
						Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
					},
					
					success:function(res){
						var data=res.HttpData.data;
						loadVisitorHtml(data)
					}
				});
			}else{
				myApp.alert("操作失败","温馨提示")
			}
		}
	});
}

function lookInfor(id,cardNum){
	$(".inforWrap").html("")
	$(".btnWrap").html("")
	$.ajax({
		type:"post",
		url:"/api/Event/get_this_visitInfor",
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		data:{
			id:id
		},
		success:function(res){
			
		$(".lookMore").css({display:"flex",display:"-webkit-flex"});
//			console.log(res)
			var dat=res.HttpData.data[0];
					var day=getToday().split("-")[2];

					$(".day").text(day+"日");

					$(".week").text(getWeek(new Date().getDay()))

//					if(!dat.status){
//						btn='<div class="btn"><a href="#" class="button button-fill button-big qrcode " onclick="getCamera('+id+')">扫一扫</a></div>';
//					}else{
					var	btn='<div class="btn"><a href="#" class="button button-fill  button-big sure" onclick="closeFun()">确定</a></div>';
//					}
					var html='<div class="cont">'+
								'<div class="row itemLine">'+
									'<div class="txt">到访原因:</div>'+
									'<div class="detail">'+dat.event+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">随行人数:</div>'+
									'<div class="detail">'+dat.followUp+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">到访人电话:</div>'+
									'<div class="detail">'+dat.phone+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">来访楼层:</div>'+
									'<div class="detail">'+dat.floor+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">被访人电话:</div>'+
									'<div class="detail">'+get_mem_infor(cardNum)[4]+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">被访人部门:</div>'+
									'<div class="detail">'+get_mem_infor(cardNum)[1]+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">被访人工号:</div>'+
									'<div class="detail">'+cardNum+'</div>'+
								'</div>'+
								'<div class="row itemLine">'+
									'<div class="txt">来访人证件:</div>'+
									'<div class="detail">'+dat.license+'</div>'+
								'</div>'+

							'</div>';
					$(".inforWrap").append(html)
					$(".btnWrap").append(btn)

		}
	});
}
function getCamera(id){
	$("#visitorsId").val(id)
	myJavaFun.RichScan()
}
function closeFun(){
	$(".lookMore").css({display:"none"})
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
				if(dat[i].workNo==memDefault){
					var html=' <li>'+
						      '<label class="label-checkbox item-content" onclick="sureThisMem(this,\''+dat[i].workNo+'\')">'+
						        '<input type="checkbox" checked="checked" name="my-checkbox" value="'+dat[i].workNo+'" />'+
						       ' <div class="item-media">'+
						          '<i class="icon icon-form-checkbox" ></i>'+
						       ' </div>'+
						        '<div class="item-inner">'+
						         ' <div class="item-title">'+dat[i].name+'</div>'+
						       ' </div>'+
						     ' </label>'+
						   ' </li>';
				}else{
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
				}
				
				$(".memList ul").append(html)
			}
		}
	});
}
function closeMem(){
	$(".memChoose").hide()
	$("#visitorSys .page-content").css({overflow:"auto"})
}
function sureThisMem(dom,id){
	memDefault=id;
	$(dom).parent().siblings().find("input").prop("checked",false)
	var dat=get_mem_infor(id);
	$("#name").val(dat[3]).attr("nameId",id);
	$("#tel").val(dat[4]);
	$("#part").val(dat[1]);
	$("#carNum").val(dat[0]);
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
//		console.log(2)
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
				myApp.alert("预约成功","温馨提示")
				$("#preLink").removeClass("active")
				$("#today").addClass("active")
				$("#todayLink").addClass("active")
				$("#pre").removeClass("active")
				$("#pre").find("input").val("")
				loadVisiTorList()
			}
//			console.log(res)
		}
	});
	}
	
}
