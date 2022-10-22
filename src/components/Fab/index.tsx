import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';

interface PropsTypes {
  icon: () => JSX.Element;
  position:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottom right'
    | 'top left'
    | 'bottom left'
    | 'top right';
  onPress: () => void;
}

/**
 *
 * @param icon - Icon of the Floating Action Button
 * @param {string} position - position of the button `top`,`bottom`,`left`,`right`
 * @param {Function} onPress - function the will toggle on pressing the button
 * @returns JSX Element
 */
interface PositionProps {
  top: number | undefined;
  left: number | undefined;
  bottom: number | undefined;
  right: number | undefined;
}
function FloatingActionButton(props: PropsTypes) {
  const {icon, onPress, position} = props;
  const [currentPosition, setCurrentPosition] = React.useState<PositionProps>({
    top: undefined,
    left: undefined,
    right: 0,
    bottom: 0,
  });

  React.useEffect(() => {
    switch (position) {
      case 'top':
        return setCurrentPosition({...currentPosition, top: 0});
      case 'left':
        return setCurrentPosition({...currentPosition, left: 0});
      case 'right':
        return setCurrentPosition({...currentPosition, right: 0});
      case 'bottom':
        return setCurrentPosition({...currentPosition, bottom: 0});
      case 'bottom left':
        return setCurrentPosition({...currentPosition, bottom: 0, left: 0});
      case 'bottom right':
        return setCurrentPosition({...currentPosition, bottom: 0, right: 0});
      case 'top left':
        return setCurrentPosition({...currentPosition, top: 0, left: 0});
      case 'top right':
        return setCurrentPosition({...currentPosition, top: 0, right: 0});
      default:
        return setCurrentPosition({
          top: undefined,
          left: undefined,
          right: 0,
          bottom: 0,
        });
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        currentPosition,
        {backgroundColor: useTheme().colors.notification},
      ]}
      onPress={onPress}>
      {icon()}
    </TouchableOpacity>
  );
}

export default React.memo(FloatingActionButton);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 50,
    zIndex: 1,
    margin: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
