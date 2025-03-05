import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import ScreenWrapper from "../../components/ScreenWrapper";
import Header from '../../components/Header';



export default function Notify() {
  return (
    <View className="relative flex-1">
      <View className='top-0 right-0 left-0 z-10'>
        <Header/>
      </View>
      <ScrollView>
        <Text>Notification</Text>

      </ScrollView>
    </View>
  )
}