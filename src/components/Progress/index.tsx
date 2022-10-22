import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ProgressTypes {
  progress: number;
}

function Progress(props: ProgressTypes) {
  const {progress} = props;
  let width: number = 0;
  if (progress) {
    width = progress * 10;
  }
  return (
    <View style={[styles.container, {backgroundColor: useTheme().colors.card}]}>
      <View
        style={[
          styles.rating,
          {
            backgroundColor: useTheme().colors.notification,
            maxWidth: `${width}%`,
          },
        ]}
      />
    </View>
  );
}
export default React.memo(Progress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 20,
    minHeight: 20,
    borderRadius: 50,
    marginTop: 5,
    overflow: 'hidden',
  },
  rating: {
    flex: 1,
  },
});
