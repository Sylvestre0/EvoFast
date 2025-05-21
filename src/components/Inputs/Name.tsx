import { forwardRef, useImperativeHandle, useState } from "react";
import { InputText, Container, Props } from '@/components/Inputs/style';

const Email = forwardRef(({
  placeholder = "Digite seu nome:"
}: Props, ref) => {
  const [text, setText] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => text,
  }));

  return (
    <Container> 
      <InputText
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        secureTextEntry={false}
        returnKeyType="done"
      />
    </Container>
  );
});

export default Email;
