import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-constructor.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {AppContext} from "../../service/AppContext";
import {IngredientsType} from "../app/app";

interface BurgerConstructorProps {
    onClick: (orderIds: string[]) => void
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func
}


export default function BurgerConstructor({onClick}: BurgerConstructorProps) {
    const ingredients = useContext(AppContext)
    const bun = ingredients.find((ingredient: Ingredient) => ingredient.type === IngredientsType.Bun)
    const orderIds = ingredients.map((ingredient: Ingredient) => ingredient._id)
    // Пока не понятна логика выбора булочек
    const filterIngredientsToConstructor = (ingredients: Ingredient[], bun: Ingredient) => {
        return {
            bunTop: {...bun, name: `${bun.name} (верх)`, constructorType: "top"},
            main: [...ingredients.filter(item => item.type !== IngredientsType.Bun)],
            bunBottom: {...bun, name: `${bun.name} (низ)`, constructorType: "bottom", _id: `${bun._id}bottom`},
        }
    }

    const filteredIngredients = bun && filterIngredientsToConstructor(ingredients, bun)

    const calculateSum = (): number => {
        const currentIngredients = filteredIngredients.bunBottom && filteredIngredients.bunTop ? [filteredIngredients.bunBottom, filteredIngredients.bunTop, ...filteredIngredients.main] : filteredIngredients.main
        return currentIngredients.reduce((sum: number, current: Ingredient) => sum + current.price, 0)
    }


    return (
        <section className={`${styles.section} pl-5 pr-5`}>
            <div className={styles.list}>
                {filteredIngredients.bunTop &&
                <div className={'pl-6'}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={filteredIngredients.bunTop.name}
                        price={filteredIngredients.bunTop.price}
                        thumbnail={filteredIngredients.bunTop.image}
                        key={filteredIngredients.bunTop._id}
                    />
                </div>}
                <div className={`pr-2 ${styles.list_main}`}>
                    {filteredIngredients.main.map((ingredient: Ingredient) => (
                        <div className={styles.item} key={ingredient._id}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                type={ingredient.constructorType}
                                text={ingredient.name}
                                isLocked={false}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ))}
                </div>
                {filteredIngredients.bunBottom && <div className={'pl-6'}>
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={filteredIngredients.bunBottom.name}
                        price={filteredIngredients.bunBottom.price}
                        thumbnail={filteredIngredients.bunBottom.image}
                        key={filteredIngredients.bunBottom._id}
                    /></div>}
            </div>
            <div className={`mr-4 mt-10 ${styles.sum}`}>
                <div className={`mr-10 ${styles.price}`}>
                    <span className={'pr-2 text text_type_digits-medium'}>{calculateSum()}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={() => onClick(orderIds)} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}
