function serverAppraise(){
//	console.log("serverAppraise")
	$("#serverAppraise i").click(function(){
		var ind=$(this).index()
		var iArr=$(this).parent().find("i");
		for(var i=0;i<iArr.length;i++)
			if(i<=ind){
				iArr.eq(i).removeClass("icon-xingxing").addClass("icon-xingxing1")
			}else{
				iArr.eq(i).addClass("icon-xingxing").removeClass("icon-xingxing1")
			}
//			console.log(ind)
	})
}
//function setStar(dom){
//	$(dom).find("i").each(function(i){
////		 ind;
//		$(this).click(function(){
//			
//		})
////		if(i<=ind){
////			console.log(i)
////			$(dom).find("i").eq(i).addClass("icon-xingxingxuanze").removeClass("icon-xingxing")
////		}
//	})
//}
