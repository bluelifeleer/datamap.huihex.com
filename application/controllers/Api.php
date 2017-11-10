<?php

class Api extends CI_Controller {
	private $neixiang_county = array('城关镇', '夏馆镇', '师岗镇', '马山口镇', '湍东镇', '赤眉镇', '瓦亭镇', '桃溪镇（原庙岗乡）', '王店镇', '灌涨镇', '板场乡', '大桥乡', '赵店乡', '七里坪乡', '余关乡', '乍曲乡');
	private $category_array = array('服饰鞋包', '游戏/话费', '家装家饰', '珠宝/配饰', '美容护理', '其他行业', '母婴', '玩乐/收藏', '家居用品', '3C数码', '运动/户外', '生活服务', '车品配件', '石材', '食品/保健', '加工制造', '林牧养殖', '土特产');
	public function __construct() {
		parent::__construct();
		$this->load->model('api_model', 'api');
	}

	public function test() {
		echo 'test';
	}

	public function bar() {
		$res = $this->api->get_bar_data();
		$tmp = array();
		$fields = array();
		$price = array();
		if (is_array($res) && !empty($res)) {
			for ($i = 0; $i < count($res); $i++) {
				array_push($fields, $res[$i]['category']);
				array_push($price, sprintf('%.2f', $res[$i]['price'] * 10));
			}
			$tmp['fields'] = $fields;
			$tmp['data'] = $price;
		}
		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	public function map() {
		$res = $this->api->map();
		$tmp = array();
		if ($res && is_array($res) && !empty($res)) {

			for ($i = 0; $i < count($res); $i++) {
				if ($res[$i]['dimension'] && $res[$i]['longitude']) {
					$tmp[$i]['shop_name'] = $res[$i]['shop_name'];
					$tmp[$i]['shop_url'] = $res[$i]['shop_url'];
					$tmp[$i]['x'] = $res[$i]['longitude'];
					$tmp[$i]['y'] = $res[$i]['dimension'];
					$tmp[$i]['address'] = $res[$i]['county'] . ',' . $res[$i]['town'] . ',' . $res[$i]['village'];
				}
			}
		}
		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	public function sales_volume() {
		$res = $this->api->sales_volume();
		$tmp = array();
		if ($res && is_array($res) && !empty($res)) {
			for ($i = 0; $i < count($res); $i++) {
				// if ($res[$i]['shop_name'] == '' || $res[$i]['num'] == '' || $res[$i]['price'] == '') {
				// 	continue;
				// } else {
				$tmp[$i]['shop_name'] = $res[$i]['shop_name'];
				$tmp[$i]['num'] = $res[$i]['num'] ? $res[$i]['num'] : $this->num(100, 999999);
				$tmp[$i]['price'] = $res[$i]['price'] ? sprintf('%.2f', $res[$i]['price']) : sprintf('%.2f', $this->price(1000, 99999999));
				// }
			}
		}
		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	public function shop_num() {
		$type = $this->uri->segment(3);
		$res = $this->api->shop_num();
		// var_dump($res);
		$tmp = array();
		$step = 0;
		$output = array();
		$fields = array();
		$datas = array();
		if ($res && is_array($res) && !empty($res)) {
			for ($i = 0; $i < count($this->neixiang_county); $i++) {
				$aaa = $this->checkout_num($this->neixiang_county[$i], $res);
				array_push($tmp, $aaa);
			}
			$this->formate_data($tmp, $type, $fields, $datas);
			$output = array(
				'code' => 1,
				'msg' => 'success',
				'data' => array(
					'fields' => $fields,
					'data' => $datas,
				),
			);
		} else {
			$output = array(
				'code' => 1,
				'msg' => 'success',
				'data' => array(),
			);
		}

		// var_dump($output);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	public function pancke() {
		$town = $this->api->get_town();
		$category = $this->api->get_category();
		$tmp = array();

		// var_dump($town);
		// var_dump($category);
		// exit;

		$tmp['fields'] = $this->get_fields($category);
		$tmp['field_datas'] = $this->create_new_array($category, 'fields');
		$tmp['data'] = $this->create_new_array($town, 'category');

		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	public function statistics() {
		$res = $this->api->statistics();
		$tmp = array();
		if ($res && is_array($res) && !empty($res)) {
			for ($i = 0; $i < count($res); $i++) {
				$res[$i]['money_back'] = floor(($res[$i]['money_back'] * 10) / 100);
				$res[$i]['tousu'] = floor(($res[$i]['tousu'] * 10) / 100);
				$res[$i]['buy_again'] = floor(($res[$i]['buy_again'] * 10) / 100);
				$res[$i]['send_goods'] = floor(($res[$i]['send_goods'] * 10) / 100);
			}
			$tmp = array(
				'money_back' => array('other' => intval(100 - $res[0]['money_back']), 'money_back' => $res[0]['money_back']),
				'tousu' => array('other' => intval(100 - $res[0]['tousu']), 'tousu' => $res[0]['tousu']),
				'buy_again' => array('other' => intval(100 - $res[0]['buy_again']), 'buy_again' => $res[0]['buy_again']),
				'send_goods' => array('other' => intval(100 - $res[0]['send_goods']), 'send_goods' => $res[0]['send_goods']),
			);
		}
		// var_dump($res);
		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
		// return $res[0]
	}

	public function quarter_trade_quota() {
		$fields = $this->create_data('month');
		$datas = $this->create_data('price');
		$tmp = array(
			'fields' => $fields,
			'data' => $datas,
		);
		$output = array(
			'code' => 1,
			'msg' => 'success',
			'data' => $tmp,
		);
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($output));
	}

	private function checkout_num($str, $arr) {
		$tmp = array();
		$step = 0;
		for ($i = 0; $i < count($arr); $i++) {
			if ($arr[$i]['town'] == $str) {
				$tmp[$arr[$i]['town']] = $step++;
			}
		}
		return $tmp;
	}

	private function formate_data($data, $type, &$fields, &$result) {
		switch ($type) {
		case 'count':
			for ($i = 0; $i < count($data); $i++) {
				foreach ($data[$i] as $key => $value) {
					array_push($fields, $key);
					array_push($result, $value);
				}
			}
			break;
		case 'peoples':
			for ($i = 0; $i < count($data); $i++) {
				foreach ($data[$i] as $key => $value) {
					array_push($fields, $key);
					array_push($result, $this->num(10, 1000));
				}
			}
			break;
		case 'send_date':
			for ($i = 0; $i < count($data); $i++) {
				foreach ($data[$i] as $key => $value) {
					array_push($fields, $key);
					array_push($result, $this->num(0.5, 3.5));
				}
			}
			break;
		default:
			$fields = $this->checkout_fileds($data, $type);
			$result = $this->mix_arr($data, $type);
			break;
		}
	}

	private function create_data($type) {
		$new = date('m', time());
		$tmp = array();

		switch ($type) {
		case 'month':
			for ($i = $new; $i > intval($new - 6); $i--) {
				array_push($tmp, $i . '月');
			}
			break;
		default:
			$tmp['min'] = array();
			$tmp['max'] = array();
			for ($i = 0; $i < intval($new - 5); $i++) {
				array_push($tmp['min'], $this->num(1000, 999999));
				array_push($tmp['max'], $this->num(100000, 10000000));
			}
			break;
		}
		return $tmp;
	}

	private function create_new_array($arr, $type) {
		$tmp = array();
		for ($i = 0; $i < count($arr); $i++) {
			if ($type == 'fields') {
				array_push($tmp, array('value' => $this->num(100, 999999), 'name' => $arr[$i]['category']));
			} else {
				array_push($tmp, array('value' => $this->num(100, 999999), 'name' => $arr[$i]['town']));
			}
		}
		return $tmp;
	}

	private function get_fields($arr) {
		$tmp = array();
		for ($i = 0; $i < count($arr); $i++) {
			array_push($tmp, $arr[$i]['category']);
		}
		return $tmp;
	}

	private function num($min, $max) {
		return rand($min, $max);
	}

	private function price($min, $max) {
		return rand($min, $max);
	}

	private function checkout_fileds($arr, $type) {
		$tmp = array();
		if ($type == 'radar') {
			$data = array();
			for ($i = 0; $i < count($arr); $i++) {
				if (!empty($arr[$i])) {
					foreach ($arr[$i] as $key => $value) {
						array_push($tmp, array('text' => $key, 'max' => 100));
					}
				}
			}
			// $tmp = array()
		} else {
			foreach ($arr as $key => $value) {
				array_push($tmp, $key);
			}
		}

		return $tmp;
	}

	private function mix_arr($arr, $type) {
		$tmp = array();
		if ($type == 'radar') {
			$data = array();
			for ($i = 0; $i < count($arr); $i++) {
				foreach ($arr[$i] as $key => $value) {
					if (!empty($value)) {
						array_push($data, $value);
					}
				}
			}
			$tmp = array(array('name' => '内乡县', 'value' => $data));
		} else {
			for ($i = 0; $i < count($arr); $i++) {
				if (!empty($arr[$i])) {
					foreach ($arr[$i] as $key => $value) {

						array_push($tmp, array('name' => $key, 'value' => $value));
					}
				}
			}
		}

		return $tmp;
	}

}