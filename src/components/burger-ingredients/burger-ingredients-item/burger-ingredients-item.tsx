import {CurrencyIcon,Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css'
import {Ingredient} from "../../../models/interface/Ingredient";
import PropTypes from 'prop-types';
import {useAppDispatch} from "../../../hooks/redux";
import {appReducer} from "../../../store/reducers/ingredientsSlice";
import {useDrag} from "react-dnd";


interface BurgerIngredientsItemProps {
    ingredient:Ingredient
    count:number,
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.object,
    count:PropTypes.number
}

export default function BurgerIngredientsItem ({ingredient,count}: BurgerIngredientsItemProps){
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
    });
    const dispatch = useAppDispatch()

    return(
        <div ref={dragRef} className={`${styles.item} pb-8`} onClick={()=>dispatch(appReducer.actions.ingredientClick(ingredient))}>
            {ingredient.__v ? <Counter count={ingredient.__v} size="default"/>:null}
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={`${styles.price} pt-1 pb-1`}>
                <span className={'pr-2 text text_type_digits-default'}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`${styles.name} text text_type_main-default`}>{ingredient.name}</span>
        </div>
    )
}
