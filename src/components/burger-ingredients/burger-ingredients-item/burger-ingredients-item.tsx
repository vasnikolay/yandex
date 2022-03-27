import {CurrencyIcon,Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css'
import {Ingredient} from "../../../models/interface/Ingredient";
import PropTypes from 'prop-types';


interface BurgerIngredientsItemProps {
    ingredient:Ingredient
    count:number,
    onClick:(ingredient:Ingredient)=>void
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.object,
    count:PropTypes.number,
    onClick:PropTypes.func
}

export default function BurgerIngredientsItem ({ingredient,count, onClick}: BurgerIngredientsItemProps){
    return(
        <div className={`${styles.item} pb-8`} onClick={()=>onClick(ingredient)}>
            <Counter count={count} size="default" />
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={`${styles.price} pt-1 pb-1`}>
                <span className={'pr-2 text text_type_digits-default'}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`${styles.name} text text_type_main-default`}>{ingredient.name}</span>
        </div>
    )
}
