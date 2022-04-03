import {Ingredient} from "../../../models/interface/Ingredient";
import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';

interface IngredientDetailsProps{
    ingredient:Ingredient
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.object
}

export default function IngredientDetails({ingredient}:IngredientDetailsProps){
    return(
        <div className={styles.content}>
            <img
                className={`mb-4 ${styles.img}`}
                src={ingredient.image_large}
                alt={ingredient.name}/>
            <h4 className={`mb-8 text text_type_main-medium ${styles.name}`}>{ingredient.name}</h4>
            <div className={`mb-15 ${styles.info}`}>
                <div className={`text text_type_main-default text_color_inactive ${styles.info__item}`}>
                    Калории, ккал
                    <span className='text_type_digits-default'>{ingredient.calories}</span>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${styles.info__item}`}>
                    Белки, г
                    <span className='text_type_digits-default'>{ingredient.proteins}</span>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${styles.info__item}`}>
                    Жиры, г
                    <span className='text_type_digits-default'>{ingredient.fat}</span>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${styles.info__item}`}>
                    Углеводы, г
                    <span className='text_type_digits-default'>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}
