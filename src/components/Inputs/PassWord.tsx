import { useState } from "react";
import {InputText,Description,Container,Props} from '@/components/Inputs/style'

export default function Password({ placeholder = "Digite sua senha:" }: Props) {
  const [text, setText] = useState('');

  return (
    <Container>
        <InputText
            placeholder={placeholder}
            autoFocus={true}
            blurOnSubmit={true}
            value={text}
            onChangeText={setText}
            secureTextEntry={true}
            returnKeyType="done"
        />
    </Container>
  );
}