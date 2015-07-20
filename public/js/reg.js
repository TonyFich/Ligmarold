$(document).ready(function(){
//Обработчик нажатия кнопки входа
	$('#form_reg')
	//вывод, где ошибка валидации
	// .on('invalid.fndtn.abide', function () {
	//     var invalid_fields = $(this).find('[data-invalid]');
	//     console.log(invalid_fields);
	// })
	.on('valid.fndtn.abide', function () {
		var request = $.ajax({
		 	type: 'POST',
	        url: '/game',
	        data: {login:$("#reg_log").val(),password:$("#reg_pas").val(),email:$("#reg_email").val()},
	    });
	    request.fail(function(){
			console.log("fail");
		}); 
	});
});

$(document).foundation({
	abide: {
		patterns: {
			strlen: /[a-zA-Z]+(.){4,8}$/
		}
	}
})