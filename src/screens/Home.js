import '../styles/screens/Home.css'
import '../constants/colors.css'
import '../styles/global.css'
import { useNavigate  } from "react-router-dom";
import Table from '../components/Table';
import Graph from  '../components/Graph';
import { useEffect, useState } from 'react'
import { store } from '../store/store';
import {getNumberOfFemaleUsersApi, getUserStatisticesApi}  from '../server/UserServices'
import {getFoodStatisticesApi}from '../server/FoodServices'
import Food from './Food';
function Home() {
      const [NumberOfUsers,setNumberOfUsers]=useState(0);
      const [NumberOfMaleUsers,setNumberOfMaleUsers]=useState(0);
      const [NumberOfFemaleUsers,setNumberOfFemaleUsers]=useState(0);
      const [NumberOfObeseUsers,setNumberOfObeseUsers]=useState(0);
      const [NumberOfThinUsers,setNumberOfThinUsers]=useState(0);
      const [NumberOfFood,setNumberOfFood]=useState(0);
      const [NumberOfFruitsFood,setNumberOfFruitsFood]=useState(0);
      const [NumberOfVetegtablesFood,setNumberOfVetegtablesFood]=useState(0);
      const [NumberOfSnacksFood,setNumberOfSnacksFood]=useState(0);
      const [NumberOfProteinFood,setNumberOfProteinFood]=useState(0);
      const [NumberOfFatFood,setNumberOfFatFood]=useState(0);
      const [NumberOfBeveragesFood,setNumberOfBeveragesFood]=useState(0);
      const [NumberOfGrainsFood,setNumberOfGrainsFood]=useState(0);
      const [NumberOfDairyFood,setNumberOfDairyFood]=useState(0);
      useEffect(()=>
      {
          
          if(store.getState().userReducer)
                if(store.getState().userReducer.user==null)
                {
                    navigate('/login')
                }
      },[])
      const navigate = useNavigate();
      const  getUserStatistices=async()=>
      {
          const response=await getUserStatisticesApi();
          if(response)
          setNumberOfUsers(response.data.NumberOfUsers)
          setNumberOfMaleUsers(response.data.NumberOfMaleUsers)
          setNumberOfFemaleUsers(response.data.NumberOfFemaleUsers)
          setNumberOfObeseUsers(response.data.NumberOfObeseUsers)
          setNumberOfThinUsers(response.data.NumberOfThinUsers)
      }
      const getFoodStatistices=async()=>
      {
        const response=await getFoodStatisticesApi();
      if(response)
        setNumberOfFood(response.data.NumberOfFood)
        setNumberOfFruitsFood(response.data.NumberOfFruitsFood)
        setNumberOfVetegtablesFood(response.data.NumberOfVegetablesFood)
        setNumberOfSnacksFood(response.data.NumberOfBeveragesFood)
        setNumberOfBeveragesFood(response.data.NumberOfSnacksFood)
        setNumberOfProteinFood(response.data.NumberOfDairyFood)
        setNumberOfFatFood(response.data.NumberOfGrainFood)
        setNumberOfDairyFood(response.data.NumberOfProteinFood)
        setNumberOfGrainsFood(response.data.NumberOfFatFood)

      }
      useEffect(()=>
      {
        getUserStatistices();
        getFoodStatistices();

      },[])
      return (
        <div className="Home BackgroundMainTheme">
           <div className='DataCol BackgroundMainTheme'>
                <Graph Title={'Total Users :'} TotalNumber={NumberOfUsers} click={()=>navigate('users')} GraphData={[
                  {'key':'Males','data':NumberOfMaleUsers},{'key':'Females','data':NumberOfFemaleUsers}]}/>
                <Graph Title={'Total Users :'} TotalNumber={NumberOfUsers} click={()=>navigate('users')} GraphData={[
                  {'key':'Obese','data':NumberOfObeseUsers},{'key':'Thin','data':NumberOfThinUsers}]}/>

           </div>
           <div className='DataCol BackgroundMainTheme'>
           <Graph Title={'Total Foods :'} TotalNumber={NumberOfFood} click={()=>navigate('food')} GraphData={[
                  {'key':'Protien','data':NumberOfProteinFood},
                  {'key':'Fat','data':NumberOfFatFood},
                  {'key':'Snacks','data':NumberOfSnacksFood},
                  {'key':'Beverages','data':NumberOfBeveragesFood},
                  {'key':'Grains','data':NumberOfGrainsFood},
                  {'key':'Dairy','data':NumberOfDairyFood},
                  {'key':'Fruits','data':NumberOfFruitsFood},
                  {'key':'Vegetables','data':NumberOfVetegtablesFood}
                  ]}/>
           </div>
        </div>
      )
    };

export default Home