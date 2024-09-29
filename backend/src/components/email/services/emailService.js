import { Resend } from 'resend';
import { API_KEY_RESEND } from '../../../config/env.js';

const resend = new Resend(API_KEY_RESEND);

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #333;">Restablecimiento de Contraseña</h2>
    <p style="color: #555;">Hola,</p>
    <p style="color: #555;">
      Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para restablecerla:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetUrl}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
    </div>
    <p style="color: #555;">
      Si no solicitaste este cambio, puedes ignorar este correo electrónico.
    </p>
    <p style="color: #555;">Gracias,</p>
    <p style="color: #555;">El equipo de Tidy</p>
  </div>
`;

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: message,
    });
  } catch (error) {
    console.error(`Error al enviar el correo para restablecer la contraseña: ${error.message}`);
    throw new Error('Error al enviar el correo de restablecimiento de contraseña');
  }
};
