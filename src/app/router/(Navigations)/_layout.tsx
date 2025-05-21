import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#002764',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 12,
          borderTopWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#fff',
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>🗺️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>🔍</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: 'Ingressos',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 20 }}>🎫</Text>
          ),
        }}
      />
    </Tabs>
  );
}