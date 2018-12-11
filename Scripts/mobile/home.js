//首页事件

function onHomePage() {
	

	var u = navigator.userAgent, app = navigator.appVersion; 
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 

	if(isiOS){

		$('body').css({paddingTop:"20px",background:"#258de5",boxSizing:"border-box"})

	}
	

	$(".notHomeBar").css({"background":"none"})
   	$.ajax({
		type:"post",
		url: '/api/server/getkey',
        dataType: "json",
        async:true,
        data: {
            username:'qaz12wsx34',
            userpwd: 'wanwsx123'
        },success:function(dt){
        	if (dt.HttpStatus == 200) {
                var dts = dt.HttpData;
                if (dts.code == 200) {
                    var getkeys = dts.data;
                    window.localStorage.ac_appkey = getkeys.appkey;
                    window.localStorage.ac_infokey = getkeys.infokey;
                }
            }else{
            	
            }

        }
	});
	$('html').removeClass('with-statusbar-overlay');
//	myApp.alert( window.localStorage.ac_appkey)
//	mainView.router.loadPage("accessControlSys.html")
//	mainView.router.loadPage("wardrobeSys.html")
//  mainView.router.loadPage("visitorSys_admin.html")
//	mainView.router.loadPage("visitorSys.html")
//	mainView.router.loadPage("meetingSys.html")
//  mainView.router.loadPage("meetingSys_admin.html")
//	mainView.router.loadPage("createMetting.html")
//	mainView.router.loadPage("Voice.html")
//	mainView.router.loadPage("myPermision.html")
//	mainView.router.loadPage("proPermission.html")
//	mainView.router.loadPage("permisionApp.html")
//	mainView.router.loadPage("permisionApp_admin.html")
//	mainView.router.loadPage("meetDetail.html")
//	mainView.router.loadPage("serverAppraise.html")
//  mainView.router.loadPage("accessConLeader.html")
//	myApp.alert(window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey)



	$(".list-page").click(function(e){
		e.stopPropagation()
	})
	if(localStorage.backurl){
		loadHome()

	}

	
	
}

function loadHome(){
	$(".prog .itemLine").html("")
	var infor=get_mem_infor(window.localStorage.userNameApp);
	
	$("#home .infor .name").text(infor[3]);
	$("#home .infor .part span").text(infor[1]);
	$(".leftPanel .name").text(infor[3]);
	window.localStorage.memName=infor[3];
	
	var mj=`<div class="itemOne" onclick="goPage('accessControlSys.html')">
   				<div class="imgWrap">
   					<img src="../../Image/bank/menjin.png" alt="" />
   				</div>
   				<p>门禁系统</p>
			</div>`;
    var gyg=`<div class="itemOne" onclick="goPage('wardrobeSys.html')">
   				<div class="imgWrap">
   					<img src="../../Image/bank/gengyi.png" alt="" />
   				</div>
   				<p>更衣柜系统</p>
   			</div>`;
   	var vis=`<div class="itemOne" onclick="goPage(2)">
       				<div class="imgWrap">
       					<img src="../../Image/bank/fangke.png" alt="" />
       				</div>
       				<p>访客系统</p>
       			</div>
       			<div class="itemOne" style="background:none;box-shadow:none;">
     			</div>`;
    var html=`
       			<div class="itemOne" onclick="goPage(3)">
       				<div class="imgWrap">
       					<img src="../../Image/bank/meating.png" alt="" />
       				</div>
       				<p>会议系统</p>
       			</div>
       			<div class="itemOne" style="background:none;box-shadow:none;">
     			</div>`;
    
    $(".prog .itemLine").append(vis)
		
//	if(infor[7]){
////		如果是管理员
////0：一卡通  隐藏门禁,更衣柜,访客今日访客,会议审批
////1：门禁   隐藏更衣柜,访客今日访客,会议审批
////2：梯控   隐藏门禁,更衣柜,访客今日访客,会议审批
////3：更衣柜  隐藏门禁,访客今日访客,会议审批
////4：消费  隐藏门禁,更衣柜,访客今日访客,会议审批
////5：打印机   隐藏门禁,更衣柜,访客今日访客,会议审批
////6：会议   隐藏门禁,更衣柜,访客今日访客
////7：访客   隐藏门禁,更衣柜,会议审批
//		if(infor[8].indexOf("1")!=-1){
////			$(".prog .itemLine").append(mj)
//			if(infor[6]){
//				var num=get_dep_num(window.localStorage.userNameApp);
//				loadmjIsLeader(num)
//			}else{
//				$(".prog .itemLine").append(mj);
//			}
//		}
//		if(infor[8].indexOf("3")!=-1){
//			$(".prog .itemLine").append(gyg)
//		}
//		$(".prog .itemLine").append(html)
//
//	}else if(infor[6]){
//		var  leadermj='';
//
//		
//	}else{
//		$(".prog .itemLine").append(html)
//	}
}
function loadmjIsLeader(num){
		if(num==0){
			var leadermj=`<div class="itemOne" onclick="goPage('accessConLeader.html')">
		   				<div class="imgWrap">
		   					<img src="../../Image/bank/menjin.png" alt="" />
		   				</div>
		   				<p>门禁系统</p>
				</div>`
		}else{
			if(num<100){
				var leadermj=`<div class="itemOne" onclick="goPage('accessConLeader.html')">
						<span class="tag  badge">${num}</span>
		   				<div class="imgWrap ">
		   					<img src="../../Image/bank/menjin.png" alt="" />
		   				</div>
		   				<p>门禁系统</p>
				</div>`
			}else if(num>=100){
				var leadermj=`<div class="itemOne" onclick="goPage('accessConLeader.html')">
						<span class="tag  badge">99</span>
		   				<div class="imgWrap ">
		   					<img src="../../Image/bank/menjin.png" alt="" />
		   				</div>
		   				<p>门禁系统</p>
				</div>`
			}
			
		}
		$(".prog .itemLine").append(leadermj)


		
}
//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        }
        else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}
function goPage(url){
//	var infor=get_mem_infor(window.localStorage.userNameApp);
	mainView.router.loadPage('visitorSys_admin.html');
//	if(url==2){
//		if(infor[7]&&infor[8].indexOf('7')!=-1){
//			mainView.router.loadPage('visitorSys_admin.html');
//		}else{
//			mainView.router.loadPage('visitorSys.html');
//		}
//	}else if(url==3){
//		if(infor[7]&&infor[8].indexOf('6')!=-1){
//			mainView.router.loadPage('meetingSys_admin.html');
//		}else{
//			mainView.router.loadPage('meetingSys.html');
//		}
//	}else {
//		mainView.router.loadPage(url);
//	}
	
}
function loadHtmls(url){
	if(url=='sp'){
		var infor=get_mem_infor(window.localStorage.userNameApp)
		if(infor[7]){
			mainView.router.loadPage('permisionApp_admin.html')
		}else if(infor[6]){
			mainView.router.loadPage('permisionApp.html')
		}
	}else{
		mainView.router.loadPage(url)
	}
	
}
function get_dep_num(leaderNo){
	var num=0;
	$.ajax({
		type:"post",
		url:"/api/Event/get_depar_proper_num",
		async:false,
		data:{
			leaderNo :leaderNo 
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			if(res.HttpStatus==200&&res.HttpData.data.length!=0){
				num=res.HttpData.data[0].num
			}
		}
	});
	return num;
}
