function getpancake_option_data(is_fullscreen){

	var fields,field_datas,data,town_radius,category_radius,show_title;
	$.ajax({
        url:'/api/pancke',
        type:'GET',
        async:false,
        success:function(res){
            console.log(res);
            fields = res.data.fields;
            field_datas = res.data.field_datas;
            data = res.data.data;
            
        },
        error:function(err){
            console.error(err);
        }
    });

    if(is_fullscreen){
    	show_title = true;
    	town_radius = [50,100];
    	category_radius = [130,190];
	}else{
		show_title = false;
		town_radius = [30,60];
    	category_radius = [70,95];
	}
	var option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    color:['#1BB2D8','#99D2DD','#88B0BB','#FFBBFF','#1C7099','#75ABD0','#038CC4'],
	    title:{
	    	show:show_title,
	    	x:'center',
	        // text: '手机占有率',
	        // subtext: '虚构数据'
	        text: '数据直观显示',
	        subtext: '',
	        textStyle: {
			    fontSize: 12,
			    // fontWeight: 'bolder',
			    color: '#fff'          // 主标题文字颜色
			},
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:fields,
	        show:false
	    },
	    toolbox: {
	        show : false,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {
	                show: true, 
	                type: ['pie', 'funnel']
	            },
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : false,
	    series : [
	        // {
	        //     name:'访问来源',
	        //     type:'pie',
	        //     selectedMode: 'single',
	        //     radius : [0, 60],
	            
	        //     // for funnel
	        //     x: '10%',
	        //     width: '10%',
	        //     funnelAlign: 'right',
	        //     max: 1548,
	            
	        //     itemStyle : {
	        //         normal : {
	        //             label : {
	        //                 position : 'inner'
	        //             },
	        //             labelLine : {
	        //                 show : false
	        //             }
	        //         }
	        //     },
	        //     data:[
	        //         {value:335, name:'城关镇', selected:false},
	        //         {value:679, name:'夏馆镇', selected:false},
	        //         {value:1548, name:'师岗镇', selected:false},
	        //         {value:1548, name:'马山口镇', selected:false},
	        //         {value:335, name:'湍东镇', selected:false},
	        //         {value:679, name:'赤眉镇', selected:false},
	        //         {value:1548, name:'瓦亭镇', selected:false},
	        //         {value:1548, name:'桃溪镇', selected:false},
	        //         {value:335, name:'王店镇', selected:false},
	        //         {value:679, name:'灌涨镇', selected:false},
	        //         {value:1548, name:'板场乡', selected:false},
	        //         {value:1548, name:'大桥乡', selected:false},
	        //         {value:335, name:'赵店乡', selected:false},
	        //         {value:679, name:'七里坪乡', selected:false},
	        //         {value:1548, name:'余关乡', selected:false},
	        //         {value:1548, name:'乍曲乡', selected:false}
	        //     ]
	        // },
	        {
	            name:'category',
	            type:'pie',
	            radius : category_radius,
	            
	            // for funnel
	            x: '10%',
	            width: '10%',
	            funnelAlign: 'left',
	            max: 1048,
	            
	            data:field_datas
	        },
	        {
	            name:'town',
	            type:'pie',
	            radius : town_radius,
	            
	            // for funnel
	            x: '10%',
	            width: '10%',
	            funnelAlign: 'left',
	            max: 1048,
	            
	            data:data
	        }
	    ]
	};
	// var ecConfig = require('echarts/config');
	// myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param){
	//     var selected = param.selected;
	//     var serie;
	//     var str = '当前选择： ';
	//     for (var idx in selected) {
	//         serie = option.series[idx];
	//         for (var i = 0, l = serie.data.length; i < l; i++) {
	//             if (selected[idx][i]) {
	//                 str += '【系列' + idx + '】' + serie.name + ' : ' + 
	//                        '【数据' + i + '】' + serie.data[i].name + ' ';
	//             }
	//         }
	//     }
	//     document.getElementById('wrong-message').innerHTML = str;
	// })
	return option;
}
                    