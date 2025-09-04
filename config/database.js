const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    postgres: {
      connection: env("DATABASE_URL")
        ? {
            connectionString: env("DATABASE_URL"),
            ssl: env.bool("DATABASE_SSL", true) && {
              rejectUnauthorized: false,
            },
            schema: env("DATABASE_SCHEMA", "public"),
          }
        : {
            host: env("PGHOST", "127.0.0.1"), // fallback to IPv4
            port: env.int("PGPORT", 5432),
            database: env("PGDATABASE", "postgres"),
            user: env("PGUSER", "postgres"),
            password: env("PGPASSWORD", "postgres"),
            ssl: env.bool("DATABASE_SSL", true) && {
              rejectUnauthorized: false,
            },
            schema: env("DATABASE_SCHEMA", "public"),
          },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
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
