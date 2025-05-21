import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled(LinearGradient).attrs({
  colors: ['#4840dd', '#8080f2', '#00d4ff'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: rgba(23, 212, 6, 0.81);
  padding: 12px 24px;
  border-radius: 10px;
  margin-top: 16px;
`;

export const RegisterText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: -20px;
  margin-bottom: 10px;
`;

export const ForgotText = styled.Text`
  color: white;
  font-size: 14px;
  text-decoration: underline;
`;