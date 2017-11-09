function rectangle_option_data (is_fullscreen){
	var data = {};
	$.ajax({
		url:'/api/shop_num/rect',
		type:'GET',
		async:false,
		success:function(res){
			data = res.data.data;
		},
		error:function(err){
			console.error(err);
		}
	});

	var option = {
	    title : {
	    	x:'center',
	        // text: '手机占有率',
	        // subtext: '虚构数据'
	        text: '内乡县(各乡、镇)电商实力对比',
	        subtext: '',
	        textStyle: {
			    fontSize: 12,
			    // fontWeight: 'bolder',
			    color: '#fff'          // 主标题文字颜色
			},
	    },
	    color:['#1BB2D8','#99D2DD','#88B0BB','#FFBBFF','#1C7099','#75ABD0','#038CC4'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b}: {c}"
	    },
	    toolbox: {
	        show : false,
	        color:'#FFF',
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : false,
	    series : [
	        {
	            name:'矩形图',
	            type:'treemap',
	            itemStyle: {
	                normal: {
	                    label: {
	                        show: true,
	                        formatter: "{b}",
	                        textStyle:{
	                        	color:'#FFF'
	                        }
	                    },
	                    borderWidth: 1
	                },
	                emphasis: {
	                    label: {
	                        show: true
	                    }
	                }
	            },
	            data:data
	        }
	    ]
	};
	return option;
}