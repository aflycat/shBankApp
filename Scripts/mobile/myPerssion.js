function myPerssion(){
	myApp.closePanel();
	var infor=get_mem_infor(window.localStorage.userNameApp)
	getMyPersion(infor[9]);
//	var myPerssion=$$(".myPerssion");
//	myPerssion.on('refresh',function(){
//		 setTimeout(function () {
//		 	$("#myPerssion .con").html("")
//		    getMyPersion();
//		    
//	        myApp.pullToRefreshDone();
//	    }, 2000);
//	});

}
function goHome(){
	mainView.router.loadPage("home.html")
}
function getMyPersion(cardNo){
		$.ajax({
			type:"post",
			url:"/api/Event/get_permision_status",
			async:true,
			headers:{
				Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			},
			data:{
				id:cardNo
			},
			success:function(res){
				var dat=res.HttpData.data[0];
				$(".mjStatus").text(get_tatus(dat.mjStatus));
				$(".gygStatus").text(get_tatus(dat.gygStatus));
				$(".dyjStatus").text(get_tatus(dat.dyjStatus));
				$(".xfStatus").text(get_tatus(dat.xfStatus));
				$(".tkStatus").text(get_tatus(dat.tkStatus));
				if(dat.mjStatus==1||dat.mjStatus==2){
					get_permision_detail(0,cardNo)
				}
				if(dat.gygStatus==1||dat.gygStatus==2){
					get_permision_detail(1,cardNo)
				}
				if(dat.dyjStatus==1||dat.dyjStatus==2){
					get_permision_detail(2,cardNo)
				}
				if(dat.xfStatus==1||dat.xfStatus==2){
					get_permision_detail(3,cardNo)
				}
				if(dat.tkStatus==1||dat.tkStatus==2){
					get_permision_detail(4,cardNo)
				}
				
			}
		});
}
function get_tatus(sta){
	var txt=""
	
	switch (sta)
	{
		case 0:
			txt="未授权"
		break;
		case 1:
			txt="已授权"
		break;
		case 2:
			txt="待撤销"
		break;
		case 3:
			txt="冻结"
		break;
		
	}
	return txt;
}
function get_permision_detail(type,cardNo){
	$.ajax({
		type:"post",
		url:"/api/Event/get_permision_detail",
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		data:{
			id:cardNo,
			type:type
		},
		success:function(res){
			render_html(type,res.HttpData.data)
		}
	})
}
function render_html(type,data){
	var html="";
//	console.log(data)
	switch (type)
	{
		case 0:
			$("#mj").html("")
			for(var i=0;i<data.length;i++){
				html='<li class="item-content">'+
					          '<div class="item-inner">'+
					            '<div class="item-title">'+data[i].groupName+'</div>'+
					          '</div>'+
					       ' </li>';
				$("#mj").append(html)
			}
		break;
		case 1:
			$("#gyg").html("")
			
			html='<li class="item-content">'+
			          '<div class="item-inner">'+
			          '<div class="item-title">更衣柜名称</div>'+
			          '  <div class="item-title">'+data[0].name+'</div>'+
			          '</div>'+
			       ' </li>';
			$("#gyg").append(html)       
		break;
		case 2:
			$("#dyj").html("");
			var txt=data[0].dyj?"可用":"冻结"
			html='<li class="item-content">'+
			          '<div class="item-inner">'+
			          '<div class="item-title">权限详情</div>'+
			          '  <div class="item-title">'+txt+'</div>'+
			          '</div>'+
			       ' </li>';
			$("#dyj").append(html)       
		break;
		case 3:
			$("#xf").html("");
			var txt=data[0].xf?"可用":"冻结"
			html='<li class="item-content">'+
			          '<div class="item-inner">'+
			          '<div class="item-title">权限详情</div>'+
			          '  <div class="item-title">'+txt+'</div>'+
			          '</div>'+
			       ' </li>';
			$("#xf").append(html)       
		break;
		case 4:
			$("#tk").html("")
			var arr=data[0].tk.split(",")
			for(var i=0;i<arr.length;i++){
				html='<li class="item-content">'+
					          '<div class="item-inner">'+
					            '<div class="item-title">'+arr[i]+'层</div>'+
					          '</div>'+
					       ' </li>';
				$("#tk").append(html)
			}
		break;
	}
}
