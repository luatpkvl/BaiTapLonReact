import React,{Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import {getUserByIdServer} from '../networking/server';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions} from 'react-navigation';
export default class Logout extends Component{
    constructor(props){
        super(props);
        this.state = {
            img: "",
            name: "",
            level: "",
        }
    }
    componentDidMount(){
        this.get_auth();
    }
    reloadScreen = ()=>{
        this.setState({
        })
    }
    get_auth = async ()=>{
        try{
            let getauth = await AsyncStorage.getItem("auth");
            let auth = await JSON.parse(getauth);
            this.setState({
            img: auth.img,
            name: auth.name,
            level: auth.level,
        })
        }catch(err){
            console.log(`error is ${err}`);
        }
    }
    logout = ()=>{
        AsyncStorage.removeItem("auth").then(()=>{
            this.reloadScreen();
            this.props.navigation.push("Login",{personal: this});
        }).catch((err)=>{
            alert(`error is ${err}`);
        });
        AsyncStorage.removeItem("luat").then().catch((err)=>{
            alert(`error is ${err}`);
        });
    }
    render(){
        const maxWidth = Dimensions.get("window").width;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    {this.state.img == ""? <Text></Text>: <Image style={{height: 80, width: 80, borderRadius: 100,}} source={{uri: this.state.img}}/>}
                    <Text style={styles.textName}>{this.state.name}</Text>
                    <Text style={styles.textLevel}>{this.state.level == 1? "Quản lý": "Nhân viên"}</Text>
                </View>
                <View style={styles.mid}>
                    <TouchableOpacity style={{width: maxWidth, height: 40, borderBottomWidth: 1, borderColor: "#CDC", justifyContent: "center",}} onPress={()=>this.props.navigation.navigate("AccountSetting")}>
                        <Text style={{color: "#FFF", marginLeft: 20,fontWeight: "bold"}}>Tài khoản của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: maxWidth, height: 40, borderBottomWidth: 1, borderColor: "#CDC", justifyContent: "center",}} onPress={()=>this.props.navigation.navigate("ThongKe")}>
                        <Text style={{color: "#FFF", marginLeft: 20,fontWeight: "bold"}}>Thống kê</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: maxWidth, height: 40, borderBottomWidth: 1, borderColor: "#CDC", justifyContent: "center",}} onPress={()=>this.props.navigation.navigate("ListNguoiDung")}>
                        <Text style={{color: "#FFF", marginLeft: 20,fontWeight: "bold"}}>Quản lý tài khoản</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity style={{width: maxWidth, height: 40, borderBottomWidth: 1, borderColor: "#CDC", justifyContent: "center",}} onPress={this.logout}>
                        <Text style={{color: "#FFF", marginLeft: 20,fontWeight: "bold"}}>Đăng xuất</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 10, color: "#FFF", position: "absolute", bottom: 30, left: 20,}}>Bản quyền thuộc về Tiến Luật. verison 1.0</Text> 
                </View> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        flex: 2,
        height: 180,
        flexDirection: "column",
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    textName:{
        margin: 2,
        marginTop: 3,
    },
    textLevel:{
        margin: 2,
    },
    mid:{
        flex: 4,
       backgroundColor: "tomato",
    }
})