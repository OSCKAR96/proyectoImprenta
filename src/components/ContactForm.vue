<template>
    <div class="form-container">
      <h1>Contáctanos</h1>
      <form @submit.prevent="sendMessage">
        <label for="name">Nombre:</label>
        <input type="text" v-model="formData.name" id="name" required />
  
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="formData.email" id="email" required />
  
        <label for="message">Mensaje:</label>
        <textarea v-model="formData.message" id="message" rows="5" required></textarea>
  
        <button type="submit">Enviar</button>
      </form>
      <p v-if="responseMessage">{{ responseMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: '',
        },
        responseMessage: '',
      };
    },
    methods: {
      async sendMessage() {
        try {
          const response = await fetch('https://REGION-PROYECTO.cloudfunctions.net/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.formData),
          });
  
          const result = await response.json();
          this.responseMessage = result.message;
          this.formData = { name: '', email: '', message: '' }; // Limpia el formulario
        } catch (error) {
          this.responseMessage = 'Error al enviar el mensaje.';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
  }
  
  label {
    display: block;
    margin: 10px 0 5px;
  }
  
  input, textarea, button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #5cb85c;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #4cae4c;
  }
  </style>
  