import React, {useState} from 'react';
import {BackHandler,ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {Strings} from '../utils';

const useBackExit = () => {
  const [backHandlerCount, setBackhandlerCount] = useState(0);

  const backAction = () => {
    if (backHandlerCount === 1) {
      BackHandler.exitApp();
    } else {
      setBackhandlerCount(backHandlerCount + 1);
      ToastAndroid.showWithGravityAndOffset(
        'Invalid fields.please check..',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        150,
      );
      // Toast.show(Strings?.EXIT);
      // Toast.show(Strings?.pressAgain);

    }
    return true;
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });
};

export default useBackExit;
