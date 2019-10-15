import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-ionicons';
export default class Table extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Logout")}>
              <Text>Bam</Text>
            </TouchableOpacity>
          <Text>Bàn </Text>
        </View>
      );
    }
  }