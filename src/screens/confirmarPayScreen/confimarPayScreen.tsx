import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './confirmePayStyle';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  const paymentDetails = {
    eventName: 'Festival de Música',
    amount: 149.90,
    paymentMethod: 'Cartão de Crédito',
    date: '18 de Junho, 20:00h',
  };

  const handleConfirmPayment = () => {
    Alert.alert('Pagamento Confirmado', 'Sua transação foi realizada com sucesso!');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação de Pagamento</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.label}>Evento:</Text>
        <Text style={styles.value}>{paymentDetails.eventName}</Text>

        <Text style={styles.label}>Data e Hora:</Text>
        <Text style={styles.value}>{paymentDetails.date}</Text>

        <Text style={styles.label}>Método de Pagamento:</Text>
        <Text style={styles.value}>{paymentDetails.paymentMethod}</Text>

        <Text style={styles.label}>Valor Total:</Text>
        <Text style={[styles.value, styles.amount]}>
          R$ {paymentDetails.amount.toFixed(2)}
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

