import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Personbottom = styled(TouchableOpacity).attrs((props) => ({
  onPress: props.onPress || (() => console.log('Clicado!')),
}))`
  background-color: ${props => props.bgColor || '#002764'};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 83px;
  width: 336px;
`;

export const Login = styled(Text)`
  font-size: 20px;
  color: #fff;
`;
