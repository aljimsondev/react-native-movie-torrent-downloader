import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card';
import axios from 'axios';

export default function SearchResults(props: any) {
  const {text} = props.route.params;
  const {colors} = useTheme();
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?query_term=${text}`)
      .then(res => {
        setMovies(res.data.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
    return () => {
      //clean up
      setMovies([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Navbar {...props} title={`Results for "${text}"`} />
      <View style={[styles.body, {backgroundColor: colors.background}]}>
        <FlatList
          alwaysBounceVertical
          bounces
          numColumns={2}
          contentContainerStyle={styles.flatList}
          data={movies}
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
    backgroundColor: 'red',
  },
  body: {
    flex: 1,
  },
  flatList: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
