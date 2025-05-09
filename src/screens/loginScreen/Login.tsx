import { Logo } from "@/components/Logo/Logo.style";
import styled from "styled-components/native";
import Password from "@/components/Inputs/PassWord";
import {WaterMask} from "@/components/Marca_D'agua/cooporation"
import Email from "@/components/Inputs/Email";
import { LinearGradient } from 'expo-linear-gradient';
import { Personbottom } from "@/components/bottom/bottomInput";

const Container = styled(LinearGradient).attrs({
    colors: ['#4840dd', '#8080f2', '#00d4ff'],
    start: { x: 0, y: 0 }, 
    end: { x: 0, y: 1 }, 
})`
  flex: 1;
  align-items: center;
  
`
export default function LoginScreen() {
    return(
        <Container>
            <Logo/>
            <Email/>
            <Password/>
            <Personbottom></Personbottom>
            <WaterMask>©Sylvester Coop</WaterMask>
        </Container>
)};