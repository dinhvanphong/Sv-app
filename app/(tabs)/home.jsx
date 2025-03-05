import { View, Text, ScrollView } from 'react-native'
import React from 'react'


import Header from '../../components/Header'
import Slider from '../../components/Slider';
import News from '../../components/News';


export default function HomeScreen() {
  return (
    <View className="relative flex-1">
      <View className='top-0 right-0 left-0 z-10'>
        <Header/>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Slider/>
        <News/>

      </ScrollView>
    </View>
  )
}