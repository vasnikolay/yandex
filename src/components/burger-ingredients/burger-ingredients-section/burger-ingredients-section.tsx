import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-section.module.css'
import {Ingredient} from "../../../models/interface/Ingredient";
import PropTypes from 'prop-types';

interface BurgerIngredientsSectionProps{
    ingredients: Ingredient[],
    label:string,
    onClick:(ingredient:Ingredient)=>void
}

BurgerIngredientsSection.propTypes = {
    ingredients:PropTypes.arrayOf(PropTypes.object),
    label:PropTypes.string,
    onClick:PropTypes.func
}

export default function BurgerIngredientsSection({ingredients, label, onClick}: BurgerIngredientsSectionProps){
    return(
        <div>
            <h2 className={'mb-6 mt-10 text text_type_main-large'}>{label}</h2>
            <div className={styles.section}>
                {ingredients.map((ingredient:Ingredient)=>{
                    return <BurgerIngredientsItem
                        onClick={onClick}
                        ingredient={ingredient}
                        count={1}
                        key={ingredient._id}/>
                })}
            </div>
        </div>
    )
}
