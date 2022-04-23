import {createSlice, isAllOf, PayloadAction} from "@reduxjs/toolkit";
import {Ingredient} from "../../models/interface/Ingredient";
// @ts-ignore
import {v4} from 'uuid'
import {Tabs} from "../../components/burger-ingredients/burger-ingredients-tabs/burger-ingredients-tabs";
import {IngredientsType} from "../../components/app/app";

interface InitialState {
    ingredients: Ingredient[],
    draggedElements: Ingredient[],
    isIngredientModalOpen: boolean,
    isOrderModalOpen: boolean,
    ingredient: Ingredient | undefined,
    orderNumber: number | undefined,
    isLoading: boolean,
    error: string,
    tabs: Tabs
}


const initialState: InitialState = {
    ingredients: [],
    draggedElements: [],
    isIngredientModalOpen: false,
    isOrderModalOpen: false,
    ingredient: undefined,
    orderNumber: undefined,
    isLoading: false,
    error: '',
    tabs: {
        currentTab: 'rolls',
        list: [
            {
                id: 'rolls',
                label: 'Булки'
            },
            {
                id: 'sauces',
                label: 'Соусы'
            },
            {
                id: 'toppings',
                label: 'Начинки'
            },
        ]

    }
}

enum MappedType {
    Delete = 'delete',
    Add = 'add',
    Reset = 'reset'
}

const mappingIngredient = (element: Ingredient, type: MappedType): Ingredient => {
    switch (type) {
        case MappedType.Reset:
            return {
                ...element,
                __v: 0,
            }
        case MappedType.Add:
            return {
                ...element,
                __v: element.type === IngredientsType.Bun ? element.__v = 2 : element.__v + 1,
            }
        default:
            return {
                ...element,
                __v: element.type === IngredientsType.Bun ? element.__v - 2 : element.__v - 1,
            }
    }
}


const mappingIngredients = (ingredients: Ingredient[], id: string, type = MappedType.Delete): Ingredient[] => {
    return ingredients.map(
        (element: Ingredient) => {
            if (element._id === id) {
                return mappingIngredient(element, type)
            } else {
                return element
            }
        })
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
            const draggedElement = state.ingredients.find((element: Ingredient) => element._id === action.payload)
            if (draggedElement?.type === IngredientsType.Bun) {
                state.ingredients = state.ingredients.map(
                    (element: Ingredient) => {
                        if (element.type === IngredientsType.Bun) {
                            return mappingIngredient(element, MappedType.Reset)
                        } else {
                            return element
                        }
                    })
                state.draggedElements = state.draggedElements.filter(element => element.type !== IngredientsType.Bun)
            }
            state.ingredients = mappingIngredients(state.ingredients, action.payload, MappedType.Add)

            if (draggedElement) {
                state.draggedElements.push({...draggedElement, code: v4()})
            }
        },
        setDraggedElements(state, action) {
            const bunElements = state.draggedElements.filter(element => element.type === IngredientsType.Bun)
            state.draggedElements = [...bunElements, ...action.payload]
        },
        deleteDraggedElements(state, action) {
            state.ingredients = mappingIngredients(state.ingredients, action.payload.id)
            state.draggedElements = state.draggedElements.filter((ingredient: Ingredient) => ingredient.code !== action.payload.code)
        },
        setCurrentTab(state, action) {
            state.tabs.currentTab = action.payload
        },
        clearConstructor(state){
            state.ingredients = state.ingredients.map(ingredient=>mappingIngredient(ingredient,MappedType.Reset))
            state.draggedElements = []
        }
    }
})

export default appReducer.reducer
