import {
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-constructor.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientsType} from "../app/app";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDrop} from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import {getOrderId} from "../../store/reducers/ActionCreators";
import {appReducer} from "../../store/reducers/ingredientsSlice";


export default function BurgerConstructor() {
    const {draggedElements} = useAppSelector(state => state.appReducer)
    const orderIds = draggedElements?.map((ingredient: Ingredient) => ingredient._id)
    const ingredientsMain = draggedElements.filter((ingredient:Ingredient)=> ingredient.type !== IngredientsType.Bun)
    const ingredientsBun = draggedElements.find((ingredient:Ingredient)=> ingredient.type === IngredientsType.Bun)

    const dispatch = useAppDispatch()


    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item:Ingredient) {
            if(!ingredientsBun || item.type !== IngredientsType.Bun){
                dispatch(appReducer.actions.addDraggedElements(item));
            }
        },
    });

    const [, dropTargetConstructor] = useDrop({
        accept: "constructorIngredient",
        drop(item) {
        },
        hover(item) {
        },
    });





    const calculateSum = (): number => {
        const currentIngredients = ingredientsBun ? [ingredientsBun, ingredientsBun, ...ingredientsMain] : ingredientsMain
        return currentIngredients.reduce((sum: number, current: Ingredient) => sum + current.price, 0)
    }


    return (
        <section ref={dropTarget} className={`${styles.section} pl-5 pr-5`}>
            <div className={styles.list}>
                {ingredientsBun &&
                <BurgerConstructorItem
                    type={'top'}
                    ingredient={ingredientsBun}
                    showIcon={true}
                    isLocked={true}
                />}
                <div ref={dropTargetConstructor} className={`pr-2 ${styles.list_main}`}>
                    {ingredientsMain.map((ingredient: Ingredient) => (
                        <BurgerConstructorItem
                            ingredient={ingredient}
                            showIcon={true}
                            isLocked={false}
                            key={ingredient.code}
                        />
                    ))}
                </div>
                {ingredientsBun &&
                <BurgerConstructorItem
                    type={'bottom'}
                    ingredient={ingredientsBun}
                    showIcon={true}
                    isLocked={false}
                />}
            </div>
             <div className={`mr-4 mt-10 ${styles.sum}`}>
                <div className={`mr-10 ${styles.price}`}>
                    <span className={'pr-2 text text_type_digits-medium'}>{calculateSum()}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={()=>dispatch(getOrderId(orderIds))}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}
