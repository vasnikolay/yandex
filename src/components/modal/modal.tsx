import ReactDOM from 'react-dom';
import ModalOverlay from "./modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import {useEffect} from "react";

interface ModalProps {
    title?: string
    children: JSX.Element
    onHideClick: () => void
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    onHideClick: PropTypes.func
}

export default function Modal({title = '', children, onHideClick}: ModalProps) {

    const onEscapeClick = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            onHideClick()
        }
    }

    useEffect(() => {
        window.document.addEventListener('keydown', onEscapeClick)
        return () => {
            window.document.removeEventListener('keydown', onEscapeClick)
        }
    }, [onHideClick]);

    return ReactDOM.createPortal(
        (
            <div>
                <ModalOverlay onHideClick={onHideClick}/>
                <div className={styles.popup}>
                    <div>
                        <div className={`ml-10 mr-10 ${styles.header}`}>
                            <h4 className={`text text_type_main-large `}>{title}</h4>
                            <CloseIcon type={'primary'} onClick={onHideClick}/>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.body
    )
}
