import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { space } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate([1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000]);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownContainer}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: space.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color={colors.white}
          style={styles.progressBar}
        />
      </View>

      <View style={styles.timingContainer}>
        <Timing changeTime={changeTime} />
      </View>

      <View style={styles.countdownButtonContainer}>
        <RoundedButton
          title="Start"
          disabled={isStarted}
          size={80}
          onPress={() => setIsStarted(true)}
        />

        <RoundedButton
          title="Pause"
          disabled={!isStarted}
          size={80}
          onPress={() => setIsStarted(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdownContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownButtonContainer: {
    flex: 0.5,
    marginTop: space.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressBar: {
    height: space.sm,
    backgroundColor: colors.count,
  },
  progressBarContainer: {
    marginTop: space.md,
  },
  timingContainer: {
    flex: 0.3,
    flexDirection: 'row',
    padding: space.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
