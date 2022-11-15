import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Typography, Colors } from '../styles';
import { Strings } from '../utils';

const LoginScreen = ({ navigation }) => {
  const isEmail = (text) => /\w+[@]\w+[.]\w+/.test(text)
  function validatePhone(phone) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phone);
  }

  const initialPageState = {
    password: '',
    passwordErrorMsg: null,
    email: '',
    emailErrorMsg: null,

  };

  const pageReducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_PASSWORD':
        return {
          ...prevState,
          password: action.field,
          passwordErrorMsg: action.errorMsg,
        };
      case 'SET_EMAIL':
        return {
          ...prevState,
          email: action.field,
          emailErrorMsg: action.errorMsg,
        };


      default:
        break;
    }
  };
  const [pageState, dispatch] = React.useReducer(pageReducer, initialPageState);

  const passwordInputChange = val => {
    if (val.trim().length > 0) {
      dispatch({
        type: 'SET_PASSWORD',
        field: val,
        errorMsg: null,
      });
    } else {
      dispatch({
        type: 'SET_PASSWORD',
        field: val,
        errorMsg: "Password won't be null",
      });
    }
  };

  const emailInputChange = val => {
    if (val.trim().length > 0) {
      var cleaned = ('' + val).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
          number = [intlCode, match[2], '-', match[3], '-', match[4]].join('');

        dispatch({
          type: 'SET_EMAIL',
          field: number,
          errorMsg: null,
        });
        return;
      }
      dispatch({
        type: 'SET_EMAIL',
        field: val,
        errorMsg: null,
      });
    } else {
      dispatch({
        type: 'SET_EMAIL',
        field: val,
        errorMsg: "Email/Phone won't be null",
      });
    }
  };


  return (
    <View style={styles.container}>
      <Text style={[Typography.mediumTextBold, , styles.headline]}>{Strings.LOGIN}</Text>
      <View>
        <TextInput
          placeholder="Email/phone"
          placeholderTextColor={Colors.SKYBLUE}
          value={pageState.email}
          returnKeyType="go"
          style={styles.input}
          onChangeText={val =>
            emailInputChange(val)
          }
        />

        {pageState.emailErrorMsg ? (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
          >
            <Text style={[Typography.extraSmallTextBold, styles.errorMsg]}>
              {'  '} {pageState.emailErrorMsg}{' '}
            </Text>
          </Animatable.View>
        ) : null}
      </View>
      <View>
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.SKYBLUE}

          style={styles.input}
          value={pageState.password}
          onChangeText={val => passwordInputChange(val)}
        />
        {pageState.passwordErrorMsg ? (
          <Animatable.View
            animation="fadeInLeft"
            duration={500}
          >
            <Text style={[Typography.extraSmallTextBold, styles.errorMsg]}>
              {'  '} {pageState.passwordErrorMsg}{' '}
            </Text>
          </Animatable.View>
        ) : null}
      </View>

      <View
        style={styles.button}>
        <Button
          title='SUBMIT'
          onPress={() => {
            if (!isEmail(pageState.email) && !validatePhone(pageState.email)) {
              ToastAndroid.showWithGravityAndOffset(
                Strings.ERROR,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                150,
              );
              dispatch({
                type: 'SET_EMAIL',
                field: pageState.email,
                errorMsg: 'Enter a valid email or phone number',
              });
            }
            if (pageState.password.length <= 0) {
              ToastAndroid.showWithGravityAndOffset(
                Strings.ERROR,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                150,
              );
              dispatch({
                type: 'SET_PASSWORD',
                field: pageState.password,
                errorMsg: "Password won't be null"
              });
            }
            else {
              if (isEmail(pageState.email) || validatePhone(pageState.email)) {
                navigation.navigate('HomeScreen')
              }
            }
          }}>

        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    color: Colors.BLACK,
    height: 48,
    fontWeight: 'bold',
    paddingTop: 12,
    marginVertical: 10,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 0,
    marginHorizontal: 10,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SKYBLUE
  },
  headline: {
    marginLeft: 10,
    color: Colors.SKYBLUE
  },
  button: {
    marginTop: 50,
    marginHorizontal: 10
  },
  errorMsg: {
    color: Colors.RED,
    marginBottom: 20
  }
});

export default LoginScreen;
