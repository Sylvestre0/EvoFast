import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { styles } from './paymentStyle';

export default function PaymentMethodsScreen() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedMethod) {
      Alert.alert('Atenção', 'Selecione um método de pagamento.');
      return;
    }

    if (selectedMethod === 'pix') {
      router.push('/router/pix');
    } else {
      router.push('/router/card');
    }
  };

  const renderOption = (label: string, value: string) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedMethod === value && styles.optionSelected,
      ]}
      onPress={() => setSelectedMethod(value)}
    >
      <Ionicons
        name={
          selectedMethod === value
            ? 'radio-button-on'
            : 'radio-button-off'
        }
        size={24}
        color={selectedMethod === value ? '#2ECC71' : '#555'}
        style={{ marginRight: 10 }}
      />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Selecione o método de pagamento</Text>

      {renderOption('Cartão de Crédito', 'credito')}
      {renderOption('Cartão de Débito', 'debito')}
      {renderOption('Pix', 'pix')}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

