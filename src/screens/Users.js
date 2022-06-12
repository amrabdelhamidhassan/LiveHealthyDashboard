import Table from "../components/Table"
import '../constants/colors.css'
import '../styles/screens/Content.css'
import { store } from "../store/store"
import '../constants/colors.css'
import { getAllUsersDataApi,getAllRolesDataApi,BlockUserApi,UnBlockUserApi,ChangeUserRoleApi } from "../server/UserServices"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Users()
{          
     const navigate=useNavigate();
     const [UsersTableData,setUsersTableData]=useState([]);
     const [dataRefresh,setDataRefresh]=useState(1);
     const [RolesData,setRolesData]=useState([])
     const [SortAttribute,setSortAttribute]=useState('id')
     const [SortDirection,setSortDirection]=useState('ASC')
     const [nameSearch,setNameSearch]=useState('')
     const [phoneSearch,setPhoneSearch]=useState('')
     const [idSearch,setIdSearch]=useState('')
     const [ageSearch,setAgeSearch]=useState('')
     const [heightSearch,setHeightSearch]=useState('')
     const [weightSearch,setWeightSearch]=useState('')
     const [genderSearch,setGenderSearch]=useState('all')
     const [blockedSearch,setblockedSearch]=useState('all')
     const [roleSearch,setRoleSearch]=useState('all')
     const [roleChange,setRoleChange]=useState(null)

     const [fatSearch,setFatSearch]=useState('')

     const fillUsersData=async(searchquery)=>{
          const response=await getAllUsersDataApi(searchquery);

          if(response)
          {
               setUsersTableData(response.data)
          }
     }
     const fillRolesData=async()=>{
          const response=await getAllRolesDataApi();
          if(response)
          {
               setRolesData(response.data)
          }
     }
     const blockUser=async(userId)=>{
        await BlockUserApi(userId);
     }
     
     const changerole=async(userId,roleId)=>{
          await ChangeUserRoleApi(userId,roleId)
       }
     const unblockuser=async(userId)=>{
          await UnBlockUserApi(userId);
       }
     useEffect(()=>
     {
          console.log('users',store.getState().userReducer.user)
          fillRolesData();

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
          fillUsersData({
               'name': nameSearch  ,
               'phone':  phoneSearch ,
               'id': idSearch  ,
               'age': ageSearch  ,
               'height':heightSearch   ,
               'weight': weightSearch  ,
               'role': roleSearch  ,
               'sortAttr':SortAttribute,
               'sortDir':SortDirection,
               'gender':genderSearch   ,
               'isblocked':blockedSearch,
               'fat': fatSearch  ,

          });

     },[nameSearch,phoneSearch,idSearch,ageSearch,heightSearch,weightSearch,roleSearch,SortAttribute,SortDirection,genderSearch,blockedSearch,fatSearch,dataRefresh])
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
                                        Phone
                              </div>
                              <input className="textInput" placeholder="Search by Phone"
                              value={phoneSearch} onChange={(value)=>setPhoneSearch(value.target.value)}>
                              
                              </input>
                         </div>
                         <div className="SearchParam">
                                 <div className="label BackgroundMainThemeDark">
                                             Id
                                   </div>
                                   <input className="textInput" placeholder="Enter Id of user to take action" type='number'
                                   value={idSearch} onChange={(value)=>setIdSearch(value.target.value)}>
                                   
                                   </input>
                         </div>
                         <div className="SearchParam"> 
                              <div className="label BackgroundMainThemeDark">
                                        Age
                              </div>
                              <input className="textInput" placeholder="Search by Age" type='number'min={8} max={100}
                              value={ageSearch} onChange={(value)=>setAgeSearch(value.target.value)}>
                              
                              </input>
                         </div>
                         <div className="SearchParam"> 
                              <div className="label BackgroundMainThemeDark">
                                        Height
                              </div>
                              <input className="textInput" placeholder="Search by Height" type='number'min={10} max={500}
                              value={heightSearch} onChange={(value)=>setHeightSearch(value.target.value)}>
                              
                              </input>
                         </div>
                         <div className="SearchParam"> 
                              <div className="label BackgroundMainThemeDark">
                                        Weight
                              </div>
                              <input className="textInput" placeholder="Search by Weight" type='number'min={30} max={800}
                              value={weightSearch} onChange={(value)=>setWeightSearch(value.target.value)}>
                              
                              </input>
                         </div>
                    </div>


                         <div className="SearchRow">
                              <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Gender
                                   </div>
                                   <select value={genderSearch} onChange={(selected)=>{setGenderSearch(selected.target.value)}}
                                   className="textInput"  type='number'>
                                        <option value={'all'}>
                                             all
                                        </option>
                                        <option value={'male'}>
                                             male
                                        </option>
                                        <option value={'female'}>
                                             female
                                        </option>
                                   </select>
                              </div>
                              <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Role
                                   </div>
                                   <select value={roleSearch} onChange={(selected)=>{setRoleSearch(selected.target.value)}}
                                   className="textInput" type='number'>
                                        <option value={'all'}>
                                             all
                                        </option>
                                        {RolesData.length>0 &&
                                             RolesData.map((item)=>
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
                                             Block Status
                                   </div>
                                   <select value={blockedSearch} onChange={(selected)=>{setblockedSearch(selected.target.value)}}
                                   className="textInput"  type='number'>
                                        <option value={'all'}>
                                             all
                                        </option>
                                        <option value={true}>
                                             blocked
                                        </option>
                                        <option value={false}>
                                             not-blocked 
                                        </option>
                                   </select>
                              </div>
                              <div className="SearchParam"> 
                                   <div className="label BackgroundMainThemeDark">
                                             Fat Percentage
                                   </div>
                                   <input className="textInput" placeholder="Search by Fat Percentage" type='number'
                                   value={fatSearch} onChange={(value)=>setFatSearch(value.target.value)}min={1} max={80}>
                                   
                                   </input>
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
                                        <option value={'fname'}>
                                             First Name
                                        </option>
                                        <option value={'lname'}>
                                             Last Name
                                        </option>
                                        <option value={'age'}>
                                             Age
                                        </option>
                                        <option value={'height'}>
                                             Height
                                        </option>
                                        <option value={'weight'}>
                                             Weight
                                        </option>
                                        <option value={'fatpercentage'}>
                                             Fat %
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
          {UsersTableData.length===1 &&        
               <div className="SearchRow">

                              <div className="SearchParam"> 

                                   <select value={roleChange} onChange={(selected)=>{setRoleChange(selected.target.value)}}
                                   className="textInput" type='number'>
                                        <option value={null}>
                                             None
                                        </option>
                                        {RolesData.length>0 &&
                                             RolesData.map((item)=>
                                             {
                                                  return(
                                                  <option value={item.id}>
                                                       {item.name}
                                                  </option>
                                                  )
                                             })
                                        }

                                   </select>
                                   <button className="actionBtn BackgroundMainThemeDark"
                                   onClick={
                                        ()=>
                                        {
                                             if(UsersTableData.length===1)
                                             {
                                                  if (window.confirm('Are you sure you want to change this user role?')) {
                                                       changerole(UsersTableData[0][0],roleChange)
                                                       setDataRefresh(dataRefresh+1)
                                                     } else {
                                                       console.log('Thing was not saved to the database.');
                                                     }
                                             }
                                             else alert('Please Query 1 User to take action')
                                        }
                                   }    
                                   >
                                             Confirm New Role
                                   </button>
                                   <button className="actionBtn BackgroundMainThemeDark"          
                                   onClick={
                                        ()=>
                                        {
                                             if(UsersTableData.length===1)
                                             {
                                                  if (window.confirm('Are you sure you want to block this user?')) {
                                                       blockUser(UsersTableData[0][0])
                                                       setDataRefresh(dataRefresh+1)
                                                     } else {
                                                       console.log('Thing was not saved to the database.');
                                                     }
                                             }
                                             else alert('Please Query 1 User to take action')
                                        }
                                   }    >
                                             Block User
                                   </button>
                                   <button className="actionBtn BackgroundMainThemeDark"
                                        onClick={
                                             ()=>
                                             {
                                                  if(UsersTableData.length===1)
                                                  {
                                                       if (window.confirm('Are you sure you want to unblock this user?')) {
                                                            unblockuser(UsersTableData[0][0])
                                                            setDataRefresh(dataRefresh+1)
                                                            } else {
                                                            console.log('Thing was not saved to the database.');
                                                            }
                                                  }
                                                  else alert('Please Query 1 User to take action')
                                             }
                                        } >
                                             UnBlock User
                                   </button>
                              </div>

                         </div>
                          }
            </div>
         
            { <Table Header={[['Id','F-Name','L-Name','Age','Phone','Height','Weight','Gender','Fat-%','Role','Activity']]}
            Data={UsersTableData} pagination={10}
            /> }
       </div>
       )
}

export default Users