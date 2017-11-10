function logline_option_data(is_fullscreen){
	var option = {
	   title: {
	       text: "2016内乡县电子商务十强县实力对比",
	       x: "center",
	       textStyle : {
                color: '#fff',
                fontSize:10
            }
	   },
	   color:['#1BB2D8'],
	   tooltip: {
	       trigger: "item",
	       formatter: "{a} <br/>{b} : {c}"
	   },
	   legend: {
	   		show:false,
	       x: 'left',
	       data: ["其他", "城关镇", "夏馆镇", "师岗镇", "马山口镇", "湍东镇", "赤眉镇", "瓦亭镇", "桃溪镇",'王店镇','灌涨镇','板场乡','大桥乡','赵店乡','七里坪乡','余关乡','乍曲乡']
	   },
	   xAxis: [
	       {
	           type: "category",
	           name: "乡镇",
	           splitLine: {show: true},
	           data: ["其他", "城关镇", "夏馆镇", "师岗镇", "马山口镇", "湍东镇", "赤眉镇", "瓦亭镇", "桃溪镇",'王店镇','灌涨镇','板场乡','大桥乡','赵店乡','七里坪乡','余关乡','乍曲乡'],
	           axisLabel:{
            	textStyle:{
            		// align: <各异>,
                    // baseline: <各异>,
                    // fontFamily: 'Arial, Verdana, sans...',
                    // fontSize: 12,
                    // fontStyle: 'normal',
                    // fontWeight: 'normal',
            		color:'#FFF'
            	}
            }
	       }
	   ],
	   yAxis: [
	       {
	           type: "log",
	           name: "数量",
	           axisLabel : {
                textStyle:{
                	// align: <各异>,
                    // baseline: <各异>,
                    // fontFamily: 'Arial, Verdana, sans...',
                    // fontSize: 12,
                    // fontStyle: 'normal',
                    // fontWeight: 'normal',
                	color:'#FFF'
                }
            }
	       }
	   ],
	    toolbox: {
	       show: false,
	       feature: {
	           mark: {
	               show: true
	           },
	           dataView: {
	               show: true,
	               readOnly: true
	           },
	           restore: {
	               show: true
	           },
	           saveAsImage: {
	               show: true
	           }
	       }
	   },
	   calculable: true,
	   series: [
	       {
	           name: "城关镇",
	           type: "line",
	           data: [102,158,147,189,176,235,269,243,296,330,321,12,20,60,78,298],
	           markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
	       },
	       {
	           name: "夏馆镇",
	           type: "line",
	           data: [50, 58, 64, 80, 110, 40, 268, 330, 400],
	           markPoint : {
	                data : [
	                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	       }
	   ]
	};
                
	return option;
}