import React,{Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-ionicons';
import {InsertTableServer,GetAllTableServer,DeleteTable} from '../networking/server';
import {getAllUserServer} from '../networking/server';
class ContentFlatList extends Component{
    constructor(props){
        super(props);
        this.state = {
          bgcolorState: "",
          updateScreen: "",
        }
    }
    updateScreen = ()=>{
        this.setState({
            updateScreen: 1,
        });
    }
    delete_Table = ()=>{
        Alert.alert(
            'Cảnh báo',
            'Bạn có muốn xóa',
            [
                    {
                        text: "Hủy",onPress: ()=>{}
                    },
                    {
                        text: "OK",onPress: ()=>{
                            DeleteTable({_id: this.props.item._id}).then((result)=>{
                                if(result == "fail"){
                                    alert("Bàn đã có người ngồi không thể xóa");
                                }else{
                                    alert("Đã xóa thành công");
                                    this.props.parentList.get_table();
                                }
                            }).catch((err)=>{
                                console.log(`err is ${err}`);
                            })
                        }

                    }
            ],
            {cancelable: true}
        )
    }
    render(){
        let bgColor  = 0;
        this.props.item.state == 0 ? bgColor = "#3add27": bgColor= "#dd5f5f";
        return(
            <View style={{flex: 1, position: "relative"}}>
                <TouchableOpacity style={{alignContent: "center",justifyContent: "center",zIndex: 1, height: 60,backgroundColor: bgColor, margin: 5, borderRadius: 5,}} onPress={()=>this.props.navigation.navigate("DetailTable",{item: this.props.item, index: this.props.index,tableScreen: this.props.parentList})}>
                        <Text style={{color: "#FFF", marginLeft: 20, fontWeight: "bold",}}>Bàn Số {this.props.index+1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{zIndex: 100, position: "absolute", top: 20, right: 20,justifyContent: "center"}} onPress={()=>this.delete_Table()}>
                    <Icon style={{textAlign: "center", color: "#374736"}} name="trash"/>
                </TouchableOpacity>
            </View>
        )
    }
}
export default class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            TableList: "",
            refresh: "",
        }
    }
    componentDidMount(){
        this.get_table();
    }
    get_table = ()=>{
      GetAllTableServer().then((Table)=>{
            this.setState({
                TableList: Table,
                refresh: 1,
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
    reloadScreen = ()=>{
        this.get_user();
    }
    addTable = ()=>{
      InsertTableServer().then((result)=>{
        this.get_table();
      }).catch((err)=>{

      });
      this.get_table();
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{marginBottom: 50,}}>
                <TouchableOpacity style={{ borderRadius: 100,position: "absolute", left: 30, top: 20, zIndex: 100}} onPress={()=>this.props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                     </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: "center",height: 50, width: 50,borderRadius: 100,position: "absolute", right: 30, top: 20, backgroundColor: "tomato", zIndex: 100}} onPress={()=>this.addTable()}>
                        <Icon name="add" style={{textAlign: "center"}}/>
                     </TouchableOpacity>
                </View>
                <Text style={{textAlign: "center", color: "#aa2720",fontSize: 20, fontWeight: "bold",}}>DANH SÁCH BÀN ĂN </Text>
                <FlatList
                data={this.state.TableList}
                extraData={this.state.refresh}
                renderItem={({item,index})=>{
                    return(
                        <ContentFlatList index={index} navigation={this.props.navigation} parentList={this} item={item}></ContentFlatList>
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
        borderRadius: 5,
        height: 30,
    }
});
