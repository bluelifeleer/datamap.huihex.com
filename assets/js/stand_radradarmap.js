function get_standard_radar_option_data(is_fullscreen) {

	var option = {
		title: {
			text: '政府扶持前与扶持后五强镇综合实力对比',
			subtext: '',
			x: 'center',
			textStyle: {
				fontSize: 12,
				// fontWeight: 'bolder',
				color: '#fff' // 主标题文字颜色
			},
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			y: 'bottom',
			textStyle: {
				fontFamily: 'Arial, Verdana, sans...',
				fontSize: 12,
				fontStyle: 'normal',
				fontWeight: 'normal',
				color:'#FFF'
			},
			data: ['城关镇', '夏馆镇', '师岗镇']
		},
		toolbox: {
			show: false,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		polar: [{
			indicator: [
				{ text: '销售额', max: 6000 },
				{ text: '销量', max: 16000 },
				{ text: '传统宝贝', max: 30000 }
			],
			name: {
				show: true,
				textStyle: {
					color: '#FFF'
				}
			}
		}],
		calculable: true,
		series: [{
			name: '',
			type: 'radar',
			data: [{
					value: [4300, 10000, 28000],
					name: '城关镇'
				},
				{
					value: [5000, 8000, 28000],
					name: '夏馆镇'
				},
				{
					value: [5000, 1300, 28000],
					name: '师岗镇'
				}
			]
		}]
	};
	return option;
}