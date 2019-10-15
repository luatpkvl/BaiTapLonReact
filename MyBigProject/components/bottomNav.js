import React,{Component} from 'react';
import Table from './Table';
import Logout from './Personal';
import FlatListFood from './ListFood';
import ModalFoods from './ModalFoods';
import Icon from 'react-native-ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
const Stackkk = createStackNavigator({
  Food: {
    screen: FlatListFood,
    navigationOptions:{
      headerStyle:{
        display: "none",
      }
    }
  },
  ModalFoods: {
    screen: ModalFoods,
    navigationOptions:{
      headerStyle:{
        display: "none",
      }
    }
  },
});
const BottomNav = createMaterialBottomTabNavigator({
  Food: {
    screen: Stackkk,
    navigationOptions:{
      tabBarLabel: "Món ăn",
      tabBarIcon: ({tintColor,focused})=>(
        <Icon color={tintColor} style={{height: 18, width: 18}} name="beer"/>
      ),
    }
  },
  Table : {
    screen: Table,
    navigationOptions:{
      tabBarLabel: "Bàn ăn",
      tabBarIcon:({ tintColor, focused })=>(
        <Icon color={tintColor} style={{height: 25, width: 25}} name="train"/>
      ),
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions:{
      tabBarLabel: "Cá nhân",
      tabBarIcon:({ tintColor, focused })=>(
        <Icon color={tintColor} style={{height: 25, width: 25}} name="person"/>
      ),
    }
  },
},{
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  shifting: true,
  barStyle: { backgroundColor: '#694fad', shadowColor: 'lightgray',shadowOffset:{ width: 3, height: 5,} },
  initialRouteName: "Food",

});
export default BottomNav;