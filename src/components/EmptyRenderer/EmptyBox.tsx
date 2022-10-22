import React from 'react';
import {StyleSheet, View} from 'react-native';

interface EmptyBoxPropTypes {
  minHeight?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  maxWidth?: string;
}
/**
 * PreRender component of Text field
 * @param minHeight - minHeight styling of the component, default is `80`
 * @param borderRadius - borderRadius styling ig the component, default is `10`
 * @param backgroundColor - background color of the component, default is `#000`
 * @returns JSX Element
 */

function EmptyBox(props: EmptyBoxPropTypes) {
  const {minHeight, borderRadius, backgroundColor} = props;
  const defaultStyles = {
    minHeight: 80,
    borderRadius: 10,
    backgroundColor: '#000',
  };
  return (
    <View
      style={[
        styles.container,
        {
          minHeight: minHeight ? minHeight : defaultStyles.minHeight,
          borderRadius: borderRadius
            ? borderRadius
            : defaultStyles.borderRadius,
          backgroundColor: backgroundColor
            ? backgroundColor
            : defaultStyles.backgroundColor,
        },
      ]}
    />
  );
}

export default React.memo(EmptyBox);

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    margin: 5,
    marginTop: 10,
    flex: 1,
    maxWidth: '100%',
    minWidth: 160,
  },
});
