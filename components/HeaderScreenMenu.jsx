import { View, Text, StatusBar, Image } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'


import { Colors } from '../constants/Color'
import ScreenWrapper from './ScreenWrapper'
import { wp, hp } from '../helpers/common'

export default function HeaderScreenMenu() {
  const [user, setUser] = useState(false)
  const router = useRouter();
  return (
    <ScreenWrapper bg='white'>
      <View className='flex flex-row items-center gap-x-5 border-b border-gray-200 pb-2 px-3 '>
        <View 
          style={{width: wp(20), height: wp(20), overflow: 'hidden', borderRadius: 100, borderColor: Colors.primary, borderWidth: 2}}
          className='p-1'
        >
          {user
            ? <Image
                source={{uri: 'https://theme.hstatic.net/1000215755/1000897079/14/slider-2.png?v=306'}} 
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            : <Image source={require('../assets/images/defaultAvatar.jpg')} style={{width: '100%', height: '100%', borderRadius: 100}}/>
          }
        </View>
        {user
          ? (<View className='flex flex-col'>
                <Text className='font-semibold text-xl'>Đinh Văn Phóng</Text>
                <Text className='text-red-500' onPress={() => setUser(false)}>Đăng xuất</Text>
              </View>)

          : ( <View className='flex flex-col'>
                <Text className='font-semibold text-xl' onPress={() => router.push('(auth)/signIn')}>Đăng nhập</Text>
              </View>)
        }

      </View>
    </ScreenWrapper>
  )
}