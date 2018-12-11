function accessConLeader(){
	var resData=null;
	getFloorData(1)

	var mySwiper = new Swiper('.swiperWrap', {
			autoplay: false,//可选选项，自动滑动
			slidesPerView : 5,
//			loop:true,
			on:{
				click:function(dom){
					var id=mySwiper.clickedIndex;

					$(".swiper-slide").eq(id).addClass("check").siblings().removeClass("check")
					getFloorData(mySwiper.clickedSlide.id)
				}
			}
		})
	$(".preSide").click(function(){
		mySwiper.slidePrev();
	})
	$(".nextSide").click(function(){
		mySwiper.slideNext();
	})
	
	
	$(".memChoose").click(function(){
		$(this).css({display:"none"})
	})
	$(".memCon").click(function(e){
		e.stopPropagation()
	})
	getList();
	var ptrContent=$$('.pull-to-refresh-content');
	myApp.destroyPullToRefresh(ptrContent)
	$(".itemList .con").scroll(function(){
		var height=$(this).scrollTop();
		if(height==0){
			myApp.initPullToRefresh(ptrContent)
		}else{
			myApp.destroyPullToRefresh(ptrContent)
		}
	})
	ptrContent.on('refresh',function(){
		setTimeout(function(){
			getList();
			myApp.pullToRefreshDone();
		},2000)
		
	})
}
function getList(){
	var infor=get_mem_infor(window.localStorage.userNameApp);
	
	if(infor[6]){
		//领导
		loadLeader(infor[0])
	}
}
function loadLeader(leaderNo ){
	
	$.ajax({
		type:"post",
		url:"/api/Event/get_depar_proPer",
		async:true,
		data:{
			leaderNo :leaderNo 
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			var dat=res.HttpData.data;
			loadHtml(dat)
		}
	});
}
function loadHtml(dat){
	$(".itemList .con").html("")
	for(var i=0;i<dat.length;i++){
		var noPro="",txt="未审批",btn='<div id='+dat[i].id+' class="row '+noPro+'" >';
		if(dat[i].result==null){
			noPro="noPro";
			btn='<div id='+dat[i].id+' class="row '+noPro+'" onclick="lookThisPro('+dat[i].id+',\''+dat[i].subTime+'\',\''+dat[i].subAuth+'\')">'
		}else if(dat[i].result==1){
			txt="同意"
		}else if(dat[i].result==0){
			txt="不同意"
		}
		var html=btn+
					'<div class="col-33">'+
						dat[i].name+
					'</div>'+
					'<div class="col-33">'+
						'门禁权限'+
					'</div>'+
					'<div class="col-33">'+
						txt+
					'</div>'+
				 '</div>';
		dat[i].result==null?$(".itemList .con").prepend(html):$(".itemList .con").append(html);
	}
}
function lookThisPro(id,time,txt){
	$("#proId").val(id);
	$(".memCon .time").text(time.replace("T"," "));
	$(".memCon .text").text(txt);
	$(".memChoose").css({"display":"flex"});
}
function getFloorData(floor){
	$.ajax({
		type:"post",
		url:"/api/Event/get_floor_mj",
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		data:{
			floor:floor
		},
		async:true,
		success:function(res){
			loadContData(res.HttpData.data)
		}
	});
}
function loadContData(data){
	$(".cont").html("");
	for(var i=0;i<data.length;i++ ){

		var conHtml ='<div class="row no-gutter " >'+
						'<div class="col col-15">'+
							'<i class="iconfont icon-mensuofuwu-"></i>'+
						'</div>'+
						'<div class="col col-25">'+data[i].name+'</div>'+
						'<div class="col col-20"  onclick="openDoor()">'+
							'<div class="remoteBtn">'+
								'开门'+
							'</div>'+
						'</div>'+
						'<div class="col col-20">'+
				            '<label class="label-switch" onclick="normalOpen(this)">'+
				             ' <input type="checkbox">'+
				             ' <div class="checkbox "></div>'+
				           ' </label>'+
						'</div>'+
						'<div class="col col-20">'+
							'<label class="label-switch" onclick="normalClose(this)">'+
				              '<input type="checkbox">'+
				              '<div class="checkbox"></div>'+
				           ' </label>'+
						'</div>'+
					'</div>';
		$(".cont").append(conHtml);
	}
	
}
function noAgree(){
	$(".memChoose").css({"display":"none"});
	var id= $("#proId").val();
	set_pro(id,0)
}
function agree(){
	$(".memChoose").css({"display":"none"});
	var id= $("#proId").val();
	set_pro(id,1)
}
function set_pro(id,res){
	$.ajax({
		type:"post",
		url:"/api/Event/set_pro_author",
		async:true,
		data:{
			id:id,
			res:res
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			if(res.HttpData.data==1){

					myApp.alert("操作成功","温馨提示");
					getList()

				
			}
		}
	});
}




function openDoor(){
	myApp.alert("开门成功","温馨提示")
	
}
function normalOpen(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		$(dom).parent().siblings(".col-20").removeClass("disabled")
	}else{
		$(dom).parent().siblings(".col-20").addClass("disabled")
	}
	
}