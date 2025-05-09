import { useState } from "react";
import {InputText,Description,Container,Props} from '@/components/Inputs/style'
import { TextInput } from "react-native";

export default function Email({ placeholder = "Digite seu email:" }: Props) {
  const [text, setText] = useState('');

  return (
    <Container>
        <InputText
            placeholder={placeholder}
            autoFocus={true}
            blurOnSubmit={true}
            value={text}
            onChangeText={setText}
            secureTextEntry={false}
            returnKeyType="done"
        />
    </Container>
  );
}