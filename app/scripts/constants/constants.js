module.exports = {
  STRIPE: {
    PUBLISHABLE_KEY: process.env.NODE_ENV !== 'production' ? 'pk_test_f6MApsp3oUQNaZSejidOONkT' : process.env.STRIPE,
  },
  ICON: '../../favicon.ico',
  IMAGE_URL: '../../images/10612805_674783332611610_5602889381423136186_n.jpg',
  DESCRIPTION: '74 blocks (with the goal of 100) in East Baltimore where the peace is encouraged by the youth of the community, NOT THE POLICE!',
  SITE_NAME: 'Rose St. Community Center',
  SERVER_URL: 'https://rose-st-api.herokuapp.com'
}
