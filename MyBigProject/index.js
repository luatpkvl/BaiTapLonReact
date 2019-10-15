/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import {name as appName} from './app.json';
import App from './App';                
import Login from './components/Login';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import BottomNav from './components/bottomNav';
import CheckLogin from './components/CheckLogin';
import AccountSetting from './components/AccountSetting';
import ListNguoiDung from './components/ListNguoiDung';
import DetailNhanVien from './components/DetailNhanVien';
import ModalUser from './components/ModalUser';
import DetailTable from './components/DetailTable';
import CacMonDaDat from './components/CacMonDaDat';
import ThongKe from './components/ThongKe';
const Stack =  createStackNavigator({
    CheckLogin: {
        screen: CheckLogin,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    BottomNav:{
        screen: BottomNav,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    Login:{
        screen: Login,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    AccountSetting:{
        screen: AccountSetting,
            navigationOptions:{
            }
    },
    ListNguoiDung:{
        screen: ListNguoiDung,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    DetailNhanVien:{
        screen: DetailNhanVien,
    },
    ModalUser:{
        screen: ModalUser,
    },
    DetailTable:{
        screen: DetailTable,
        navigationOptions:{
            headerStyle:{
                display: "none",
            }
        }
    },
    CacMonDaDat:{
        screen: CacMonDaDat,
    },
    ThongKe:{
        screen: ThongKe,
    }
},{
    initialRouteName: "CheckLogin",
}); 
const MyApp = createAppContainer(Stack);                                             
AppRegistry.registerComponent(appName, ()=> MyApp);