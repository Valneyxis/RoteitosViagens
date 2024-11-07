import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }: any) {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 5000); 

    return () => clearTimeout(timeout); 
  }, [navigation]);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleRestartAnimation = () => {
    if (animation.current) {
      animation.current.reset();
      animation.current.play();
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../assets/animations/splashAnimation.json')}
        loop={true} 
        autoPlay={false} 
        ref={animation} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
  },
  animation: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
