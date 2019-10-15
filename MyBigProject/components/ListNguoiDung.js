import React,{Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import {getAllUserServer} from '../networking/server';
class ContentFlatList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("DetailNhanVien",{item: this.props.item})}>
                <View style={styles.contentContainer}>
                    <View>
                    <Image style={styles.imgAvatar} source={{uri: this.props.item.img}}/>
                    </View>
                    <View>
                        <Text>{this.props.item.name}</Text>
                        <Text>{this.props.item.level ==0 ? "Nhân Viên": "Quản lý"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
export default class ListNguoiDung extends Component{
    constructor(props){
        super(props);
        this.state = {
            UserList: "",
        }
    }
    componentDidMount(){
        this.get_user();
    }
    get_user = ()=>{
        getAllUserServer().then((User)=>{
            this.setState({
                UserList: User.data,
            });
        }).catch((err)=>{
            this.setState({
                UserList: [],
            });
            console.log(err);
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{marginBottom: 50,}}>
                <TouchableOpacity style={{ borderRadius: 100,position: "absolute", left: 30, top: 20, zIndex: 100}} onPress={()=>this.props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                     </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: "center",height: 50, width: 50,borderRadius: 100,position: "absolute", right: 30, top: 20, backgroundColor: "tomato", zIndex: 100}} onPress={()=>this.props.navigation.navigate("ModalUser",{type: "add",parentScreen: this})}>
                        <Icon name="person-add" style={{textAlign: "center"}}/>
                     </TouchableOpacity>
                </View>
                <Text style={{textAlign: "center"}}>DANH SÁCH NGƯỜI DÙNG</Text>
                <FlatList
                data={this.state.UserList}
                renderItem={({item})=>{
                    return(
                        <ContentFlatList navigation={this.props.navigation} parentList={this} item={item}></ContentFlatList>
                    )
                }}
                keyExtractor={(item)=>item._id}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgAvatar:{
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    contentContainer:{
        flex: 1, 
        flexDirection: "row",
        backgroundColor: "tomato",
        margin: 4,
        borderRadius: 5,
    }
});
