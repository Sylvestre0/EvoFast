import pool from '../config/database';

const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      DROP TABLE IF EXISTS eventos; 
      CREATE TABLE eventos (
        id SERIAL PRIMARY KEY,
        pais VARCHAR(100) NOT NULL,
        imagem BYTEA,
        eventname VARCHAR(255) NOT NULL,
        data_evento DATE NOT NULL,
        preco DECIMAL(10, 2) DEFAULT 0,
        mimetype VARCHAR(255),
        latitude DECIMAL(9,6),
        longitude DECIMAL(9,6),
        endereco_completo TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ingressos_vendidos INTEGER NOT NULL DEFAULT 0
      );
    `;
    await client.query(queryText);
    console.log('Tabela "eventos" atualizada com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar tabela:', err);
  } finally {
    client.release();
  }
};
createUsersTable().then(() => process.exit(0));