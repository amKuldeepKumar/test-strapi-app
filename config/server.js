module.exports = ({ env }) => ({
  host: '0.0.0.0', // required so it's accessible externally
  port: env.int('PORT', 1337), // use Render's provided PORT
  app: {
    keys: env.array('APP_KEYS', ['yourAppKey1', 'yourAppKey2']),
  },
});
