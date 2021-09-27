import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus';
import { Timer } from './src/features/timer';
import { space } from './src/utils/sizes';
import { colors } from './src/utils/colors';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? space.xl : space.xxxl,
    paddingHorizontal: space.md,
  },
});
