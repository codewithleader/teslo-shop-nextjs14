'use server';

import type {
  PaypalOrderStatusResponse,
  PaypalResponseOAuth2Token,
} from '@/interfaces';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const paypalAuthAccessToken = await getPaypalBearerToken();
  if (!paypalAuthAccessToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificación',
    };
  }
  const resp = await verifyPaypalPayment(
    paypalTransactionId,
    paypalAuthAccessToken,
  );
  if (!resp) {
    return {
      ok: false,
      message: 'Error al verificar el pago',
    };
  }
  const { status, purchase_units } = resp;
  // const {  } = purchase_units[0]; // TODO: invoice ID
  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se ha pagado en Paypal',
    };
  }

  // Realizar la actualización en nuestra base de datos
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    'utf-8',
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Basic ${base64Token}`);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const { access_token }: PaypalResponseOAuth2Token = await fetch(
      PAYPAL_OAUTH_URL,
      requestOptions,
    ).then((res) => res.json());
    return access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  paypalAccessToken: string,
): Promise<PaypalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? '';

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${paypalAccessToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const response: PaypalOrderStatusResponse = await fetch(
      `${PAYPAL_ORDERS_URL}/${paypalTransactionId}`,
      requestOptions,
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
