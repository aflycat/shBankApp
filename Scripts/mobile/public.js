//获取星期几
function getWeek(dateStr){
	
	var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    // var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return weekDay[dateStr]
       
}

//获取日期
function getToday(){
	
	var myDate=new Date();
	var year=myDate.getFullYear();
	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
	var day=myDate.getDate()<10?("0"+myDate.getDate()):myDate.getDate();
	return year+"-"+mon+"-"+day;
}
function getNowTime(){
	var myDate=new Date();
	var year=myDate.getFullYear();
	var mon=(myDate.getMonth()+1)<10?("0"+(myDate.getMonth()+1)):(myDate.getMonth()+1);
	var day=myDate.getDate()<10?("0"+myDate.getDate()):myDate.getDate();
	var hours=(myDate.getHours())<10?("0"+myDate.getHours()):myDate.getHours();
	var min=(myDate.getMinutes())<10?("0"+myDate.getMinutes()):myDate.getMinutes();
	var sec=(myDate.getSeconds())<10?("0"+myDate.getSeconds()):myDate.getSeconds();
	return year+"-"+mon+"-"+day+" "+hours+":"+min+":"+sec
	
}
//获取今天和往后几天的日期
//var aa=getSevenDay(7)
//console.log(aa)
function getSevenDay(day){
	var dateArr=[];
	for(var i=0;i<day;i++){
		var today = new Date();  
	    var targetday_milliseconds=today.getTime() + 1000*60*60*24*i;          
	    today.setTime(targetday_milliseconds); //注意，这行是关键代码
	    var tYear = today.getFullYear();  
	    var tMonth = today.getMonth();  
	    var tDate = today.getDate();  
	    tMonth = doHandleMonth(tMonth + 1);  
	    tDate = doHandleMonth(tDate); 
	    var dat=tYear+"-"+tMonth+"-"+tDate;
	    dateArr.push(dat)
	}
	 
    return dateArr
}
function doHandleMonth(month){  
       var m = month;  
       if(month.toString().length == 1){  
          m = "0" + month;  
       }  
       return m;  
}
//获取时间
function getTime(str){
	var timeStr="";
	if(str.indexOf("T")!=-1){
		timeStr=str.split("T")[1].substring(0,5)
	}else{
		timeStr=str.split(" ")[1].substring(0,5)
	}
	return timeStr
}
//获取日期
function getDate(str){
	var timeStr="";
	if(str.indexOf("T")!=-1){
		timeStr=str.split("T")[0]
	}else{
		timeStr=str.split(" ")[0]
	}
	return timeStr
}
//返回月日
function getMonDay(str){
	var timeStr="";
	var arr=str.split("-");
	timeStr=arr[1]+"月"+arr[2]+"日";
	return timeStr
}
//判断时间大小
//var a=getMinuDiff("2018/08/13 12:00","2018/08/13 14:00")
//console.log(a)
function getMinuDiff(d1,d2){
  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
//根据卡号获取员工信息

function get_mem_infor(workNo){
	
//	console.log(carNum)
	var userArr=[];
	$.ajax({
		type:"post",
		url:"/api/Event/get_mem_infor_work",
		headers:{
					Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
				},
		async:false,
		data:{
			workNo :workNo
		},success:function(res){
//			console.log(res)
			var data=res.HttpData.data[0];
			var sex;
			data.sex==0?sex="男":sex="女";
			var arr=[];
			
			for(var i=0;i<res.HttpData.data.length;i++){
				arr.push(res.HttpData.data[i].type)
			}
			
			
			userArr=[
				data.workNo,
				data.department,
				data.mail,
				data.name,
				data.phone,
				sex,
				data.isLeader,//是不是领导
				data.bWork,//管理员工号
				arr.toString(),//管理员类型
				data.cardNo  //卡号
			]
		}
			
		
	});
//	console.log(userArr)
	return userArr;
}
function get_one_room(roomId){
	var name="";
	$.ajax({
		type:"post",
		url:"/api/Event/get_room_infor",
		async:false,
		data:{
			isAll:"one",
			id:roomId
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},
		success:function(res){
			name=res.HttpData.data[0].name;
		}
	});
	return name;
}
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
function set_err_log(str)
{
	$.ajax({
		type:"post",
		url:"/api/Event/set_err_log",
		async:true,
		data:{
			err:str
		},
		headers:{
			Authorization:window.localStorage.ac_appkey+"-"+window.localStorage.ac_infokey,
		},success:function(res){
//			console.log(res)
		}
	});
}
