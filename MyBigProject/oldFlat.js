import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    Alert,
    YellowBox,
    TouchableHighlight,
} from 'react-native';
import dataList from '../data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import { getFoodFromServer } from './networking/server';
// import getFoodFromServer from '../networking/server';
//import Icon from 'react-native-vector-icons';
YellowBox.ignoreWarnings(["componentWillReceiveProps","componentWillMount"]);
class FlatListItem extends Component{
    constructor(){
        super();
        this.state = {
            activeRowKey: null,
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
                    activeRowKey: this.props.item.key,
                    
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
                                        dataList.splice(this.props.index,1);
                                        this.props.parentFlatList.refreshList();
                                    }
                                }
                            ],
                            {cancelable: true}
                        )
                    },
                    text: 'DELETE',type: 'delete',
                },
                {
                    onPress: ()=>{
                        this.props.parentFlatList.showUpdateForm(this.props.index);
                    },
                    text: 'UPDATE',type: 'primary',
                },
            ],
            rowId: this.props.index,
            secId: 1
        };
        return(
            <Swipeout {...SwipeSetting}>
                <View style={{flex: 1,}}>
                <View 
                style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: 'mediumseagreen'
                   // backgroundColor: this.props.index %2 ==0? 'green': 'blue',
                }}>
                <Image style={{height: 80, width: 80,}}
                    source={{uri: this.props.imgAddress}}
                />
                <View style={{flex: 1,}}>
                <Text>{this.props.item.title}</Text>
                <Text>{this.props.item.price}</Text>
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
        this.refs.addModal.showAddModal();
    }
    render(){
        return(
            <View style={{flex: 1,}}>
                <View   style={{backgroundColor: 'tomato',height: 64, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
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
                   data={dataList}
                    ListEmptyComponent={()=>{
                       return(
                        <View>
                            <Text>Danh Sách Trống!!</Text>
                        </View>
                       )
                    }}
                    renderItem ={({item,index})=>{
                       return(  
                        <View>
                            <FlatListItem parentFlatList={this} index={index} item={item} keyy={item.key} imgAddress={item.image}>
                            </FlatListItem>
                        </View>
                       )
                    }}
                    
                    keyExtractor={(item,index) => item.key}
                />
                <AddModal ref={"addModal"} parentFlatList={this}>

                </AddModal>
            </View>
        )
    }
}