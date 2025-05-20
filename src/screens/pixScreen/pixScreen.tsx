import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { styles } from './pixStyle';


export default function PixScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={require('@/assets/images/pix-logo.png')} // ajuste para seu arquivo
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={require('@/assets/images/pix-qrcode.png')} // ajuste para seu arquivo
        style={styles.qrCode}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button}
      onPress={() => router.navigate('/router/confirmPay')}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

