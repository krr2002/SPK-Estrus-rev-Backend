import path from "node:path"


var configuration = {
  migrationsDir: path.resolve(__dirname, '../db/postgres/migrations'), // This is the directory that should contain your SQL migrations.
  host: 'localhost', // Database host
  port: 5432, // Database port
  db: 'spk_estrus', // Database name
  user: 'novando', // Database username
  password: 'kiki1995', // Database password
  adapter: 'pg', // Database adapter: pg, mysql
}