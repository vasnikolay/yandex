import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-constructor.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface BurgerConstructorProps {
    ingredients:Ingredient[],
    bunTop:Ingredient,
    bunBottom:Ingredient
}



const BurgerConstructor = ({ingredients,bunTop,bunBottom}:BurgerConstructorProps) => {
    const calculateSum = ():number => {
      return ingredients.reduce((sum:number, current:Ingredient)=>sum + current.price, 0)
    }

    return(
        <section className={`${styles.section} pl-5 pr-5`}>
            <div className={styles.list}>
            {bunTop &&
            <div className={'pl-6'}>
                <ConstructorElement
                    type={'top'}
                    isLocked={true}
                    text={bunTop.name}
                    price={bunTop.price}
                    thumbnail={bunTop.image}
                    key={bunTop._id}
                />
            </div>}
            <div className={`pr-2 ${styles.list_main}`}>
                {ingredients.map((ingredient:Ingredient)=>(
                    <div className={styles.item} key={ingredient._id}>
                        <DragIcon type="primary" />
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
            {bunBottom &&  <div className={'pl-6'}>
                <ConstructorElement
                type={'bottom'}
                isLocked={true}
                text={bunBottom.name}
                price={bunBottom.price}
                thumbnail={bunBottom.image}
                key={bunBottom._id}
            /></div>}
            </div>
            <div className={`mr-4 mt-10 ${styles.sum}`}>
                <div className={`mr-10 ${styles.price}`}>
                    <span className={'pr-2 text text_type_digits-medium'}>{calculateSum()}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
}
export default BurgerConstructor
