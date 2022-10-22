import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
  SwitchChangeEvent,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Alert,
} from 'react-native';
import InlineView from '../components/InlineView';
import Navbar from '../components/Navbar/Navbar';
import Storage from '../lib/Storage';
import {Context} from '../lib/Store';

interface FieldPropsTypes {
  title: string;
  subtitle: string;
  onToggle: (event: SwitchChangeEvent) => void;
  trackColor?: {true?: string; false?: string};
  switchValue: boolean;
  thumbColor?: string;
  controller?: 'switch' | 'text';
  textValue?: string | number;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

/**
 *
 * @param {string} title - Title of the settings field
 * @param {string} subtitle -Subtitle or the content text
 * @param {()=>void} onToggle - Toogle handler of the Switch
 * @param {onject} trackColor - Custom colors for the switch track, Color when false and color when true
 * @param {boolean} switchValue - value represented by the switch
 * @param {string} thumbColor - Color of the foreground switch grip.
 * @param {string} textValue - Text Input value
 * @param {string} onChangeText - handle on textchange event
 * @param {string} onSubmitEditing - handle on submitting of text
 * @returns
 */

function Field(props: FieldPropsTypes) {
  const {
    title,
    subtitle,
    onToggle,
    trackColor,
    switchValue,
    thumbColor,
    controller,
    textValue,
    onChangeText,
    onSubmitEditing,
  } = props;
  const {colors} = useTheme();

  return (
    <InlineView
      style={[styles.fieldWrapper, {borderBottomColor: colors.border}]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {controller === 'text' ? (
        <TextInput
          value={textValue?.toString()}
          style={[styles.textField, {backgroundColor: colors.card}]}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          onSubmitEditing={onSubmitEditing}
        />
      ) : (
        <Switch
          thumbColor={thumbColor}
          trackColor={trackColor}
          value={switchValue}
          onChange={onToggle}
        />
      )}
    </InlineView>
  );
}

export default function Settings(props: any) {
  const {colors} = useTheme();
  const {limit, setLimit, setSortedBy, sortedBy} = React.useContext(Context);
  const [text, setText] = React.useState<number | string>(0);
  const storage = new Storage();
  //handling the switch event
  const handleSwitch = () => {
    //since the value that is accurate happens outside  we need to reverse the setting in here to accurately saved the accurate value so, 1 = 0, 0 = 1
    setSortedBy(!sortedBy);
    storage.setKey('isAscOrder', JSON.stringify(!sortedBy));
  };
  //handling text changes
  const handleChange = (text: string | number) => {
    setLimit(text);
  };
  //submitting the limit changes
  const onEndSubmittingLimit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const parsedText = parseInt(e.nativeEvent.text);
    if (!parsedText) {
      return Alert.alert('Warning!', 'Limit could not be empty!');
    } else if (parsedText > 500) {
      return Alert.alert(
        'Warning!',
        'Limit could not be greater than 500 to avoid slower queries of Movies!',
      );
    } else {
      setLimit(parsedText);
      storage.setKey('limit', JSON.stringify(parsedText));
      return Alert.alert('Success!', 'Movie Query Limit is set successfully!');
    }
  };
  //Switch tracks default Styling
  const trackColor = {
    //switch is on
    true: colors.notification,
  };

  return (
    <View style={styles.container}>
      <Navbar {...props} title="Settings" mode="default" />
      <View style={[styles.body, {backgroundColor: colors.background}]}>
        <Field
          trackColor={trackColor}
          title="Movie Sorting"
          subtitle="Movie sorting is ascending order by default, by turning this off the Movies will be syncronize in descending order."
          onToggle={handleSwitch}
          switchValue={sortedBy}
          thumbColor={colors.text}
        />
        <Field
          trackColor={trackColor}
          title="Movie Limit per Query"
          subtitle="Represents the number of Movies that can be rendered in every page load (Maximum 500)."
          onToggle={handleSwitch}
          switchValue={sortedBy}
          thumbColor={colors.text}
          controller="text"
          textValue={limit}
          onChangeText={handleChange}
          onSubmitEditing={onEndSubmittingLimit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  fieldWrapper: {alignItems: 'center', padding: 10, borderBottomWidth: 1},
  body: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
  },
  textField: {
    paddingLeft: 10,
    minWidth: 50,
    borderRadius: 10,
    fontSize: 18,
    maxWidth: 50,
  },
});
