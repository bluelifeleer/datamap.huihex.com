function get_shop_sales_volume(){
	$.ajax({
		url:'/api/sales_volume',
		type:'GET',
		success:function(res){
			var tmp = '';
			if(res.code == 1 && res.msg == 'success'){
				var data = res.data;
				for(var i=0; i<data.length;i++){
					tmp += '<div class="data-list-boxs">'+
						'<div class="text-data-shop-name">'+(res.data[i]['shop_name'].length > 8 ? (res.data[i]['shop_name'].substr(0,2)+'****'+res.data[i]['shop_name'].substr(parseInt(res.data[i]['shop_name'].length-2),2)): res.data[i]['shop_name'])+'</div>'+
						'<div class="text-data-shop-num">'+res.data[i]['num']+'</div>'+
						'<div class="text-data-shop-sum">'+res.data[i]['price']+'</div>'
					+'</div>';
				}
				// console.log(tmp);
			}
			var html = '<div class="data-list-group">'+tmp+'</div>';
			// console.log($('.text-data-body-box'));
			$('.text-data-body-box').html(html);

			startMove();
		},
		error:function(err){
			console.error(err);
		}
	});
}


function startMove(){
	clearInterval(timer);
	var spet = 0;
	var tager = parseInt(parseInt($('.data-list-group').height())-230);
	var timer = setInterval(function(){
		if(spet < tager){
			spet++;
		}else{
			spet = 0;
		}
		
		$('.data-list-group').css('top',-spet);
	},1000/60);
}