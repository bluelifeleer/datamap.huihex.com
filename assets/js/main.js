(function() {

	$('.datat-table-block').on('mouseover', function() {
		$(this).find('.zoom-buts').css('display', 'block');
	});


	$('.datat-table-block').on('mouseout', function() {
		$(this).find('.zoom-buts').css('display', 'none');
	});

	$('.zoom-buts').on('click', function() {
		var butType = $(this).attr('data-but-type');
		var butFn = $(this).attr('fullscreen')
		createFullScreen(butType);
		// alert();
	});

	$('.but-box').on('mouseover', function(event) {
		event.stopPropagation();
		$(this).css('display', 'none');
		$('.buts-maker-layer').css('display', 'block');
		$('.controller-buts-box').css('display', 'block');
	});


	$('.buts-maker-layer').on('mouseover', function(e) {
		$('.controller-buts-box').css('display', 'none');
		$('.buts-maker-layer').css('display', 'none');
		$('.but-box').css('display', 'block');
	});


	// clearInterval(draw);
	//定期更新数据；
	// var draw = setInterval(function(){
	drawchart('pancake-data-map-box', getpancake_option_data(false));
	drawchart('columnar-data-map-date-box', columnar_option_data(false));
	drawchart('columnar-data-map-type-box', bar_option_data(false));
	drawchart('country-data-map-box', logistics_option_data(false));
	drawchart('columnar-data-map-area-box', radar_option_data(false));
	drawchart('dashboard-data-map-box', gauge_option_data(false));
	drawchart('rectangle-data-map-box', rectangle_option_data(false));
	// }, 2000);

	get_shop_sales_volume();

	// 
	function createFullScreen(type) {
		var WinW = $(document).width();
		var WinH = $(document).height();
		var masklayer = document.createElement('div');
		masklayer.id = 'full-screen-layer';
		masklayer.style.background = 'url("/assets/images/bg.jpg") no-repeat 0 0';
		masklayer.style.width = WinW + 'px';
		masklayer.style.height = WinH + 'px';
		masklayer.style.position = 'fixed';
		masklayer.style.left = 0;
		masklayer.style.top = -WinH + 'px';
		masklayer.style.zIndex = 999;
		masklayer.innerHTML = '<div id="data-charts-masklayer" style="width:' + WinW + 'px;height:' + WinH + 'px;"></div><a href="javasceipr:void(0);" id="close-masklayer-but" style="display:block;width:120px;height:40px;position:fixed;right:0;bottom:0;color:#FFF;font-weight:bold;font-size:20px;z-index:1000;">退出全屏</a>';
		document.body.appendChild(masklayer);
		switch (type) {
			case 'country-map':
				drawchart('data-charts-masklayer', logistics_option_data(true));
				break;
			case 'columnar-map':
				drawchart('data-charts-masklayer', bar_option_data(true));
				break;
			case 'columnar-date':
				drawchart('data-charts-masklayer', columnar_option_data(true));
				break;
			case 'radar-map':
				drawchart('data-charts-masklayer', radar_option_data(true));
				break;
			case 'dashboard-map':
				drawchart('data-charts-masklayer', gauge_option_data(true));
				break;
			case 'rectangle-map':
				drawchart('data-charts-masklayer', rectangle_option_data(true));
				break;
			default:
				drawchart('data-charts-masklayer', getpancake_option_data(true));
				break;
		}

		startMove(document.getElementById('full-screen-layer'), { 'top': 0 }, false);
		$('#close-masklayer-but').on('click', function() {
			startMove(document.getElementById('full-screen-layer'), { 'top': -WinH }, function() {
				$('#full-screen-layer').remove();
			});
		});
	}



	/**
	 * 运动函数startMove(el,json,[fn])，支持链式操作
	 * 所需参数：
	 * 		1要运动的物体，
	 *		2要改变的属性、目标值等json形式，
	 *		3当前运动结束时执行的操作，可选；
	 * 时间：2014-11-06 12:00:00
	 * 修改时间：2014-11-14 08:50:00
	 * 作者：李鹏thebuleilfe@163.com
	 */
	function startMove(el, json, fn) {
		var iSpeed = null;
		clearInterval(el.timer);
		el.timer = setInterval(function() {
			var attr = "";
			//判断是否到达目标点，默认为true
			var isStop = true;

			for (attr in json) {
				var styleValue = 0;
				//处理透明度，如果是透明度
				if (attr == "opacity") {
					styleValue = parseFloat(getStyleValue(el, attr)) * 100; //透明度
				} else {
					styleValue = parseInt(getStyleValue(el, attr)); //其它属性
				}

				//计算运动的速度
				iSpeed = (json[attr] - styleValue) / 7;
				iSpeed = iSpeed * 0.7;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

				//如果当前的值末到达目标点isStop为false;
				if (styleValue != json[attr]) {
					isStop = false;
				}

				if (attr == "opacity") {
					//设置透明度
					el.style.opacity = parseInt(styleValue + iSpeed) / 100;
					el.style.filter = "alpha(opacity:" + (styleValue + iSpeed) + ")";
				} else {
					//设置其它值
					el.style[attr] = parseInt(styleValue + iSpeed) + "px";
				}
			}

			//如果到达目标点，清除定时器
			if (isStop) {
				clearInterval(el.timer);
				//如果有传入执行函数就调用
				if (fn) {
					fn.call(el);
				}
			}

		}, 30);

		//获取页面计算后的样式；
		function getStyleValue(el, attr) {
			if (el.currentStyle) {
				return el.currentStyle[attr];
			} else {
				return getComputedStyle(el, false)[attr];
			}
		}
	}

})($);