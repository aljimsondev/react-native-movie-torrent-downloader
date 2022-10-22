import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ViewProps {
  style?: {};
  children: Element;
}

export default function InlineView(props: ViewProps) {
  const {style} = props;
  return (
    <View style={[{position: 'relative', flexDirection: 'row'}, style]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },
});
