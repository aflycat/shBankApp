//门禁
$$(document).on("pageBeforeInit", ".page[data-page='accessControlSys']", function (e) {
        initPageJS('accessControlSys', '/Scripts/mobile/');
});
//门禁
$$(document).on("pageBeforeInit", ".page[data-page='accessConLeader']", function (e) {
        initPageJS('accessConLeader', '/Scripts/mobile/');
});

//更衣柜
$$(document).on("pageBeforeInit", ".page[data-page='wardrobeSys']", function (e) {
        initPageJS('wardrobeSys', '/Scripts/mobile/');
});
//访客
$$(document).on("pageBeforeInit", ".page[data-page='visitorSys_admin']", function (e) {
// 		initTimer()
//		listDay()
getSetTime()
        initPageJS('visitorSys_admin', '/Scripts/mobile/');
});
//访客
$$(document).on("pageBeforeInit", ".page[data-page='visitorSys']", function (e) {
// 		initTimer()

        initPageJS('visitorSys', '/Scripts/mobile/');
});
//会议管理员
$$(document).on("pageBeforeInit", ".page[data-page='meetingSys_admin']", function (e) {
	
    initPageJS('meetingSys_admin', '/Scripts/mobile/');
});
//会议
$$(document).on("pageBeforeInit", ".page[data-page='meetingSys']", function (e) {
	
    initPageJS('meetingSys', '/Scripts/mobile/');
});
//点餐
$$(document).on("pageBeforeInit", ".page[data-page='mealSys']", function (e) {
        initPageJS('mealSys', '/Scripts/mobile/');
});
//会议申请
$$(document).on("pageBeforeInit", ".page[data-page='createMetting']", function (e) {
		var page=e.detail.page;
		var url=page.fromPage.url;
		$("#url").val(url)
        initPageJS('createMetting', '/Scripts/mobile/');
    
});
//我的权限
$$(document).on("pageBeforeInit", ".page[data-page='myPerssion']", function (e) {
    	
        initPageJS('myPerssion', '/Scripts/mobile/');
    
});
//会议详情
$$(document).on("pageBeforeInit", ".page[data-page='meetDetail']", function (e) {
        initPageJS('meetDetail', '/Scripts/mobile/');
    
});
//服务评价
$$(document).on("pageBeforeInit", ".page[data-page='serverAppraise']", function (e) {
        initPageJS('serverAppraise', '/Scripts/mobile/');
    
});
//权限申请
$$(document).on("pageBeforeInit", ".page[data-page='proPermission']", function (e) {
        initPageJS('proPermission', '/Scripts/mobile/');
    
});
//权限审批
$$(document).on("pageBeforeInit", ".page[data-page='permisionApp']", function (e) {
        initPageJS('permisionApp', '/Scripts/mobile/');
    
});
//权限审批_admin
$$(document).on("pageBeforeInit", ".page[data-page='permisionApp_admin']", function (e) {
        initPageJS('permisionApp_admin', '/Scripts/mobile/');
    
});
function getSetTime(){
	var today = new Date();
 
var pickerInline = myApp.picker({
    input: '#picker-date',
    container: '#picker-date-container',
    toolbar: false,
    rotateEffect: true,
 
    value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
 
    onChange: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
        }
    },
 
    formatValue: function (p, values, displayValues) {
        return values[2] + '/' + displayValues[0] + '/' + values[1] +' ' + values[3] + ':' + values[4];
    },
 
    cols: [
        // Months
        {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
            textAlign: 'left'
        },
        // Days
        {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
        // Years
        {
            values: (function () {
                var arr = [];
                for (var i = 2010; i <= 2090; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Space divider
        {
            divider: true,
            content: '  '
        },
        // Hours
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        // Minutes
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                return arr;
            })(),
        }
    ]
});     
}


function listDay(){
	var today = new Date();
	var pickerCustomToolbar = myApp.picker({
	    input: '#listDay',
	    rotateEffect: true,
	   
	    toolbarTemplate: 
	        '<div class="toolbar">' +
	            '<div class="toolbar-inner">' +
	                '<div class="left">' +
	                    '<a href="#" class="link toolbar-randomize-link close-picker">取消</a>' +
	                '</div>' +
	                '<div class="right">' +
	                    '<a href="#" class="link close-picker" onclick="getNewDay()">确定</a>' +
	                '</div>' +
	            '</div>' +
	        '</div>',
	    value: [today.getFullYear(),today.getMonth()+1, today.getDate()],
 		formatValue: function (p, values, displayValues) {
			var mon='',day=""
			if(values[1]<10){
				mon='0'+values[1]
			}else{
				mon=values[1]
			}
			if(values[2]<10){
				day='0'+values[2]
			}else{
				day=values[2]
			}
	        return values[0] + '-' + mon+ '-' + day
	    },
	    cols: [
	    	{
	            values: (function () {
	                var arr = [];
	                for (var i = 2010; i <= 2230; i++) { arr.push(i); }
	                return arr;
	            })(),
	            textAlign: 'center'
	        },
		    {
	            values: [01,02 ,03, 04 ,05 ,06 ,07 ,08 ,09 ,10 ,11 ,12],
//	            displayValues: '01,02,03,04,05,06,07,08,09,10,11,12').split(','),
	            textAlign: 'center'
	        },
	        {
	            values: [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
	            textAlign: 'center'
	        }
	        
	       
	       
	    ],
	    onChange: function (picker, values, displayValues) {
	        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
	        if (values[1] > daysInMonth) {
	            picker.cols[1].setValue(daysInMonth);
	        }
	    },
	});
}
function getNewDay(){
	$(".week-ul").remove();
	$(".schedule-bd").remove();
//	$(".dateList").html(" ")
	var datas=$("#listDay").val();
	mySchedule=null;
	mySchedule = new Schedule({
		el: '#schedule-box',
		date:datas,
	});
	
	$("#listDay").val(datas)
	
}
