import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CreateEventScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");

  // Função para selecionar imagem
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária para acessar as imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    Alert.alert("Evento Criado", `Nome: ${name}\nData: ${date}\nGratuito: ${isFree ? "Sim" : "Não"}\nPreço: ${isFree ? "R$ 0" : price}`);
    // Aqui você pode enviar para uma API ou salvar no estado global
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      {/* Upload de imagem */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Toque para adicionar uma imagem</Text>
        )}
      </TouchableOpacity>

      {/* Formulário */}
      <TextInput
        placeholder="Nome do Evento"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Data do Evento"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Local do Evento"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      {/* Checkbox para gratuito */}
      <TouchableOpacity onPress={() => setIsFree(!isFree)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isFree && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>Evento Gratuito</Text>
      </TouchableOpacity>

      {/* Campo de valor */}
      {!isFree && (
        <TextInput
          placeholder="Valor do Evento (R$)"
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      )}

      {/* Botão de Criar Evento */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Criar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#002764",
  },
  imagePicker: {
    height: 180,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: "#999",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#002764",
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: "#002764",
  },
  checkboxLabel: {
    color: "#002764",
  },
  submitButton: {
    backgroundColor: "#002764",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

