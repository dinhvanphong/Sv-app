import { View, Text, ViewStyle, Image } from 'react-native'
// import {Image} from 'expo-image'
import React from 'react'
import Swiper from 'react-native-swiper';
import {wp, hp} from '../helpers/common'
import { Colors } from '../constants/Color'
 




const imgList = [
  {
      url:'https://theme.hstatic.net/1000215755/1000897079/14/slider-1.png?v=306'
  },
  {
      url : 'https://theme.hstatic.net/1000215755/1000897079/14/slider-2.png?v=306'
  },
  {
      url: 'https://theme.hstatic.net/1000215755/1000897079/14/slider-3.png?v=306'
  },
  {
      url : 'https://theme.hstatic.net/1000215755/1000897079/14/slider-4.png?v=306'
  }
]
export default function Slider() {
  return (
    <View className='mt-2'>
      <Swiper 
        autoplay
        autoplayTimeout={3}
        activeDotColor={Colors.primary}
        containerStyle={{ 
          height:hp(20),
          width: wp(95),
          margin: 'auto',
          borderRadius: 10,
          overflow: 'hidden'
        }}
      >
      {imgList.map((item, index) => (
        <View key={index} className='w-full h-full flex-1' style={{}}>
          <Image source={{uri: item.url}} style={{height: '100%', width: '100%'}} />
        </View>
      ))}
      </Swiper>
    </View>
  )
}