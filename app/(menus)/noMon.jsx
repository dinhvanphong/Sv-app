import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth,useUser } from '@clerk/clerk-expo'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import Loading from '@/components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper'
import {wp, hp } from '@/helpers/common'
import {getOweAPI} from '@/apis'
import { Colors } from '@/constants/Color';

export default function NoMon() {
    const { getToken } = useAuth();
    const { user } = useUser()

    const [dataOwe, setDataOwe] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(dataOwe)

    useEffect(() => {
      async function getData() {
        try {
          setLoading(true)
          const token = await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})
          const response = await getOweAPI(user?.publicMetadata?.masv, token)
          console.log(response)
          setDataOwe( response.no_mon.length > 0 ? response : []);
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
              <Text style={[styles.herder]}>Tên môn học</Text>
              <Text>{item.tenmonhoc}</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.herder]}>Điểm</Text>
              <Text>{item.diemmax}</Text>
            </View>
          </View>
          )
        }
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {dataOwe
      ?
      (dataOwe.no_mon.length > 0
        ?
        (
          dataOwe.no_mon.map((item, ind) => (
            <ItemTable key={ind} item={item} index={ind} />
          ))
        )
        :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Sinh viên hiện tại chưa nợ môn</Text>
        </View>

      )
      : <Loading size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>

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