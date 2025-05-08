import { View } from "react-native";
import { Logo } from "@/components/Logo/Logo.style";
import styled from "styled-components/native";
import Password from "@/components/PassWordInput/PassWord.style";


const Container = styled(View)`
  flex: 1;
  align-items: center;

`
export default function LoginScreen() {
    return(
        <Container>
            <Logo/>
            <Password/>
            <Password/>

        </Container>
    )
}