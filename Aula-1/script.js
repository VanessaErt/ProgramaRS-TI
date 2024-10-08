$(document).ready(function() {
    let resposta = '';

    $("input[name=cep]").mask("00000-000");
    $("input[name=numero]").mask("n", {
        translation: {
            'n': {
                pattern: /[0-9]/,
                recursive: true
            }
        }
    });

    // Máscara inicial para telefone
    $("input[name=telefone]").mask("(00) 0000-0000"); 

    $("input[name=telefone]").on("input", function() {
        const telefone = $(this).val().replace(/\D/g, '');

        if (telefone.length >= 10) {
            $(this).mask("(00) 00000-0000"); 
        } else {
            $(this).mask("(00) 0000-0000"); 
        }
    });

    const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    // Carregar os estados na inicialização
    $.getJSON(urlEstados, function(data) {
        data.forEach(function(estado) {
            $('#estado').append(`<option value="${estado.sigla}">${estado.nome}</option>`);
        });
    });

    $("form").on("submit", function(event) {
        event.stopPropagation();
        event.preventDefault();

        // Validação de email
        const email = $("input[name=email]").val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido com o formato correto (exemplo@dominio.com).");
            $("input[name=email]").addClass("is-invalid");
            return; 
        } else {
            $("input[name=email]").removeClass("is-invalid");
        }

        alert("Formulário enviado com sucesso!");

        // Limpar os campos do formulário
        $("form")[0].reset();
        $('#estado').val(''); 
        $('#cidade').empty(); 
        $('#cidade').append(`<option value="">Selecione a cidade</option>`);

        // Recarregar os estados após o reset
        $('#estado').empty(); 
        $.getJSON(urlEstados, function(data) {
            data.forEach(function(estado) {
                $('#estado').append(`<option value="${estado.sigla}">${estado.nome}</option>`);
            });
        });
    });

    $("input[name=cep]").on("keyup", function(event) {
        let cep = $("input[name=cep]").val();
        cep = cep.replace("-", "");

        // Limpa os campos se o CEP estiver sendo apagado
        if (cep.length < 8) {
            $("input[name=rua]").val('');
            $("input[name=bairro]").val('');
            $("select[name=estado]").val('');
            $('#cidade').empty();
            $('#cidade').append(`<option value="">Selecione a cidade</option>`);
            $("input[name=cep]").removeClass("is-invalid"); 
            return; 
        }

        if (cep.length == 8) {
            $("input[name=cep]").removeClass("is-invalid");
            $.ajax("https://viacep.com.br/ws/" + cep + "/json")
                .done(function(data) {
                    resposta = JSON.parse(data);
                    if (resposta.erro) {
                        $("input[name=cep]").addClass("is-invalid");
                    } else {
                        $("input[name=rua]").val(resposta.logradouro);
                        $("input[name=bairro]").val(resposta.bairro);
                        $("select[name=estado]").val(resposta.uf);
                        $("select[name=estado]").trigger("change");
                    }
                });
        }
    });

    $('#estado').on('change', function() {
        let estadoId = $(this).val();

        if (estadoId) {
            const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;

            $.getJSON(urlCidades, function(data) {
                $('#cidade').empty();
                $('#cidade').append(`<option value="">Selecione a cidade</option>`);

                data.sort(function(a, b) {
                    return a.nome.localeCompare(b.nome);
                });

                data.forEach(function(cidade) {
                    $('#cidade').append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
                });

                $("select[name=cidade]").val(resposta.localidade);
            });
        } else {
            $('#cidade').empty();
            $('#cidade').append(`<option value="">Primeiro selecione o estado</option>`);
        }
    });
});