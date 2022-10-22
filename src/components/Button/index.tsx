import React, {ReactElement} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

interface ButtonProps {
  icon: ReactElement;
  onPressButton: () => void;
}

export default function Button(props: ButtonProps) {
  const {icon, onPressButton} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 10,
  },
});
