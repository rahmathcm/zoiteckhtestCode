import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar, View,Text
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import JsonData from '../Config/JsonData';


const Home = () => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="dark-content"
        translucent={true}></StatusBar>
      <View style={styles.MainView}>
        <ScrollView>
          <View >
            <Text style={styles.header}>Search</Text>
            <View style={styles.Divider} />
          </View>
          <View style={styles.SearchBox} >
            <Text style={styles.SearchField}>
              <Ionicons name="search" size={18} /> Food Name
            </Text>
          </View>
          <View style={styles.ContentView}>
            <Text style={styles.SectionHeader}>Foods</Text>
            {JsonData.map((item, index) => {
              return (
                <View style={styles.Flatlist} key={index}>
                  {item.map((content, index2) => {
                    return (
                      <View key={index2}>
                        <Image source={{ uri: content.imageUrl }} style={styles.imageUrl} />
                        <Text style={styles.Ingredient}>{content.Ingredient}</Text>
                        <Text style={styles.Shorttext}>{content.Shorttext}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  MainView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 10
  },
  header: {
    fontWeight: 'bold',
    color: '#30384d',
    fontFamily: 'Montserrat',
    fontSize: 19.2,
    marginLeft: 20
  },
  Divider: {
    marginTop: 10,
    height: 1,
    borderBottomWidth: StyleSheet.hairlineWidth * 5,
    borderBottomColor: '#30384d',
    marginHorizontal: 10
  },
  SearchBox: {
    width: width - 50,
    alignSelf: 'center',
    height: 47,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    backgroundColor: '#eaf5fc',
    justifyContent: 'center'
  },
  SearchField: {
    color: '#30384d',
    fontSize: 12.8
  },
  ContentView: {
    backgroundColor: '#eaf5fc',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  SectionHeader: {
    fontWeight: 'bold',
    color: '#30384d',
    fontFamily: 'Montserrat',
    fontSize: 19.2
  },
  Flatlist: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageUrl: {
    width: 145,
    height: 100
  },
  Ingredient: {
    fontWeight: '700',
    color: '#30384d',
    fontSize: 13.6
  },
  Shorttext: {
    fontWeight: '500',
    color: '#7e8a9a',
    fontSize: 11.2,
  },
});

export default Home;
