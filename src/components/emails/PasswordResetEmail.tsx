import React from 'react';

interface PasswordResetEmailProps {
  userName: string;
  resetLink: string;
  expirationTime: string;
}

export function PasswordResetEmail({ userName, resetLink, expirationTime }: PasswordResetEmailProps) {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          color: '#1E293B',
          fontSize: '24px',
          marginBottom: '10px'
        }}>
          Réinitialisation de votre mot de passe
        </h1>
        <p style={{
          color: '#64748B',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Bonjour {userName},
        </p>
      </div>

      <div style={{
        color: '#475569',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '30px'
      }}>
        <p>
          Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Pizza Délice.
          Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
        </p>
        <p style={{ marginTop: '20px' }}>
          Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :
        </p>
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <a
          href={resetLink}
          style={{
            backgroundColor: '#F59E0B',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: '600',
            fontSize: '16px'
          }}
        >
          Réinitialiser mon mot de passe
        </a>
      </div>

      <div style={{
        color: '#64748B',
        fontSize: '14px',
        lineHeight: '1.5',
        marginBottom: '20px'
      }}>
        <p>
          Ce lien expirera dans {expirationTime}.
          Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :
        </p>
        <p style={{
          color: '#1E293B',
          wordBreak: 'break-all',
          marginTop: '10px'
        }}>
          {resetLink}
        </p>
      </div>

      <div style={{
        borderTop: '1px solid #E2E8F0',
        paddingTop: '20px',
        marginTop: '30px',
        textAlign: 'center',
        color: '#94A3B8',
        fontSize: '14px'
      }}>
        <p>
          Pizza Délice - 123 Avenue des Champs-Élysées, 75008 Paris
        </p>
        <p style={{ marginTop: '10px' }}>
          Cet email a été envoyé automatiquement, merci de ne pas y répondre.
        </p>
      </div>
    </div>
  );
}