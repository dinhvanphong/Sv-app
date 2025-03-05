# Dimensions
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Kích thước màn hình: {width} x {height}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9, // Chiếm 90% chiều rộng màn hình
    height: height * 0.5, // Chiếm 50% chiều cao màn hình
  },
});

# npm i react-native-reanimated
# npm install @react-native-seoul/masonry-list
react-native-masonry-list là một thư viện hỗ trợ hiển thị danh sách dạng Masonry Layout trong React Native, tương tự như Pinterest.

Thư viện này giúp hiển thị danh sách ảnh hoặc nội dung có chiều cao khác nhau mà không bị khoảng trắng thừa.
Khi nào nên dùng react-native-masonry-list?
Khi bạn cần hiển thị danh sách ảnh hoặc card có chiều cao khác nhau.
Khi bạn muốn tạo layout kiểu Pinterest.
Khi bạn cần hỗ trợ cuộn vô hạn và lazy loading.

# npm i react-native-snap-carousel (Slider)