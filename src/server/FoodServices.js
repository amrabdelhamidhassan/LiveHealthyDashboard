import api from "./api";
export  function getFoodStatisticesApi()
{
    return api.get('food/statistices');

}
export  function getNumberOfFoodApi()
{
    return api.get('/food/count');

}
export  function getNumberOfFoodTypeApi(foodtype)
{
    return api.get('/food/count/foodtype',{
        params:{
            foodtype
        }
    });

}
export  function getAllFoodDataApi(searchquery)
{
    return api.get('/food/index',{
        params:{
            searchquery
        }
    });

}
export  function getFoodItemApi(id)
{
    return api.get('/food/item',{
        params:{
            id
        }
    });

}
export  function getNutritionFactItemApi(id)
{
    return api.get('/nutritionfact/item',{
        params:{
            id
        }
    });

}
export  function getAllFoodTypesDataApi()
{
    return api.get('/foodtype/index');

}


export  function getAllServingQuantitiesDataApi()
{
    return api.get('/food/servingquantity/index');

}
export  function CreateNewFoodApi(name,foodTypeId,servingSize,servingQuantityId,protein,totalcarbs,totalfats,calories)
{
    return api.post('/food/create',{
       
        name:name,
        foodTypeId:foodTypeId,
        calories:calories,
        servingSize:servingSize,
        totalfats:totalfats,
        totalcarbs:totalcarbs,
        protein:protein,
        servingQuantityId:servingQuantityId,

        
    
});    
    

}
export  function EditFoodApi(name,foodTypeId,servingSize,servingQuantityId,protein,totalfats,totalcarbs,calories,id)
{
    return api.put('/food/edit',{
        id:id,
        name:name,
        foodTypeId:foodTypeId,
        calories:calories,
        servingSize:servingSize,
        totalfats:totalfats,
        totalcarbs:totalcarbs,
        protein:protein,
        servingQuantityId:servingQuantityId,

        
    
});    
    

}
export  function deleteFoodApi(id)
{
    return api.post('/food/delete',{
        id:id
            
});    
    

}