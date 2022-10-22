import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import InlineView from '../InlineView';
/**
 * "url": "https://yts.mx/torrent/download/7AAB26D897F4F6D306E16CBCC8EC9C02E75891D2",
    "hash": "7AAB26D897F4F6D306E16CBCC8EC9C02E75891D2",
    "quality": "720p",
    "type": "web",
    "seeds": 45,
    "peers": 9,
    "size": "546.23 MB",
    "size_bytes": 572763668,
    "date_uploaded": "2022-01-12 21:40:09",
    "date_uploaded_unix": 1642020009
 */
interface CardProps {
  item: {
    seeds: number;
    url: string;
    quality: string;
    peers: number;
    size: string;
    hash: string;
    date_uploaded: Date;
  };
  title?: string;
  year?: number;
  background_image_original?: string;
}

function TorrentCard(props: CardProps) {
  const {item, background_image_original, title, year} = props;
  const {colors} = useTheme();
  const magnet = `magnet:?xt=urn:btih:${item.hash}&dn=${title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337 `;

  const handleShowTorrentMagnet = () => {
    Linking.openURL(magnet);
  };
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors.card}]}
      activeOpacity={0.8}
      onPress={handleShowTorrentMagnet}>
      <View style={styles.image_wrapper}>
        <FastImage
          style={{height: '100%', width: '100%'}}
          source={{uri: background_image_original}}
        />
      </View>
      <View style={styles.content_wrapper}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: colors.notification,
          }}>{`${title} (${year})`}</Text>
        <Text>Uploaded: {moment(item.date_uploaded).format('LL')}</Text>
        <InlineView>
          <Text style={{flex: 1}}>Size: {item.size}</Text>
          <Text style={{flex: 1}}>Quality: {item.quality}</Text>
        </InlineView>
        <InlineView>
          <Text style={{flex: 1}}>Seeds: {item.seeds}</Text>
          <Text style={{flex: 1}}>Peers: {item.peers}</Text>
        </InlineView>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(TorrentCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 200,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image_wrapper: {
    height: 60,
    width: 60,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 50,
  },
  content_wrapper: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
});
