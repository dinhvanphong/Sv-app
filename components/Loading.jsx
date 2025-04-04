import { View, Text, ActivityIndicator } from 'react-native'
import { Colors } from '@/constants/Color'
import React from 'react'

export default function Loading(props) {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator {...props}/>
    </View>
  )
}