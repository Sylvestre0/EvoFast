import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./newEventStyle";

export default function CreateEventScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");

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

  const handleSubmit = async () => {
    if (!name || !date || !location) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.102:3000/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: name,
          data: date,
          local: location,
          imagem: image || null,
          gratuito: isFree,
          preco: isFree ? 0 : parseFloat(price),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Evento criado com sucesso!");
        setName("");
        setDate("");
        setLocation("");
        setImage(null);
        setIsFree(false);
        setPrice("");
        navigation.goBack();
      } else {
        Alert.alert("Erro", data.error || "Erro ao criar evento.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Toque para adicionar uma imagem</Text>
        )}
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => setIsFree(!isFree)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isFree && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>Evento Gratuito</Text>
      </TouchableOpacity>

      {!isFree && (
        <TextInput
          placeholder="Valor do Evento (R$)"
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      )}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Criar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

