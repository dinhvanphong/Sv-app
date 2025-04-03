import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useRouter, Redirect } from 'expo-router';
import { useUser, useAuth } from '@clerk/clerk-expo'


import { Colors } from '@/constants/Color'


export default function SubMenu({item, sideName}) {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { user } = useUser()
    
  const handleOnPress = (path) => {

    if (isSignedIn){
      router.push(path)
    } else {
      router.push('/(auth)/signIn')
    }
  }  
  return (
    <View className='px-3 bg-white mb-2'>
      <Text className='text-lg font-semibold text-primary py-2'>{item.title}</Text>
      <View className='px-5 py-1' onPress={handleOnPress}>
        {item.subNav.map((item, index) =>
          <TouchableOpacity key={index} className='flex flex-row justify-between p-2 border-b border-gray-300' onPress={()=> handleOnPress(item.path)}>
            <View className='flex flex-row items-end gap-2'> 
              <Ionicons name={item.icon} size={24} color='#9ca3af'/>
              <Text  className='text-base text-textCl'>{item.title}</Text>
            </View>
            {/* <View className='flex items-end'> */}
              <AntDesign name="right" size={18} color='#d1d5db'  />
            {/* </View> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}