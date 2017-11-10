function bar_option_data(type,is_fullscreen){
    var data,fields,url,title,name;
    switch(type){
        case 'shop-num-count':
            url = '/api/shop_num/count';
            title = '内乡县（各乡镇）店铺总数统计（个）';
            name = '店铺数';
        break;
        case 'shop-job-peoples':
            url = '/api/shop_num/peoples';
            title = '内乡县（各乡镇）电商从业人数统计（人次）';
            name = '从业人数';
        break;
        case 'send-goods-date':
            url = '/api/shop_num/send_date';
            title = '内乡县（各乡镇）平均发单时间统计（天）';
            name = '发单时间';
        break;
        default:
            url = '/api/bar';
            title = '内乡五强行业单店铺销售额全国水平（元）';
            name = '销售额';
        break;
    }
    
    $.ajax({
        url:url,
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
            text: title,
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
            name:name,
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