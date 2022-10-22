import React, {ReactNode, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';

interface PreRendereProps {
  children: JSX.Element;
  isFlatList?: boolean;
  renderComponentCount?: number;
  horizontal?: boolean;
  style?: any;
}

function PreRenderer(props: PreRendereProps) {
  const [counter, setCounter] = React.useState<number[] | any[]>([]);
  let parentComponent: JSX.IntrinsicElements;

  //when renderComponentCount is set counter will iterate its value;
  const {children, isFlatList, renderComponentCount, horizontal, style} = props;
  React.useEffect(() => {
    setCounter(new Array(renderComponentCount).fill(1));
  }, []);
  const renderChilren = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {children}
      </View>
    );
  };
  const renderComponent = () => {
    if (isFlatList) {
      return (
        <FlatList
          style={
            style
              ? style
              : {
                  minWidth: '96%',
                }
          }
          contentContainerStyle={{
            paddingBottom: 10,
            paddingTop: 10,
          }}
          data={counter}
          bounces
          numColumns={horizontal ? 0 : 2}
          horizontal={horizontal}
          renderItem={renderChilren}
        />
      );
    } else {
      return children;
    }
  };

  return renderComponent();
}

export default React.memo(PreRenderer);
