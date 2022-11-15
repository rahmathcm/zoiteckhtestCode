import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Colors } from '../styles';

export default class Card extends Component {
  render() {
    const {color, shadow, style, children, ...props} = this.props;
    const cardStyles = [styles.card, style,shadow && styles.shadow,color];
    return (
      <View  style={cardStyles} {...props} >
        {children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    height:150,
    width:150,
    borderRadius: 6,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.WHITE,
    paddingHorizontal: 10,
    backgroundColor:Colors.WHITE,
    justifyContent:'space-around',
    alignItems:'center'
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
