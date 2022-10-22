import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import TorrentCard from '../components/Card/TorrentCard';
import Navbar from '../components/Navbar/Navbar';

interface TorrentProps {
  navigation: any;
  route: any;
}

export default function Torrents(props: TorrentProps) {
  const {navigation, route} = props;
  const {movie} = route.params;

  return (
    <View style={styles.container}>
      <Navbar {...props} title="Torrents" />
      <View style={styles.body}>
        <FlatList
          data={movie.torrents}
          renderItem={({item}) => {
            return (
              <TorrentCard
                item={item}
                title={movie.title}
                background_image_original={movie.medium_cover_image}
                year={movie.year}
              />
            );
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
    padding: 10,
  },
});
