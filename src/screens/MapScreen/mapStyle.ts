import MapView from "react-native-maps";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Map = styled(MapView)`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: #666;
`;