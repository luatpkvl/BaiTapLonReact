import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import Icon from 'react-native-ionicons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {insertNewFoodToServer,updateFoodToServer} from '../networking/server';
export default class FoodModals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nameFood: "",
            priceFood: "",
            id: "",
            img: "",
            sourceImg: "",
            checkValid: "",
        }
    }
    onChangeNameFood = (text)=>{
        this.setState({
            nameFood: text,
            checkValid: "",
        });
    }
    onChangePrice = (text)=>{
        this.setState({
            priceFood: text,
            checkValid: "",
        });
    }
    resetState = ()=>{
        this.setState({
            nameFood: "",
            priceFood: "",
            id: "",
            img: "",
            sourceImg: "",
            checkValid: "",
        })
    }
    btnSave = ()=>{
        var mainProps = this.props;
        if(this.props.navigation.getParam("type") == "add"){
            if(this.state.nameFood == "" || this.state.priceFood == "" || this.state.img == ""){
                this.setState({
                    checkValid: "Bạn phải nhập đầy đủ",
                })
            }else{
                RNFetchBlob.fetch("POST","http://10.0.3.2:3005/insert_new_food",{
                Authorization : "Bearer access-token",
                otherHeader : "foo",
                'Content-Type' : 'multipart/form-data',
                },[
                    {name: "img", filename : 'avatar-png.png', data: this.state.sourceImg},
                    {name: "info", data: JSON.stringify({
                        name: this.state.nameFood,
                        price: this.state.priceFood,
                    })}
                ]).then((result)=>{
                    var myResult = JSON.parse(result.data);
                    if(myResult.status == "fail"){
                        this.setState({
                            checkValid: "Giá phải là số",
                        });
                    }else if(myResult.status == "exist"){
                        this.setState({
                            checkValid: "Tên món ăn đã tồn tại",
                        });
                    }
                    else{
                        this.props.navigation.navigate("Food");
                        this.setState();
                        this.props.navigation.getParam("component").loadListFromServer();
                    }
                }).catch(()=>{

                });
                
            }
        }else{
            if(this.state.nameFood == "" || this.state.priceFood == "" || this.state.img == ""){
                this.setState({
                    checkValid: "Bạn phải nhập đầy đủ",
                })
            }else{
                if(this.state.sourceImg == ""){
                    let Food = {
                        name: this.state.nameFood,
                        price: this.state.priceFood,
                        id: this.state.id,
                    };
                    updateFoodToServer(Food).then((result)=>{
                        if(result == "fail"){
                            this.setState({
                                checkValid: "Lỗi không thể sửa",
                            })
                        }else if(result == "exist"){
                            this.setState({
                                checkValid: "Tên món ăn đã tồn tại",
                            });
                        }else{
                            alert("Sửa thành công");
                            this.setState();
                            this.props.navigation.navigate("Food");
                            this.props.navigation.getParam("component").loadListFromServer();
                        }
                    }).catch((error)=>{
                        console.log(error);
                    });
                }else{
                    RNFetchBlob.fetch("PUT","http://10.0.3.2:3005/update_food_with_new_img",{
                Authorization : "Bearer access-token",
                otherHeader : "foo",
                'Content-Type' : 'multipart/form-data',
                },[
                    {name: "img", filename : 'avatar-png.png', data: this.state.sourceImg},
                    {name: "info", data: JSON.stringify({
                        name: this.state.nameFood,
                        price: this.state.priceFood,
                        _id: this.state.id,
                    })}
                ]).then((result)=>{
                    var myResult = JSON.parse(result.data);
                    if(myResult.status == "fail"){
                        this.setState({
                            checkValid: "Giá phải là số",
                        });
                    }else if(myResult.status == "exist"){
                        this.setState({
                            checkValid: "Tên món ăn đã tồn tại",
                        });
                    }else{
                        this.setState();
                        this.props.navigation.navigate("Food");
                        this.props.navigation.getParam("component").loadListFromServer();
                    }
                }).catch(()=>{

                });
                }
                //this.props.component.loadListFromServer();
                //this.props.navigation.navigate("Food");
            }
        }
    }
    backToList = ()=>{
        this.props.navigation.goBack();
        this.setState({
            nameFood: "",
            priceFood: "",
            id: "",
            img: "",
            checkValid: "",
        });
    }
    componentDidMount(){
        if(this.props.navigation.getParam("type") == "update"){
            this.setState({
                nameFood: this.props.navigation.getParam("item").name,
                priceFood: this.props.navigation.getParam("item").price+"",
                id: this.props.navigation.getParam("item")._id,
                img: {uri: this.props.navigation.getParam("item").img},
            });
        }else{
            this.setState({
                nameFood: "",
                priceFood: "",
                id: "",
                img: "",
            });
        }
    }
    pick_img = ()=>{
        const options = {
            title: "Chọn Ảnh",
            storageOptions:{
                skipBackup: true,
            }
        };
        ImagePicker.showImagePicker(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };   
                this.setState({
                  img: source,
                  sourceImg: response.data,
                });
              }
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.backView}>
                    <TouchableOpacity style={styles.btnBack} onPress={this.backToList}>
                        <Icon name="arrow-back"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewContent}>
                <Text style={{fontWeight: "bold", fontSize: 20,color: "#aa2720"}}>{this.props.navigation.getParam('type') == "add" ? "Thêm món ăn" : "Sửa món ăn"}</Text>
                <TextInput placeholder="Tên món" value={this.state.nameFood} style={styles.textInput} onChangeText={(text)=>this.onChangeNameFood(text)}/>
                <TextInput placeholder="Giá" value={this.state.priceFood} style={styles.textInput} onChangeText={(text)=>this.onChangePrice(text)}/>
                <TouchableOpacity style={{height: 40, width: 90, backgroundColor: "#2382db",justifyContent: "center",borderRadius: 5,}} onPress={()=>this.pick_img()}>
                    <Text style={{color: "#FFF", textAlign: "center",}}>Chọn Ảnh</Text>
                </TouchableOpacity>
                {this.state.img == ""? <Text style={{color: "red"}}>Chưa chọn ảnh</Text>: <Image source={this.state.img} style={{height: 50, width: 50,}}/>}
                <TouchableOpacity style={styles.btn} onPress={this.btnSave}>
                    <Text style={styles.textBtn}>{this.props.navigation.getParam('type') == "add" ? "THÊM" : "SỬA"}</Text>
                </TouchableOpacity>
                <Text style={{color: "red"}}>{this.state.checkValid}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    backView:{
        backgroundColor: "tomato",
        height: 50,
    },
    btnBack:{
        position: "absolute",
        top: 10,
        left: 20,
    },
    textInput:{
        borderWidth: 1,
        borderColor: "#CDC",
        height: 40,
        width: 300,
        margin: 20,
        borderRadius: 10,
    },
    viewContent:{
        flexDirection: "column",
        alignItems: "center",
    },
    btn:{
        height: 50,
        width: 100,
        backgroundColor: "tomato",
        justifyContent: "center",
        borderRadius: 10,
    },
    textBtn:{
        textAlign: "center",
        color: "#FFF",
    }
})