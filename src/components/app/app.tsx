import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {Ingredient} from "../../models/interface/Ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../burger-constructor/order-details/order-details";

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients'

export enum IngredientsType {
    Main='main',
    Sauce='sauce',
    Bun='bun'
}

interface AppState{
    ingredients:Ingredient[],
    ingredientTop?:Ingredient,
    ingredientBottom?:Ingredient,
    ingredientsMain:Ingredient[],
    isIngredientModalOpen:boolean,
    isOrderModalOpen:boolean,
    ingredient?:Ingredient
}

export default function App() {
    const [state, setState] = useState<AppState>({
        ingredients:[],
        ingredientTop:undefined,
        ingredientBottom:undefined,
        ingredientsMain:[],
        isIngredientModalOpen:false,
        isOrderModalOpen:false,
        ingredient:undefined
    });

    const fetchIngredientsData = async ():Promise<void> => {
        try {
            const response = await fetch(INGREDIENTS_URL)
            if (!response.ok) {
                throw new Error('Ответ сети был не ok.');
            }
            const {data:ingredients} = await response.json()
            const bun = ingredients.find((ingredient:Ingredient)=>ingredient.type === IngredientsType.Bun)
            const filteredIngredients = bun && filterIngredientsToConstructor(ingredients,bun)
            setState({
                ...state,
                ingredients: ingredients,
                ingredientTop: filteredIngredients?.bunTop,
                ingredientBottom:filteredIngredients?.bunBottom,
                ingredientsMain:filteredIngredients?.main || ingredients
            })
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const onIngredientClick = React.useCallback((ingredient:Ingredient) => {
        setState(((prevState: AppState) => ({
            ...prevState,
            isIngredientModalOpen:true,
            ingredient:ingredient
        })))
    },[state.isIngredientModalOpen])

    const onOrderClick = React.useCallback(() => {
        setState(((prevState: AppState) => ({
            ...prevState,
            isOrderModalOpen:true,
        })))
    },[state.isOrderModalOpen])

    const onHideClick = React.useCallback(() => {
        setState(((prevState: AppState) => ({
            ...prevState,
            isIngredientModalOpen:false,
            isOrderModalOpen:false,
        })))
    },[])

    const filterIngredients = () => {
        return  {
            main: state.ingredients.filter((ingredient:Ingredient)=> ingredient.type === IngredientsType.Main),
            sauce:state.ingredients.filter((ingredient:Ingredient)=> ingredient.type === IngredientsType.Sauce),
            bun:state.ingredients.filter((ingredient:Ingredient)=> ingredient.type === IngredientsType.Bun)
        }
    }
    // Пока не понятна логика выбора булочек
    const filterIngredientsToConstructor = (ingredients: Ingredient[], bun:Ingredient) => {
        return  {
            bunTop:{...bun,name:`${bun.name} (верх)`,constructorType:"top"},
            main:[...ingredients.filter(item=>item.type!==IngredientsType.Bun)],
            bunBottom:{...bun,name:`${bun.name} (низ)`, constructorType:"bottom", _id:`${bun._id}bottom`},
            }
    }

    const onEscapeClick = (event: KeyboardEvent):void => {
        if (event.key === 'Escape'){
            onHideClick()
        }
    }

    useEffect(() => {
        fetchIngredientsData()
    },[]);

    useEffect(() => {
       window.document.addEventListener('keydown', onEscapeClick)
        return () => {
           window.document.removeEventListener('keydown', onEscapeClick)
       }
    },[state.isOrderModalOpen,state.isIngredientModalOpen]);



    return (
    <div className={styles.wrapper}>
        <AppHeader/>
        <main className={'pt-10'}>
            <h1 className={'text text_type_main-medium pl-5'}>Соберите бургер</h1>
            <div className={`${styles.main} pt-5`}>
                <BurgerIngredients
                    onClick={onIngredientClick}
                    filterIngredients={filterIngredients()}/>
                <BurgerConstructor
                    onClick={onOrderClick}
                    ingredients={state.ingredientsMain}
                    bunTop={state.ingredientTop}
                    bunBottom={state.ingredientBottom} />
            </div>
        </main>
        {
           (state.isIngredientModalOpen && state.ingredient) &&
            <Modal title={'Детали ингредиента'} onHideClick={onHideClick}>
                <IngredientDetails ingredient={state.ingredient}/>
            </Modal>
        }
        {
           state.isOrderModalOpen &&
           <Modal onHideClick={onHideClick}>
                <OrderDetails/>
            </Modal>
        }

    </div>
  );
}
