<?php

class Mapdata extends CI_Controller {
	public function __construct() {
		parent::__construct();
	}

	public function map() {
		$this->load->view('map.html');
	}
}