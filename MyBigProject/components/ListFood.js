import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    Alert,
    YellowBox,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import dataList from '../data/flatListData';
import Swipeout from 'react-native-swipeout';
import {getFoodFromServer,deleteAFoodServer,searchFoodFromServer} from "../networking/server";
import Icon from 'react-native-ionicons';
// import getFoodFromServer from '../networking/server';
//import Icon from 'react-native-vector-icons';
YellowBox.ignoreWarnings(["componentWillReceiveProps","componentWillMount"]);
class FlatListItem extends Component{
    constructor(){
        super();
        this.state = {
            activeRowKey: null,
            item: {},
        }
    }
    render(){
        const SwipeSetting = {
            autoClose: true,
            onClose: (secId,rowId,direction)=>{
                if(this.state.activeRowKey!=null){
                    this.setState({
                        activeRowKey: null,
                    });
                }
            },
            onOpen: (secId,rowId,direction)=>{
                this.setState({
                    activeRowKey: this.props.item._id,
                    
                });
                
            },
            right:[
                {
                    onPress: ()=>{
                        Alert.alert(
                            'Cảnh báo',
                            'Bạn có chắc chắn xóa?',
                            [
                                {
                                    text: 'Hủy', onPress: ()=>{

                                    }
                                },
                                {
                                    text: 'OK',onPress: ()=>{
                                        const id_key = {
                                            id: this.props.keyy,
                                        }
                                        deleteAFoodServer(id_key).then((result)=>{
                                            if(result == "ok"){
                                                alert("Đã xóa thành công");
                                            this.props.parentFlatList.loadListFromServer();
                                            }else{
                                                alert(result);
                                            }
                                        })
                                    }
                                }
                            ],
                            {cancelable: true}
                        )
                    },
                    text: <Icon style={{color: "#FFF"}} name="trash"/>,type: 'delete',
                },
                {
                    onPress: ()=>{
                         let selectedItem = this.state.item.name ? this.state.item: this.props.item;
                         this.props.navigation.navigate("ModalFoods",{type: "update",item: this.props.item,component: this.props.parentFlatList});
                    },
                    text: <Icon style={{color: "#FFF"}} name="create"/>,type: 'primary',
                },
            ],
            rowId: this.props.index,
            secId: 1
        };
        return(
            <Swipeout {...SwipeSetting}>
                <View style={{flex: 1, borderColor: "#CDC", borderBottomWidth: 1,}}>
                <View 
                style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: '#FFFFFF',
                    height: 80,
                   // backgroundColor: this.props.index %2 ==0? 'green': 'blue',
                }}>
                <Image style={{height: 70, width: 70, alignSelf: "center", marginLeft: 10,}}
                    source={{uri: this.props.item.img}}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{color: "#D1372D", fontWeight: "bold"}}>{this.props.item.name}</Text>
                <Text style={{color: "#BB6D75"}}>{this.props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</Text>
                </View>
            </View>
            <View style={{height:1,backgroundColor: "#FFF"}}></View>
            </View>
        </Swipeout>
        )
    }
}
export default class FlatListt extends Component{
    constructor(){
        super();
        let arr = dataList;
        this.state = {
           deleteRowKey: null,
           foodFromServer: "",
        }
    }
    deleteFood(id){
        alert("xóa Id= "+id);                                                                                                                                                                                                                                                          
    };
    componentDidMount(){
        this.loadListFromServer();
        if(this.props.navigation.getParam("reload") == true){
            this.loadListFromServer();
        }
    }
    loadListFromServer = ()=>{
        getFoodFromServer().then((data)=>{
            this.setState({
                foodFromServer: data,
            });
        }).catch((error)=>{
            this.setState({
                foodFromServer: [],
            });
        });
    }
    showUpdateForm= (key)=>{
        this.refs.addModal.ShowUpdateForm(key);
    }
    refreshList = () =>{
        this.setState({
            deleteRowKey: null, 
        });
    }
    refreshListToEnd = () =>{
        this.setState({
            deleteRowKey: null, 
        });
        this.refs.ownFlatList.scrollToEnd();
    }
    btnAdd = ()=>{
        this.props.navigation.navigate("ModalFoods",{type: "add",component: this});
        // this.refs.addModal.showAddModal();
    }
    onChangeSearch = (text)=>{
        searchFoodFromServer(text).then((result)=>{
            this.setState({
                foodFromServer: result,
            })
        }).catch((err)=>{
            console.log(err);
        });
    }
    render(){
        return(
            <View style={{flex: 1,}}>
                <View style={{backgroundColor: 'tomato',height: 64, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                    <Icon style={{position: "absolute", top: 15, right: 100, zIndex: 100, color: "#8e8383",}} name="search"/>
                    <TextInput placeholder="Tìm kiếm món ăn" style={{borderColor: "#a5a0a0",  backgroundColor: "#FFF",borderRadius: 5,position: "absolute", left: 40, top: 10, justifyContent: "center", borderWidth: 1, height:40, width: 250,}} onChangeText={(text)=>this.onChangeSearch(text)}/>
                    <TouchableHighlight
                    onPress={this.btnAdd}
                    style={{marginRight: 10}}
                    underlayColor="tomato">
                        <Image style={{height: 60, width: 60,}} source={require('../assets/iconBtn.png')}/>
                    </TouchableHighlight>
                </View>
                <FlatList
                onEndReachedThreshold={1000}
                ref="ownFlatList"
                   //data={dataList}
                   data={this.state.foodFromServer.data}
                    ListEmptyComponent={()=>{
                       return(
                        <View>
                            <ActivityIndicator/>
                        </View>
                       )
                    }}
                    renderItem ={({item,index})=>{
                       return(  
                        <View>
                            <FlatListItem num={index} navigation={this.props.navigation} parentFlatList={this} index={item._id} item={item} keyy={item._id}>
                            </FlatListItem>
                        </View>
                       )
                    }}
                    
                    keyExtractor={(item,index) => item._id}
                />
            </View>
        )
    }
}