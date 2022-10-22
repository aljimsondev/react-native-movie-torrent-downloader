import {useTheme} from '@react-navigation/native';
import React from 'react';
import moment from 'moment';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Navbar from '../components/Navbar/Navbar';
import Storage from '../lib/Storage';
import AD from 'react-native-vector-icons/AntDesign';
import {Context} from '../lib/Store';

interface PropsType {
  item: {
    id: Date;
    text: string;
    date: Date;
  };
  onNavigate: (item: string) => void;
  onRemove: (id: Date) => void;
}

function SearchButton(props: PropsType) {
  const {item, onNavigate, onRemove} = props;
  const {colors} = useTheme();
  return (
    <View style={[styles.button, {backgroundColor: colors.card}]}>
      <TouchableOpacity style={{flex: 1}} onPress={() => onNavigate(item.text)}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.text}</Text>
        <Text>{moment(item.date).format('LL')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}>
        <AD name="close" size={22} />
      </TouchableOpacity>
    </View>
  );
}

export default function SearchHistory(props: any) {
  const storage = new Storage();
  const {searchHistory, setSearchHistory} = React.useContext(Context);
  const {colors} = useTheme();

  const handleClickSearchHistory = (text: string) => {
    return props.navigation.navigate('SearchResults', {text: text});
  };
  const handleRemoveSearch = (id: Date) => {
    const newArray = searchHistory.filter(item => item.id !== id);
    setSearchHistory(newArray);
    storage.setKey('searchHistory', JSON.stringify(newArray));
  };
  return (
    <View style={styles.container}>
      <Navbar
        {...props}
        title="Search History"
        leftSideBar={
          <View style={styles.clear}>
            <TouchableOpacity
              style={styles.clear_button}
              onPress={() =>
                Alert.alert(
                  'Warning!',
                  'Are you sure you want to clear History?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        console.log('cancelled');
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'Clear',
                      onPress: () => {
                        //clear storage here
                        storage.removeKey('searchHistory').then(() => {
                          setSearchHistory([]);
                          return Alert.alert(
                            'Success!',
                            'Search History is cleared successfully!',
                          );
                        });
                      },
                      style: 'destructive',
                    },
                  ],
                )
              }>
              <Text>Clear History</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView style={[styles.body, {backgroundColor: colors.background}]}>
        {searchHistory.map((item, index) => {
          return (
            <SearchButton
              key={index}
              item={item}
              onNavigate={handleClickSearchHistory}
              onRemove={handleRemoveSearch}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clear: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  clear_button: {
    padding: 10,
  },
  body: {
    flex: 1,
    backgroundColor: 'red',
  },
  flex: {
    flex: 1,
  },
  button: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
