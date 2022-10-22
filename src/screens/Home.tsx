import {useTheme} from '@react-navigation/native';
import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Accordion from '../components/Accordion';
import Card from '../components/Card';
import {HomeNavbar} from '../components/Navbar';
import {Context} from '../lib/Store';
import {genres} from '../temp';
import PreRenderer from '../components/PreRenderer';
import EmptyCard from '../components/EmptyRenderer/EmptyCard';

const Home = (props: any) => {
  const [focusGenre, setFocusGenre] = React.useState('All');
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState<number>(1);
  const {limit, sortedBy} = React.useContext(Context);
  const [movies, setMovies] = React.useState([]);
  const {colors} = useTheme();

  const searchByGenre = React.useCallback(
    (genre: string) => {
      setFocusGenre(genre);
      //fetch in the API goes here
      //reset pages whenever new genre of movies will be selected
      setPage(1);
    },
    [focusGenre],
  );

  //whenever the user scrolls to the last content this method will be called to fetch new data
  const FetchWhenLazyLoadIsToggled = async () => {
    //what to do
    //merge all the frest content from the old content
    //prevent multiple calls when data is not serve
    if (loading) {
      //prevent being called when state is loading
      axios
        .get(
          `https://yts.mx/api/v2/list_movies.json?genre=${focusGenre}&limit=${limit}&page=${page}&order_by=${
            sortedBy ? 'asc' : 'desc'
          }`,
        )
        .then(res => {
          //turn off loading state when new data is ready
          setLoading(false);

          const newData = res.data.data.movies;
          // setMovies(res.data.data.movies);
          // console.log(newData);
          const mergeArray = movies.concat(newData);
          setMovies(mergeArray);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  React.useEffect(() => {
    //fetching movies
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?genre=${
          focusGenre === 'All' ? '' : focusGenre
        }&limit=${limit}&page=${page}&order_by=${sortedBy ? 'asc' : 'desc'}`,
      )
      .then(res => {
        setMovies(res.data.data.movies);
      })
      .catch(e => {
        console.log(e);
      });

    return () => {
      //clean up function
      setMovies([]);
    };
  }, [focusGenre]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <HomeNavbar {...props} />
      <View style={[styles.genreWrapper, {backgroundColor: colors.primary}]}>
        <FlatList
          data={genres}
          bounces
          contentContainerStyle={styles.genreWrapper}
          scrollToOverflowEnabled={true}
          horizontal={true}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <Accordion
                key={index}
                text={item}
                isActive={focusGenre === item ? true : false}
                searchByGenre={searchByGenre}
              />
            );
          }}
        />
      </View>
      <View style={styles.body}>
        {!movies || movies.length <= 0 ? (
          <PreRenderer isFlatList renderComponentCount={8}>
            <EmptyCard backgroundColor={colors.border} />
          </PreRenderer>
        ) : (
          <FlatList
            alwaysBounceVertical
            onScroll={e => {
              //event distance when scrolling hits the bottom
              const TriggeringDistance = 545;
              let contentHeight = e.nativeEvent.contentSize.height;
              if (
                contentHeight - e.nativeEvent.contentOffset.y <=
                TriggeringDistance
              ) {
                if (!loading) {
                  //increment page by one
                  setPage(prevPage => prevPage + 1);
                }
                //add a loading state
                setLoading(true);
                FetchWhenLazyLoadIsToggled();
              }
            }}
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
        )}
        {loading ? (
          <View>
            <ActivityIndicator size={'small'} color={colors.notification} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genreWrapper: {
    height: 70,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatList: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
