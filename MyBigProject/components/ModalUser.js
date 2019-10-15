import React,{Component} from 'react';
import{
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
export default class ModalUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            username: "",
            pwd: "",
            img: "",
            source: "",
            checkValid: "",
            dataImg: "",
        };
    }
    componentDidMount(){
        
    }
    resetState = ()=>{
        this.setState({
            name: "",
            username: "",
            pwd: "",
            img: "",
            source: "",
            checkValid: "",
            dataImg: "",
        });
    }
    changTextName = (text)=>{
        this.setState({
            name: text,
            checkValid: "",
        });
    }
    changeTextUserName = (text)=>{
        this.setState({
            username: text,
            checkValid: "",
        });
    }
    changeTextPass = (text)=>{
        this.setState({
            pwd: text,
            checkValid: "",
        });
    }
    btnAddUser = ()=>{
        if(this.state.username == "" || this.state.name == ""|| this.state.pwd == "" || this.state.source == ""){
            this.setState({
                checkValid: "Bạn không được bỏ trống",
            });
        }else{
            RNFetchBlob.fetch("POST","http://10.0.3.2:3005/insert_new_user",{
                Authorization : "Bearer access-token",
                otherHeader : "foo",
                'Content-Type' : 'multipart/form-data',
            },[
                {name: "img", filename : 'avatar-png.png', data: this.state.dataImg},
                {name: "info", data: JSON.stringify({
                    username: this.state.username,
                    pwd: this.state.pwd,
                    name: this.state.name,
                })}
            ]).then((result)=>{
                var resultJson = JSON.parse(result.data);
                if(resultJson.status == "fail"){
                    this.setState({
                        
                        checkValid: "Thêm thất bại",
                    });
                }else if(resultJson.status == "exist"){
                    this.setState({
                        checkValid: "Tên tài khoản đã tồn tại",
                    });
                }else{
                    this.props.navigation.goBack();
                    this.props.navigation.getParam("parentScreen").get_user();
                    this.resetState();
                }
            }).catch((err)=>{
                console.log(`error is ${err}`);
            });
        }
    }
    chooseImg = ()=>{
        let options = {
            title: "Chọn Ảnh",
            storageOptions:{
                skipBackup: true,
            }
        };
        ImagePicker.showImagePicker(options,(response)=>{
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
                source: source,
                dataImg: response.data,
              });
            }
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 20, fontWeight: "bold",}}>{this.props.navigation.getParam("type") == "add"? "Thêm Nhân Viên": ""}</Text>
                <TextInput style={styles.textInput} value={this.state.name} placeholder="Tên Người Dùng"  onChangeText={(text)=>this.changTextName(text)}/>
                <TextInput style={styles.textInput} value={this.state.username} placeholder="Tài Khoản"  onChangeText={(text)=>this.changeTextUserName(text)}/>
                <TextInput style={styles.textInput} value={this.state.pwd} placeholder="Mật Khẩu"  onChangeText={(text)=>this.changeTextPass(text)}/>
                <TouchableOpacity style={{height: 30, width: 60, backgroundColor: "#4b6bdd",borderRadius: 5,}} onPress={this.chooseImg}>
                    <Text style={{color: "#FFF",}}>Chọn ảnh</Text>
                </TouchableOpacity>
                {this.state.source == ""? <Text>Bạn chưa chọn ảnh</Text>: <Image style={{height: 50, width: 50,}} source={this.state.source != ""? this.state.source: {uri: "http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-21_044128777.jpg"}}/>}
                <TouchableOpacity onPress={this.btnAddUser} style={{backgroundColor: "tomato", height: 50, width: 80, borderRadius: 5,justifyContent: "center",alignItems: "center",alignSelf:"center",}}>
                    <Text style={{textAlign: "center",color: "#FFF"}}>{this.props.navigation.getParam("type") == "add"? "Thêm": ""}</Text>
                </TouchableOpacity>
                <Text style={{color: "red", justifyContent: "center", alignSelf: "center",textAlign: "center"}}>{this.state.checkValid}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    textInput:{
        borderRadius: 5,
        margin: 4,
        borderWidth: 1,
        borderColor: "#CDC",
    }
});