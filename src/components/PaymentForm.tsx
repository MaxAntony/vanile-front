import { useCallback, useEffect } from 'react';

// Definimos la interfaz para el objeto de Culqi
interface CulqiWindow extends Window {
  Culqi?: {
    publicKey: string;
    settings: (options: { title: string; currency: string; description: string; amount: number; lang: string }) => void;
    open: () => void;
    close: () => void;
    token?: { id: string };
    error?: { user_message: string };
  };
  culqi?: () => void;
}

// Extendemos el objeto window con nuestra interfaz
declare const window: CulqiWindow;

const PaymentForm = ({ amount, afterOk }: { amount: number; afterOk: () => void }) => {
  useEffect(() => {
    const initializeCulqi = () => {
      if (window.Culqi) {
        window.Culqi.publicKey = 'pk_test_b23c67ca90bc6ec2';
        window.Culqi.settings({
          lang: 'es',
          title: 'Mi Tienda',
          currency: 'PEN',
          description: 'Pago de prueba',
          amount, // En céntimos
        });
      } else {
        console.error('Culqi no está disponible.');
      }
    };

    setTimeout(initializeCulqi, 1000);
  }, [amount]);

  // Función para abrir el formulario de pago
  const openCheckout = useCallback(() => {
    if (window.Culqi) {
      window.Culqi.open();
    } else {
      console.error('Culqi no está disponible.');
    }
  }, []);

  // Capturar el token generado por Culqi
  useEffect(() => {
    window.culqi = async () => {
      if (window.Culqi?.token) {
        console.log('Token generado:', window.Culqi.token.id);

        try {
          const response = await fetch(import.meta.env.VITE_API_URL + '/order/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tokenId: window.Culqi.token.id,
              amount: amount, // Monto en céntimos
              currency: 'PEN',
            }),
          });

          if (!response.ok) {
            throw new Error('Error en el pago');
          }

          // const data = await response.json();
          console.log('Respuesta del servidor:');
          window.Culqi.close();
          afterOk();
        } catch (error) {
          console.error('Error procesando el pago:');
        }
      } else {
        console.error('Error en la transacción:', window.Culqi?.error?.user_message || 'Error desconocido');
      }
    };
  }, [amount]);

  return (
    <button onClick={openCheckout} className='rounded bg-blue-600 px-4 py-2 text-white'>
      Pagar con Culqi
    </button>
  );
};

export default PaymentForm;
