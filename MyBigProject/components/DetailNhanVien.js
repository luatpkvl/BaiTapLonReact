import React,{Component} from 'react';
import{
    View,
    Text,
    Image,
} from 'react-native';
export default class DetailNhanVien extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: "",
        };
    }
    componentDidMount(){
        this.setState({
           item: this.props.navigation.getParam("item"),
        });
    }
    render(){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
                <Text>Chi Tiết Nhân Viên</Text>
                <Image style={{height: 100, width: 100, borderRadius: 100,}} source={{uri: this.state.item.img}}/>
                <Text>{this.state.item.name}</Text>
                <Text>{this.state.item.username}</Text>
                <Text>{this.state.item.pwd}</Text>
                <Text>{this.state.item.level == 0? "Nhân Viên": "Quản Lý"}</Text>
            </View>
        )
    }
}