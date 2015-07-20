$(document).ready(function(){
	$('#form_log')
	//вывод, где ошибка валидации
	// .on('invalid.fndtn.abide', function () {
	//     var invalid_fields = $(this).find('[data-invalid]');
	//     console.log(invalid_fields);
	// })
	.on('valid.fndtn.abide', function () {
		var request = $.ajax({
		    url: '/auth',
		    type: 'POST',
		    data: {login:$("#enter_login").val(),password:$("#enter_password").val()},
		});
		request.done(function(){
			// document.location.href ='/game/index';
		});
		request.fail(function(){
			alert("Неверный логин или пароль");
		});   
	});

	$('#but_reg').click(function(){
		//Реакция нажания кнопки
	  document.location.href ='/reg';
 	}); 

});

$(document).foundation({
	abide: {
		patterns: {
			strlen: /[a-zA-Z]+(.){4,8}$/
		}
	}
})