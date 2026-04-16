import axios from 'axios';
import type { ContactFormData } from '@/types';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendContactEmail(data: ContactFormData) {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is missing in .env');
    return { success: false, error: 'Brevo API key missing' };
  }

  try {
    const response = await axios.post(
      BREVO_API_URL,
      {
        sender: {
          name: "Toiture Pro 95",           // Nom qui va apparaître
          email: "novaskol393@gmail.com"    // ← TON EMAIL VÉRIFIÉ
        },
        to: [
          {
            email: "tojo.devpro@gmail.com",
            name: "Toiture Pro 95"
          }
        ],
        replyTo: {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`
        },
        subject: `Nouvelle demande de devis - ${data.service || 'Contact'}`,
        htmlContent: `
          <h2 style="color:#1e3a8a;">Nouvelle demande de contact</h2>
          <p><strong>Nom complet :</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.phone}</p>
          <p><strong>Service demandé :</strong> ${data.service}</p>
          <hr>
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
          <br>
          <p style="color:#666; font-size:12px;">Envoyé le ${new Date().toLocaleString('fr-FR')}</p>
        `,
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Brevo success:', response.data);
    return { success: true, data: response.data };

  } catch (error: any) {
    console.error('Brevo API Error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to send email via Brevo' 
    };
  }
}