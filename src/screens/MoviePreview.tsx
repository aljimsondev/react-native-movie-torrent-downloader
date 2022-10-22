import React from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar/Navbar';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import coverPhoto from '../Assets/1.jpg';
import profilePhoto from '../Assets/3.jpg';
import Accordion from '../components/Accordion';
import Card from '../components/Card';
import Progress from '../components/Progress';
import Fab from '../components/Fab';
import Button from '../components/Button';
import PreRender from '../components/PreRenderer';
import EmptyText from '../components/EmptyRenderer/EmptyText';
import EmptyBox from '../components/EmptyRenderer/EmptyBox';
import EmptyCard from '../components/EmptyRenderer/EmptyCard';
import {Context} from '../lib/Store';
import Storage from '../lib/Storage';
import Animated, {
  cond,
  eq,
  greaterOrEq,
  greaterThan,
  interpolate,
  set,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useCode,
  useSharedValue,
} from 'react-native-reanimated';

interface UserFavoriteTypes {
  isFavorite: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  handleFavoriteStatus: (isFavorite: boolean) => void;
}

interface MovieProps {
  background_image_original?: string;
  medium_cover_image?: string;
  title?: string;
  rating?: number;
  runtime?: number;
  cast: any[];
  genres: any[];
  description_full?: string;
  year?: number;
  date_uploaded?: Date;
}

function UserFavorite(props: UserFavoriteTypes) {
  const {colors, handleFavoriteStatus, isFavorite} = props;
  return (
    <View style={styles.header}>
      <Button
        onPressButton={() => handleFavoriteStatus(isFavorite)}
        icon={
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={25}
            color={isFavorite ? colors.notification : colors.text}
          />
        }
      />
    </View>
  );
}

export default function MoviePreview(props: any) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const {fave, setFave} = React.useContext(Context);
  const {id, title} = props.route.params;
  const [completed, setCompleted] = React.useState(false);
  const storage = new Storage();
  const [movie, setMovie] = React.useState<MovieProps>({
    genres: [],
    cast: [],
  });
  const [similarMovies, setSimilarMovies] = React.useState([]);

  const {colors} = useTheme();

  const handleFavoriteStatus = (isFavorite: boolean) => {
    //manage favorite status here
    if (isFavorite) {
      //remove from favorites
      const filteredFavorites = fave.filter(d => d.id !== id);
      storage.setKey('favorites', JSON.stringify(filteredFavorites));
      setIsFavorite(false);
      setFave(filteredFavorites);
      return Alert.alert('Success!', 'Remove from Favorites!');
    } else {
      //add to favorites
      setFave([...fave, movie]);
      storage.setKey('favorites', JSON.stringify([...fave, movie]));
      setIsFavorite(true);
      return Alert.alert('Success!', 'Added to Favorites!');
    }
  };

  //handling for redirecting
  const handleRedirectTorrentPage = () => {
    return props.navigation.push('Torrents', {movie});
  };

  //getting favorite status
  const handleMovieFavoriteStatus = () => {
    //finding movie id in favorite movies
    const isFoundInFavoriteMovies = fave.find(movie => movie.id === id);
    if (isFoundInFavoriteMovies) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  React.useEffect(() => {
    //getting movie favorite status
    handleMovieFavoriteStatus();
    //movie details
    axios
      .get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`,
      )
      .then(res => {
        setMovie(res.data.data.movie);
        //whenever fetching is complete update state
        setCompleted(true);
      })
      .catch(e => {
        console.log(e);
      });
    // const selectedMovie = datas.data.movies.find(data => data.id === id);
    // console.log(selectedMovie);
    // setMovie(selectedMovie);
    // setCompleted(true);
    //movie suggestion
    axios
      .get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
      .then(res => {
        setSimilarMovies(res.data.data.movies);
      })
      .catch(e => {
        console.log(e);
      });

    return () => {
      //clean up function
      setMovie({
        genres: [],
        cast: [],
      });
      setSimilarMovies([]);
      setCompleted(false);
    };
  }, [title, id]);

  //=========================animation values ===============================================
  const scrolling = useSharedValue(0);
  const startAnimation = useSharedValue(false);

  const translation = interpolate(scrolling.value, [0, 1], [0, -100], 'clamp');
  const opacity = interpolate(scrolling.value, [0, 1], [1, 0], 'clamp');

  //=========================end of animation values =========================================
  return (
    <View style={styles.container}>
      <Navbar
        {...props}
        title={title}
        //animation
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          opacity: opacity,
          transform: [{translateY: translation}],
        }}
        mode="stack"
        leftSideBar={
          <UserFavorite
            isFavorite={isFavorite}
            colors={colors}
            handleFavoriteStatus={handleFavoriteStatus}
          />
        }
      />
      <Fab
        {...props}
        icon={() => {
          return <AntDesign name="download" size={24} color={colors.text} />;
        }}
        position="bottom right"
        onPress={handleRedirectTorrentPage}
      />
      <Animated.ScrollView
        style={styles.scrollContainer}
        onScroll={useAnimatedScrollHandler({
          onScroll: event => {
            if (event.contentOffset.y <= 10) {
              return (startAnimation.value = true);
            }
            return (startAnimation.value = false);
          },
        })}>
        {/*=============beginning yof images=============*/}
        {!completed ? (
          <View
            style={[styles.mainImageWrapper, {backgroundColor: colors.border}]}>
            <View
              style={[styles.coverImage, {backgroundColor: colors.primary}]}
            />
          </View>
        ) : (
          <View
            style={[styles.mainImageWrapper, {backgroundColor: colors.border}]}>
            <FastImage
              source={
                movie.background_image_original
                  ? {uri: movie.background_image_original}
                  : coverPhoto
              }
              style={styles.mainImage}
            />
            <View style={styles.coverImage}>
              <FastImage
                source={
                  movie.medium_cover_image
                    ? {uri: movie.medium_cover_image}
                    : profilePhoto
                }
                style={{height: '100%', width: '100%'}}
              />
            </View>
          </View>
        )}
        {/*=============end=============================*/}
        <View style={styles.body}>
          {!completed ? (
            <>
              <EmptyText borderRadius={5} backgroundColor={colors.border} />
              <EmptyText
                borderRadius={5}
                backgroundColor={colors.border}
                maxWidth="60%"
              />
            </>
          ) : (
            <>
              <Text
                style={
                  styles.body_title
                }>{`${movie.title} (${movie.year})`}</Text>
              <Text>
                Date Uploaded: {moment(movie.date_uploaded).format('LL')}
              </Text>
            </>
          )}
          {/*==============starting of the summary========= */}
          {!completed ? (
            <PreRender isFlatList horizontal renderComponentCount={2}>
              <EmptyBox backgroundColor={colors.border} />
            </PreRender>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.details,
                  {marginRight: 10, borderColor: colors.text},
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>RATING: </Text>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    {movie.rating}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Progress progress={movie.rating ? movie.rating : 0} />
                </View>
              </View>
              <View
                style={[
                  styles.details,
                  {marginLeft: 10, borderColor: colors.text},
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14}}>RUNTIME: </Text>
                  <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    {movie.runtime}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AntDesign name="star" size={22} />
                  <Text style={{marginLeft: 10, fontSize: 18}}>MINUTES</Text>
                </View>
              </View>
            </View>
          )}
          {/*==============starting of the summary========= */}
          {/*==============starting of the GENRE========= */}
          {!completed ? (
            <>
              <EmptyText
                borderRadius={5}
                backgroundColor={colors.border}
                maxWidth="30%"
              />
              <PreRender
                isFlatList
                horizontal
                renderComponentCount={4}
                style={{marginTop: 10}}>
                <Accordion text="" />
              </PreRender>
            </>
          ) : movie.genres.length <= 0 ? null : (
            <View>
              <Text style={styles.label}>GENRE</Text>
              <FlatList
                renderItem={({item}) => {
                  return <Accordion text={item} isActive />;
                }}
                data={movie.genres}
                horizontal
                alwaysBounceHorizontal
                bounces
                keyExtractor={(item, index) => item + index}
              />
            </View>
          )}
          {/*==============end of the GENRE========= */}
          {/*==============start of SUMMARY========= */}
          {!completed ? (
            <>
              <EmptyText
                borderRadius={5}
                backgroundColor={colors.border}
                maxWidth="60%"
              />
              <EmptyText borderRadius={5} backgroundColor={colors.border} />
              <EmptyText borderRadius={5} backgroundColor={colors.border} />
              <EmptyText borderRadius={5} backgroundColor={colors.border} />
            </>
          ) : !movie.description_full ? null : (
            <View>
              <Text style={styles.label}>SUMMARY</Text>
              <Text style={{fontSize: 16}}>{movie.description_full}</Text>
            </View>
          )}
          {/*==============end of SUMMARY========= */}
          {/*==============start of CASTS========= */}
          {!completed ? (
            <>
              <EmptyText
                borderRadius={5}
                backgroundColor={colors.border}
                maxWidth="30%"
              />
              <PreRender
                isFlatList
                horizontal
                renderComponentCount={4}
                style={{marginTop: 10, minWidth: '100%'}}>
                <EmptyCard backgroundColor={colors.border} />
              </PreRender>
            </>
          ) : !movie.cast ? null : movie.cast.length <= 0 ? null : (
            <View>
              <Text style={styles.label}>CASTS</Text>
              <FlatList
                style={{marginTop: 10}}
                data={movie.cast}
                renderItem={({item}) => {
                  return (
                    <View
                      style={[
                        styles.cast_wrapper,
                        {backgroundColor: colors.primary},
                      ]}>
                      <FastImage
                        style={styles.cast}
                        source={{uri: item.url_small_image}}
                      />
                      <View style={{padding: 10}}>
                        <Text>{item.name}</Text>
                        <Text>
                          {item.character_name
                            ? `(${item.character_name})`
                            : null}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                horizontal
                alwaysBounceHorizontal
                bounces
              />
            </View>
          )}
          {/*==============end of CASTS========= */}
          {/*==============start of SUGGESTED MOVIES========= */}
          {similarMovies.length <= 0 ? null : (
            <View>
              <Text style={styles.label}>SUGGESTED MOVIES</Text>
              <FlatList
                style={{marginTop: 10}}
                data={similarMovies}
                renderItem={({item}) => {
                  return <Card item={item} {...props} />;
                }}
                horizontal
                alwaysBounceHorizontal
                bounces
              />
            </View>
          )}
          {/*==============end of SUGGESTED MOVIES========= */}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 10,
  },
  mainImageWrapper: {
    flex: 1,
    maxHeight: 300,
    minHeight: 200,
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  mainImage: {
    position: 'absolute',
    maxHeight: 300,
    minHeight: 300,
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    height: 120,
    width: 120,
    borderRadius: 100,
    bottom: -20,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  body_title: {
    fontSize: 24,
  },
  details: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 10,
    borderRadius: 10,
  },
  cast_wrapper: {
    marginRight: 10,
    borderRadius: 20,
    minWidth: 120,
    maxWidth: 120,
    minHeight: 200,
  },
  cast: {
    height: 150,
    width: '100%',
    borderRadius: 20,
  },
});
