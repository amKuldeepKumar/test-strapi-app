const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL") || `postgresql://${env("PGUSER", "postgres")}:${env("PGPASSWORD", "postgres")}@${env("PGHOST", "127.0.0.1")}:${env.int("PGPORT", 5432)}/${env("PGDATABASE", "postgres")}`,
        ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
        schema: env("DATABASE_SCHEMA", "public"),
        family: 4, // Force IPv4
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    sqlite: {
      connection: {
        filename: path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db")),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};