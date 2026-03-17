import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key || key === 'sk_test_dummy') {
        throw new Error('STRIPE_SECRET_KEY is not configured');
      }
      _stripe = new Stripe(key, {
        apiVersion: '2023-10-16',
        typescript: true,
      });
    }
    return (_stripe as any)[prop];
  },
});

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';
  url = url.includes('http') ? url : \`https://\${url}\`;
  url = url.charAt(url.length - 1) === '/' ? url : \`\${url}/\`;
  return url;
};
