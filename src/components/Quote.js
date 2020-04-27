import React, { useEffect, useRef, memo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated
} from 'react-native';
const up = require('../asset/up.png')
const down = require('../asset/down.png')

const Quote = ({ data }) => {

  let animateRedColor = new Animated.Value(0)

  useEffect(() => {

    Animated.timing(animateRedColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      animateRedColor.setValue(0)
    });

  }, [data.lasttime]);

  const { symbol, ask, bid, change, growth } = data
  const color = growth ? styles.green : styles.red
  const img = growth ? up : down

  let interpolateRedColor = 0
  if (growth) {
    interpolateRedColor = animateRedColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(112, 255, 122, 0.5)']
    });
  } else {
    interpolateRedColor = animateRedColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(242, 133, 133, 0.5)']
    });
  }

  const animatedStyle = {
    backgroundColor: interpolateRedColor,
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.symbol}><Text style={styles.symbol}>{symbol}</Text></View>
      <View style={styles.values}><Text>{bid}</Text></View>
      <View style={styles.values}><Text style={color}>{ask}</Text></View>
      <View style={styles.values}><Text style={color}>{growth ? '+' : ''}{change}%</Text></View>
      <View style={styles.values}><Image style={styles.image} source={img} /></View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  symbol: {
    width: 70,
    alignItems: 'flex-end',
    fontSize: 16,
  },
  values: {
    width: 70,
    alignItems: 'flex-end',
    fontSize: 14,
  },
  image: {
    width: 24,
    height: 24
  },
  red: {
    color: 'red'
  },
  green: {
    color: 'green'
  }
});

export default memo(Quote);