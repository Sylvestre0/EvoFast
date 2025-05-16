import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PixScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('@/assets/images/pix-logo.png')} // ajuste para seu arquivo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* QR Code */}
      <Image
        source={require('@/assets/images/pix-qrcode.png')} // ajuste para seu arquivo
        style={styles.qrCode}
        resizeMode="contain"
      />

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.button}
      onPress={() => router.navigate('/router/confirmPay')}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 40,
  },
  qrCode: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00C851',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 64,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
