import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback,Keyboard  } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'


import { Colors } from '@/constants/Color'
import ScreenWrapper from '@/components/ScreenWrapper'
import { wp, hp } from '@/helpers/common'
export default function SignIn() {
  const router = useRouter();
  const handleLogin = () => {
    
  }
  return (
    <ScreenWrapper>
      <Image source={require('../../assets/images/logoo.png')} style={{height:wp(50), width:wp(50), margin:'auto'}}/>
      <View className='px-5'>
        <Text style={{color:Colors.primary, fontSize:hp(3), fontWeight:600, textAlign:'start', marginBottom:hp(2)}}>Đăng nhập</Text>
        <View>
          {/* Tài khoản */}
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text style={{fontWeight:600}}>Email hoặc mã sinh viên:</Text>
            <TextInput
              placeholder='Nhập email hoặc mã sinh viên'
              style={{
                width: "100%",
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#eee",
                borderRadius: 10,
                paddingHorizontal: 10,
                marginBottom: 15,
              }}
            />
          </View>
          {/* Mật khẩu */}
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text style={{fontWeight:600}}>Mật khẩu:</Text>
            <TextInput
              placeholder='Nhập mật khẩu'
              secureTextEntry
              style={{
                width: "100%",
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#eee",
                borderRadius: 10,
                paddingHorizontal: 10,
                marginBottom: 15,
              }}
            />
          </View>
          <Text style={{color:Colors.primary, fontStyle:'italic'}}>Quên mật khẩu?</Text>
          {/* Button */}
          <TouchableOpacity 
            style={{ 
              width: "100%",
              height: 50,
              marginVertical: 20,
              backgroundColor: Colors.primary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }} 
            onPress={handleLogin}>
            <Text 
              style={{ color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              }}
            >Đăng Nhập</Text>
          </TouchableOpacity>

          <Text style={{textAlign:'center'}}>
            Bạn chưa có tài khoản? <Text style={{color:Colors.primary}} onPress={() => router.push('(auth)/signUp')}>Đăng ký</Text>
          </Text>
          <Text style={{color:Colors.primary, textAlign:'center', marginVertical: 10}} onPress={() => router.push('(tabs)/home')}>Trang chủ</Text>
          
        </View>
      </View>
    </ScreenWrapper>
  )
} 