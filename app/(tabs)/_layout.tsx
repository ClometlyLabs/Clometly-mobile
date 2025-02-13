import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Image } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { HapticTab } from '@/components/HapticTab';
import { IconFeather, IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1,  backgroundColor: Colors[colorScheme ?? 'light'].background }}>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          paddingBottom: 20,
          paddingTop: 20,
          height: Platform.select({ ios: 100, android: 80 }),
          alignItems: 'center',
          width: '100%',

          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          }
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="house.fill" color={color} />,
        }}
      />
            <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="person.2.fill" color={color} />,
        }}
      />
            <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon:  ( ) => <Image source={ require('@/assets/images/clometly.png') } style={{ width: 56, height: 56 }} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Octicons name="globe" size={29} style={{ marginBottom: -3 }} color={color} />,
        }}
      />

      <Tabs.Screen
        name="messages" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="message.fill" color={color} />,
        }}
      />


    </Tabs>
    </View>
  );
}
