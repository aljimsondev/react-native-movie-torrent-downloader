import React from 'react';
import {StyleSheet, View} from 'react-native';

interface EmptyTextPropTypes {
  maxHeight?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
  maxWidth?: string;
}
/**
 * PreRender component of Text field
 * @param maxHeight - maxHeight styling of the component, default is `10`
 * @param borderRadius - borderRadius styling ig the component, default is `50`
 * @param backgroundColor - background color of the component, default is `#000`
 * @returns JSX Element
 */
function EmptyText(props: EmptyTextPropTypes) {
  const {maxHeight, borderRadius, backgroundColor, maxWidth} = props;
  return (
    <View
      style={[
        styles.container,
        {
          maxHeight: maxHeight ? maxHeight : 20,
          borderRadius: borderRadius ? borderRadius : 50,
          backgroundColor: backgroundColor ? backgroundColor : '#000',
          maxWidth: maxWidth ? maxWidth : '100%',
        },
      ]}
    />
  );
}
export default React.memo(EmptyText);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 20,
    borderRadius: 50,
    marginTop: 10,
  },
});
