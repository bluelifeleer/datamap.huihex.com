function drawchart(el,option){
	var myChart = echarts.init(document.getElementById(el));           
	myChart.setOption(option);
}