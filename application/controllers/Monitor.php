<?php

class Monitor extends CI_Controller {
	public function __construct() {
		parent::__construct();
	}

	public function show() {
		$this->load->view('monitor.html');
	}
}