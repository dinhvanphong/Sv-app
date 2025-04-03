import { View, Text, Image, TextInput, TouchableOpacity, Alert  } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'


import { Colors } from '@/constants/Color'
import ScreenWrapper from '@/components/ScreenWrapper'
import { wp, hp } from '@/helpers/common'
import Loading from '@/components/Loading';
export default function SignIn() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn()

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true)
    if (!isLoaded) return

    if(userName === '' || password === '') {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin");
      setLoading(false);
    } else {
      // Start the sign-in process using the email and password provided
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      try {
        const signInAttempt = await signIn.create({
          identifier: userName.match(pattern) ? userName : userName + "z",
          // identifier:userName,
          password,
        })
  
        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          router.replace('(tabs)/home')
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2))
          Alert.alert("Thông báo", "loi");
          setLoading(false);
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        if (userName === "") {
          Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin");
        } else if (err.errors[0].message === "Couldn't find your account.") {
          Alert.alert("Thông báo", "Email hoăc mã sinh viên không tồn tại");
        } else if (err.errors[0].message === "Password is incorrect. Try again, or use another method.") {
          Alert.alert("Thông báo", "Mật khẩu không chính xác. Vui lòng nhập lại!");
        }
        console.error(JSON.stringify(err, null, 2))
        setLoading(false);
      }
    }
    setLoading(false)
  }
  console.log(progress)

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
              value={userName}
              onChangeText={setUserName}
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
              value={password}
              onChangeText={setPassword}
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
              {loading
              ? <Loading size='small' color='#fff' />
              : <Text 
                  style={{ color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                  }}
                >Đăng nhập</Text>}
                
          </TouchableOpacity>

          {/* <Text style={{textAlign:'center'}}>
            Bạn chưa có tài khoản? <Text style={{color:Colors.primary}} onPress={() => router.push('(auth)/signUp')}>Đăng ký</Text>
          </Text> */}
          <Text style={{color:Colors.primary, textAlign:'center', marginVertical: 10}} onPress={() => router.push('(tabs)/home')}>Trang chủ</Text>
          
        </View>
      </View>
    </ScreenWrapper>
  )
} 