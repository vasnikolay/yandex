import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {Ingredient} from "../../models/interface/Ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../burger-constructor/order-details/order-details";
import {AppContext} from "../../service/AppContext";
import {checkResponse} from "../../utils/check-response";

const baseUrl = 'https://norma.nomoreparties.space/api'

export enum IngredientsType {
    Main = 'main',
    Sauce = 'sauce',
    Bun = 'bun'
}

interface AppState {
    ingredients: Ingredient[],
    isIngredientModalOpen: boolean,
    isOrderModalOpen: boolean,
    ingredient?: Ingredient
    orderNumber: number | undefined
}
interface OrderResponse{
    name: string,
    "order": {
        "number": number
    },
    "success": boolean
}

export default function App() {
    const [state, setState] = useState<AppState>({
        ingredients: [],
        isIngredientModalOpen: false,
        isOrderModalOpen: false,
        ingredient: undefined,
        orderNumber: undefined
    });

    const fetchIngredientsData = async (): Promise<void> => {
        try {
            const response = await fetch(`${baseUrl}/ingredients`)
            const {data: ingredients} = await checkResponse(response)

            setState({
                ...state,
                ingredients,
            })
        } catch (error: any) {
            console.log(error)
        }
    }

    const getOrderId = async (orderIds: string[]): Promise<void> => {
        try {
            const response = await fetch(`${baseUrl}/ordersы`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients: orderIds
                })
            });
            const data = await checkResponse<OrderResponse>(response)
            setState(((prevState: AppState) => ({
                ...prevState,
                isOrderModalOpen: true,
                orderNumber: data.order.number
            })))
        } catch (error: any) {
            console.log(error)
        }

    }

    const onIngredientClick = React.useCallback((ingredient: Ingredient) => {
        setState(((prevState: AppState) => ({
            ...prevState,
            isIngredientModalOpen: true,
            ingredient
        })))
    }, [state.isIngredientModalOpen])

    const onOrderClick = React.useCallback((orderIds: string[]) => {
        getOrderId(orderIds)
    }, [state.isOrderModalOpen])

    const onHideClick = React.useCallback(() => {
        setState(((prevState: AppState) => ({
            ...prevState,
            isIngredientModalOpen: false,
            isOrderModalOpen: false,
        })))
    }, [])

    const filterIngredients = () => {
        return {
            main: state.ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Main),
            sauce: state.ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Sauce),
            bun: state.ingredients.filter((ingredient: Ingredient) => ingredient.type === IngredientsType.Bun)
        }
    }

    useEffect(() => {
        fetchIngredientsData()
    }, []);

    return (
        <div className={styles.wrapper}>
            <AppHeader/>
            <main className={'pt-10'}>
                <h1 className={'text text_type_main-medium pl-5'}>Соберите бургер</h1>
                <div className={`${styles.main} pt-5`}>
                    <BurgerIngredients
                        onClick={onIngredientClick}
                        filterIngredients={filterIngredients()}/>
                    {state.ingredients.length &&
                    <AppContext.Provider value={state.ingredients}>
                        <BurgerConstructor
                            onClick={onOrderClick}/>
                    </AppContext.Provider>
                    }
                </div>
            </main>
            {
                (state.isIngredientModalOpen && state.ingredient) &&
                <Modal title={'Детали ингредиента'} onHideClick={onHideClick}>
                    <IngredientDetails ingredient={state.ingredient}/>
                </Modal>
            }
            {
                state.isOrderModalOpen && state.orderNumber &&
                <Modal onHideClick={onHideClick}>
                    <OrderDetails orderNumber={state.orderNumber}/>
                </Modal>
            }

        </div>
    );
}
