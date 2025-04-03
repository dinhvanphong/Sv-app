import { View, Text, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'

import HeaderScreenMenu from '../../components/HeaderScreenMenu';
import ScreenWrapper from "../../components/ScreenWrapper";
import {sideBarData} from '@/components/sideBarData';
import SubMenu from '@/components/subMenu';

export default function menu() {
  const router = useRouter();
  return (
    <View className="relative flex-1">
      <View className='top-0 right-0 left-0 z-10'>
        <HeaderScreenMenu/>
      </View>
      <ScrollView>
      {/* <Text onPress={() => router.push('(menus)/chuongTrinhDaoTao')}>mgjsdpifjohienu</Text> */}
        
        {sideBarData.map((item, index) => <SubMenu key={index} item={item} sideName={index} />)}

      </ScrollView>
    </View>
  )
}