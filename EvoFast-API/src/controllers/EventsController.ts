// src/controllers/EventsController.ts

import { Request, Response } from 'express';
import { EventLocations } from '../services/AuthLocations';

const eventLocations = new EventLocations();

export const PublishEvents = async (req: Request, res: Response): Promise<void> => {
  const imageFile = req.file;

  if (!imageFile) {
    res.status(400).json({ error: 'Nenhuma imagem foi enviada para o evento.' });
    return;
  }

  const { eventName, data, pais, preco, enderecoCompleto,code } = req.body;

  const imagemtype = imageFile.mimetype;
  const imagem: Buffer = imageFile.buffer;

  console.log(eventName, data, pais, preco, enderecoCompleto,code);

  try {
    const eventDate = new Date(data); 
    const eventPrice = parseFloat(preco); 

    const Location = await eventLocations.PublishEvents(
      eventName,
      eventDate,
      pais,
      eventPrice,
      enderecoCompleto,
      imagem,
      imagemtype,
      code
    );
    res.status(201).json(Location);
  } catch (err: any) {
    console.error('Error in PublishEvents (Controller):', err.message); // Log the actual error
    if (err.message === 'CEP inválido.' || err.message === 'Nenhuma imagem foi enviada para o evento.') {
      res.status(400).json({ error: err.message });
    } else if (err.message === 'Endereço não encontrado pela API de geocodificação.') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Falha ao publicar evento: ' + err.message }); // More descriptive message
    }
  }
};

export const ActiveEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventLocations.ActiveEvents();
    res.status(200).json({ events });
  } catch (err: any) {
    console.error('Erro no ActiveEvents do Controller:', err.message);
    res.status(500).json({ error: 'Erro ao buscar eventos: ' + err.message });
  }
};