import React,{Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';
import {getDetailTableServer,updateCountFoodInTableServer,changeStateAfterChangeCount} from '../networking/server';
import Icon from 'react-native-ionicons';
class ContentDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
        };
    }
    componentDidMount(){
        this.setState({
            count: this.props.item.count,
        });
    }
    subtractCount = async()=>{
      await this.setState({
            count: this.state.count-1,
        });
        const Params = await {
            id_food: this.props.item.id_food,
            id_table: this.props.id_table,
            count: this.state.count,
        };
        await updateCountFoodInTableServer(Params).then((result)=>{
        }).catch((err)=>{
            alert(err);
        });
        this.props.parentFlatList.getStateAfterChangeCount();
    }
    addCount = async ()=>{
      await this.setState({
            count: this.state.count+1,
        });
        const Params = await {
            id_food: this.props.item.id_food,
            id_table: this.props.id_table,
            count: this.state.count,
        };
        await updateCountFoodInTableServer(Params).then((result)=>{
        }).catch((err)=>{
            alert(err);
        });
        this.props.parentFlatList.getStateAfterChangeCount();
    }
    render(){
        return(
            <View style={{flex: 1, flexDirection: "row", margin: 5, borderWidth: 1, borderRadius: 5,}}>
                <View style={{flexDirection: "row",alignItems: "center", marginLeft: 10, height: 60, width: 60}}>
                    <Image style={{height: 50, width: 50}} source={{uri: this.props.item.img}}/>
                </View>
                <View style={{ marginLeft: 15}}>
                    <Text style={{color: "#c42f27",fontWeight: "bold",fontSize: 15,}}>{this.props.item.name}</Text>
                    <Text>{this.props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} vnđ</Text>
                </View>
                <View style={{flexDirection: "row",flex: 1, alignContent: "center", alignItems: "center"}}>
                    {this.state.count == 0 ? <Text></Text>:
                    <TouchableOpacity onPress={this.subtractCount} style={{position: "absolute", top: 10, right: 60,}}>
                        <Icon style={{fontSize: 20, color: "#3ae851"}} name="remove-circle-outline"/>
                    </TouchableOpacity>
                    }
                    <Text style={{marginLeft: 20, marginRight: 20, position: "absolute", top: 10, right: 20,}}>{this.state.count}</Text>
                    <TouchableOpacity onPress={this.addCount} style={{position: "absolute", top: 10, right: 10,}}>
                        <Icon style={{fontSize: 20, color: "#3ae851"}} name="add-circle-outline"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default class DetailTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            ListMonAn: "",
            state: 0,
            sum: "",
            sumMoney: "",
        };
    }
    componentDidMount(){
      this.get_detail_table();
      if(this.props.navigation.getParam("item").state == 1){
          this.setState({
              state: 1,
          });
      }else{
          this.setState({
              state: 0,
          })
      }
    }
    get_detail_table = ()=>{
        getDetailTableServer(this.props.navigation.getParam("item")._id).then((List)=>{
        this.setState({
            state: List.state,
            ListMonAn: List.food,
            sum: List.sum,
            sumMoney: List.sumMoney,
        });
        }).catch((err)=>{
            this.setState({
                ListMonAn: "",
            });
        });
    }
    getStateAfterChangeCount = ()=>{
        changeStateAfterChangeCount({id_table: this.props.navigation.getParam("item")._id}).then((result)=>{
            this.setState({
                state: result.state,
                sum: result.sum,
                sumMoney: result.sumMoney,
            });
        }).catch((err)=>{
            console.log(`error is ${err}`);
        });
    }
   
    btnBack = ()=>{
        this.props.navigation.goBack();
        this.props.navigation.getParam("tableScreen").get_table();
    }
    render(){
        return(
            <View style={{flex: 1,}}>
                {this.state.state == 0? <Text></Text>:
                <TouchableOpacity onPress={()=>alert("ok")} style={{ alignItems: "center",flexDirection: "row", zIndex: 100, position: "absolute", bottom: 3, height: 40, width: 370, left: 7, borderRadius: 5, backgroundColor: '#13d326',}}>
                     <Icon style={{color: '#FFF', fontSize: 13, marginLeft: 30,}} name="cart"/>
                     <Text style={{color: '#FFF', fontSize: 13,marginLeft: 5,}}>{this.state.sum}</Text>
                     <Text style={{color: '#FFF', fontSize: 13,marginLeft: 10,}}>Vnđ</Text>
                     <Text style={{color: '#FFF', fontSize: 13, marginLeft: 5,}}>{this.state.sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                     <Text style={{color: '#FFF', marginLeft: 30}}>Thanh Toán</Text>
                 </TouchableOpacity>
                }
                 <TouchableOpacity onPress={()=>this.btnBack()} style={{position: "absolute", top: 20, borderRadius: 5,
                left: 20,}}>
                     <Icon name="arrow-back"/>
                 </TouchableOpacity>
                <View style={{marginTop: 50, marginBottom: 60,}}>
                <Text style={{alignSelf: "center", color: "#9b231d", fontWeight: "bold",fontSize: 20,}}>BÀN ĂN SỐ {this.props.navigation.getParam("index")+1}</Text>
                 {this.state.ListMonAn == ""? <ActivityIndicator/>:
                    <FlatList
                        data={this.state.ListMonAn}
                        renderItem={({item,index})=>{
                            return(
                                <ContentDetail id_table={this.props.navigation.getParam("item")._id} parentFlatList={this} item={item}/>
                            )
                        }}
                        keyExtractor={(item)=> item._id}
                    />
                }
                </View>
            </View>
        )
    }
}