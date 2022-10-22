import {useTheme} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import DefaultThumbnail from '../../Assets/default.png';
import FastImage from 'react-native-fast-image';

interface CardProps {
  item: {
    id: string;
    title?: string;
    medium_cover_image: string;
  };
  navigation?: any;
}

function Card(props: CardProps) {
  const {item, navigation} = props;
  let imageThumbnail;
  if (item.medium_cover_image) {
    // imageThumbnail = item.medium_cover_image;
    imageThumbnail = {
      uri: item.medium_cover_image,
    };
  } else {
    imageThumbnail = DefaultThumbnail;
  }
  const params = {
    id: item.id,
    title: item.title,
  };
  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: useTheme().colors.background}]}
      onPress={() => navigation.navigate('MoviePreview', params)}>
      <FastImage style={styles.thumbnail} source={imageThumbnail} />
    </TouchableOpacity>
  );
}

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
    borderWidth: 2,
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
