function line_option_data(is_fullsrceen) {
    var radius = [],
        url, fields, data;
    $.ajax({
        url: '/api/quarter_trade_quota',
        type: 'GET',
        async: false,
        success: function(res) {
            console.log(res);
            fields = res.data.fields;
            data = res.data.data;
        },
        error: function(err) {
            console.error(err);
        }
    });

    var radius = [];
    if (is_fullsrceen) {
        radius = [];
    } else {
        radius = [];
    }
    var option = {
        title: {
            text: '2016年内乡县(各镇、乡)五强镇电子商务季度成效额统计',
            subtext: '',
            x: 'center',
            textStyle: {
                fontSize: 10,
                // fontWeight: 'bolder',
                color: '#fff' // 主标题文字颜色
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
        calculable: true,
        xAxis: [{
            type: 'category',
            name: "月份",
            boundaryGap: false,
            // data : ['6月','7月','8月','9月','10月'],
            data: fields,
            axisLabel: {
                textStyle: {
                    // align: <各异>,
                    // baseline: <各异>,
                    // fontFamily: 'Arial, Verdana, sans...',
                    // fontSize: 12,
                    // fontStyle: 'normal',
                    // fontWeight: 'normal',
                    color: '#FFF'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            name: "元",
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    // align: <各异>,
                    // baseline: <各异>,
                    // fontFamily: 'Arial, Verdana, sans...',
                    // fontSize: 12,
                    // fontStyle: 'normal',
                    // fontWeight: 'normal',
                    color: '#FFF'
                }
            }
        }],
        series: [{
                name: '最高额度',
                type: 'line',
                // data:[11, 11, 15, 13, 12, 13, 10],
                data: data.max,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: '最低额度',
                type: 'line',
                // data:[3242, 34335653, 1231237, 234354, 45643524],
                data: data.min,
                markPoint: {
                    data: [
                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };
    return option;
}