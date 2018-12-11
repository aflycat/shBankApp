$.ajax({
	type:"get",
	url:"/Views/login.html",
	async:true,
	success:function(res){
//		$("#bg").attr("src","../../Image/bank/menjin.png");
		$("#gygbg").attr("src","../../Image/bank/gengyi.png");
		$("#fkbg").attr("src","../../Image/bank/fangke.png");
		$("#hybg").attr("src","../../Image/bank/meating.png");
		$("#dcbg").attr("src","../../Image/bank/diancan.png");
		$("#mj").attr("src","../../Image/bank/menjin.png");
	}
});