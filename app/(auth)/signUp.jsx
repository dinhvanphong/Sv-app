import { View, Text, Image, TextInput, TouchableOpacity, Alert, Button  } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'

import { signupAPI, verifySignupAPI } from '@/apis';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Color'
import ScreenWrapper from '@/components/ScreenWrapper'
import { wp, hp } from '@/helpers/common'

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [codeStudent, setCodeStudent] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyEmail, setVerifyEmail] =useState('')
    const [verifyCode, setVerifyCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('')

  console.log("code", code)
  console.log("name", name)

    const handleSignUp = async () => {
      if(codeStudent === '' || email === '' || password === '') {
        Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin");
      } else {
        setLoading(true);
        try {
          const response = await signupAPI(codeStudent);
          // setLoading(false);
          console.log('response', response);
          if(response.verify.length=== 0) {
            Alert.alert("Thông báo", "Mã sinh viên không tồn tại");
            setLoading(false);

          } else if (response.verify[0].email && response.verify[0].email !== email) {
            Alert.alert(
              "Thông báo",
              `Email không trùng với hệ thống!`
            );
            setLoading(false);

          } else if (!response.verify[0].email) {
            Alert.alert("Thông báo", "Sinh viên chưa đăng ký email với hệ thống, vui lòng liên hệ phòng đào tạo để đăng ký!");
            setLoading(false);

          }

          if (response.verify.length !== 0 && response.verify[0].email === email) {
            setName(response.verify[0].hoten);
            await signUp
              .create({
                emailAddress: email,
                password: password,
                username: codeStudent + "z",
              })
              .then(async (result) => {
                if (result.status === "missing_requirements") {
                  Alert.alert("Thông báo", "Một mã xác thực đã được gửi đến email bạn đăng ký. Vui lòng xác thực để tiếp tục sử dụng.");
                }
                await signUp
                  .prepareEmailAddressVerification({ strategy: 'email_code' })
                  .then((result) => console.log(result))
                  .catch((err) => console.log("error", err.errors[0].message));

                setPendingVerification(true);
              })
              .catch((err) => {
                // console.log("error", err.errors[0].message);
                console.log(err.errors[0].message);
                Alert.alert("Thông báo", err.errors[0].message);
                setLoading(false);
              });
            // setProgress('missing_requirements')
          }

        } catch (error) {
          console.log('error', error);
          setLoading(false);

        } 
      }
    }
    const onVerifyPress = async () => {
      if (!isLoaded) return
  
      try {
        // Use the code the user provided to attempt verification
        const signUpAttempt = await signUp.attemptEmailAddressVerification({code: code})
  
        // If verification was completed, set the session to active
        // and redirect the user
        console.log('signUpAttempt', signUpAttempt)
        if (signUpAttempt.status === 'complete') {
          // await setActive({ session: signUpAttempt.createdSessionId })
          Alert.alert("Thông báo", "Mã xác thực thành công! Vui lòng đăng nhập để sử dụng hệ thống");
          console.log(signUpAttempt.id, codeStudent, name)
          await verifySignupAPI(signUpAttempt.id, codeStudent, name)
          router.replace('(tabs)/home')
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          Alert.alert("Thông báo", "loi");
          console.error(JSON.stringify(signUpAttempt, null, 2))
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        Alert.alert("Thông báo", "Mã xác thực không đúng! Vui lòng nhập lại!");
        console.error(JSON.stringify(err, null, 2))
      }
    }
    if (pendingVerification) {
      return (
        <View style={{ marginTop: hp(30),  width: wp(80), margin: "auto" }}>
          <Text style={{ fontSize: hp(3), fontWeight: 600, textAlign: "center", marginVertical: 10 }}>Xác thực email của bạn!</Text>
          <TextInput
            value={code}
            placeholder="Nhập mã xác thực của bạn"
            onChangeText={setCode}
            style={{
             
              height: 50,
              borderWidth: 1,
              borderColor: "#ccc",
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginBottom: 15,
              margin: "auto",
            }}
          />
          <Button title="Xác thực" onPress={onVerifyPress} style={{ backgroundColor: Colors.primary, borderRadius: 10 }} />
        </View>
      )
    }
  return (
    <ScreenWrapper>
      <Image source={require('../../assets/images/logoo.png')} style={{height:wp(50), width:wp(50), margin:'auto'}}/>
      <View className='px-5'>
        <Text style={{color:Colors.primary, fontSize:hp(3), fontWeight:600, textAlign:'start', marginBottom:hp(2)}}>Đăng ký</Text>
        <View>
          {/* MSV */}
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text style={{fontWeight:600}}>Mã sinh viên:</Text>
            <TextInput
              placeholder='Nhập email hoặc mã sinh viên'
              value={codeStudent}
              onChangeText={setCodeStudent}
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
          {/* Email */}
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text style={{fontWeight:600}}>Email:</Text>
            <TextInput
              placeholder='Nhập email hoặc mã sinh viên'
              value={email}
              onChangeText={setEmail}
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
            onPress={handleSignUp}>
            {loading
              ? <Loading size='small' color='#fff' />
              : <Text 
                  style={{ color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                  }}
                >Đăng ký</Text>}
          </TouchableOpacity>
            
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <Text style={{color:Colors.primary}} onPress={() => router.push('(auth)/signIn')}>Đăng nhập</Text>
            <Text style={{color:Colors.primary}} onPress={() => router.push('(tabs)/home')}>Trang chủ</Text>
          </View>
          
        </View>
      </View>
    </ScreenWrapper>
  )
}