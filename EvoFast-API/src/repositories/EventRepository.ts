import { Pool } from "pg";
import database from "../config/database";

export class EventRepository {
  private database: Pool;

  constructor() {
    this.database = database;
  }

    async addEvent(pais: string,CEP: string,numero: number | undefined,image: Buffer,latitude: number,longitude: number,imageType:string,cost:number,data:Date,eventName:string): Promise<Event> {
        const query = `
            INSERT INTO eventos (pais, cep, numero, imagem,preco,data_evento,titulo, mimetype, latitude, longitude)
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8 ,$9 ,$10 )
            RETURNING *;`;
        const values = [pais, CEP, numero, image, cost, data, eventName, imageType, latitude, longitude];
        const result = await this.database.query(query, values);
        return result.rows[0];
    }

  async getEvent() {
    const { rows } = await this.database.query('SELECT pais, cep, numero, imagem,preco,data_evento,titulo, mimetype, latitude, longitude FROM eventos');
    return rows;
  }
}  