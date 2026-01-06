window.onload = function () {

  var form = document.getElementById("formMatricula");

  var nombre = document.getElementById("nombre");
  var edad = document.getElementById("edad");
  var email = document.getElementById("email");
  var ciclo = document.getElementById("ciclo");
  var obs = document.getElementById("obs");
  var acepto = document.getElementById("acepto");

  var msgEdad = document.getElementById("msgEdad");
  var msgEmail = document.getElementById("msgEmail");
  var msgCiclo = document.getElementById("msgCiclo");
  var msgMods = document.getElementById("msgMods");
  var msgAcepto = document.getElementById("msgAcepto");

  var btnReload = document.getElementById("btnReload");

  function validarEdad() {
    var valor = edad.value.trim();
    var num = Number(valor);

    if (valor === "" || isNaN(num)) {
      edad.classList.remove("campo-ok");
      edad.classList.add("campo-error");
      msgEdad.classList.remove("msg-ok");
      msgEdad.classList.add("msg-error");
      msgEdad.textContent = "Debe ser un número.";
      return false;
    }
    if (num < 16 || num > 60) {
      edad.classList.remove("campo-ok");
      edad.classList.add("campo-error");
      msgEdad.classList.remove("msg-ok");
      msgEdad.classList.add("msg-error");
      msgEdad.textContent = "Entre 16 y 60 años.";
      return false;
    }
    edad.classList.remove("campo-error");
    edad.classList.add("campo-ok");
    msgEdad.classList.remove("msg-error");
    msgEdad.classList.add("msg-ok");
    msgEdad.textContent = "Edad correcta.";
    return true;
  }

  function validarEmail() {
    var valor = email.value.trim().toLowerCase();

    if (valor.length < 6 || valor.indexOf("@") === -1 || valor.indexOf(".") === -1) {
      email.classList.remove("campo-ok");
      email.classList.add("campo-error");
      msgEmail.classList.remove("msg-ok");
      msgEmail.classList.add("msg-error");
      msgEmail.textContent = "Formato de email incorrecto.";
      return false;
    }
    if (valor.indexOf("@yahoo.") !== -1) {
      email.classList.remove("campo-ok");
      email.classList.add("campo-error");
      msgEmail.classList.remove("msg-ok");
      msgEmail.classList.add("msg-error");
      msgEmail.textContent = "No se admite dominio yahoo.";
      return false;
    }
    email.classList.remove("campo-error");
    email.classList.add("campo-ok");
    msgEmail.classList.remove("msg-error");
    msgEmail.classList.add("msg-ok");
    msgEmail.textContent = "Email correcto.";
    return true;
  }

  function validarCiclo() {
    if (ciclo.value === "") {
      ciclo.classList.remove("campo-ok");
      ciclo.classList.add("campo-error");
      msgCiclo.classList.remove("msg-ok");
      msgCiclo.classList.add("msg-error");
      msgCiclo.textContent = "Elige un ciclo.";
      return false;
    }
    ciclo.classList.remove("campo-error");
    ciclo.classList.add("campo-ok");
    msgCiclo.classList.remove("msg-error");
    msgCiclo.classList.add("msg-ok");
    msgCiclo.textContent = "Ciclo correcto.";
    return true;
  }

  function validarMods() {
    var checks = document.getElementsByName("modulos");
    var cont = 0;
    var i;

    for (i = 0; i < checks.length; i++) {  
      if (checks[i].checked) {
        cont = cont + 1;
      }
    }

    if (cont < 2) {
      msgMods.classList.remove("msg-ok");
      msgMods.classList.add("msg-error");
      msgMods.textContent = "Marca al menos 2 módulos.";
      return false;
    }
    msgMods.classList.remove("msg-error");
    msgMods.classList.add("msg-ok");
    msgMods.textContent = "Módulos correctos.";
    return true;
  }

  function validarAcepto() {
    if (!acepto.checked) {
      msgAcepto.classList.remove("msg-ok");
      msgAcepto.classList.add("msg-error");
      msgAcepto.textContent = "Debes aceptar las condiciones.";
      return false;
    }
    msgAcepto.classList.remove("msg-error");
    msgAcepto.classList.add("msg-ok");
    msgAcepto.textContent = "Condiciones aceptadas.";
    return true;
  }

  
  edad.oninput = validarEdad;
  email.oninput = validarEmail;
  ciclo.onchange = validarCiclo;
  document.getElementById("mods").onchange = validarMods;
  acepto.onchange = validarAcepto;

  // recargar
  btnReload.onclick = function () {
    location.reload();
  };

  // enviar
  form.onsubmit = function (e) {
    e.preventDefault();

    var errores = [];

    if (!validarEdad()) errores.push("Edad");
    if (!validarEmail()) errores.push("Email");
    if (!validarCiclo()) errores.push("Ciclo");
    if (!validarMods()) errores.push("Módulos");
    if (!validarAcepto()) errores.push("Aceptar condiciones");

    if (errores.length > 0) {
      alert("Hay campos no válidos: " + errores.join(", "));
      return;
    }

    var checks = document.getElementsByName("modulos");
    var listaMods = [];
    var i;

    for (i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        listaMods.push(checks[i].value);
      }
    }

    var nueva = window.open("", "_blank");
    nueva.document.write("<h1>Resumen</h1>");
    nueva.document.write("<p>Nombre: " + nombre.value + "</p>");
    nueva.document.write("<p>Edad: " + edad.value + "</p>");
    nueva.document.write("<p>Email: " + email.value + "</p>");
    nueva.document.write("<p>Ciclo: " + ciclo.value + "</p>");
    nueva.document.write("<p>Módulos: " + listaMods.join(", ") + "</p>");
    nueva.document.write("<p>Observaciones: " + (obs.value || "(sin observaciones)") + "</p>");
    nueva.document.write("<p>Condiciones aceptadas: Sí</p>");
    nueva.document.close(); 
  };

};
