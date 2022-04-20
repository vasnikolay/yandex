import check from '../../../images/check.png'
import styles from './order-details.module.css'
import PropTypes from "prop-types";

interface OrderDetailsProps {
    orderNumber:number
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number
}

export default function OrderDetails({orderNumber}:OrderDetailsProps) {
    return(
        <div className={styles.content}>
            <span className={`text text_type_digits-large mb-8 ${styles.id}`}>{orderNumber}</span>
            <span  className='text text_type_main-medium mb-15'>идентификатор заказа</span>
            <img className={`mb-15 ${styles.check}`} src={check} alt="Check"/>
            <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-small text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}
