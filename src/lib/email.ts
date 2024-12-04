import { renderToStaticMarkup } from 'react-dom/server';
import { PasswordResetEmail } from '../components/emails/PasswordResetEmail';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Fonction simulée d'envoi d'email
export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  // En production, utilisez un service d'envoi d'emails comme SendGrid, Amazon SES, etc.
  console.log('Sending email:', options);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation du délai d'envoi
};

export const sendPasswordResetEmail = async (
  email: string,
  userName: string,
  resetToken: string
): Promise<void> => {
  const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  const expirationTime = '1 heure';

  const emailHtml = renderToStaticMarkup(
    PasswordResetEmail({
      userName,
      resetLink,
      expirationTime
    })
  );

  await sendEmail({
    to: email,
    subject: 'Réinitialisation de votre mot de passe - Pizza Délice',
    html: emailHtml
  });
};