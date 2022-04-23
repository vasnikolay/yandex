import {
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-constructor.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React,{useCallback} from "react";
import {IngredientsType} from "../app/app";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDrop} from "react-dnd";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import {getOrderId} from "../../store/actions/ActionCreators";
import {appReducer} from "../../store/reducers/ingredientsSlice";


export default function BurgerConstructor() {
    const {draggedElements} = useAppSelector(state => state.appReducer)
    const orderIds = draggedElements?.map((ingredient: Ingredient) => ingredient._id)
    const ingredientsMain = draggedElements.filter((ingredient: Ingredient) => ingredient.type !== IngredientsType.Bun)
    const ingredientsBun = draggedElements.find((ingredient: Ingredient) => ingredient.type === IngredientsType.Bun)

    const dispatch = useAppDispatch()


    const [ ,dropTargetRef] = useDrop({
        accept: "ingredient",
        drop(item: Ingredient) {
            dispatch(appReducer.actions.addDraggedElements(item._id));
        }
    });


    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = ingredientsMain[dragIndex];
        const newCards = [...ingredientsMain]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        dispatch(appReducer.actions.setDraggedElements(newCards))
    }, [ingredientsMain, dispatch]);

    const sendOrder = () => {
        dispatch(getOrderId(orderIds))
        dispatch(appReducer.actions.clearConstructor())
    }



    const calculateSum = (): number => {
        const currentIngredients = ingredientsBun ? [ingredientsBun, ingredientsBun, ...ingredientsMain] : ingredientsMain
        return currentIngredients.reduce((sum: number, current: Ingredient) => sum + current.price, 0)
    }


    return (
        <section ref={dropTargetRef} className={`${styles.section} pl-5 pr-5`}>
            <div className={styles.list}>
                {ingredientsBun &&
                <BurgerConstructorItem
                    type={'top'}
                    ingredient={ingredientsBun}
                    showIcon={false}
                    isLocked={true}
                />}
                <div  className={`pr-2 ${styles.list_main}`}>
                    {ingredientsMain.map((ingredient: Ingredient,index) => (
                        <BurgerConstructorItem
                            ingredient={ingredient}
                            showIcon={true}
                            isLocked={false}
                            key={ingredient.code}
                            moveCard={moveCard}
                            index={index}
                        />
                    ))}
                </div>
                {ingredientsBun &&
                <BurgerConstructorItem
                    type={'bottom'}
                    ingredient={ingredientsBun}
                    showIcon={false}
                    isLocked={true}
                />}
            </div>
            <div className={`mr-4 mt-10 ${styles.sum}`}>
                <div className={`mr-10 ${styles.price}`}>
                    <span className={'pr-2 text text_type_digits-medium'}>{calculateSum()}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button disabled={!ingredientsBun} type="primary" size="large" onClick={sendOrder}>
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}
