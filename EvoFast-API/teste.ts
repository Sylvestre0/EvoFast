import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data'; // Importa FormData diretamente se instalou 'form-data'

// --- CONFIGURAÇÕES DO TESTE ---
const API_URL = 'http://localhost:3000/PublishEvents';
// AJUSTE ESTE CAMINHO PARA O LOCAL EXATO DA SUA IMAGEM NO SEU COMPUTADOR!
const IMAGE_PATH = "Tauane.png"; 

const eventData = {
    pais: 'Brasil',
    CEP: '06835-320',
    numero: '10'
};
// -----------------------------

async function runUploadTest(): Promise<void> {
    console.log('Iniciando teste de upload...');
    console.log(`Verificando arquivo: ${IMAGE_PATH}`);

    try {
        // 1. Verificar se o arquivo existe
        if (!fs.existsSync(IMAGE_PATH)) {
            throw new Error(`Erro: O arquivo de imagem não foi encontrado no caminho especificado: ${IMAGE_PATH}`);
        }

        // 2. Ler o conteúdo do arquivo
        const imageBuffer: Buffer = fs.readFileSync(IMAGE_PATH);
        const fileName: string = path.basename(IMAGE_PATH); // Obtém apenas o nome do arquivo (ex: teste.png)

        // 3. Criar o objeto FormData
        const formData = new FormData();

        // A chave 'imagemEvento' DEVE corresponder EXATAMENTE ao nome do campo
        // que seu Multer espera (upload.single('imagemEvento'))
        formData.append('imagemEvento', imageBuffer, {
            filename: fileName,
            contentType: 'image/png', // Ajuste para o tipo MIME correto da sua imagem
        });

        // Adicionar os outros campos de texto
        formData.append('pais', eventData.pais);
        formData.append('CEP', eventData.CEP);
        formData.append('numero', eventData.numero);

        // 4. Enviar a requisição com Axios
        console.log('Enviando requisição POST para:', API_URL);
        const response = await axios.post(API_URL, formData, {
            headers: formData.getHeaders(), // Essencial para que Axios inclua os headers corretos de multipart/form-data
            maxBodyLength: Infinity, // Importante para arquivos grandes
            maxContentLength: Infinity, // Importante para arquivos grandes
        });

        console.log('\n--- SUCESSO! ---');
        console.log('Status da Resposta:', response.status);
        console.log('Dados da Resposta:', JSON.stringify(response.data, null, 2));
        console.log('------------------');

    } catch (error: any) { // Usar 'any' para lidar com erros sem tipo específico
        console.log('\n--- ERRO NO TESTE DE UPLOAD ---');
        if (error.response) {
            console.error('Erro do Servidor:', error.response.status);
            console.error('Detalhes do Erro:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('Erro: Nenhuma resposta recebida do servidor. Verifique se o servidor está rodando e a URL está correta.');
            console.error('Detalhes da Requisição:', error.request);
        } else {
            console.error('Erro na Configuração da Requisição ou Leitura do Arquivo:', error.message);
        }
        console.error('----------------------------');
    }
}

// Executa a função de teste
runUploadTest();