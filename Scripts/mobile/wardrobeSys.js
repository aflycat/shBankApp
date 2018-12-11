function wardrobeSys(){
	
	getWardRobe(0)
	var ptrContent1 = $$('#male');
	var ptrContent2 = $$('#female');
	ptrContent1.on('refresh', function (e) {
    setTimeout(function () {
	       getWardRobe(0)
	        myApp.pullToRefreshDone();
	    }, 2000);
	});
	ptrContent2.on('refresh', function (e) {
    setTimeout(function () {
	       getWardRobe(1)
	        myApp.pullToRefreshDone();
	    }, 2000);
	});
	$("#male .con").scroll(function(e){
		if($(this).scrollTop()==0){
			
			myApp.initPullToRefresh(ptrContent1)
		}else{
			myApp.destroyPullToRefresh(ptrContent1)
		}
	})
	$("#female .con").scroll(function(e){
		if($(this).scrollTop()==0){
			
			myApp.initPullToRefresh(ptrContent2)
		}else{
			myApp.destroyPullToRefresh(ptrContent2)
		}
	})
}
function getWardRobe(sex){
	sex==0?$("#male .con").html(""):$("#female .con").html("")
	$.ajax({
		type:"post",
		data:{
			type:sex,
		},
		url:"/api/Event/get_gyg_sex",
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		async:true,
		
		success:function(res){
//			console.log(res)
			var datas=res.HttpData.data;
			loadHtml(datas,sex)
		}
	});
}
function loadHtml(data,sex){
//	console.log(data)
	
	for(var i=0;i<data.length;i++){
		var post="已分配",postCol='noArr',memName;
		if(data[i].status==0){
			post="未分配";
			postCol=''
		}
		if(data[i].memName){
			memName=data[i].memName
		}else{
			memName=""
		}
		
		var html='<div class="row no-gutter '+postCol+'">'+
						'<div class="col-25">'+data[i].name+'</div>'+
						'<div class="col-25">'+post+'</div>'+
						'<div class="col-25">'+memName+'</div>'+
						'<div class="col-25" onclick="openTheDoor()">'+
							'<div class="switchStatus">'+
								'开门'+
							'</div>'+
						'</div>'+
					'</div>';
		if(sex==0){
			appendChoose('#male',data[i].status,html)
		}else{
			appendChoose('#female',data[i].status,html)
		}
	}
	
}

function appendChoose(id,status,html){
	
	if(status=='0'){
		
		$(id+" .con").append(html)
	}else{
		$(id+" .con").prepend(html)
	}
}
function openTheDoor(){
	myApp.alert("开门成功",'温馨提示')
}
