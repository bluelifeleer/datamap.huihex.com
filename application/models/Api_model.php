<?php

class Api_model extends CI_Model {
	public function __construct() {
		parent::__construct();
	}

	public function get_bar_data($type = '') {
		$sql = 'SELECT `i`.`price`, `s`.`category`, `s`.`shop_name` FROM (SELECT SUM(price) AS price, shop_name, shopurl FROM `huihex_gov`.`tb_item` GROUP BY shop_name ORDER BY price DESC) AS `i` LEFT JOIN `huihex_gov`.`tb_shop` AS `s` ON `i`.`shopurl` = `s`.`shop_url` GROUP BY category order by price desc limit 0,5';
		$query = $this->db->query($sql);
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function map() {
		$this->db->select('longitude, dimension, address, shop_name, shop_url,county,town,village');
		$this->db->like('county', '内乡');
		$this->db->from('tb_shop');
		$query = $this->db->get();
		// return $query && $query->num_rows() > 0 ? $query->result_array() : array();
		// var_dump($this->db->last_query());
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function sales_volume() {
		$sql = 'SELECT `s`.`shop_name`,`s`.`category`,SUM(`s`.`sell_num`) AS `num`,SUM(`i`.`price`) AS `price` FROM (SELECT * FROM `huihex_gov`.`tb_shop` WHERE  `county` LIKE "%内乡%") AS `s` LEFT JOIN `huihex_gov`.`tb_item` AS `i` ON `s`.`shop_url` = `i`.`shopurl` GROUP BY `shop_name`;';
		$query = $this->db->query($sql);
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function get_statistics_all() {
		$sql = 'select `credit`,`good_comment_rate`, from `huihex_gov`.`tb_shop`';
	}

	public function get_statistics() {

	}

	public function shop_num() {
		$sql = 'select `shop_name`,`county`,`town` from `huihex_gov`.`tb_shop` where `county` like "%内乡%"';
		$query = $this->db->query($sql);
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function get_town() {
		$sql = 'SELECT town FROM `huihex_gov`.`tb_shop` WHERE `county` LIKE "%内乡%" AND town IS NOT NULL GROUP BY town';
		$query = $this->db->query($sql);
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function get_category() {
		$sql = 'SELECT category FROM `huihex_gov`.`tb_shop` WHERE `county` LIKE "%内乡%" AND category IS NOT NULL GROUP BY category';
		$query = $this->db->query($sql);
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}

	public function statistics() {
		$this->db->select('sum(money_back) as money_back,sum(tousu) as tousu,sum(buy_again) as buy_again,sum(send_goods) as send_goods');
		$this->db->like('county', '内乡');
		$this->db->from('tb_shop');
		$query = $this->db->get();
		return $query && $query->num_rows() > 0 ? $query->result_array() : array();
	}
}