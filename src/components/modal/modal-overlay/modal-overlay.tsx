import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

interface ModalOverlayProps{
    onHideClick:()=>void
}

ModalOverlay.propTypes={
    onHideClick:PropTypes.func
}

export default function ModalOverlay({onHideClick}:ModalOverlayProps){
    return(
        <div
            className={styles.overlay}
            onClick={onHideClick}>
        </div>
    )
}
