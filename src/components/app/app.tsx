import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {Ingredient} from "../../models/interface/Ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../burger-constructor/order-details/order-details";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchIngredients} from "../../store/reducers/ActionCreators";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {appReducer} from "../../store/reducers/ingredientsSlice";


export enum IngredientsType {
    Main = 'main',
    Sauce = 'sauce',
    Bun = 'bun'
}


export default function App() {

    const dispatch = useAppDispatch()
    const {
        ingredients,
        isIngredientModalOpen,
        isOrderModalOpen,
        ingredient,
        orderNumber,
    } = useAppSelector(state => state.appReducer)

    const filterIngredients = () => {
        return {
            main: ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Main),
            sauce: ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Sauce),
            bun: ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Bun)
        }
    }


    // const handleDrop = (item:Ingredient) => {
    //
    // };

    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    return (
        <div className={styles.wrapper}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
            <main className={'pt-10'}>
                <h1 className={'text text_type_main-medium pl-5'}>Соберите бургер</h1>
                <div className={`${styles.main} pt-5`}>
                    <BurgerIngredients
                        filterIngredients={filterIngredients()}/>
                    <BurgerConstructor/>
                </div>
            </main>
            </DndProvider>
            {
                (isIngredientModalOpen && ingredient) &&
                <Modal title={'Детали ингредиента'}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            }
            {
                isOrderModalOpen && orderNumber &&
                <Modal>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            }

        </div>
    );
}
