function radar_option_data(is_fullscreen){
	var data = {};
	var fields = [];
	var radius;
	$.ajax({
		url:'/api/shop_num/radar',
		type:'GET',
		async:false,
		success:function(res){
			data = res.data.data;
			fields = res.data.fields;
		},
		error:function(err){
			console.error(err);
		}
	});

	if(is_fullscreen){
		radius = 220;
	}else{
		radius = 90;
	}

	option = {
	    title : {
	    	x:'center',
	        // text: '手机占有率',
	        // subtext: '虚构数据'
	        text: '内乡县(各乡、镇)总店铺数据对比',
	        subtext: '',
	        textStyle: {
			    fontSize: 12,
			    // fontWeight: 'bolder',
			    color: '#fff'          // 主标题文字颜色
			},
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    // legend: {
	    //     x : 'center',
	    //     data:['罗纳尔多','舍普琴科']
	    // },
	    toolbox: {
	        show : false,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    polar : [
	        {
	            indicator : fields,
	            radius : radius,
	            name:{
	            	show:true,
	            	textStyle:{
	            		color:'#FFF'
	            	}
	            }
	        }
	    ],
	    series : [
	        {
	            name: '内乡县店铺数量对比',
	            type: 'radar',
	            itemStyle: {
	                normal: {
	                    areaStyle: {
	                        type: 'default',
	                    },
	                }
	            },
	            data : data
	        }
	    ]
	};
                    
	return option;
}