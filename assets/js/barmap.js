function bar_option_data(is_fullscreen){

    var data,fields;
    $.ajax({
        url:'/api/bar',
        type:'GET',
        async:false,
        success:function(res){
            console.log(res);
            data = res.data.data;
            fields = res.data.fields;
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
            text: '内乡五强行业单店铺销售额全国水平',
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
    color:['#1BB2D8'],
    legend: {
        data:[]
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : fields,
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
            name:'销售额',
            type:'bar',
            data:data,
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
        // {
        //     name:'降水量',
        //     type:'bar',
        //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        //     markPoint : {
        //         data : [
        //             {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
        //             // {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
        //         ]
        //     },
        //     markLine : {
        //         data : [
        //             {type : 'average', name : '平均值'}
        //         ]
        //     }
        // }
    ]
};
    return option;
}