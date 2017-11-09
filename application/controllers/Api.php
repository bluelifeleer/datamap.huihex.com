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
				$tmp[$i]['num'] = $res[$i]['num'] ? $res[$i]['num'] : $this->num();
				$tmp[$i]['price'] = $res[$i]['price'] ? sprintf('%.2f', $res[$i]['price']) : sprintf('%.2f', $this->price());
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

	public function statistics() {

	}

	public function shop_num() {
		$type = $this->uri->segment(3);
		$res = $this->api->shop_num();
		$tmp = array();
		$step = 0;
		if ($res && is_array($res) && !empty($res)) {
			for ($i = 0; $i < count($res); $i++) {
				if ($res[$i]['town']) {
					if ($res[$i]['town'] == '夏馆镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '师岗镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '马山口镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '湍东镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '赤眉镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '瓦亭镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '赤眉镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '王店镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '灌涨镇') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '板场乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '大桥乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '赵店乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '七里坪乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '余关乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '乍曲乡') {
						$tmp[$res[$i]['town']] = $step++;
					} elseif ($res[$i]['town'] == '桃溪镇') {
						$tmp[$res[$i]['town']] = $step++;
					} else {
						$tmp['城关镇'] = $step++;
					}
				}
			}
			// var_dump($tmp);
			$output = array(
				'code' => 1,
				'msg' => 'success',
				'data' => array(
					'fields' => $this->checkout_fileds($tmp, $type),
					'data' => $this->mix_arr($tmp, $type),
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

	private function create_new_array($arr, $type) {
		$tmp = array();
		for ($i = 0; $i < count($arr); $i++) {
			if ($type == 'fields') {
				array_push($tmp, array('value' => $this->num(), 'name' => $arr[$i]['category']));
			} else {
				array_push($tmp, array('value' => $this->num(), 'name' => $arr[$i]['town']));
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

	private function num() {
		return rand(100, 99999999);
	}

	private function price() {
		return rand(100, 99999999);
	}

	private function checkout_fileds($arr, $type) {
		$tmp = array();
		if ($type == 'radar') {
			$data = array();
			foreach ($arr as $key => $value) {
				array_push($tmp, array('text' => $key, 'max' => 300));
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
			foreach ($arr as $key => $value) {
				array_push($data, $value);
			}
			$tmp = array(array('name' => '内乡县', 'value' => $data));
		} else {
			foreach ($arr as $key => $value) {
				array_push($tmp, array('name' => $key, 'value' => $value));
			}
		}

		return $tmp;
	}

}