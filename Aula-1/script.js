$(document).ready(function() {
    $("input[name=cep]").mask("00000-000");

    $("#meuFormulario").on("submit", function(event) {
        event.preventDefault(); // Impede o envio do formulário
        event.stopPropagation(); // Impede a propagação do evento

        // Verifica se o CEP é válido antes de enviar
        let cep = $("input[name=cep]").val(); 
        let regex = /^\d{5}-\d{3}$/; 

        if (regex.test(cep)) {
            let cepNumeros = cep.replace(/\D/g, '');

            alert("Alerta de teste: Formulário enviado com sucesso! CEP: " + cepNumeros);

            // Limpa os campos do formulário
            $(this).find("input[type=text], input[type=tel], input[type=email], textarea").val("");
            $("#cep-error").hide(); // Oculta a mensagem de erro, se existir
        } else {
            $("#cep-error").text("CEP inválido. Por favor, verifique o número.").show(); // Exibe a mensagem de erro
        }
    });

    $("input[name=cep]").on("keyup", function(event) {
        let cep = $(this).val(); 
        let regex = /^\d{5}-\d{3}$/; 

        if (regex.test(cep)) {
            let cepNumeros = cep.replace(/\D/g, ''); 
            console.log(cepNumeros);
            $("#cep-error").hide(); // Oculta a mensagem de erro
        } else {
            console.log(cep);
            $("#cep-error").text("CEP inválido.").show(); // Exibe a mensagem de erro
        }
    });
});
