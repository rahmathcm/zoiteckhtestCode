import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Typography } from '../styles';
import { Strings } from '../utils';

const Home = ({ navigation }) => {
  const [gridView, setGridview] = useState(true);
  const [btnText, setBtnText] = useState('List View');

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert(
        Strings.SIGNOUT
        , Strings.EXIT
        , [
          { text: 'NO' },
          {
            text: 'YES', onPress: () => {
              BackHandler.exitApp();
            }
          },
        ],
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const changeView = () => {
    setGridview(!gridView)
    if (gridView) {
      setBtnText('List View');
    }
    else {
      setBtnText('Grid View');
    }

  }

  return (
    <View style={styles.container}>
      <View flexDirection='row' justifyContent='space-between'>
        <TouchableOpacity activeOpacity={0.8} style={styles.backbuttonDesign} onPress={() => navigation.navigate('Login')}>
          <Icon name='arrowleft' size={20} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={changeView}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.FlatListContainer}>
        <FlatList keyExtractor={(item) => item.id}
          key={(gridView) ? 1 : 0}
          numColumns={gridView ? 2 : 1}
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.FlatList} flexDirection={gridView ? 'column' : 'row'}>
                <View flex={.5}>
                  <View style={{ width: gridView ? 130 : 60, height: gridView ? 80 : 40, backgroundColor: Colors.BLACK }} />
                </View>
                <View flex={1.5}>
                  <View >
                    <Text style={Typography.extraSmallTextBold}>File Name</Text>
                  </View>
                  <View flexDirection='row' justifyContent='space-between' >
                    <Text style={Typography.extraSmallTextLight}>Text File</Text>
                    <Text style={[Typography.extraSmallSemiBold, styles.extraTextStyle]}>238 KB</Text>
                  </View>
                </View>
              </View>
            )
          }
          } />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FlatListContainer: {
    paddingHorizontal: 20
  },
  backbuttonDesign: {
    padding: 15,
    alignSelf: 'flex-end',
    margin: 10
  },
  buttonDesign: {
    padding: 15,
    backgroundColor: '#e91e63',
    alignSelf: 'flex-end',
    margin: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch'
  },

  FlatList: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  extraTextStyle: {
    color: Colors.LIGHTGRAY,
  },

});

export default Home;