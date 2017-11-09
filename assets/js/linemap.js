function line_option_data(is_fullsrceen){
    var radius = [];
    if(is_fullsrceen){
        radius = [];
    }else{
        radius = [];
    }
	var option = {
    title : {
        text: '2016年内乡县(各镇、乡)五强镇电子商务季度成效额统计',
        subtext: '',
        x:'center',
        textStyle: {
            fontSize: 10,
            // fontWeight: 'bolder',
            color: '#fff'          // 主标题文字颜色
        }
    },
    // tooltip : {
    //     trigger: 'axis'
    // },
    // legend: {
    //     data:['最高额度','最低额度']
    // },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         magicType : {show: true, type: ['line', 'bar']},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['6月','7月','8月','9月','10月'],
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
            axisLabel : {
                formatter: '{value} 元',
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
    series : [
        {
            name:'最高额度',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
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
            name:'最低额度',
            type:'line',
            data:[3242, 34335653, 1231237, 234354, 45643524],
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