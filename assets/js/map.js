(function($) {
	var WinH = $(window).height();
	$('#container').css('height', WinH);
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
	var map = new BMap.Map("container");
	// 创建地图实例  
	var point = new BMap.Point(111.8583, 33.054592); //内乡县
	// 创建点坐标  
	map.centerAndZoom(point, 10);
	map.enableScrollWheelZoom(true);

	function addMarker(point, index, shop_name, shop_url, shop_address) { // 创建图标对象   
		var myIcon = new BMap.Icon("http://datamap.huihex.com/assets/images/taobao.png", new BMap.Size(30, 30), {
			// 指定定位位置。   
			// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
			// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
			// 图标中央下端的尖角位置。    
			anchor: new BMap.Size(0, 0),
			// 设置图片偏移。   
			// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
			// 需要指定大图的偏移位置，此做法与css sprites技术类似。    
			imageOffset: new BMap.Size(0, 0) // 设置图片偏移    
		});
		// 创建标注对象并添加到地图   
		var marker = new BMap.Marker(point, { icon: myIcon });
		map.addOverlay(marker);
		var opts = {
			width: 380, // 信息窗口宽度
			height: 160, // 信息窗口高度
			title: shop_name, // 信息窗口标题
			enableMessage: true, //设置允许信息窗发送短息
			message: ""
		}
		var infoWindow = new BMap.InfoWindow("地址：" + shop_address + "<br/>店铺连接：<a href='" + shop_url + "'>" + shop_url + "</a>", opts); // 创建信息窗口对象
		marker.addEventListener("click", function() {
			map.openInfoWindow(infoWindow, point); //开启信息窗口  
		});
	}
	// 随机向地图添加10个标注    
	var bounds = map.getBounds();
	var lngSpan = bounds.maxX - bounds.minX;
	var latSpan = bounds.maxY - bounds.minY;

	$.ajax({
		url: '/api/map',
		type: 'GET',
		success: function(res) {
			if (res.code == 1 && res.msg == 'success') {
				var map_data = res.data;
				var i = '';
				for (i in map_data) {
					console.log(map_data[i].x);
					console.log(map_data[i].y);
					console.log(map_data[i].shop_name);
					console.log(map_data[i].shop_url);
					console.log(map_data[i].address);
					var point = new BMap.Point(map_data[i].x, map_data[i].y);
					addMarker(point, i, map_data[i].shop_name, map_data[i].shop_url, map_data[i].address);
				}
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
})($);