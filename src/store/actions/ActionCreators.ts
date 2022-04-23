import {AppDispatch} from "../store";
import axios from "axios";
import {appReducer} from "../reducers/ingredientsSlice";

const baseUrl = 'https://norma.nomoreparties.space/api'

export const fetchIngredients = () => async (dispatch:AppDispatch) => {
    try{
        dispatch(appReducer.actions.fetchingLoading())
        const {data: ingredients} = await axios.get(`${baseUrl}/ingredients`)
        dispatch(appReducer.actions.ingredientsFetchingSuccess(ingredients.data))
    }catch (error) {
        // @ts-ignore
        dispatch(appReducer.actions.fetchingError(error.message))
    }
}


export const getOrderId = (orderIds:string[]) => async (dispatch:AppDispatch) => {
    try{
        dispatch(appReducer.actions.fetchingLoading())
        const {data: response} = await axios.post(`${baseUrl}/orders`,{
            ingredients: orderIds
        })
        dispatch(appReducer.actions.orderIdFetchingSuccess(response.order.number))
    }catch (error) {
        // @ts-ignore
        dispatch(appReducer.actions.fetchingError(error.message))
    }
}
