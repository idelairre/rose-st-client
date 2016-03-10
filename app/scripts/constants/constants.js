export const STRIPE = {
  PUBLISHABLE_KEY: (process.env.NODE_ENV === 'production' ? process.env.STRIPE : 'pk_test_f6MApsp3oUQNaZSejidOONkT'),
};

export const SERVER_URL = 'https://rose-st-api.herokuapp.com';
