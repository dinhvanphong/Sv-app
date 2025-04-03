import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ScreenWrapper({children, bg, classNameCustom, style}) {

  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top+5 : 30;
  return (
    <View style={[{paddingTop, backgroundColor:bg}, {...style}]} className={classNameCustom}>
       <StatusBar
        translucent={true}  // Làm trong suốt thanh trạng thái
        backgroundColor="transparent" // Nền trong suốt
        barStyle="dark-content" // Màu chữ tối (đen)
      />
      {children}
    </View>
  )
}