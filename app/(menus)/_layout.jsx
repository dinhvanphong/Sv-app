import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        options={{ title: 'Chương trình đào tạo' }}      
        name="chuongTrinhDaoTao"
      />
      <Stack.Screen 
        options={{ title: 'Điểm học tập' }}      
        name="diemHocTap"
      />
      <Stack.Screen 
        options={{ title: 'Điểm tổng kết' }}      
        name="diemTongKet"
      />
      <Stack.Screen 
        options={{ title: 'Khoản đã nộp' }}      
        name="khoanDaNop"
      />
       <Stack.Screen 
        options={{ title: 'Nợ môn' }}      
        name="noMon"
      />
    </Stack>
  )
}