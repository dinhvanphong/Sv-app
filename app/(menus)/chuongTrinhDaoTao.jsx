import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth,useUser } from '@clerk/clerk-expo'
import { View, Text, FlatList, StyleSheet } from 'react-native';

import Loading from '@/components/Loading';
import ScreenWrapper from '../../components/ScreenWrapper'
import {wp, hp } from '@/helpers/common'
import {getCTDTAPI} from '@/apis'


export default  function ChuongTrinhDaoTao() {
  const { getToken } = useAuth();
  const { user } = useUser()

  const [dataCTDT, setDataCTDT] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const token = await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})
        const response = await getCTDTAPI(user?.publicMetadata?.masv, token)
        setDataCTDT(
          response.khung_ct.length > 0
            ? response.khung_ct.map((item, index) => {
                item.stt = index + 1;
                item.tenmonhoc = item.batbuoc ? item.tenmonhoc : `${item.tenmonhoc} *`
                delete item.batbuoc
                return item;
              })
            : []
        )
        setLoading(false)

      } catch (error) {
        setLoading(false)
        console.error("API Error:", error.response ? error.response.data : error.message);
      }
    }
    getData() 
    
  }, [])

  const renderItem = ({ item }) => (
    <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', width: '100%'}}>
      <View style={[styles.row, {width: '13%'}]}>
        <Text style={styles.cell}>{item.stt}</Text>
      </View>
      <View style={[styles.row, {width: '20%'}]}>
        <Text style={styles.cell}>{item.mamonhoc}</Text>
      </View>
      <View style={[styles.row, {width: '33%'}]}>
        <Text style={styles.cell}>{item.tenmonhoc}</Text>
      </View>
      <View style={[styles.row, {width: '17%'}]}>
        <Text style={styles.cell}>{item.tongso}</Text>
      </View>
      <View style={[styles.row, {width: '17%'}]}>
        <Text style={styles.cell}>{item.thamgiatinhdiemtrungbinh?'✓':''}</Text>
      </View>
    </View>
  );
  return (
    <View style={{marginTop: 8, }}>
     <View style={{padding: 10, width: wp(100), height: hp(93), margin: 'auto'}} >
      <View style={{flexDirection: 'row', backgroundColor: '#ddd', width: '100%'}}>
        <View style={[styles.header, {width:'13%'}]}>
          <Text style={styles.headerText}>STT</Text>
        </View>
        <View style={[styles.header, {width:'20%'}]}>
          <Text style={styles.headerText}>Mã môn học</Text>
        </View>
        <View style={[styles.header, {width: '33%'}]}>
          <Text style={styles.headerText}>Tên môn học</Text>
        </View>
        <View style={[styles.header, {width: '17%'}]}>
          <Text style={styles.headerText}>Tín chỉ</Text>
        </View>
        <View style={[styles.header, {width: '17%'}]}>
          <Text style={styles.headerText}>Tính điểm trung bình</Text>
        </View>
      </View>
      {loading
        ? <Loading size='large'  />
        : <FlatList
            style={{width: '100%'}}
            data={dataCTDT}
            renderItem={renderItem}
            keyExtractor={item => item.mamonhoc}
            // showsVerticalScrollIndicator={false}
        />
      }
      <Text style={{fontSize: 20, paddingLeft: 10}}>(*) <Text style={{fontStyle:'italic', fontSize: 15 }}>Những môn học không bắt buộc</Text></Text>
      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding:10,
    borderWidth: 1, 
    borderColor: '#ccc',
  },

  row: {
    padding:10,
    borderWidth: 1,
    borderTopWidth:0,
    borderColor: '#ccc',
  },

  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    textAlign: 'center'
  },
});