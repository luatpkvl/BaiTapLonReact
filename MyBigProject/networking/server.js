import React,{Component} from 'react';
import {View} from 'react-native';




async function getFoodFromServer(){
    const getAllFood = "http://10.0.3.2:3005/get_all_foods";
    try{
        let response = await fetch(getAllFood);
        let responseJson = await response.json();
        return responseJson;
    }catch(error){
        console.error(`Error is ${error}`);
    }
}
async function searchFoodFromServer(text){
    const get_food_search = `http://10.0.3.2:3005/search_food?name=${text}`;
    try{
        let response = await fetch(get_food_search);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function insertNewFoodToServer(params){
    const insert_new_food = "http://10.0.3.2:3005/insert_new_food";
    try{
        let response = await fetch(insert_new_food,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify(params),
        });
        let responseJson = await response.json();
        return responseJson.status;
    }catch(error){
        console.error(`error is ${error}`);
    }
}
async function updateFoodToServer(params){
    const update_a_food  =  "http://10.0.3.2:3005/update_a_food_without_img";
    try{
        let response = await fetch(update_a_food,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let responseJson =  await response.json();
        return responseJson.status;
    }catch(err){
        console.error(`error is ${err}`);
    }
}
async function deleteAFoodServer(params){
    const delete_a_food  = "http://10.0.3.2:3005/delete_food";
    try{
        let response = await fetch(delete_a_food,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let responseJson =  await response.json();
        return responseJson.status;
    }catch(err){
        console.error(`error is ${err}`);
    }
}
async function loginUserServer(username,pwd){
    const login_User = "http://10.0.3.2:3005/login_user?username="+username+"&pwd="+pwd;
    try{
        let response = await fetch(login_User);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function getAllUserServer(){
    const getAllUser = "http://10.0.3.2:3005/get_all_user";
    try{
        let response = await fetch(getAllUser);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function getUserByIdServer(id){
    const get_user_by_id = `http://10.0.3.2:3005/get_user_by_id?id=${id}`;
    try{
        let response = await fetch(get_user_by_id);
        let responseJson = await response.json();
        return responseJson.data[0];
    }catch(err){
        console.log(`error is ${err}`);
    }
}
async function InsertTableServer() {
    const insert_table = `http://10.0.3.2:3005/insert_table`;
    try{
        let response = await fetch(insert_table,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(err);
    }
}
async function GetAllTableServer(){
    const get_all_table = "http://10.0.3.2:3005/get_all_table";
    try{
        let response = await fetch(get_all_table);
        let responseJson = await response.json();
        return responseJson.data;
    }catch(err){
        console.log(err);
    }
}
async function DeleteTable(id) {
    const delete_table = "http://10.0.3.2:3005/delete_table";
    try{
        let response = await fetch(delete_table,{
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        });
        let responseJson = await response.json();
        return responseJson.status;
    }catch(err){
        console.log(`error is ${err}`);
    }
    
}
async function getDetailTableServer(id) {
    let get_dat_ban = "http://10.0.3.2:3005/get_table_by_id?id_table="+id;
    try{
        let response = await fetch(get_dat_ban);
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(`error is ${err}`);
    }
    
}
async function updateCountFoodInTableServer(params){
    let update_count_food_in_table = "http://10.0.3.2:3005/update_count_food_in_table";
    try{
        let response = await fetch(update_count_food_in_table,{
            method: "PUT",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(`error is ${err}`);
    }
}
async function changeStateAfterChangeCount(params) {
    let getChange = `http://10.0.3.2:3005/change_state_after_change_count`;
    try{
        let response = await fetch(getChange,{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let responseJson = await response.json();
        return responseJson;
    }catch(err){
        console.log(`error is ${err}`);
    }
}
module.exports = {changeStateAfterChangeCount,updateCountFoodInTableServer,getDetailTableServer,DeleteTable,GetAllTableServer,InsertTableServer,getFoodFromServer,insertNewFoodToServer,updateFoodToServer,deleteAFoodServer,loginUserServer,searchFoodFromServer,getAllUserServer,getUserByIdServer};