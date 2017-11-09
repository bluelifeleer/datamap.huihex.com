function columnar_option_data (is_fullscreen){

option = {
    title : {
	    	x:'center',
	        // text: '手机占有率',
	        // subtext: '虚构数据'
	        text: '内乡县农村电商交易额同比增长',
	        subtext: '',
	        textStyle: {
			    fontSize: 10,
			    // fontWeight: 'bolder',
			    color: '#fff'          // 主标题文字颜色
			},
	    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:[],
        textStyle: {
            color: '#fff'
        }
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日'],
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
    yAxis : [
        {
            type : 'value',
            axisLabel:{
                textStyle:{
                    color:'#FFF'
                }
            }
        }
    ],
    series : [
        {
            name:'成交',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle:{
                        // color: <各异>,
                        type: 'dashed',
                        // width: <各异>,
                        // shadowColor: 'rgba(0,0,0,0)',
                        // shadowBlur: 5,
                        // shadowOffsetX: 3,
                        // shadowOffsetY: 3,
                    },
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data:[10, 12, 21, 54, 260, 830, 710]
        },
        {
            name:'预购',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle:{
                        // color: <各异>,
                        type: 'dashed',
                        // width: <各异>,
                        // shadowColor: 'rgba(0,0,0,0)',
                        // shadowBlur: 5,
                        // shadowOffsetX: 3,
                        // shadowOffsetY: 3,
                    },
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data:[30, 182, 434, 791, 390, 30, 10]
        },
        {
            name:'意向',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle:{
                        // color: <各异>,
                        type: 'dashed',
                        // width: <各异>,
                        // shadowColor: 'rgba(0,0,0,0)',
                        // shadowBlur: 5,
                        // shadowOffsetX: 3,
                        // shadowOffsetY: 3,
                    },
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data:[1320, 1132, 601, 234, 120, 90, 20]
        }
    ]
};
	return option;
}