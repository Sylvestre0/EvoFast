import { Pool } from "pg";
import database from "../config/database";

export class EventRepository {
  private database: Pool;

  constructor() {
    this.database = database;
  }

    async addEvent(pais:string,imagem:Buffer,latitude:number,longitude:number,imagetype:string,preco:number,data:Date,eventName:string,enderecoCompleto:string): Promise<Event> {
        const query = `
            INSERT INTO eventos (pais,imagem,latitude,longitude,mimetype,preco,data_evento,eventName,endereco_completo)
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9 )
            RETURNING *;`;
        const values = [pais,imagem,latitude,longitude,imagetype,preco,data,eventName,enderecoCompleto];
        const result = await this.database.query(query, values);
        return result.rows[0];
    }

  async getEvent() {
    const { rows } = await this.database.query('SELECT pais,imagem,latitude,longitude,mimetype,preco,data_evento,eventname,endereco_completo FROM eventos');
    return rows;
  }
}  