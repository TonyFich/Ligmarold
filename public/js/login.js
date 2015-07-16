
$(document).ready(function(){
	//Обработчик нажатия кнопки входа
	$('#but_log').click(function() {
		//Реакция нажания кнопки
	    $.ajax({
	        url: '/auth',
	        type: 'POST',
	        data: {login:$("#enter_login").val(),password:$("#enter_password").val()},
	    }).done(function(answer) {
		    console.log(answer);
		});  

    });
});