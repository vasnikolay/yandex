import check from '../../../images/check.png'
import styles from './order-details.module.css'

export default function OrderDetails() {
    return(
        <div className={styles.content}>
            <span className={`text text_type_digits-large mb-8 ${styles.id}`}>034536</span>
            <span  className='text text_type_main-medium mb-15'>идентификатор заказа</span>
            <img className={`mb-15 ${styles.check}`} src={check} alt="Check"/>
            <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}
