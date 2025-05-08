import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

const InputText = styled(TextInput)`
  height: 83px;
  width: 336px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  border-radius: 20px;

`;

const Description = styled(Text)`
    position: relative;
    left: 10px;
    color: #656565;
`

const PasswordContainer = styled(View)`
  height: inherit;
  width: inherit; 
  border-radius: 20px;
  padding: 16px;
  font-size: 16px;
  margin-top: 8px; 
`

interface PasswordProps {
  placeholder?: string;
}

export default function Password({ placeholder = "Digite sua senha" }: PasswordProps) {
  const [text, setText] = useState('');

  return (
    <PasswordContainer>
        <Description>Email:</Description>
        <InputText
            placeholder={placeholder}
            autoFocus={true}
            blurOnSubmit={true}
            value={text}
            onChangeText={setText}
            secureTextEntry={true}
            returnKeyType="done"
        />
    </PasswordContainer>
  );
}