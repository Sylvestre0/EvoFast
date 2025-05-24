// searchStyle.ts
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native'; // Importar Dimensions para calcular a largura

const { width } = Dimensions.get('window'); // Pega a largura da tela

// Defina seus espaçamentos desejados
const outerPadding = 16; // O padding horizontal que você já tem no Container (para a barra de busca e títulos)
const innerColumnGap = 12; // Espaçamento que você quer ENTRE as duas colunas

// Calcula a largura disponível para os cards após descontar o padding externo do Container
const availableWidthForCards = width - (outerPadding * 2);

// Calcula a largura de cada card: (espaço_disponível - espaçamento_entre_colunas) / número_de_colunas
const cardWidth = (availableWidthForCards - innerColumnGap) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding-top: 40px;
  /* Mantenha o padding horizontal aqui para elementos como SearchContainer e SectionTitles */
  padding-horizontal: ${outerPadding}px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 12px;
  padding-horizontal: 10px;
  margin-bottom: 16px;
  height: 48px;
`;

export const SearchIcon = styled(Ionicons)`
  margin-right: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const VoiceButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #002764;
`;

// NOVO: Container para o layout de grid usando flex-wrap
export const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  /* Ajuste o padding horizontal para compensar a margem horizontal dos cards,
     fazendo com que os cards das bordas se alinhem corretamente */
  padding-horizontal: ${innerColumnGap / 2}px;
  /* margin-bottom não é estritamente necessário aqui, já que os cards terão margin-bottom */
  margin-bottom: 20px; /* Para dar um respiro após o grid */
`;

export const EventCard = styled.View`
  width: ${cardWidth}px; /* Largura exata para dois cards com espaçamento central */
  height: 200px; /* Altura fixa para uniformidade visual dos cards */
  background-color: #f8f8f8;
  border-radius: 10px;
  overflow: hidden;

  /* Margens para o espaçamento entre os cards no layout flexWrap */
  /* Cada card terá metade do espaçamento de coluna à esquerda e metade à direita */
  margin-horizontal: ${innerColumnGap / 2}px;
  /* Espaçamento entre as linhas de cards */
  margin-bottom: ${innerColumnGap}px;

  elevation: 3; /* Sombra para Android */
  shadow-color: #000; /* Sombra para iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 3px;
`;

export const EventImage = styled.Image`
  width: 100%;
  height: 100px;
  resize-mode: cover;
`;

export const EventTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: 6px;
  margin-horizontal: 8px;
`;

export const EventDate = styled.Text`
  font-size: 12px;
  color: #666;
  margin-horizontal: 8px;
  margin-bottom: 8px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const RetryText = styled.Text`
  color: blue;
  font-size: 16px;
  text-decoration-line: underline;
`;

export const NoEventsText = styled.Text`
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-vertical: 20px;
  width: 100%; 
  `;