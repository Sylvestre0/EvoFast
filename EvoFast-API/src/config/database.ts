import { Pool } from 'pg';

// Substitua pela sua string de conexão do Render.com
const connectionString = "postgresql://postgres:LjCmYmelgKvxYNHrFRczwzCbyAcbFCQi@metro.proxy.rlwy.net:50887/railway";
const database = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
});

export default database;