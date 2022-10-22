import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//icons to use

//antdesign - heart && hearto
// ''       - download

//MaterialCommunityIcons
//-movie
//-moviesearch

//Ionicons

//-settings
//-settings-outline

interface IconTypes {
  provider: string;
  name: string;
  color?: string;
  size?: number;
}

export default function RenderIcon(props: IconTypes) {
  const {provider, name, color, size} = props;
  const providerToLower = provider.toLocaleLowerCase();

  switch (providerToLower) {
    case 'antdesign':
      return (
        <AntDesign name={name} size={size} color={color ? color : undefined} />
      );

    case 'ionicons':
      return (
        <Ionicons name={name} size={size} color={color ? color : undefined} />
      );

    case 'materialcommunityicons':
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color ? color : undefined}
        />
      );
    default:
      return null;
  }
}
