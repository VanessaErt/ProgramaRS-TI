$(document).ready(function() {
    $("input[name=cep]").mask("00000-000");

    $("input[name=cep]").on("keyup", function() {
        let cep = $(this).val(); 
        let regex = /^\d{5}-\d{3}$/; 

        if (regex.test(cep)) {
            let cepNumeros = cep.replace(/\D/g, ''); 
            alert(cepNumeros);
            $("#cep-error").hide(); 
        } else {
            $("#cep-error").text("CEP inválido.").show(); 
        }
    });
});
