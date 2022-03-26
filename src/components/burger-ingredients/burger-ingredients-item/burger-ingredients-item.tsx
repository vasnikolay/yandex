import {CurrencyIcon,Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css'


interface BurgerIngredientsItemProps {
    imgLink:string
    price:number
    name:string,
    count:number
}

const BurgerIngredientsItem = ({imgLink,name,price,count}: BurgerIngredientsItemProps) => {
    return(
        <div className={`${styles.item} pb-8`}>
            <Counter count={count} size="default" />
            <img src={imgLink} alt={name}/>
            <div className={`${styles.price} pt-1 pb-1`}>
                <span className={'pr-2 text text_type_digits-default'}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`${styles.name} text text_type_main-default`}>{name}</span>
        </div>
    )
}

export default BurgerIngredientsItem
