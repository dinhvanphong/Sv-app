import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

import {wp, hp } from '@/helpers/common'




export default function AllScoreStudent({data}) {
  const color1 = "#d1e7dd"
  const color2 = "#f8d7da"
  const ItemTable = (item) => {
    return (
    <View 
      style={{
        padding: 5,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: item.item.stt % 2 === 0 ? color1 : color2,
        width: '100%',
        marginVertical: 5,
        backgroundColor: item.item.stt % 2 === 0 ? color1 : color2,
        borderRadius: 5
      }}>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>STT</Text>
        <Text>{item.item.stt}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Mã môn học</Text>
        <Text>{item.item.mamonhoc}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Tên môn học</Text>
        <Text>{item.item.tenmonhoc}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Khối lượng</Text>
        <Text>{item.item.khoiluong}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Điểm 10</Text>
        <Text>{item.item.diemthang10}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Điểm 4</Text>
        <Text>{item.item.diemthang4}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.herder]}>Điểm chữ</Text>
        <Text>{item.item.diemchu}</Text>
      </View>
    </View>
)
  }
  return (
    <View style={{marginTop: 3, marginBottom: 20, flex: 1}}>
      {data.length > 0
      ? (<FlatList
        style={{width: '100%'}}
        data={data}
        renderItem={ItemTable}
        // showsVerticalScrollIndicator={false}
      />)
      : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>Sinh viên chưa có điểm toàn khoá hoặc chưa cập nhật dữ liệu</Text>
       </View>
    }
      
    </View>
  )
}


const styles = StyleSheet.create({

  row: {
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  herder: {
   width: wp(30),
   fontWeight: 'bold'
  }

});