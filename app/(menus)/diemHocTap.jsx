import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth,useUser } from '@clerk/clerk-expo'

import Loading from '@/components/Loading';
import { Colors } from '@/constants/Color';
import {getAllScoreStudentAPI, getSemesterStudentAPI} from '@/apis'
import AllScoreStudent from '@/components/diemhoctap/AllScoreStudent';
import SemesterTable from '@/components/diemhoctap/SemesterTable';

const FirstRoute = () =>{
  const { getToken } = useAuth();
  const { user } = useUser()

  const [dataSemesterStudent, setDataSemesterStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(dataSemesterStudent)
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        let hocky = await fetch(`${process.env.EXPO_PUBLIC_PRESENT_API}`).then(res=>res.json())
        const token = await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})
        const response = await getSemesterStudentAPI(user?.publicMetadata?.masv, hocky.hientai[0].hocky, hocky.hientai[0].manamhoc, token)
        setDataSemesterStudent(
          response.diem_hk.length > 0
            ? response.diem_hk.map((item, index) => {
              item.stt = index + 1;
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
  return  (
    <View style={{ flex: 1, paddingHorizontal: 10}}>
      {loading
        ? <Loading size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
        : <SemesterTable data={dataSemesterStudent}/>
      }
  </View>
  );
}

const SecondRoute = () => {
  const { getToken } = useAuth();
  const { user } = useUser()

  const [dataAllScoreStudent, setDataAllScoreStudent] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      async function getData() {
        try {
          setLoading(true)
          const token = await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})
          const response = await getAllScoreStudentAPI(user?.publicMetadata?.masv, token)
          setDataAllScoreStudent(
            response.diem_toan_khoa.length > 0
              ? response.diem_toan_khoa.map((item, index) => {
                item.stt = index + 1;
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
  return (
    <View style={{ flex: 1, paddingHorizontal: 10}}>
      {loading
        ? <Loading size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
        : <AllScoreStudent data={dataAllScoreStudent}/>
      }
    </View>
  );
}


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const routes = [
  { key: 'first', title: 'Bảng điểm trong học kỳ' },
  { key: 'second', title: 'Bảng điểm toàn khoá' },
];


export default function DiemHocTap() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
 
  return (
    <View style={{ flex: 1 }}>
       <TabView
           navigationState={{ index, routes }}
           renderScene={renderScene}
           onIndexChange={setIndex}
           initialLayout={{ width: layout.width }}
          //  style={{ backgroundColor: 'black' }} // Background của TabView
          //  sceneContainerStyle={{ backgroundColor: 'gray' }} // Background của nội dung tab
           renderTabBar={props => (
             <TabBar 
               {...props} 
               style={{ backgroundColor: 'white' }} // Màu nền của tab bar
               indicatorStyle={{ backgroundColor: Colors.primary }} // Màu chỉ báo tab
               activeColor={Colors.primary} // Màu chữ của tab đang chọn
               inactiveColor={Colors.textCl} // Màu chữ của tab chưa chọn
             />
           )}
        />
  
    </View>
  )
}