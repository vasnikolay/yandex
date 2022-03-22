import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {Ingredient} from "./models/interface/Ingredient";
import data from "./utils/data.json";

export enum IngredientsType {
    Main='main',
    Sauce='sauce',
    Bun='bun'
}

const  App = () => {

    const [state, setState] = useState<any>({
        ingredients:[],
        ingredientTop:undefined,
        ingredientBottom:undefined,
        ingredientsMain:[]
    });

    const fetchIngredientsData = async ():Promise<void> => {
        try {
            // const response = await fetch('url')
            // const ingredients = await response.json()
            const bun = data.find((ingredient:Ingredient)=>ingredient.type === IngredientsType.Bun)
            const filteredIngredients = bun && filterIngredientsToConstructor(data,bun)
            setState({
                ingredients: data,
                ingredientTop: filteredIngredients?.bunTop,
                ingredientBottom:filteredIngredients?.bunBottom,
                ingredientsMain:filteredIngredients?.main || data
            })
        } catch (e) {
            throw new Error('Всё плохо')
        }
    }

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

    useEffect(() => {
        fetchIngredientsData()
    },[]);



    return (
    <div className={styles.wrapper}>
        <AppHeader/>
        <main className={'pt-10'}>
            <h1 className={'text text_type_main-medium pl-5'}>Соберите бургер</h1>
            <div className={`${styles.main} pt-5`}>
                <BurgerIngredients filterIngredients={filterIngredients()}/>
                <BurgerConstructor
                    ingredients={state.ingredientsMain}
                    bunTop={state.ingredientTop}
                    bunBottom={state.ingredientBottom} />
            </div>
        </main>
    </div>
  );
}

export default App;
