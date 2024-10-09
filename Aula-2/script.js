$(document).ready(function () {
  $("#button1").on("click", function (event) {
      $.getJSON("./data.json", function (data) {
          $("#resultado1").append(data.name + ", ");
          $("#resultado1").append(data.age + " anos: ");

          for (let i in data.cars) {
              $("#resultado1").append(data.cars[i] + ", ");
          }

          $("#resultado1").append("<br>");
      }).fail(function() {
          $("#resultado1").append("Erro ao carregar data.json<br>");
      });
  });

  $("#button2").on("click", function () {
      $.getJSON("./data2.json", function (data) {
          $("#resultado2").append(data.name + ", " + data.age + "<br>");

          for (let i in data.friends) {
              let friendName = data.friends[i].firstName + " " + data.friends[i].lastName;
              $("#resultado2").append("Amigo " + (parseInt(i) + 1) + ": " + friendName + "<br>");
          }
      }).fail(function() {
          $("#resultado2").append("Erro ao carregar data2.json<br>");
      });
  });

  // Update the button ID to "button3"
  $("#button3").on("click", function () {
      $.getJSON("./data3.json", function (data) {
          // Clear the results before appending new data
          $("#resultado3").empty();
          for (var i in data.results) {
              $("#resultado3").append(data.results[i].gender + "<br>");
              $("#resultado3").append(data.results[i].name.first + "<br>");
              $("#resultado3").append(data.results[i].email + "<br>");
          }
          $("#resultado3").append(data.info.seed + "<br>");

      }).fail(function() {
          $("#resultado3").append("Erro ao carregar data3.json<br>");
      });
  });

  $("#limpar").on("click", function (event) {
      $("div[id^=resultado]").empty();
  });
});
