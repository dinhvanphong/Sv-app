import { View, Text, StatusBar, Image,TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-expo'


import { Colors } from '../constants/Color'
import ScreenWrapper from './ScreenWrapper'
import { wp, hp } from '../helpers/common'

export default function HeaderScreenMenu() {
  // const [user, setUser] = useState(false)
  const { user } = useUser()
  const router = useRouter();
  const {signOut} = useClerk();

  const handleLogout =() => {
    signOut()
    router.replace('(tabs)/home')
  }

  return (
    <ScreenWrapper bg='white'>
      <View className='flex flex-row items-center gap-x-5 border-b border-gray-200 pb-2 px-3 '>
        <View 
          style={{width: wp(20), height: wp(20), overflow: 'hidden', borderRadius: 100, borderColor: Colors.primary, borderWidth: 2}}
          className='p-1'
        >
          <SignedIn>
            <Image
              source={{uri: `${process.env.EXPO_PUBLIC_AVATAR}${user?.publicMetadata?.masv}`}} 
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
          </SignedIn>
          <SignedOut>
            <Image source={require('../assets/images/defaultAvatar.jpg')} style={{width: '100%', height: '100%', borderRadius: 100}}/>
          </SignedOut>

        </View>
          <SignedIn>
            <View className='flex flex-col'>
              <Text className='font-semibold text-xl'>{user?.publicMetadata?.fullname}</Text>
              <TouchableOpacity onPress={() => handleLogout}>
                <Text className='text-red-500' onPress={handleLogout}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </SignedIn>
          <SignedOut>
            <View className='flex flex-col'>
              <Text className='font-semibold text-xl' onPress={() => router.push('(auth)/signIn')}>Đăng nhập</Text>
            </View>
          </SignedOut>

      </View>
    </ScreenWrapper>
  )
}