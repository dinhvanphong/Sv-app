import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth,useUser } from '@clerk/clerk-expo'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import Loading from '@/components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper'
import {wp, hp } from '@/helpers/common'
import {getAVG_API} from '@/apis'
import { Colors } from '@/constants/Color';


export default function DiemTongKet() {
    const { getToken } = useAuth();
    const { user } = useUser()
  
    const [dataAVG, setDataAVG] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(dataAVG)

     useEffect(() => {
        async function getData() {
          try {
            setLoading(true)
            const token = await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})
            const response = await getAVG_API(user?.publicMetadata?.masv, token)
            setDataAVG(response?.toan_khoa.length > 0 ? response : "empty");
            setLoading(false)
    
          } catch (error) {
            setLoading(false)
            console.error("API Error:", error.response ? error.response.data : error.message);
          }
        }
        getData() 
        
      }, [])

      const ItemTable = ({item, index, lan}) => {
        const color1 = "#d1e7dd"
        const color2 = "#f8d7da"
        return (
            <View 
              style={{
                padding: 5,
                flexDirection: 'column',
                borderWidth: 1,
                borderColor: index % 2 === 0 ? color1 : color2,
                width: '100%',
                marginVertical: 5,
                backgroundColor: index % 2 === 0 ? color1 : color2,
                borderRadius: 5
              }}>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>STT</Text>
                <Text>{index + 1}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Năm học</Text>
                <Text>{item.namhoc}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Học kỳ</Text>
                <Text>{item.hocky}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Điểm 10</Text>
                <Text>{item.diem}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Xếp loại 10</Text>
                <Text>{item.xeploai10}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Điểm 4</Text>
                <Text>{item.diem4}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.herder]}>Xếp loại 4</Text>
                <Text>{item.xeploai4}</Text>
              </View>
            </View>
      )
    }
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {dataAVG
        ?
        ( dataAVG !== "empty"
          ?
          (
            <ScrollView>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primary, marginBottom: 10 }}>Điểm trung bình toàn khoá:</Text>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>Điểm 10:</Text>
                    <Text>{dataAVG.toan_khoa[0].diem10}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>Xếp loại 10:</Text>
                    <Text>{dataAVG.toan_khoa[0].xeploai10}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>Điểm 4:</Text>
                    <Text>{dataAVG.toan_khoa[0].diem4}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>Xếp loại 4:</Text>
                    <Text>{dataAVG.toan_khoa[0].xeploai4}</Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primary, marginVertical: 10 }}>Điểm trung bình học kỳ 1:</Text>
              {dataAVG !== "empty" && dataAVG.hk_lan_1.map((item, index) => (
                <ItemTable item={item} index={index} key={index}/> 
              ))}
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primary, marginVertical: 10 }}>Điểm trung bình học kỳ 2:</Text>
              {dataAVG !== "empty" && dataAVG.hk_lan_2.map((item, index) => (
                <ItemTable item={item} index={index} key={index}/> 
              ))}
            </ScrollView>
          )
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Sinh viên chưa có điểm tổng kết hoặc chưa cập nhật dữ liệu</Text>
          </View>
        
        )
        : <Loading size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>}
      
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