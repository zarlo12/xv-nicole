//import { invitados } from "./invitados.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHnHj_z55B-VujnU3Uc1X1lMUt0a-Tjh8",
  authDomain: "xv-anios.firebaseapp.com",
  projectId: "xv-anios",
  storageBucket: "xv-anios.appspot.com",
  messagingSenderId: "1070165494180",
  appId: "1:1070165494180:web:5fbbd3a24226145b62d931",
  measurementId: "G-NE08T41NPZ",
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Obtener invitados de Firestore
const querySnapshot = await db.collection("invitadosXVNicoleJul").get();
const invitados = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

console.log("invitados2", invitados);
// Función para obtener el parámetro 'nombre' de la URL
function obtenerCodigo() {
  const params = new URLSearchParams(window.location.search);
  return params.get("codigo");
}

// Función para agregar el nombre al body y opciones al select
function actualizarHTMLConInvitado(invitado) {
  // Actualizar el nombre del invitado
  const nombreInvitadoElem = document.getElementById("nombreInvitado");
  nombreInvitadoElem.textContent = invitado.invitado;

  // Actualizar el select con el número de invitados
  const listaInvitadosElem = document.getElementById("listaInvitados");
  //listaInvitadosElem.innerHTML = ''; // Limpiar el contenido actual del select

  if (invitado.numeroInvitados === 0) {
    // Si numeroInvitados es 0, agregar opción "Sí asistiré"
    const option = document.createElement("option");
    option.value = 1;
    option.textContent = "Sí asistiré";
    listaInvitadosElem.appendChild(option);
  } else {
    // Si numeroInvitados es mayor a 0, agregar opciones numéricas
    for (let i = 1; i <= invitado.numeroInvitados; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      listaInvitadosElem.appendChild(option);
    }
  }
}

// Obtener el nombre de la URL

const codigo = obtenerCodigo();

const invitado = invitados.find((inv) => inv.codigo === codigo);

if (invitado) {
  actualizarHTMLConInvitado(invitado);
} else {
  // Mensaje o acción si el invitado no se encuentra
  const nombreInvitadoElem = document.getElementById("nombreInvitado");
  nombreInvitadoElem.textContent = "Invitado no encontrado.";
}

// Función para enviar el mensaje de WhatsApp
function enviarWhatsApp(nombre, numeroInvitados) {
  console.log("🚀 ~ enviarWhatsApp ~ numeroInvitados:", numeroInvitados);
  console.log("🚀 ~ enviarWhatsApp ~ nombre:", nombre);
  const numeroTelefono = "+5216142468088"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  let mensaje = `Hola soy ${nombre} Confirmo mi invitación con el número total de asistentes: ${numeroInvitados}`;
  if (numeroInvitados == "No podra asistir") {
    mensaje = `Hola soy ${nombre}, confirmo que no podre asistir.`;
  }
  if (numeroInvitados == 0) {
    mensaje = `Hola soy ${nombre}, confirmo mi invitación.`;
  }
  const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url, "_blank");
}

function enviarWhatsAppForm(nombre_form, anecdota_form, deseos_form) {
  // console.log("🚀 ~ enviarWhatsApp ~ numeroInvitados:", numeroInvitados);
  // console.log("🚀 ~ enviarWhatsApp ~ nombre:", nombre);
  const numeroTelefono = "+5216142468088"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  let mensaje = `Hola soy ${nombre_form},\nConfirmó mi invitación. `;

  mensaje = mensaje + "\n\n*Anecdota juntos:* " + anecdota_form;
  mensaje = mensaje + "\n\n*Palabras o buenos deseos:* " + deseos_form;

  const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url, "_blank");
}

// Agregar evento al botón de confirmar

document
  .getElementById("btn_send_counterzz")
  .addEventListener("click", function () {
    const nombreInvitado =
      document.getElementById("nombreInvitado").textContent;
    const numeroInvitados = document.getElementById("listaInvitados").value;

    if (nombreInvitado == "Invitado no encontrado.") {
      return alert("Invitado no registrado.");
    }
    if (numeroInvitados) {
      enviarWhatsApp(nombreInvitado, numeroInvitados);
    } else {
      return alert("Por favor, selecciona el número de asistentes.");
    }
  });

// document
//   .getElementById("confirmarFomrulario")
//   .addEventListener("click", function () {
//     const nombre_form = document.getElementById("nombre_form").value;
//     const anecdota_form = document.getElementById("anecdota_form").value;
//     const deseos_form = document.getElementById("deseos_form").value;

//     if (!nombre_form) {
//       return alert("Ingresa tu nombre");
//     }

//     enviarWhatsAppForm(nombre_form, anecdota_form, deseos_form);
//   });

document.addEventListener("visibilitychange", function () {
  const audio = document.getElementById("audio");
  console.log("🚀 ~ audio:", audio);
  if (document.visibilityState === "hidden") {
    audio.pause();
  } else if (document.visibilityState === "visible") {
    audio.play();
  }
});
