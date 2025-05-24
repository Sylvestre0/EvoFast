import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

export const InputText = styled(TextInput)`
  height: 83px;
  width: 336px;
  border: 1px solid black;
  padding: 16px;
  font-size: 16px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255,0.5);
  
`;

export const Description = styled(Text)`
  position: relative;
  left: 10px;
  color:rgb(37, 37, 37);
  font-size:20;
  text-shadow: 1px 1px 1px white;
  font-weight: 500;
`

export const Container = styled(View)`
  height: inherit;
  width: inherit; 
  border-radius: 20px;
  padding-bottom: 14px;
  font-size: 16px;
`

export interface Props {
  placeholder?: string;
}
