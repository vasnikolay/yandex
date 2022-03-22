import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-section.module.css'
import {Ingredient} from "../../../models/interface/Ingredient";

interface BurgerIngredientsSectionProps{
    ingredients: Ingredient[],
    label:string
}

const BurgerIngredientsSection = ({ingredients, label}: BurgerIngredientsSectionProps) => {
    return(
        <div>
            <h2 className={'mb-6 mt-10 text text_type_main-large'}>{label}</h2>
            <div className={styles.section}>
                {ingredients.map((ingredient:Ingredient)=>{
                    return <BurgerIngredientsItem
                        imgLink={ingredient.image}
                        price={ingredient.price}
                        name={ingredient.name}
                        count={1}
                        key={ingredient._id}/>
                })}
            </div>
        </div>
    )
}
export default BurgerIngredientsSection
