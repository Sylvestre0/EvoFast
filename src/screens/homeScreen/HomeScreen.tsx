import BottomNavigation from "@/components/bottom/BottomNavigation";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
        <TouchableOpacity onPress={() => router.navigate('/router/addNewevent')}
        style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Event</Text>
        </TouchableOpacity>
      </View>

      {/* Center Text */}
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>
          Bem-vindo ao EvoFast!
        </Text>
        <Text style={styles.centerText}>
          🚀 Sua experiência de eventos começa aqui.        </Text>
        <Text style={styles.centerText}>
          Organize, gerencie e participe de eventos de forma rápida, intuitiva e inovadora.        </Text>
        <Text style={styles.centerText}>
          No EvoFast, você tem tudo que precisa para transformar cada evento em uma experiência inesquecível.        </Text>
        <Text style={styles.centerText}>
          Crie eventos em minutos
        </Text>
        <Text style={styles.centerText}>
          Conecte participantes com facilidade
        </Text>
        <Text style={styles.centerText}>
          Controle inscrições, horários e muito mais
        </Text>
        <Text style={styles.centerText}>
          Comece agora e leve seus eventos para o próximo nível!
        </Text>

      </View>
      <BottomNavigation />
    
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 83,
    height: 40,
    resizeMode: "contain",
  },
  addButton: {
    backgroundColor: "#002764",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  centerText: {
    color: "#002764",
    fontSize: 15,
    textAlign: "center",
  },
 });
