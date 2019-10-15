import React,{Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-ionicons';
export default class ButtonMenu extends React.Component{
    render(){
        return(
            <Icon style={styles.menuIcon} name="menu" onPress={()=>this.props.navigation.toggleDrawer()}/>
        )
    }
}
const styles = StyleSheet.create({
    menuIcon:{
        zIndex: 9,
        position: "absolute",
        top: 10,
        left: 20,
    }
});