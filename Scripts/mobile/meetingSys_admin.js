var apraise=[];
function meetingSys_admin(){

	var dat=getSevenDay(7);//获取近7天
	$(".meet").each(function(){
		var id=$(this).attr("id");
		$(this).find(".date").text(dat[id].substr(5));
		get_thisDay_meeting(dat[id],id)
	})

	$(".roomPicker").click(function(){
		closeRoom()
	})
	$(".meetingApraise").click(function(){
		$(".meetingApraise").hide();
//		closeRoom()
	})
	$(".roomCon").click(function(e){
		e.stopPropagation()
	})
	
	
	
	
	$(".lookMore").click(function(){
		$(this).css({display:"none"})
	})
	$(".conWrap").click(function(event){
		event.stopPropagation()
	})
	
	
	
	
	var ptrContent1 = $$('#result');
	ptrContent1.on('refresh', function (e) {
  
    setTimeout(function () {

		get_all_meeting(dat[0],dat[6])
	        myApp.pullToRefreshDone();
	    }, 2000);
	});
	myApp.destroyPullToRefresh(ptrContent1)
	$("#result .con").scroll(function(){
		
		if($(this).scrollTop()==0){
			myApp.initPullToRefresh(ptrContent1)
		}else{
			myApp.destroyPullToRefresh(ptrContent1)
		}
	})
	
	var ptrContent2 = $$('#plan');
	
	 myApp.destroyPullToRefresh(ptrContent2)
	ptrContent2.on('refresh', function (e) {
 
    setTimeout(function () {
	    	var dat=getSevenDay(7);//获取近7天
	    	$(".meet").each(function(){
				var id=$(this).attr("id");
				$(this).find(".date").text(dat[id].substr(5));
				$(this).find(".con").html("")
				get_thisDay_meeting(dat[id],id)
			})
	        myApp.pullToRefreshDone();
	    }, 2000);
	});
	$("#plan .listItem").scroll(function(){
		
		if($(this).scrollTop()==0){
			myApp.initPullToRefresh(ptrContent2)
		}else{
			myApp.destroyPullToRefresh(ptrContent2)
		}
	})
	//循环天数
	
	
}
function get_all_mee(){
	var dat=getSevenDay(7);
	get_all_meeting(dat[0],dat[6]);
}
function get_all_meeting(start,end){
	$.ajax({
			type:"post",
			url:"/api/Event/get_all_meet",
			async:true,
			data:{
				startTime:start,
				endTime :end
			},
			headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
			success:function(res){
				
				loadMeetHtml(res.HttpData.data)
			}
		});
}
function loadMeetHtml(data){
	$("#result .con").html("")
	if(data.length==0){
		var html='<div class="row no-gutter name">'+
						'<div class="col-100">暂无待审批会议</div>'+
						
					'</div>';
		$("#result .con").append(html)
	}else{
		for(var i=0;i<data.length;i++){
			var approval="",res="",type='';
			if(data[i].result==0){
				approval="noArr";
				res="未审批"
			}else if(data[i].result==1){
				res="同意"
			}else{
				res="未同意"
			}
			
			switch (data[i].type)
			{
				case 0:
					type="培训"
				break;
	
				case 1:
					type="一级"
				
				break;
				
				case 2:
					type="二级"
				
				break;
				case 3:
					type="其他"
				
				break;
			}
			if(data[i].name){
				var name=data[i].name;
			}else{
				var name=""
			}
	
			var html='<div class="row no-gutter '+approval+'" onclick="lookInfor('+data[i].id+')">'+
						'<div class="col-25" style="padding-left:5px;">'+
							getTime(data[i].begintime)+
						'</div>'+
						'<div class="col-20">'+
							type+
						'</div>'+
						'<div class="col-15">'+
							get_mem_infor(data[i].applicant)[3]+
						'</div>'+
						'<div class="col-20">'+
							name+
						'</div>'+
						'<div class="col-20">'+
							res+
						'</div>'+
					'</div>';
			if(data[i].result=="0"){
				$("#result .con").prepend(html)
			}else{
				$("#result .con").append(html)
			}
			
		}
	}
	
}
function lookInfor(id,deal){
	$("#meetId").val(id);
	$(" .lookMore .inforWrap").html("");
	$("#meetingSys_admin .btnWrap").html("");
	$(".meetingApraise ul").html("");
	$(".meetingApraise .btn").remove();
	$.ajax({
		type:"post",
		url:"/api/Event/get_this_meeting",
		async:true,
		data:{
			meetingId :id
		},
		headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
		success:function(dat){
			var res=dat.HttpData.data[0];
//			for(var i=0;i<res.length;i++){
//				if(res[i].id==id){
					var day=res.begintime.split("T")[0].split("-")[2];
					$(".top .day").text(parseInt(day)+"日");
					$(".lookMore .week").text(getWeek(res.begintime.split("T")[0]));
					if(res.result==0){
						var btnArr='<div class="itemLine row">'+
									'<div class="col-50" onclick="agreeChange(this)">'+
										'<label class="label-checkbox item-content">'+
									        '<input type="checkbox" name="my-checkbox" value="1"  checked="checked">'+
									        '<div class="item-media" style="display: inline-block;margin-right:10px;">'+
									          '<i class="icon icon-form-checkbox"></i>'+
									        '</div>'+
									        '<div class="item-inner" style="display: inline-block;">'+
									          '<div class="item-title">同意</div>'+
									        '</div>'+
									     '</label>'+
					    			'</div>'+
					    			'<div class="col-50" onclick="agreeChange(this)">'+
										'<label class="label-checkbox item-content">'+
									        '<input type="checkbox" name="my-checkbox" value="2"  >'+
									       ' <div class="item-media" style="display: inline-block;margin-right:10px;">'+
									          '<i class="icon icon-form-checkbox"></i>'+
									       ' </div>'+
									        '<div class="item-inner" style="display: inline-block;">'+
									         ' <div class="item-title">不同意</div>'+
									       ' </div>'+
									    ' </label>'+
					    			'</div>'+
								'</div>'+
								'<div class=" btn">'+
									'<a href="#" class="button button-fill  button-big sure" onclick="upMeeting()">提交</a>'+
								'</div>';
						var room='<div class="detail roomName"  onclick="selectRoom()" style="color:#258de5;">'+
										"请选择"+
									'</div>';
					}else{
						
						var room='<div class="detail roomName" >'+
										res.name+
									'</div>';	
						if(deal=="1"&&!res.status){
							var btnArr='<div class=" btn" style="margin-top:6vh;">'+
											'<a href="#" class="button button-fill  button-big sure" onclick="closeMeeting('+id+')">结束</a>'+
										'</div>';
						}else{
							var btnArr='<div class=" btn">'+
											'<a href="#" class="button button-fill  button-big sure" onclick="closeWrap()" style="margin-top:20px;">确定</a>'+
										'</div>';
						}
								
					}
					if(res.hasVip){
						var leaderHtml='<div class="itemLine">'+
											'<div class="txt">'+
												'有无领导'+
											'</div>'+
											'<div class="detail">'+
												'有'+
											'</div>'+
										'</div>'+
										'<div class="itemLine">'+
											'<div class="txt">'+
												'领导备注'+
											'</div>'+
											'<div class="detail">'+
												res.vip+
											'</div>'+
										'</div>';
					}else{
						var leaderHtml='';
					}
					
					if(res.others){
						var name=[]
						otherA=res.others.split(",");
						for(var i=0;i<otherA.length;i++){
							var arr=get_mem_infor(otherA[i])[3]
							name.push(arr)
						}
						var str=name.toString();
						var other='<div class="itemLine">'+
									'<div class="txt">'+
										'与会人员'+
									'</div>'+
									'<div class="detail">'+
										str+
									'</div>'+
								'</div>';
					}else{
						var other="";
					}
					
					var html='<div class="cont">'+
								
								'<div class="itemLine">'+
									'<div class="txt ">'+
										'会议室'+
									'</div>'+
									room+
								'</div>'+
								'<div class="itemLine">'+
									'<div class="txt">'+
										'联系人'+
									'</div>'+
									'<div class="detail">'+
										res.contact+
									'</div>'+
								'</div>'+
								
								'<div class="itemLine">'+
									'<div class="txt">'+
										'联系方式'+
									'</div>'+
									'<div class="detail">'+
										res.contactPhone+
									'</div>'+
								'</div>'+
								'<div class="itemLine">'+
									'<div class="txt">'+
										'会议内容'+
									'</div>'+
									'<div class="detail">'+
										res.meetingContent+
									'</div>'+
								'</div>'+
								'<div class="itemLine">'+
									'<div class="txt">'+
										'会议服务'+
									'</div>'+
									'<div class="detail">'+
										getMeetingServe(res.service)+
									'</div>'+
								'</div>'+
								other+
								leaderHtml+
								
							'</div>';
					$("#meetingSys_admin .btnWrap").append(btnArr)	
					$("#meetingSys_admin .inforWrap").append(html)
					$(".lookMore").css({display:"flex",display:"-webkit-flex"})

		}
	});
}
function getMeetingServe(idStr){
	var str=''
	$.ajax({
		type:"post",
		url:"/api/Event/get_serve_name",
		data:{
			id:idStr
		},
		async:false,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},success:function(res){
			if(res.HttpData.data[0].txt){
				var dat=res.HttpData.data[0].txt;
				str=dat.substring(0,dat.length-1)
			}
		}
		
	});
	return str;
}
//closeMeeting(1)
function closeMeeting(ids){
	$(".lookMore").css({display:"flex",display:"none"})
	$.ajax({
		type:"post",
		url:"/api/Event/set_meet_end",
		async:true,
		data:{
			id:ids,
			memId:window.localStorage.userNameApp
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},success:function(res){
			if(res.HttpData.data==1){
				$("#meet_"+ids).find(".switchStatus ").addClass("ed").text("已结束")
				goOn(ids)
			}else{
				myApp.alert("会议结束失败","温馨提示")
			}
			
		}
	});

	function goOn(ids){

	$.ajax({
		type:"post",
		url:"/api/Event/get_apraise_list",
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			
			var dat=res.HttpData.data;
			for(var i=0;i<dat.length;i++){
				var list={
					id:dat[i].id,
					max:dat[i].maxScore,
					value:0
				}
				apraise.push(list)
				var html='<li>'+
				    		'<div class="tit">'+dat[i].text+'</div>'+
				    		'<div class="iWrap" >'+
				    			'<i class="iconfont icon-xingxing" onclick="addStar(this,1)"></i>'+
				    			'<i class="iconfont icon-xingxing" onclick="addStar(this,2)"></i>'+
				    			'<i class="iconfont icon-xingxing" onclick="addStar(this,3)"></i>'+
				    			'<i class="iconfont icon-xingxing" onclick="addStar(this,4)"></i>'+
				    			'<i class="iconfont icon-xingxing" onclick="addStar(this,5)"></i>'+
				    		'</div>'+
				    	'</li>';
				 $(".meetingApraise ul").append(html)
			}
			$(".meetingApraise ul").append(
						'<li>'+
				    		'<div  class="tit">建议或意见</div>'+
				    		'<div class="iWrap txt" >'+
				    			'<textarea  placeholder="请留下您宝贵的建议或意见"></textarea>'+
				    		'</div>'+
				    	'</li>'
				  )
			var btnHtm=	'<div class="btn">'+
							'<button class="button button-big button-fill" onclick="closeAppraise('+ids+')">评价</button>'+
						'</div>';
			$(".meetingApraise .roomCon").append(btnHtm)
			$(".meetingApraise").show();
		}
	})
		}
}
function addStar(dom,score){
	var ind=$(dom).index()
	var indapr=$(dom).parents("li").index();
	
	apraise[indapr]["value"]=score;
	
	$(dom).parent().find("i").each(function(){
		if($(this).index()<=ind){
			$(this).addClass("icon-xingxing1").removeClass("icon-xingxing")
		}else{
			$(this).addClass("icon-xingxing").removeClass("icon-xingxing1")
		}
	})
}
function closeAppraise(ids){
//	$(".lookMore").css({display:"flex",display:"none"})
	var txt=$(".meetingApraise textarea").val(),
		id=ids,
		cont=JSON.stringify(apraise);
	$.ajax({
		type:"post",
		url:"/api/Event/set_meeting_appraise",
		async:true,
		data:{
			id:id,
			comment:txt,
			score:cont
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			
			if(res.HttpData.data==1){
				myApp.alert("评价成功","温馨提示")
				$(".meetingApraise").hide();
				$(".meetingApraise ul").html("");
				$(".meetingApraise .btn").remove();
				
			}else{
				myApp.alert("评价失败,请重试","温馨提示")
			}
		}
	});

}
function upMeeting(){
	
	
	var id=$("#meetId").val(),
		approver=window.localStorage.userNameApp,
		result=$("#resultAgree").val(),
		room=$("#roomId").val();
	if(room==""){
		myApp.alert("请选择会议室","温馨提示")
	}else{
		$.ajax({
			type:"post",
			url:"/api/Event/set_this_meet_result",
			data:{
				approver :approver,
				room:room,
				result :result,
				id :id 
			},
			headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
			async:true,
			success:function(res){
				if(res.HttpData.data==1){
					get_all_meeting()
					$(".lookMore").css({display:"none"})
					
					myApp.alert("操作成功","温馨提示")
				}
			}
			
		})
	}
		
		
}
function closeWrap(){
	$(".lookMore").css({display:"none"})
	
}

function get_thisDay_meeting(date,id){
	$.ajax({
		type:"post",
		url:"/api/Event/get_today_meet_simple",
		async:true,
		data:{
			time:date
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			loadmeetingHtml(res.HttpData.data,date,id)
		}
	});
}
function loadmeetingHtml(date,time,id){
	$("#"+id).find(".meetList").html("")
	var meetList="";
	var len=date.length;
	if(len==0){
		meetList='<div class="row no-gutter name">'+
						'<div class="col-100">暂无会议安排</div>'+
						
					'</div>';
	}else{
		for(var i=0;i<len;i++){
			var timer=getMinuDiff(getNowTime(),date[i].begintime.replace("T"," "))
			var status="",col="",type="";
			if(date[i].status){
				status="已结束";
				col="ed"
			}else{
				if(timer){
					status="进行中";
					col="ing"
				}else{
					status="未开始";
					
				}
			}
			switch (date[i].type)
			{
				case 0:
					type="培训"
				break;
	
				case 1:
					type="一级"
				
				break;
				
				case 2:
					type="二级"
				
				break;
				case 3:
					type="其他"
				
				break;
			}
			meetList+='<div class="row no-gutter name" id="meet_'+date[i].id+'" onclick="look_this_meeting('+date[i].id+',1)">'+
							'<div class="col-20">'+
								getTime(date[i].begintime)+
							'</div>'+
							'<div class="col-20">'+
								getTime(date[i].endTime)+
							'</div>'+
							'<div class="col-20">'+
								type+
							'</div>'+
							'<div class="col-20">'+
								date[i].meetroom+
							'</div>'+
							'<div class="col-20">'+
								'<div class="switchStatus '+col+'"> '+
									status+
								'</div>'+
							'</div>'+
						'</div>';
		}
	}
	

	$("#"+id).find(".meetList").append(meetList)
						
					
	
}
function loadCreat(){
	mainView.router.loadPage("createMetting.html")
}
function lookThis(id){
//	lookInfor(id)
	mainView.router.loadPage("meetDetail.html")
}
function selectRoom(){
	
	$(".room ul").html("")
	$.ajax({
		type:"post",
		url:"/api/Event/get_room_infor",
		async:true,
		data:{
			isAll :"all"
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			$(".roomPicker").show();
			var dat=res.HttpData.data;
			for(var i=0;i<dat.length;i++){
				var html='<li onclick="chooseRoom(this)">'+
						     ' <label class="label-radio item-content">'+
						       ' <input type="radio" name="my-radio" value="'+dat[i].id+'">'+
						      '  <div class="item-media">'+
						         ' <i class="icon icon-form-radio"></i>'+
						       ' </div>'+
						       ' <div class="item-inner">'+
						         ' <div class="item-title">'+dat[i].name+'</div>'+
						        '</div>'+
						     ' </label>'+
						  '  </li>';
				$(".room ul").append(html)
			}
		}
	});
}
function closeRoom(){
	$(".roomPicker").hide();
}
function agreeChange(dom){
	$(dom).siblings().find("input").prop("checked",false);
	$("#resultAgree").val($(dom).find("input").val())
}
function chooseRoom(dom){
	$(".roomName").text($(dom).find(".item-title").text());
	$("#roomId").val($(dom).find("input").val());
}
function look_this_meeting(id,deal){
	lookInfor(id,deal)
}

