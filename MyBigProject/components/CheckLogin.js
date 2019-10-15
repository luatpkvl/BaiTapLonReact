import React,{Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class CheckLogin extends Component{
    componentDidMount(){
        this.check();
    }
    async check(){
        try{
            let getAuth =  await AsyncStorage.getItem("auth");
            let auth = await JSON.parse(getAuth);
            if(auth == null){
                this.props.navigation.navigate("Login");
            }else{
                this.props.navigation.navigate("BottomNav");
            }
        }catch(err){
            console.log(err);
        }
    }
    render(){
        return(
            <Text></Text>
        )
    }
}