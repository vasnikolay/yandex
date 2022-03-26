import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";
import {Ingredient} from "../../models/interface/Ingredient";
import styles from './burger-ingredients.module.css'

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
    }
}

const BurgerIngredients = ({filterIngredients}:BurgerIngredientsProps) => {

    return(
        <section className={`pr-5 pl-5 ${styles.section}`}>
            <BurgerIngredientsTabs tabs={TABS} />
            <div className={styles.item}>
                <BurgerIngredientsSection ingredients={filterIngredients.bun} label={'Булки'}/>
                <BurgerIngredientsSection ingredients={filterIngredients.sauce} label={'Соусы'}/>
                <BurgerIngredientsSection ingredients={filterIngredients.main} label={'Начинки'}/>
            </div>
        </section>
    )
}

export default BurgerIngredients
