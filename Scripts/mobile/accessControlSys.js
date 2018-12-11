function accessControlSys(){
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
//					loadContData(resData[id].data)
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
function normalClose(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		$(dom).parent().siblings(".col-20").removeClass("disabled")
	}else{
		$(dom).parent().siblings(".col-20").addClass("disabled")
	}
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
