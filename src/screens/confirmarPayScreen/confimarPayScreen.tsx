import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  // Dados fictícios de exemplo, você pode passar via props ou context depois
  const paymentDetails = {
    eventName: 'Festival de Música',
    amount: 149.90,
    paymentMethod: 'Cartão de Crédito',
    date: '18 de Junho, 20:00h',
  };

  const handleConfirmPayment = () => {
    // Aqui você chamaria sua API para processar pagamento
    Alert.alert('Pagamento Confirmado', 'Sua transação foi realizada com sucesso!');
    // Navegar para uma tela de sucesso, por exemplo
    // navigation.navigate('SuccessScreen');
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Confirmação de Pagamento</Text>

      {/* Resumo do pagamento */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    marginBottom: 30,
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  amount: {
    color: '#00C851',
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#ddd',
  },
  backButtonText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#00C851',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
