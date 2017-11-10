function annular_option_data(is_fullscreen) {
    var radius, data;
    $.ajax({
        url: '/api/statistics',
        type: 'GET',
        async: false,
        success: function(res) {
            if (res.code == 1 && res.msg == 'success') {
                data = res.data;
            }
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        }
    });
    if (is_fullscreen) {
        radius = [40, 65];
    } else {
        radius = [40, 55];
    }
    var labelTop = {
        normal: {
            label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                    baseline: 'bottom'
                }
            },
            labelLine: {
                show: false
            }
        }
    };
    var labelFromatter = {
        normal: {
            label: {
                formatter: function(params) {
                    return 100 - params.value + '%'
                },
                textStyle: {
                    baseline: 'top'
                }
            }
        },
    }
    var labelBottom = {
        normal: {
            color: '#ccc',
            label: {
                show: true,
                position: 'center'
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var radius = radius;
    option = {
        legend: {
            x: 'center',
            y: 'bottom',
            data: [
                '退款率', '投诉率', '满意度', '重复采购率'
            ],
            textStyle: {
                fontSize: 10,
                // fontWeight: 'bolder',
                color: '#fff' // 主标题文字颜色
            }
        },
        title: {
            text: '2016内乡各镇店铺统计情况',
            subtext: '',
            x: 'center',
            textStyle: {
                fontSize: 10,
                // fontWeight: 'bolder',
                color: '#fff' // 主标题文字颜色
            },
        },
        // toolbox: {
        //     show : true,
        //     feature : {
        //         dataView : {show: true, readOnly: false},
        //         magicType : {
        //             show: true, 
        //             type: ['pie', 'funnel'],
        //             option: {
        //                 funnel: {
        //                     width: '20%',
        //                     height: '30%',
        //                     itemStyle : {
        //                         normal : {
        //                             label : {
        //                                 formatter : function (params){
        //                                     return 'other\n' + params.value + '%\n'
        //                                 },
        //                                 textStyle: {
        //                                     baseline : 'middle'
        //                                 }
        //                             }
        //                         },
        //                     } 
        //                 }
        //             }
        //         },
        //         restore : {show: true},
        //         saveAsImage : {show: true}
        //     }
        // },
        series: [{
                type: 'pie',
                center: ['20%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: data.money_back.other, itemStyle: labelBottom },
                    { name: '退款率', value: data.money_back.money_back, itemStyle: labelTop }
                ]
            },
            {
                type: 'pie',
                center: ['40%', '50%'],
                radius: radius,
                x: '20%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: data.tousu.other, itemStyle: labelBottom },
                    { name: '投诉率', value: data.tousu.tousu, itemStyle: labelTop }
                ]
            },
            {
                type: 'pie',
                center: ['60%', '50%'],
                radius: radius,
                x: '40%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: data.buy_again.other, itemStyle: labelBottom },
                    { name: '满意度', value: data.buy_again.buy_again, itemStyle: labelTop }
                ]
            },
            {
                type: 'pie',
                center: ['80%', '50%'],
                radius: radius,
                y: '55%', // for funnel
                x: '60%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: data.send_goods.other, itemStyle: labelBottom },
                    { name: '重复采购率', value: data.send_goods.send_goods, itemStyle: labelTop }
                ]
            }
        ]
    };
    return option;
}