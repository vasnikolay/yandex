import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../../models/interface/Ingredient";
// @ts-ignore
import {v4} from 'uuid'
import {Tabs} from "../../components/burger-ingredients/burger-ingredients-tabs/burger-ingredients-tabs";

interface InitialState {
    ingredients: Ingredient[],
    draggedElements: Ingredient[],
    isIngredientModalOpen: boolean,
    isOrderModalOpen: boolean,
    ingredient: Ingredient|undefined,
    orderNumber: number|undefined,
    isLoading: boolean,
    error: string,
    tabs:Tabs
}


const initialState:InitialState = {
    ingredients: [],
    draggedElements: [],
    isIngredientModalOpen: false,
    isOrderModalOpen: false,
    ingredient: undefined,
    orderNumber: undefined,
    isLoading: false,
    error: '',
    tabs:{
    currentTab: 'rolls',
        list:[
    {
        id:'rolls',
        label:'Булки'
    },
    {
        id:'sauces',
        label:'Соусы'
    },
    {
        id:'toppings',
        label:'Начинки'
    },
    ]

    }
}

export const appReducer = createSlice({
    name: 'reducer',
    initialState,
    reducers: {
        fetchingLoading(state) {
            state.isLoading = true
        },
        ingredientsFetchingSuccess(state, actions) {
            state.isLoading = false;
            state.error = '';
            state.ingredients = actions.payload
        },
        orderIdFetchingSuccess(state, actions) {
            state.isLoading = false;
            state.error = '';
            state.isOrderModalOpen = true
            state.orderNumber = actions.payload
        },
        fetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        ingredientClick(state, action) {
            state.isIngredientModalOpen = true
            state.ingredient = action.payload
        },
        hideClick(state) {
            state.isIngredientModalOpen = false
            state.isOrderModalOpen = false
        },
        addDraggedElements(state, action) {
            state.ingredients = state.ingredients.map(
                (element: Ingredient) => {
                    if(element._id === action.payload._id){
                        return {
                            ...element,
                            __v:element.type === 'bun' ? element.__v + 2 : element.__v + 1 ,
                        }
                    }else {
                        return element
                    }
                })
            const draggedElement = state.ingredients.find((element: Ingredient) => element._id === action.payload._id)

            if(draggedElement ){
                state.draggedElements.push({...draggedElement,code:v4()})
            }
        },
       deleteDraggedElements(state, action) {
           state.ingredients = state.ingredients.map(
               (element: Ingredient) => {
                   if(element._id === action.payload.id){
                       return {
                           ...element,
                           __v:element.type === 'bun' ? element.__v - 2 : element.__v - 1 ,
                       }
                   }else {
                       return element
                   }
               })
            state.draggedElements = state.draggedElements.filter((ingredient: Ingredient) => ingredient.code !== action.payload.code)
       },
        setCurrentTab(state,action){
            state.tabs.currentTab = action.payload
        }
    }
})

export default appReducer.reducer
