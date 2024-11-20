const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configura Nodemailer con tu correo y contraseña de aplicación
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oscarwebster96@gmail.com", // Reemplaza con tu correo
    pass: "cowc mawz pylu muzj", // Contraseña de aplicación generada
  },
});

// Función para enviar correo al crear un nuevo mensaje
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  // Asegura que solo se acepten solicitudes POST
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Método no permitido" });
  }

  // Obtén los datos enviados desde el frontend
  const { name, email, message } = req.body;

  // Configura los detalles del correo
  const mailOptions = {
    from: "oscarwebster96@gmail.com",
    to: "oscarwebster96@gmail.com", // Envíatelo a ti mismo
    subject: "Nuevo mensaje de contacto",
    html: `
      <h1>Nuevo mensaje de contacto</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `,
  };

  try {
    // Envía el correo
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).send({ message: "Error al enviar correo" });
  }
});
