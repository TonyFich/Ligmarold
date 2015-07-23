$(document).ready(function(){

	//Реакция нажания кнопки логина
	$('#but_log').click(function () {
		login();
	}); 

	//Реакция нажания кнопки регистрации
	$('#but_reg_end').click(function () {
		registration();
	});

	//Реакция нажания кнопки  Enter логина
	$('#enter_login, #enter_password').keyup(function(e){
        if(e.which == 13){
            login();
        }
    });

	//Реакция нажания кнопки Enter регистрации
	$('#reg_log, #reg_email, #reg_pas_1, #reg_pas_2').keyup(function(e){
        if(e.which == 13){
            registration();
        }
    });

	//Реакция нажания кнопки перехода на страницу регистрации
	$('#but_reg_begin').click(function(){
	document.location.href ='/reg';
	});
	
});



//валидация логина
function login()
{
	$('#error_alert').addClass('hide');

	var pattern_login=/[A-Za-z0-9_]{4,16}/;
	var pattern_password=/[A-Za-z0-9_]{6,20}/;

 	if($("#enter_login").val() != '' && pattern_login.test($("#enter_login").val()) == true && 
 		$("#enter_password").val() != '' && pattern_password.test($("#enter_password").val()) == true)
 	{		
 		$(".has-error").removeClass("has-error");
		$('#but_log').button('loading')
		$.ajax({
			url: '/auth',
			type: 'POST',
			data: {login:$("#enter_login").val(),password:$("#enter_password").val()},
		}).done(function(answer){
			if(answer == 'yes') 
				document.location.href ='/game/characters';
			// $('#error_alert').html("Ошибка соединения").addClass('hide');
			else 
			{
				$('#error_alert').html("Неверный логин или пароль").removeClass('hide');

			}

		}).fail(function(){
			$('#error_alert').html("Ошибка соединения").removeClass('hide');
		}).always(function () {
			$('#but_log').button('reset')
		});
	}
	if($("#enter_login").val() == '' || pattern_login.test($("#enter_login").val()) == false)
 	{
 		$("#enter_login").parent().addClass("has-error");
 	}
 	else 
 		$("#enter_login").parent().removeClass("has-error");
 	if($("#enter_password").val() == '' || pattern_password.test($("#enter_password").val()) == false)
 	{
		$("#enter_password").parent().addClass("has-error");
 	}
 	else 
 		$("#enter_password").parent().removeClass("has-error");
}

//валидация регистрации
function registration()
{
	var pattern_login=/[A-Za-z0-9_]{4,16}/;
	var pattern_email=/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/;
	var pattern_password=/[A-Za-z0-9_]{6,20}/;

	if($('#reg_log').val() == '' || pattern_login.test($("#reg_log").val()) == false)
	{
		$("#reg_log").parent().removeClass("has-success").addClass('has-error');
		$('#error_login_alert').removeClass('hide');
		$("#reg_log").next().removeClass('glyphicon-ok').addClass("glyphicon-remove");
	}

	else 
	{
		$("#reg_log").parent().removeClass('has-error').addClass("has-success");
		$('#error_login_alert').addClass('hide');
		$("#reg_log").next().removeClass('glyphicon-remove').addClass("glyphicon-ok");


	}

	if($('#reg_email').val() == '' || pattern_email.test($("#reg_email").val()) == false)
	{
		$("#reg_email").parent().removeClass("has-success").addClass("has-error");
		$('#error_email_alert').removeClass('hide');
		$("#reg_email").next().removeClass('glyphicon-ok').addClass("glyphicon-remove");
	}
	else 
	{
		$("#reg_email").parent().removeClass('has-error').addClass("has-success");
		$('#error_email_alert').addClass('hide');
		$("#reg_email").next().removeClass('glyphicon-remove').addClass("glyphicon-ok");

	}

	if($('#reg_pas_1').val() == '' || pattern_password.test($("#reg_pas_1").val()) == false)
	{
		$("#reg_pas_1").parent().removeClass("has-success").addClass("has-error");
		$('#error_password_alert_1').removeClass('hide');
		$("#reg_pas_1").next().removeClass('glyphicon-ok').addClass("glyphicon-remove");
	}
	else
	{
		$("#reg_pas_1").parent().removeClass('has-error').addClass("has-success");
		$('#error_password_alert_1').addClass('hide');
		$("#reg_pas_1").next().removeClass('glyphicon-remove').addClass("glyphicon-ok");
	}

	if($('#reg_pas_2').val() == '' || $('#reg_pas_1').val() != $('#reg_pas_2').val())
	{
		$("#reg_pas_2").parent().removeClass("has-success").addClass("has-error");
		$('#error_password_alert_2').removeClass('hide');
		$("#reg_pas_2").next().removeClass('glyphicon-ok').addClass("glyphicon-remove");
	}
	else
	{
		$("#reg_pas_2").parent().removeClass('has-error').addClass("has-success");
		$('#error_password_alert_2').addClass('hide');
		$("#reg_pas_2").next().removeClass('glyphicon-remove').addClass("glyphicon-ok");
	}

	var temp = true;

	$('input').each(function(i,element){

		if($(this).parent().hasClass('has-error'))
		{
			temp = false;
		}

	});

	if(temp)
	{
		$('#but_reg_end').button('loading')
		$.ajax({
 			type: 'POST',
			url: '/game',
   			data: {login:$("#reg_log").val(),password:$("#reg_pas_1").val(),email:$("#reg_email").val()},
    		}).done(function(answer){
			if(answer == 'ok') 
				document.location.href ='/game/characters';
			else if(answer == 'login')
			{
				$('#error_alert').html("Логин уже используется").removeClass('hide');

			}
			else if(answer == 'email')
			{
				$('#error_alert').html("Email уже используется").removeClass('hide');

			}
		}).fail(function(){
			$('#error_alert').html("Ошибка соединения").removeClass('hide');
		}).always(function () {
			$('#but_reg_end').button('reset')
		});
	}

}