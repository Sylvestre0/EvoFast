import { Request, Response } from 'express';
import { EventLocations } from '../services/AuthLocations';

const eventLocations = new EventLocations();

export const PublishEvents = async (req: Request, res: Response) => {
  const imageFile = req.file
  const { pais,CEP,numero,cost,data,eventName } = req.body;

  const imagemtype = imageFile!.mimetype;
  
  console.log(imageFile,pais,CEP,numero)

  const imagem: Buffer = imageFile!.buffer;
  try {
    const Location = await eventLocations.PublishEvents(pais,CEP,numero,imagem,imagemtype,cost,data,eventName);
    res.status(201).json(Location);
  } catch (err: any) {  
    if (err.message === 'CEP inválido.' || err.message === 'Nenhuma imagem foi enviada para o evento.') {
      // Status 400 para erros de validação
      res.status(400).json({ error: err.message });
    } else if (err.message === 'Endereço não encontrado pela API de geocodificação.') {
      // Status 400 para erros de validação
      res.status(404).json({ error: err.message });
    }else {
      // Status 500 para erros inesperados
      res.status(500).json({ error: err.message });
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