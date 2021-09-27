import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontSize, space } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 2, isPaused = true, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const interval = useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;

      onProgress(timeLeft / minutesToMillis(minutes));

      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: space.lg,
    backgroundColor: colors.count,
    borderRadius: 10,
  },
  text: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.white,
  },
});
