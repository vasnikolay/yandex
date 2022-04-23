import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import {useInView} from "react-intersection-observer";

interface BurgerIngredientsProps{
    filterIngredients:{
        main: Ingredient[]
        sauce:Ingredient[]
        bun:Ingredient[]
    }
}

BurgerIngredients.propTypes = {
    filterIngredients: PropTypes.object,
}

export default function BurgerIngredients ({filterIngredients}:BurgerIngredientsProps) {

    const [bun, inViewRolls,rolls] = useInView({
        threshold: 0,
    })
    const [sauce, inViewSauces,sauces] = useInView({
        threshold: 0
    })
    const [main, inViewToppings,toppings] = useInView({
        threshold: 0,
    })



    return(
        <section className={`pr-5 pl-5 ${styles.section}`}>
            <BurgerIngredientsTabs refs={{rolls, sauces, toppings}} />
            <div className={styles.item}>
                <div ref={bun}><BurgerIngredientsSection ingredients={filterIngredients.bun} label={'Булки'}/></div>
                <div ref={sauce}><BurgerIngredientsSection ingredients={filterIngredients.sauce} label={'Соусы'}/></div>
                <div ref={main}><BurgerIngredientsSection  ingredients={filterIngredients.main} label={'Начинки'}/></div>
            </div>
        </section>
    )
}
