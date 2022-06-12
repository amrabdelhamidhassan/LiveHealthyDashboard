import Table from "../components/Table"
import '../constants/colors.css'
import '../styles/screens/Content.css'
import { useState,useEffect } from "react"
import { store } from "../store/store"
import { useNavigate } from "react-router-dom"
import { getAllFoodDataApi,getAllFoodTypesDataApi,getFoodItemApi,getNutritionFactItemApi,deleteFoodApi } from "../server/FoodServices"
function Food()
{
     
    const navigate=useNavigate();
    const [FoodTableData,setFoodTableData]=useState([]);
    const [FoodTypesData,setFoodTypesData]=useState([])
    const [dataRefresh,setDataRefresh]=useState(1);
    const [SortAttribute,setSortAttribute]=useState('id')
    const [SortDirection,setSortDirection]=useState('ASC')
    const [nameSearch,setNameSearch]=useState('')
    const [idSearch,setIdSearch]=useState('')
    const [foodTypeSearch,setFoodTypeSearch]=useState('all')
    const fillFoodData=async(searchquery)=>{
        const response=await getAllFoodDataApi(searchquery);

        if(response)
        {
            setFoodTableData(response.data)
        }
   }
   const fillFoodTypesData=async()=>{
    const response=await getAllFoodTypesDataApi();
    if(response)
    {
         setFoodTypesData(response.data)
    }
    }
    useEffect(()=>
    {
        
        fillFoodTypesData();

    },[])
    useEffect(()=>
    {
        
        if(store.getState().userReducer)
              if(store.getState().userReducer.user==null)
              {
                  navigate('/login')
              }
    },[])
    useEffect(()=>
    {    
        fillFoodData({
              'name': nameSearch  ,
              'id': idSearch  ,
              'foodType': foodTypeSearch  ,
              'sortAttr':SortAttribute,
              'sortDir':SortDirection,

         });

    },[nameSearch,idSearch,SortAttribute,SortDirection,foodTypeSearch,dataRefresh])
        return(
            <div className="Content ">
                 <div className="SearchParamsBox">
                         <div className="SearchRow">
                              <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Name
                                   </div>
                                   <input className="textInput" placeholder="Search by Name" 
                                   value={nameSearch} onChange={(value)=>setNameSearch(value.target.value)}>
                                   
                                   </input>
                              </div>
                              <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Id
                                   </div>
                                   <input className="textInput" placeholder="Search by Id" type='number'
                                   value={idSearch} onChange={(value)=>setIdSearch(value.target.value)}>
                                   
                                   </input>
                              </div>
                              <div className="SearchParam"> 
                                        <div className="label BackgroundMainThemeDark">
                                                  FoodType
                                        </div>
                                        <select value={foodTypeSearch} onChange={(selected)=>{setFoodTypeSearch(selected.target.value)}}
                                        className="textInput" type='number'>
                                             <option value={'all'}>
                                                  all
                                             </option>
                                             {FoodTypesData.length>0 &&
                                                  FoodTypesData.map((item)=>
                                                  {
                                                       return(
                                                       <option value={item.id}>
                                                            {item.name}
                                                       </option>
                                                       )
                                                  })
                                             }
     
                                        </select>
                                </div>
                                <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Sort By
                                   </div>
                                   <select value={SortAttribute} onChange={(selected)=>{setSortAttribute(selected.target.value)}}
                                   className="textInput" type='number'>
                                        <option value={'id'}>
                                             Id
                                        </option>
                                        <option value={'name'}>
                                              Name
                                        </option>
                                        <option value={'calories'}>
                                             Calories
                                        </option>
                                        <option value={'totalfats'}>
                                             Fats
                                        </option>
                                        <option value={'totalcarbs'}>
                                             Carbs
                                        </option>
                                        <option value={'protein'}>
                                             Protein
                                        </option>
                                        <option value={'foodTypeId'}>
                                             Food Type
                                        </option>
                                   </select>
                              </div>
                              <div className="SearchParam"> 
                                   <select value={SortDirection} onChange={(selected)=>{setSortDirection(selected.target.value)}}
                                   className="textInput">
                                        <option value={'ASC'}>
                                             Ascending
                                        </option>
                                        <option value={'DESC'}>
                                             Descending
                                        </option>
                                   </select>
                              </div>       
                         </div>
                         <div className="SearchRow">

                              <div className="SearchParam"> 
                                   <button className="actionBtn BackgroundMainThemeDark"
                                    onClick={
                                         ()=>
                                         {
                                              navigate('crud',{state:{FoodTypesData:FoodTypesData,FoodItem:
                                             {
                                                  name:'',
                                                  foodTypeId:1,
                                                  servingSize:0,
                                                  servingQuantityId:1,
                                                  protein:0,
                                                  totalcarbs:0,
                                                  totalfats:0,
                                                  calories:0,
                                                  id:null
                                             }
                                             }})
                                        }
                                    }    
                                   >
                                             Create New Food
                                   </button>
                                         
{FoodTableData.length===1 && <button className="actionBtn BackgroundMainThemeDark"          
                                   onClick={
                                        async()=>
                                        {
                                             const response1=await getFoodItemApi(FoodTableData[0][0])
                                             const response2=await getNutritionFactItemApi(FoodTableData[0][0])
                                             let servingSize,servingQuantityId,foodTypeId;
                                             if(response1 && response2)
                                             {
                                                  servingSize=response2.data.servingSize;
                                                  servingQuantityId=response2.data.servingQuantityId;
                                                  foodTypeId=response1.data.foodTypeId;

                                                  navigate('crud',{state:{FoodTypesData:FoodTypesData,FoodItem:
                                                       {
                                                            name:FoodTableData[0][1],
                                                            foodTypeId:foodTypeId,
                                                            servingSize:servingSize,
                                                            servingQuantityId:servingQuantityId,
                                                            protein:parseFloat(FoodTableData[0][5]),
                                                            totalcarbs:parseFloat(FoodTableData[0][6]),
                                                            totalfats:parseFloat(FoodTableData[0][7]),
                                                            calories:parseFloat(FoodTableData[0][4]),
                                                            id:parseInt(FoodTableData[0][0])
                                                       }
                                                  }})
                                             }

                                       }
                                    }   
                                    >
                                             Edit Food Record
                                   </button>
                              }
    {FoodTableData.length===1 &&<button className="actionBtn BackgroundMainThemeDark"
                                        onClick={
                                             async()=>
                                             {
                                                  
                                                       if (window.confirm('Are you sure you want to delete this food Item?')) {
                                                            console.log('here',FoodTableData[0][0])
                                                            await deleteFoodApi(FoodTableData[0][0].toString())
                                                            setDataRefresh(dataRefresh+1)
                                                            } else {
                                                            console.log('Thing was not saved to the database.');
                                                            }
                                                  
                                             }
                                        } 
                                        >
                                             Delete Food Record
                                   </button>
          }    
                              </div>

                              </div>
                              
                </div>
                
                 { <Table Header={[['Id','Name','FoodType','Per Serving','Calories','Protein','Carb','Fats']]}
                 Data={FoodTableData} pagination={10}
                 /> }
            </div>
            )
    
}

export default Food