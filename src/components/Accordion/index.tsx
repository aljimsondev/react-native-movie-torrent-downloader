import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface PropsType {
  text: string;
  isActive?: boolean;
  searchByGenre?: (genre: string) => void | undefined;
}

function Accordion(props: PropsType) {
  const {text, isActive, searchByGenre} = props;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isActive
            ? useTheme().colors.notification
            : useTheme().colors.border,
        },
      ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (searchByGenre ? searchByGenre(text) : {})}>
        <Text style={{color: useTheme().colors.text}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Accordion);

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    margin: 5,
    position: 'relative',
  },
  button: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
