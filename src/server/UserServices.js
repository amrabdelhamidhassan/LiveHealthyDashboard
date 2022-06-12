import api from "./api";
import axios from "axios";
import {baseURL} from "./api";
import { GET_USER } from "../store/actions";
export  function getUserStatisticesApi()
{
    return api.get('user/statistices');

}
export  function getAllUsersDataApi(searchquery)
{
    return api.get('/user/index',{
        params:{
            searchquery
        }
    });

}
export  function getAllRolesDataApi()
{
    return api.get('/role/index');

}
export  function getNumberOfUsersApi()
{
    return api.get('/user/count');
    

}
export  function getNumberOfMaleUsersApi()
{
    return api.get('/user/count/male');
    

}
export  function getNumberOfFemaleUsersApi()
{
    return api.get('/user/count/female');
    

}
export  function getNumberOfObeseUsersApi()
{
    return api.get('/user/count/obese');
    

}
export  function getNumberOfThinUsersApi()
{
    return api.get('/user/count/thin');
    

}
export  function ChangeUserRoleApi(userId,roleId)
{
    return api.put('/user/changerole',{
       
        userId:userId,
        roleId:roleId
        
    
});    
    

}
export  function BlockUserApi(userId)
{
    return api.put('/user/block',{
       
            userId:userId
            
        
    });    

}
export  function UnBlockUserApi(userId)
{
    return api.put('/user/unblock',{
       
        userId:userId
        
    
});    

}
export  function checkIfHasRoleApi(phone)
{
    return api.get('/user/hasrole',
       
        {
            params:{
                phone
            }
            
        
    });    

}
export async function loginApi(phone,device_name='phone')
{
    console.log('base',baseURL);
    axios.defaults.baseURL=baseURL
    axios.defaults.timeout=8000
    const { data } =await axios.post('/sanctum/token',{
        phone:phone ,
        device_name:device_name       
    })
    // console.log(data)
    console.log('here')

    const userResponse ={
        id:data.user.id,
        fname: data.user.fname,
        lname:data.user.lname,
        phone:data.user.phone,
        roleId:data.user.roleId,
        token:data.token,
    }
    return userResponse
}
export  const  loginAction= (user) =>{

    try {
        return async dispatch => {
            
            await dispatch({
                type: GET_USER,
                payload: user
            });
        };
    } 
    catch (error) {
        console.log(error);
    }  
}