import BottomNavigation from "@/components/bottom/BottomNavigation";
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./homeStyle";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
        <TouchableOpacity onPress={() => router.navigate('/router/addNewevent')}
        style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Event</Text>
        </TouchableOpacity>
      </View>

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



