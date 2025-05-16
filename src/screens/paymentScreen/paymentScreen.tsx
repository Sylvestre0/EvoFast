import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

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
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Instrução */}
      <Text style={styles.title}>Selecione o método de pagamento</Text>

      {/* Opções */}
      {renderOption('Cartão de Crédito', 'credito')}
      {renderOption('Cartão de Débito', 'debito')}
      {renderOption('Pix', 'pix')}

      {/* Botão continuar */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#002764',
    alignSelf: 'center',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: '#2ECC71',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
