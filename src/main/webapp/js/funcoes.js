function trocarIcone(nome) {
    if (nome == "img/icons/fullPlus-icon.png") {
        if (document.getElementById("iconeAdd").src == "http://localhost:9090/Projeto-MySeries/img/icons/fullPlus-icon.png") {
            document.getElementById("iconeAdd").src = "http://localhost:9090/Projeto-MySeries/img/icons/plus-icon.png";
        } else {
            document.getElementById("iconeAdd").src = nome;
        }
    } else if (nome == "img/icons/check-icon.png") {
        if (document.getElementById("iconEye").src == "Projeto-MySeries/img/icons/check-icon.png") {
            document.getElementById("iconEye").src = "http://localhost:9090/Projeto-MySeries/img/icons/eye-icon.png";
        } else {
            document.getElementById("iconEye").src = nome;
        }
    } else if (nome == "img/icons/fullHeart-icon.png") {
        if (document.getElementById("iconeHeart").src == "http://localhost:9090/Projeto-MySeries/img/icons/fullHeart-icon.png") {
            document.getElementById("iconeHeart").src = "http://localhost:9090/Projeto-MySeries/img/icons/empytHeart-icon.png";
        } else {
            document.getElementById("iconeHeart").src = nome;
        }
    }
}

function contador() {
    if (nome == "img/icons/checkEP-icon.png") {
        if (document.getElementById("iconeEP").src == "http://localhost:9090/Projeto-MySeries/img/icons/checkEP-icon.png") {
            document.getElementById("iconeEP").src = "http://localhost:9090/Projeto-MySeries/img/icons/eyeEP-icon.png";
        } else {
            document.getElementById("iconeEP").src = nome;
        }
    }
}