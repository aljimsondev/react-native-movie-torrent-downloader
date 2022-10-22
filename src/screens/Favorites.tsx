import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Card from '../components/Card';
import Navbar from '../components/Navbar/Navbar';
import {Context} from '../lib/Store';

export default function Favorites(props: any) {
  const {colors} = useTheme();
  const {fave} = React.useContext(Context);
  return (
    <View style={styles.container}>
      <Navbar {...props} title="Favorite Movies" mode="default" />
      <View style={[styles.body, {backgroundColor: colors.background}]}>
        <FlatList
          alwaysBounceVertical
          bounces
          numColumns={2}
          contentContainerStyle={styles.flatList}
          data={fave}
          centerContent
          fadingEdgeLength={1}
          renderItem={({item, index}) => {
            return <Card key={index} item={item} {...props} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatList: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
