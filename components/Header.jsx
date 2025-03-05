import { View, Text, StatusBar, Image } from 'react-native'
// import { Image } from 'expo-image';
import React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import { Colors } from '../constants/Color'
import ScreenWrapper from './ScreenWrapper'
import Logo from '../assets/images/logo.png'
import { wp, hp } from '../helpers/common'


export default function Header() {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top+5 : 30;
  return (
    <ScreenWrapper bg={Colors.primary}>
      <View className='w-full flex flex-row justify-center items-center'>
        <View className='max-w-[360px] flex flex-row justify-center items-center pr-5'>
          <View>
            <Image 
                source={require('../assets/images/logo.png')} 
                // className='w-full h-full border-2 border-white'
                style={{height:hp(10), width:hp(10)}}
              />
          </View>
          <View className='flex-1'>
            <Text className='text-white text-sm text-center'>TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG</Text>
            <Text className='text-white text-base font-semibold text-center'>CỔNG THÔNG TIN SINH VIÊN</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}