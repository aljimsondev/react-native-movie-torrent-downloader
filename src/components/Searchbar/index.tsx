import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import FA from 'react-native-vector-icons/FontAwesome';
import AD from 'react-native-vector-icons/AntDesign';
import IO from 'react-native-vector-icons/Ionicons';
import {Context} from '../../lib/Store';
import Storage from '../../lib/Storage';

export default function Searchbar(props: any) {
  const [text, setText] = React.useState<string>('');
  const {searchHistory, setSearchHistory} = React.useContext(Context);
  const storage = new Storage();
  const {colors} = useTheme();

  //handling searching
  const handleSearch = () => {
    //redirect to search results with the params
    //save to search history
    if (!text) {
      return;
    }
    const data = {
      id: Date.now(),
      text: text,
      date: Date.now(),
    };
    setSearchHistory([...searchHistory, data]);
    storage.setKey('searchHistory', JSON.stringify([...searchHistory, data]));
    return props.navigation.navigate('SearchResults', {text: text});
  };
  //hanling clear text input
  const handleClear = () => {
    setText('');
  };
  //handling search history
  const redirectToHistory = () => {
    return props.navigation.navigate('SearchHistory');
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.border}]}>
      <View style={[styles.icon]}>
        <FA name="search" size={20} color={colors.text} />
      </View>
      <TextInput
        style={[styles.textInput, {color: colors.text}]}
        placeholder="Search..."
        returnKeyType="search"
        placeholderTextColor={colors.text}
        value={text}
        onChangeText={text => setText(text)}
        onSubmitEditing={handleSearch}
      />
      {!text ? (
        <TouchableOpacity style={[styles.close]} onPress={redirectToHistory}>
          <Text>
            <FA name="history" size={20} color={colors.text} />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.close]} onPress={handleClear}>
          <AD name="close" size={20} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    marginLeft: 10,
    position: 'relative',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    fontSize: 14,
  },
  close: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  icon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  },
});
