$(document).ready(function(){
	$('#myForm')
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
			document.location.href ='/game/index';
		});
		request.fail(function(){
			document.location.href ='/';
		});   
	});
});

$(document).foundation({
	abide: {
		patterns: {
			strlen: /[a-zA-Z]+(.){4,}$/
		}
	}
})