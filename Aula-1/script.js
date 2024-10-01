$(document).ready(function() {
    $("#meuFormulario").on("submit", function(event) {
        event.preventDefault(); // Impede o envio do formulário
        event.stopPropagation(); // Impede a propagação do evento
        alert("Alerta de teste: Formulário enviado com sucesso!");
    });
    
    $("input[name=cep]").on("change", function(event) {
        console.log("CEP alterado:", $(this).val());
    });
});
