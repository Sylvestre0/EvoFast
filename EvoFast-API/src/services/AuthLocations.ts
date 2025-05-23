// src/services/AuthLocations.ts

import { Pool } from 'pg';
import { searchAddressGeoapify } from '../config/geoAPI';
import { EventRepository } from '../repositories/EventRepository';


export class EventLocations {
  private eventRepository: EventRepository;

  constructor() {
      this.eventRepository = new EventRepository;
  }

  async PublishEvents(eventName:string,data:Date,pais:string,preco:number,enderecoCompleto:string,imagem:Buffer,imagetype:string,code:string): Promise<any> {

      if (!imagem) {
          throw new Error('Nenhuma imagem foi enviada para o evento.');
      }

      let latitude: number;
      let longitude: number;

      try {
          const geoapifyResult = await searchAddressGeoapify(enderecoCompleto,code);

          if (geoapifyResult) {
              latitude = geoapifyResult.lat;
              longitude = geoapifyResult.lon;
          } else {
              throw new Error('Endereço não encontrado pela API de geocodificação.');
          }
          const event = await this.eventRepository.addEvent(pais,imagem,latitude,longitude,imagetype,preco,data,eventName,enderecoCompleto);
          return event;

      } catch (error: any) {
          throw new Error(`Falha ao publicar evento: ${error.message}`);
    }
  }
async ActiveEvents() {
    try {
      const events = await this.eventRepository.getEvent();
      const eventsWithBase64Images = events.map((event: any) => {
        let imageDataUri: string | null = null;

        if (event.imagem instanceof Buffer && event.mimetype) {
          const base64Image = event.imagem.toString('base64');
          imageDataUri = `data:${event.mimetype};base64,${base64Image}`;
        }

        return {
          ...event,
          imagem: imageDataUri
        };
      });

      return eventsWithBase64Images;

    } catch (error: any) {
      console.error('Erro ao buscar eventos em ActiveEvents (serviço):', error.message);
      throw new Error(`Falha ao buscar eventos: ${error.message}`);
    }
  }
}