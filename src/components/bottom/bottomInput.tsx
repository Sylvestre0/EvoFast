import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Personbottom = styled(TouchableOpacity).attrs((props) => ({
  onPress: props.onPress || (() => console.log('Clicado!'))
}))`
  padding: 12px;
  background-color: ${props => props.bgColor || '#002764'};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 83px;
  width: 336;
`;

export default function bottom() {
    return (
        <Personbottom>
            <Text>teste</Text>
        </Personbottom>
)};

