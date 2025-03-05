import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import { Colors } from '../constants/Color';

import { getNewsHomeAPI } from '../apis';
import { wp, hp } from '../helpers/common';

function NewsItem({item}) {
  const openURL = () => {
    Linking.openURL(`https://hpu.edu.vn/blogs/tin-tuc-moi/${item.handle}`);
  };
  return (
    <TouchableOpacity className='mt-3 w-full' onPress={openURL}> 
      <Image source={{uri: item.image.src}} style={{width: wp(95), height: wp(45)}} className='bg-black/20'/>
      <View className='py-1'>
        <Text className='text-lg font-semibold text-primary'>{item.title}</Text>
        <Text className='text-base text-justify text-gray-500'>
          {item.meta_description.length> 300
            ? item.meta_description.slice(0, 300) + '...' 
            : item.meta_description
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default function News() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading]= useState(false);
  useEffect(() => {
    setLoading(true);
    getNewsHomeAPI()
      .then(res => setBlogs(res.data1.articles))
      .then(() => setLoading(false));
  }, []);

  let reversedBlogs = blogs.slice().reverse()
  return (
    <View style={{width: wp(95), margin: 'auto'}}>
      <Text className='text-center text-xl font-semibold mt-5 text-primary'>Tin tức:</Text>
      <View>
        {loading
          ? <Loading size='large' />
          : <MasonryList 
              data={reversedBlogs}
              keyExtractor={item => item.id}
              numColumns={1}
              onEndReachedThreshold={0.1}
              renderItem={({item}) => <NewsItem item={item} />}
            />   
        }
        {/* {reversedBlogs && reversedBlogs.map((item, index) => <NewsItem key={index} item={item} />)} */}
      </View>
      <TouchableOpacity className='w-fit' onPress={() => Linking.openURL('https://hpu.edu.vn/blogs/tin-tuc-moi')}>
        <Text className='text-center text-base italic underline text-primary py-3 mb-3'>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  )
}