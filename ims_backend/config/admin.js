module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ca0b0682a2a4328cfdcc9841c9d9eb50'),
  },
});
