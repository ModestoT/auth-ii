// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, //needed for sqlite3
    connection: {
      filename: './db/auth.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
