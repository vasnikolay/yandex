import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';

const TABS = {
    currentTab: 'rolls',
    list:[
        {
            id:'rolls',
            label:'Булки'
        },
        {
            id:'sauces',
            label:'Соусы'
        },
        {
            id:'toppings',
            label:'Начинки'
        },

    ]
}

interface BurgerIngredientsProps{
    filterIngredients:{
        main: Ingredient[]
        sauce:Ingredient[]
        bun:Ingredient[]
    },
    onClick: (ingredient:Ingredient)=>void
}

BurgerIngredients.propTypes = {
    filterIngredients: PropTypes.object,
    onClick:PropTypes.func
}

export default function BurgerIngredients ({filterIngredients, onClick}:BurgerIngredientsProps) {
    return(
        <section className={`pr-5 pl-5 ${styles.section}`}>
            <BurgerIngredientsTabs tabs={TABS} />
            <div className={styles.item}>
                <BurgerIngredientsSection ingredients={filterIngredients.bun} onClick={onClick} label={'Булки'}/>
                <BurgerIngredientsSection ingredients={filterIngredients.sauce} onClick={onClick} label={'Соусы'}/>
                <BurgerIngredientsSection ingredients={filterIngredients.main} onClick={onClick} label={'Начинки'}/>
            </div>
        </section>
    )
}
