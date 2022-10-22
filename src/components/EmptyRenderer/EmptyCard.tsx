import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface EmptyCardPropsTypes {
  backgroundColor?: string;
}

function EmptyCard(props: EmptyCardPropsTypes) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
    />
  );
}

export default React.memo(EmptyCard);

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
  },
});
