import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

export const BackButtonText = styled.Text`
  font-size: 16px;
  color: #002764;
`;

export const ImagePickerContainer = styled.TouchableOpacity`
  height: 180px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const ImagePlaceholderText = styled.Text`
  color: #999;
`;

export const EventImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

export const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const Checkbox = styled.View<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border-width: 1px;
  border-color: #002764;
  margin-right: 8px;
  border-radius: 4px;
  background-color: ${props => (props.isChecked ? "#002764" : "transparent")};
`;

export const CheckboxLabel = styled.Text`
  color: #002764;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #002764;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const SuggestionItem = styled.TouchableOpacity`
  padding: 10px;
  border-Bottom-Width: 1px;
  border-bottom-color: #eee;
  background-color: white;
  width: 100%;
`;

export const SuggestionText = styled.Text`
  font-size: 16px;
  color: #333;
`;