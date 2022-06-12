import { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {  useNavigate  } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { store } from '../store/store';
import '../styles/global.css'
import '../constants/colors.css'
import '../styles/screens/Content.css'
import {getAllServingQuantitiesDataApi } from "../server/FoodServices"
import { CreateNewFoodApi,EditFoodApi } from '../server/FoodServices';
function MakeFood() {
    const navigate=useNavigate()
    const [ServingQuantitiesData,setServingQuantitiesData]=useState([])
    const [caloriesError,setCaloriesError]=useState(false);
    const location = useLocation();
    useEffect(()=>
    {
        
        if(store.getState().userReducer)
              if(store.getState().userReducer.user==null)
              {
                  navigate('/login')
              }
    },[])
    const checkCaloriesValidity=(protein,carbs,fats,calories)=>
    {
        console.log(protein,carbs,fats,calories)
        let calccalories=4*parseFloat(protein)+4*parseFloat(carbs)+9*parseFloat(fats);
        console.log(calccalories)
        if (Math.abs(parseFloat(calories)-parseFloat(calccalories))<5) return true
        else return false;
    }
    const fillServingQuantitiesData=async()=>{
        const response=await getAllServingQuantitiesDataApi();

        if(response)
        {
            setServingQuantitiesData(response.data)
        }
   }
    const FoodSchema = yup.object({
        name: yup.string().required("Name is required").min(2, "Enter Valid Name").matches(/^[a-zA-Z-]+$/,'Enter Valid Name Letters and Dashes Only'),
        servingSize: yup.number('').required('Serving Size Required').min(0.1,'Serving Size Required'),
        protein: yup.number('').required('Protein Required').min(0.001,'Protein Required'),
        totalfats: yup.number('').required('Total Fats Required').min(0.001,'Total Fats Required'),
        totalcarbs: yup.number('').required('Total Carbs Required').min(0.001,'Total Carbs  Required'),
        calories: yup.number('').required('Total Calories are').min(0.001,'Total Calories are  Required'),

    })
    useEffect(()=>
    {
        console.log(location.state)
        fillServingQuantitiesData();
    },[])
    const formik = useFormik({
        initialValues: {
        name: location.state.FoodItem.name,
        foodTypeId:location.state.FoodItem.foodTypeId,
        calories:location.state.FoodItem.calories,
        protein:location.state.FoodItem.protein,
        totalfats:location.state.FoodItem.totalfats,
        totalcarbs:location.state.FoodItem.totalcarbs,
        servingSize:location.state.FoodItem.servingSize,
        servingQuantityId:location.state.FoodItem.servingQuantityId
        },
        validationSchema:FoodSchema
        ,
        onSubmit: async(values)=> {

                let caloriesvalid=checkCaloriesValidity(values.protein,values.totalcarbs,values.totalfats,values.calories)
                console.log(values)
                if(caloriesvalid)
                {
                    if(location.state.FoodItem.id==null)
                    {     
                        setCaloriesError(false)
                        console.log('true')
                        await CreateNewFoodApi(values.name,values.foodTypeId,values.servingSize,values.servingQuantityId,values.protein,values.totalcarbs,values.totalfats,values.calories)
                        alert('Food Item was created')
                        navigate(-1)
                    }
                    else
                    {
                        setCaloriesError(false)
                        console.log('true')
                        await EditFoodApi(values.name,values.foodTypeId,values.servingSize,values.servingQuantityId,values.protein,values.totalcarbs,values.totalfats,values.calories,location.state.FoodItem.id)
                        alert('Food Item was Edited')
                        navigate(-1)
                    }
                }
                else
                {
                    setCaloriesError(true)
                    console.log('false')

                }
        },
    });
    return (
        <form className='Content'onSubmit={formik.handleSubmit}>
                    <div className="SearchParamsBox">
                            <div className="SearchRow">
                                <div className="SearchParam"> 
                                    <div className="label BackgroundMainThemeDark">
                                                Name
                                    </div>
                                    <input className="textInput" placeholder="Enter Food Name"
                                            id="name"
                                            name="name" 
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                        >                                   
                                    </input>
                                </div>
                                <div className="SearchParam"> 
                                            <div className="label BackgroundMainThemeDark">
                                                    FoodType
                                            </div>
                                            <select onChange={formik.handleChange}
                                            id="foodTypeId"
                                            name="foodTypeId"
                                            value={formik.values.foodTypeId}
                                            className="textInput" type='number'>
                                                {location.state.FoodTypesData.length>0 &&
                                                    location.state.FoodTypesData.map((item)=>
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
                                                Serving Size
                                    </div>
                                    <input className="textInput" placeholder="Enter Serving Size"
                                            id="servingSize"
                                            name="servingSize"
                                            type='number' 
                                            onChange={formik.handleChange}
                                            value={formik.values.servingSize}
                                        >                                   
                                    </input>
                                </div>
                                <div className="SearchParam"> 
                                            <div className="label BackgroundMainThemeDark">
                                                    Serving Measurment
                                            </div>
                                            <select onChange={formik.handleChange}
                                            id="servingQuantityId"
                                            name="servingQuantityId"
                                            value={formik.values.servingQuantityId}
                                            className="textInput" type='number'>
                                                {ServingQuantitiesData.length>0 &&
                                                    ServingQuantitiesData.map((item)=>
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
                            </div>
                            <div className="SearchRow">
                            <div className="SearchParam"> 
                                <p className='errorText'>{formik.touched 
                                && formik.errors.name? formik.errors.name:(formik.errors.servingSize?
                                    formik.errors.servingSize:'' )}</p>

                            </div>

                             </div>
                            <div className="SearchRow">
                                <div className="SearchParam"> 
                                        <div className="label BackgroundMainThemeDark">
                                                    Protein
                                        </div>
                                        <input className="textInput" placeholder="Enter Protein Number"
                                                id="protein"
                                                name="protein"
                                                type='number' 
                                                onChange={formik.handleChange}
                                                value={formik.values.protein}
                                            >                                   
                                        </input>
                                    </div>
                                    <div className="SearchParam"> 
                                        <div className="label BackgroundMainThemeDark">
                                                    Carbs
                                        </div>
                                        <input className="textInput" placeholder="Enter Total Carbs Number"
                                                id="totalcarbs"
                                                name="totalcarbs"
                                                type='number' 
                                                onChange={formik.handleChange}
                                                value={formik.values.totalcarbs}
                                            >                                   
                                        </input>
                                    </div>
                                    <div className="SearchParam"> 
                                        <div className="label BackgroundMainThemeDark">
                                                    Fats
                                        </div>
                                        <input className="textInput" placeholder="Enter Total Fats Number"
                                                id="totalfats"
                                                name="totalfats"
                                                type='number' 
                                                onChange={formik.handleChange}
                                                value={formik.values.totalfats}
                                            >                                   
                                        </input>
                                    </div>
                                    <div className="SearchParam"> 
                                        <div className="label BackgroundMainThemeDark">
                                                    Calories
                                        </div>
                                        <input className="textInput "  placeholder="Enter Total Calories Number"
                                                id="calories"
                                                name="calories"
                                                type='number' 
                                                onChange={formik.handleChange}
                                                value={formik.values.calories}
                                            >                                   
                                        </input>
                                    </div>
                            </div>
                            <div className="SearchRow">
                                <div className="SearchParam"> 
                                    <p className='errorText'>{formik.touched 
                                    && formik.errors.protein? formik.errors.protein:(formik.errors.totalfats?
                                        formik.errors.totalfats:(formik.errors.totalcarbs?
                                            formik.errors.totalcarbs:(formik.errors.calories?
                                                formik.errors.calories:'')))
                                        
                                        }</p>
                              {caloriesError&&  <p className='errorText'>Make Sure Calories adds up to macros</p>}

                                </div>

                             </div>
                             <div className="SearchRow">

                                 <div className="SearchParam"> 
                                   <button className="actionBtn BackgroundMainThemeDark" type="submit"
                                   >
                                           {location.state.FoodItem.id==null?"Create New Food":"Edit Food Item"}  
                                   </button>
                                </div>
                            </div>
                </div>
                    
        </form>
    );
    };

export default MakeFood