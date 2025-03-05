import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Color'
import { Tabs } from 'expo-router'
import { Ionicons, AntDesign } from '@expo/vector-icons'

export default function TabLayout() {

  return (

    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:Colors.primary
      }}
    >
      <Tabs.Screen name="home" options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({color}) => <Ionicons name='home' size={24} color={color}/>
      }}/>
      <Tabs.Screen name="notify" options={{
        tabBarLabel: 'Thông báo',
        tabBarIcon: ({color}) => <AntDesign name="notification" size={24} color={color} />
      }}/>
      <Tabs.Screen name="menu" options={{
         tabBarLabel: 'Menu',
         tabBarIcon: ({color}) => <Ionicons name='menu' size={24} color={color} />
      }}/>
    </Tabs>
  )
} 


