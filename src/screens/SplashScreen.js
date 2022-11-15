import React, { useEffect, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SplashScreen = props => {
  const { checkAuthState } = useContext(AuthContext);

  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/Splash.png')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' }
});
export default SplashScreen;
