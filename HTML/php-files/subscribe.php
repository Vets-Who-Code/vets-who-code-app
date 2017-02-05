<?php

	// MailChimp Api key and list id.
	// Please change it with your api key and list id
	$APIKey = '7764ae00f5ae424f1871f47ca7e633e7-us8';   // Get API Key from https://us8.admin.mailchimp.com/account/api/
	$listID = '300b91e5ed';   // to get please login to mailchimp and then click lists->Select List->settings

	$email   = $_POST['email'];

	if(filter_var($email, FILTER_VALIDATE_EMAIL) ) {
	    require_once('inc/MCAPI.class.php');

        	$api = new MCAPI($APIKey);
        	$list_id = $listID;

        	if($api->listSubscribe($list_id, $email) === true) {
        		$sendstatus = 1;
        		$message = '<div class="alert alert-success subscription-success" role="alert"><strong>Success!</strong> Check your email to confirm sign up.</div>';
        	} else {
        		$sendstatus = 0;
        		$message = '<div class="alert alert-danger subscription-error" role="alert"><strong>Error:</strong> ' . $api->errorMessage.'</div>';
        	}

        	$result = array(
        		'sendstatus' => $sendstatus,
        		'message' => $message
        	);

        	echo json_encode($result);
	} else {
	       $result = array(
                'sendstatus' => $sendstatus,
                'message' => '<div class="alert alert-danger subscription-error" role="alert"><strong>Error:</strong> Please enter a valid Email Address </div>'

           );

           echo json_encode($result);
	 }


?>