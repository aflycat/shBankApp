function permisionApp_admin(){
	var infor=get_mem_infor(window.localStorage.userNameApp);
	loadAdmin(infor[8])
	myApp.closePanel();
	$(".memChoose").click(function(){
		$(this).css({display:"none"})
	})
	$(".memCon").click(function(e){
		e.stopPropagation()
	})
	var ptrContent=$$('.itemList');
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
			loadAdmin(infor[8])
			myApp.pullToRefreshDone();
		},2000)
		
	})
	
}
function loadAdmin(type){
	$.ajax({
		type:"post",
		url:"/api/Event/get_proPer",
		async:true,
		data:{
			type :type
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},success:function(res){
			var dat=res.HttpData.data;
			loadHtml(dat);
		}
	});
	
}
function loadHtml(dat){
	$(".itemList .con").html("")
	for(var i=0;i<dat.length;i++){
	
		var html='<div id='+dat[i].id+' class="row noPro" onclick="lookThisPro(\''+dat[i].subAuth+'\')">'+
					'<div class="col-33">'+
						dat[i].id+
					'</div>'+
					'<div class="col-33">'+
						dat[i].name+
					'</div>'+
					'<div class="col-33">'+
						'门禁权限'+
					'</div>'+
				 '</div>';
		$(".itemList .con").append(html);
	}
}
function lookThisPro(txt){
	$(".memCon .text").text(txt);
	$(".memChoose").css({"display":"flex"});
}
function closeModal(){
	$(".memChoose").css({"display":"none"});
	
}