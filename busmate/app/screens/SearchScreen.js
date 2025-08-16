/* HomeScreen하고 글자 검색 연동하는 과정에서 실패해서 임시로 넣어두고
 사용하던 테스트용 파일
*/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>여기는 검색 화면입니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white' },
  text: { fontSize:20, fontWeight:'bold' },
});

export default SearchScreen;