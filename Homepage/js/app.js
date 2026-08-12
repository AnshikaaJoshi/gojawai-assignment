/**
*
* Joinnow Shortcode Form Js Use in Frontend
*
**/

/** ##########  Function for IntlTel Input  ########################*/
function phoneNumValidate(phone_field,error_box_id,valid_msg_id){
 
    var telInput;
    var myJSON 		= joinnow_ajax_sync_object.KeyStatus;
	const myObj 	= JSON.parse(myJSON);
	var countryCode = (myObj.country_code) ? myObj.country_code : 'in'
    telInput 		= $("#"+phone_field),
    errorMsg 		= $("#"+error_box_id),
    validfield 		= $("#"+valid_msg_id);
    joinnow_ajax_sync_object.UtilsConstant;
    
    var isvalid_number = 0;
    var WEBSITE_URL = joinnow_ajax_sync_object.UtilsConstant;
    // initialise plugin

    telInput.intlTelInput({
        utilsScript: WEBSITE_URL ,
        formatOnDisplay : false,
        initialCountry : countryCode,
    });
    var reset = function() {
        telInput.removeClass("error");
        if(validfield.length) validfield.val("");
    };
 
    // on blur: validate
    telInput.blur(function() {
        //reset();
        if ($.trim(telInput.val())) {
            var tesval = telInput.intlTelInput("isValidNumber");
            //alert(tesval); return;
            
            var countryData = telInput.intlTelInput("getSelectedCountryData");
            
            var countryCode = countryData.dialCode;
            countryCode = "+" + countryCode; // convert 1 to +1
            if(countryCode != ''){
                $('.dial_code').val(countryCode);
            }
            var numberType = telInput.intlTelInput("getNumberType");
            if((numberType == intlTelInputUtils.numberType.MOBILE)  || (numberType == intlTelInputUtils.numberType.FIXED_LINE_OR_MOBILE)){
                isvalid_number = 1;
            }
            if (isvalid_number==0) {
                // is a mobile number
                $(".not_valid_mobile").html('Please enter valid mobile number.');
                validfield.val("");
                return false;
            }
            telInput.val( telInput.intlTelInput("getNumber"));
            if(validfield.length)
                validfield.val(telInput.intlTelInput("getNumber"));
            $(".not_valid_mobile").html('');
            return true;
            
        }
    }).trigger('blur');
 
 
    // on keyup / change flag: reset
    telInput.on("keyup change", reset);
 
}

/*##################### Number Country Flag ###########################*/

jQuery(document).ready(function() {

    phoneNumValidate('whatsapp_number', 'whatsapp_err', 'userPhone');
});

/*##################### Shortcode Form Validation ###########################*/

function joinnowAjaxForm(){
	var status = joinnow_ajax_sync_object.KeyStatus;
	const objStatus = JSON.parse(status);
	var DataString = jQuery("#joinow-form").serialize();
	jQuery.ajax({
		type: "POST",
		url: joinnow_ajax_sync_object.ajaxurl,
		data: {
			'action'	: 'joinnow_frontend_entry',
			'nonce'     : joinnow_ajax_sync_object.nonce, 
			'data' 		: DataString,
		},
		success: function(data) 
		{
			if(data == 'success'){
				jQuery('#joinow-form')[0].reset();
				if(objStatus.status == true) {
					grecaptcha.reset(0);
				}
				jQuery('.joinshow_status').addClass(data);
				jQuery('.joinshow_status').html(objStatus.final_success);
				setTimeout((function() {
                    window.location.reload();
                }), 1000);
			}else if(data == "error"){
				jQuery('.joinshow_status').addClass(data);
				jQuery(".joinshow_status").html(objStatus.final_err);
				setTimeout((function() {
                    window.location.reload();
                }), 1000);
			}
		}
	});
}

/*##################### Frontend Form Validation ###########################*/

function JoinnowValidateForm(){

	var service_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var service_beta = /^\d{10}$/;
	var service_alpha = /^[a-zA-Z]+$/;
	var isPhone = /^(\+?[1-9][0-9]{5,14})$/;
	var myJSON = joinnow_ajax_sync_object.KeyStatus;
	const myObj = JSON.parse(myJSON);
	
	if(myObj.status == true) {
		var getcaptcha = grecaptcha.getResponse(0);
	}
	jQuery("#fullname_err").html('');
	jQuery("#email_err").html('');
	jQuery("#whatsapp_err").html('');
	jQuery("#message_err").html('');
	jQuery("#checklist_err").html('');
	if(myObj.status == true) {
		var response1 = grecaptcha.getResponse(0);
	}
	var error	=	true;
	var value   = "";
	
	/* First Name Validation */
	
	if(jQuery("#full_name").val()=='' && myObj.fullname_err != ''){
		jQuery("#fullname_err").html(myObj.fullname_err);
		error	=	false;
	}else if(!service_alpha.test(jQuery("#full_name").val().replace(/\s/g, "")) && myObj.fullname_valid_err != '' ){
		jQuery("#fullname_err").html(myObj.fullname_valid_err);
		error = false;
	} 


	/* Email Validation */
	if(jQuery("#email_address").val()=='' && myObj.email_err != ''){
		jQuery("#email_err").html(myObj.email_err);
		error	=	false;
	}else if(!service_regex.test(jQuery("#email_address").val()) && myObj.email_valid_err != ''){
		jQuery("#email_err").html(myObj.email_valid_err);
		error = false;
	} 
	

	/*Phone*/
	
	if(jQuery("#whatsapp_number").val()=='' && myObj.phone_err != '')
	{
		jQuery("#whatsapp_err").html(myObj.phone_err);
		error	=	false;
	}else if(!isPhone.test(jQuery("#whatsapp_number").val()) && myObj.phone_valid_err != ''){
		jQuery("#whatsapp_err").html(myObj.phone_valid_err);
		error	=	false;
	} 
	
	/*Checklist*/
	if ($("input[type='checkbox'][name='get_info[]']:checked").length == 0 && myObj.checklist_reuqired == 1){
        jQuery("#checklist_err").html(myObj.check_list_err);
     	error	=	false;   
    }


	/*Message*/
	if(jQuery("#message").val()=='' && myObj.message_reuqired == 1)
	{
		jQuery("#message_err").html(myObj.message_err);
		error	=	false;
	}
	
	/*recaptcha*/
	if(myObj.status == true) {
		if(response1.length == 0) { 
	        jQuery("#g-recaptcha-error").html('Please verify that you are not a robot..');
	        error	=	false;
	    }
    }
	if( error == true ){
		var check = $('.cstm-joinnow-popup').is(':empty');
		if(check == true){
			joinnowAjaxForm();
		}else{
			$('#joinnowModalCenter').modal({backdrop: 'static', keyboard: false}, 'show');
			jQuery(".joinnow-request-wrappers").on("click",function(){
				if($(this).attr("data-status") == 'ok'){
					joinnowAjaxForm();	
				}else{
					setTimeout((function() {
	                    window.location.reload();
	                }), 1000);
				}
				
			});	
		}
	}				
	return false;
}



