$(document).ready(function(){
//Обработчик нажатия кнопки входа
	$('#but_reg').click(function(){
		//Реакция нажания кнопки
	    $.ajax({
	        url: '/registration',
	        type: 'POST',
	        data:{login:$("#reg_log").val(),password:$("#reg_pas").val(),
	        	email:$("#reg_email").val()
	        },
	    }).done(function(answer) {
		   console.log(answer);
		});  
 	}); 
});

