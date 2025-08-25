import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'; // Alert는 더 이상 필요 없으므로 제거해도 무방하지만, 일단 유지
import { useNavigation } from '@react-navigation/native';

// 날짜 포맷 함수 (MM. DD.)
const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}. ${day < 10 ? '0' + day : day}.`;
};

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // 검색어 입력 후 Enter 또는 키보드 검색 버튼 눌렀을 때 호출 (검색 기록에만 추가)
  const onSubmitSearchText = () => {
    if (searchText.trim() === '') return; // 비어있으면 기록에 추가하지 않음

    // 현재 검색어를 먼저 검색 기록 목록에서 제거 (중복 방지 및 최신화)
    const filteredSearches = recentSearches.filter(
      (item) => item.title.toLowerCase() !== searchText.trim().toLowerCase()
    );

    // 새 항목 생성
    const newSearchItem = {
      id: Date.now().toString(), // 고유 id
      title: searchText.trim(),
      date: formatDate(new Date()),
    };

    // 최신 항목을 맨 앞에 추가
    setRecentSearches([newSearchItem, ...filteredSearches]);

    setSearchText(''); // 입력창 초기화
    Keyboard.dismiss(); // 키보드 닫기
  };

  // '검색 완료' 버튼 또는 최근 검색 기록 선택 시 호출될 함수
  const onConfirmSearch = (destinationText) => {
    // 바로 Stack 네비게이터로 이동
    navigation.navigate('GuidanceStartScreen', {
      destination: destinationText.trim(),
    });

    if (destinationText.trim() !== '') {
      const filteredSearches = recentSearches.filter(
        (item) => item.title.toLowerCase() !== destinationText.trim().toLowerCase()
      );
      const newSearchItem = {
        id: Date.now().toString(),
        title: destinationText.trim(),
        date: formatDate(new Date()),
      };
      setRecentSearches([newSearchItem, ...filteredSearches]);
    }

    setSearchText('');
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => (
    // 최근 검색 기록 항목을 누르면 해당 검색어로 '검색 완료'를 바로 실행
    <TouchableOpacity style={styles.itemContainer} onPress={() => onConfirmSearch(item.title)}>
      <Text style={styles.icon}>📍</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </TouchableOpacity>

      {/* 검색 입력창과 '검색 완료' 버튼을 감싸는 View */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="장소, 주소 검색"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onSubmitSearchText} // 엔터 시 기록만 남김
          autoFocus={true}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {/* '검색 완료' 버튼 */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onConfirmSearch(searchText)}
          // ✨ 변경된 부분: disabled 속성을 제거했습니다. 이제 항상 버튼을 누를 수 있습니다.
        >
          <Text style={styles.confirmButtonText}>완료</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>최근 검색 기록이 없습니다.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
    padding: 10,
  },
  backText: { fontSize: 30, color: '#444' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15, // 좌우 여백 15px
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  confirmButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: { flexGrow: 0 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  icon: { fontSize: 20, marginRight: 12 },
  itemTitle: { flex: 1, fontSize: 16, color: '#222' },
  itemDate: { fontSize: 14, color: '#999' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});

export default SearchScreen;