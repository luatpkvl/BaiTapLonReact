import React,{Component} from 'react';
import{
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-ionicons';
import AsyncStorage from '@react-native-community/async-storage';
export default class AccountSetting extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatar: null,
            data: null,
            user: "",
            name: "",
        }
    }
    componentDidMount(){
        this.getAuth();
    }
     getAuth = async ()=> {
        try{
            let getAuth =  await AsyncStorage.getItem("auth");
            let auth = await JSON.parse(getAuth);
            if(auth!= null){
                this.setState({
                    user: auth,
                    name: auth.name,
                });
            }
        }catch(err){
            console.log(err);
        }
    }
    pickImg = ()=>{
        const options = {
            title: 'Chọn Ảnh',
            storageOptions: {
              skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                avatar: source,
                data: response.data,
              });
            }
          });
    }
    changeTextName = (text)=>{
        this.setState({
            name: text,
        })
    }
    saveAccount = ()=>{
        // RNFetchBlob.fetch('PUT', 'http://10.0.3.2:3005/update_user', {
        //     Authorization : "Bearer access-token",
        //     otherHeader : "foo",
        //     'Content-Type' : 'multipart/form-data',
        //   }, [{name: 'info', data: "TienLuat"},
        //     { name : 'avatar', filename : 'avatar-png.png', data: this.state.data},
        //   ]).then((resp) => {
        //   }).catch((err) => {
        //     // ...
        //   });
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.btnChangeImg} onPress={this.pickImg}>
                    <Icon style={{ color: "#2d2626", height: 30, width: 30,}} name="camera"/>
                </TouchableOpacity>
                <Image style={{height: 100, width: 100, borderRadius: 100,}} source={this.state.avatar == null?{uri: "http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-21_044128777.jpg"}:this.state.avatar}/>
                <TextInput autoFocus={true} value={this.state.name} onChangeText={(text)=>this.changeTextName(text)} style={styles.textName}/>
                <Text style={styles.textLevel}>Nhân Viên</Text>
                <TouchableOpacity style={styles.btnSave} onPress={this.saveAccount}>
                    <Text style={{textAlign: "center", color: "#FFF"}}>Lưu</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    btnSave:{
        height: 50,
        width: 100,
        backgroundColor: "tomato",
        borderRadius: 5,
        justifyContent: "center",
        shadowRadius: 10,
    },
    btnChangeImg:{
        backgroundColor: "#123",
        height: 15,
        width: 15,
        position: "absolute",
        top: 200,
        left: 200,
        zIndex: 100,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#CDC",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    textName:{
        marginTop: 10,
        width: 150,
        borderWidth: 1,
        borderColor: "#CDC",
    },
    textLevel:{
        marginBottom: 20,
    }
});