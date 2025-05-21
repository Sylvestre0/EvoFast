import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';

export default function BottomNavigation() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.navigate('/router/home')}
      >
        <Text style={styles.navEmoji}>🏠</Text>
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.navigate('/router/map')}
      >
        <Text style={styles.navEmoji}>🗺️</Text>
        <Text style={styles.navLabel}>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.navigate('/router/search')}
      >
        <Text style={styles.navEmoji}>🔍</Text>
        <Text style={styles.navLabel}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.navigate('/router/ticket')}
      >
        <Text style={styles.navEmoji}>🎫</Text>
        <Text style={styles.navLabel}>Ingressos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navEmoji: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    color: '#002764',
  },
});
