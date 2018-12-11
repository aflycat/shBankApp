function proPermission(){
//	console.log("权限申请")
	var infor=get_mem_infor(window.localStorage.userNameApp);
	$("#name").val(infor[3]);
	$("#workNo").val(infor[0]);
	$("#cardNo").val(infor[9]);
	getLeader(infor[1])
}
function getLeader(dep){
	$.ajax({
		type:'post',
		url:'/api/Event/get_dep_leader',
		data:{
			department :dep
		},
		async:true,
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
			
		},
		success:function(res){
//			console.log(res)
			$("#leader").val(res.HttpData.data[0].workNo)
		}
		
	})
}
function upPermission(){
	var workNo=get_mem_infor(window.localStorage.userNameApp)[0],
		sysId =0,
		subTime =getNowTime(),
		subAuth =$("#des").val(),
		leaderNo =$("#leader").val();
		if(subAuth==""){
			myApp.alert("请填写权限描述信息","温馨提示")
		}else{
			$.ajax({
				type:"post",
				url:"/api/Event/set_pro_persision",
				async:true,
				data:{
					workNo :workNo,
					sysId :sysId,
					subTime :subTime,
					subAuth :subAuth,
					leaderNo :leaderNo
				},
				headers:{
					Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey
				},
				success:function(res){
					if(res.HttpStatus==200){
						if(res.HttpData.data==1){
							myApp.alert("申请成功","温馨提示")
							mainView.router.loadPage("myPermision.html")
						}
					}
				}
			});
		}
		
}
