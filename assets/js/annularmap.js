function annular_option_data (is_fullscreen){

var radius;
if(is_fullscreen){
    radius = [40, 65];
}else{
    radius = [40, 55];
}
var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = radius;
option = {
    legend: {
        x : 'center',
        y : 'bottom',
        data:[
            '退款率','投诉率','满意度','重复采购率'
        ],
        textStyle: {
            fontSize: 10,
            // fontWeight: 'bolder',
            color: '#fff'          // 主标题文字颜色
        }
    },
    title : {
        text: '2016内乡各镇店铺统计情况',
        subtext: '',
        x: 'center',
        textStyle: {
            fontSize: 10,
            // fontWeight: 'bolder',
            color: '#fff'          // 主标题文字颜色
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
    series : [
        {
            type : 'pie',
            center : ['20%', '50%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:46, itemStyle : labelBottom},
                {name:'退款率', value:54,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['40%', '50%'],
            radius : radius,
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:56, itemStyle : labelBottom},
                {name:'投诉率', value:44,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['60%', '50%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:65, itemStyle : labelBottom},
                {name:'满意度', value:35,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['80%', '50%'],
            radius : radius,
            y: '55%',   // for funnel
            x:'60%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:78, itemStyle : labelBottom},
                {name:'重复采购率', value:22,itemStyle : labelTop}
            ]
        }
    ]
};
    return option;
}