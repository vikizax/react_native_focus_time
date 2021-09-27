import React, { useState } from 'react';
import { Text, View, StyleSheet, Pla } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, space } from '../../utils/sizes.js';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Task"
            style={{
              flex: 1,
              marginRight: 20,
            }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
            onChangeText={(text) => setSubject(text)}
          />

          <RoundedButton
            size={50}
            title="+"
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: space.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
  },
  inputContainer: {
    paddingTop: space.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
