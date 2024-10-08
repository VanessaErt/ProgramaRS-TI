$(document).ready(function() {
    // Evento para buscar os dados
    $("#button1").on("click", function(event) {
        $.getJSON("./data.json", function(data) {
            $("#resultado1").append("Nome: " + data.name + ", ");
            $("#resultado1").append("Idade: " + data.age + " anos<br>");
            $("#resultado1").append("Carros: " + data.cars.join(", ") + "<br><br>");
        });
    });

    // Evento para limpar os resultados
    $("#limpar").on("click", function(event) {
        $("#resultado1").empty(); 
    });
});
