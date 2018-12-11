
//登录
var terminal = null;
var urlSearch = '';
window.onload = function () {
    $.ajax({
        type: "post",
        url: "/api/server/version_adapt",
        data: "fromPath=",
        success: function (dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.code == 200) {
                if (dt.HttpData.data != '适配成功') {
                    $('#message').html('当前服务无法与AlarmCenter服务匹配!');
                    $('.btn').unbind();
                    $('.btn').bind('click', function () {
                        alert('无法登陆，未匹配AlarmCenter服务！');
                    });
                }
            }
        }
    });
    
    loadKey()
    
    var userName=window.localStorage.userNameApp,
    	userPWD=window.localStorage.userPWD;
    if(userName&&userPWD){
    	$("#userName").val(userName),
		$("#userPass").val(userPWD);
    	getResult(userName,userPWD);
    }
}
//是否记住密码
function remPass(dom){
	var check=$(dom).find('input').prop("checked");
	if(!check){
		$(dom).find('input').prop("checked",true)
		$(dom).find("i").addClass("remeber icon-duihao1")
		
	}else{
		$(dom).find('input').prop("checked",false)
		$(dom).find("i").removeClass("remeber icon-duihao1")
	}
}
function login(){
	var userName=$("#userName").val(),
		userPass=$("#userPass").val();
	if(userName==""){
		showNotice("用户名不能为空");
		return ;
	}else if(userPass==""){
		showNotice("密码不能为空");
		return ;
	}else{
		getResult(userName,userPass)
	}
}
function showNotice(txt){
	$(".loginNot").show();
	$(".loginNot").text(txt);
}
function loadKey(){

	$.ajax({
		type:"post",
		url: '/api/server/getkey',
        dataType: "json",
        data: {
            username:'qaz12wsx34',
            userpwd: 'wanwsx123'
        },success:function(dt){

        	if (dt.HttpStatus == 200) {
                var dts = dt.HttpData;
                if (dts.code == 200) {
                    var getkeys = dts.data;
                    window.localStorage.userName="qaz12wsx34";
                    window.localStorage.ac_appkey = getkeys.appkey;
                    window.localStorage.ac_infokey = getkeys.infokey;
                }
            }else{
            	showNotice("验证参数获取失败");
            }

        }
	});
}

function getResult(name,pass){
	if(pass.length==32){
		var pws=pass;
	}else{
		var pws=hex_md5(pass).toUpperCase();
	}
	
	var check=$("#remPass").prop("checked");

	$(".btn p").html("登陆中")
	$(".btn img").show()
	$.ajax({
		type:"post",
		url:"/api/Event/login_sh_bank",
		async:true,
		data:{
			userName :name,
			userPass :pws
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){

			$(".btn p").html("登陆")
			$(".btn img").hide()
			if(res.HttpStatus==200){
				
				if(res.HttpData==0){
					showNotice("用户名或密码错误");
				}else if(res.HttpData==1){
						window.localStorage.userNameApp=name;
						if(check){
							window.localStorage.userPWD=pws;
						}
						window.localStorage.terminal="Mobile.App";
						window.localStorage.backurl="webLogin"
						window.location.href="/Views/Mobile/home.html";
						
					
				}else if(res.HttpData==-1){
					showNotice("用户名不存在");
				}
			}
		}
	});
}

function SetCookie(name, value) {  
		// var Days = 30;  
	var exp = new Date();  
    exp.setTime(exp.getTime() + 1000*60*60);//过期时间7天  
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();  
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//回车事件
function onkeyiptEvent(event) {
    if (event.keyCode == 13) {
        login()
    }
}

