<template>
  <div>
    <form @submit.prevent="sendEmail">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">Correo:</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="message">Mensaje:</label>
      <textarea id="message" v-model="form.message" required></textarea>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com"; // Importar la librería EmailJS

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    // Función para enviar el correo a través de EmailJS
    sendEmail() {
      const serviceID = "service_f7mowy8"; // Reemplaza con tu Service ID de EmailJS
      const templateID = "template_z96f1ba"; // Reemplaza con tu Template ID de EmailJS
      const userID = "-LIEYploKTupbwtTx"; // Reemplaza con tu Public Key de EmailJS

      // Enviar el correo con los datos del formulario
      emailjs
        .send(serviceID, templateID, this.form, userID)
        .then(() => {
          alert("Correo enviado exitosamente.");
          // Limpiar los campos del formulario después de enviar el correo
          this.form.name = "";
          this.form.email = "";
          this.form.message = "";
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error);
          alert("Hubo un error al enviar el correo.");
        });
    },
  },
};
</script>

<style scoped>
/* Estilos básicos para el formulario */
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}

label {
  margin-bottom: 5px;
}

input, textarea {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
