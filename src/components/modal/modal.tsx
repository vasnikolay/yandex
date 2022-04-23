import ReactDOM from 'react-dom';
import ModalOverlay from "./modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css'
import PropTypes from 'prop-types';
import {useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {appReducer} from "../../store/reducers/ingredientsSlice";

interface ModalProps {
    title?: string
    children: JSX.Element
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
}

export default function Modal({title = '', children}: ModalProps) {
    const dispatch = useAppDispatch()

    const onEscapeClick = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            dispatch(appReducer.actions.hideClick())
        }
    }

    useEffect(() => {
        window.document.addEventListener('keydown', onEscapeClick)
        return () => {
            window.document.removeEventListener('keydown', onEscapeClick)
        }
    }, [onEscapeClick]);

    return ReactDOM.createPortal(
        (
            <div>
                <ModalOverlay onHideClick={()=>dispatch(appReducer.actions.hideClick())}/>
                <div className={styles.popup}>
                    <div>
                        <div className={`ml-10 mr-10 ${styles.header}`}>
                            <h4 className={`text text_type_main-large `}>{title}</h4>
                            <CloseIcon type={'primary'} onClick={() => dispatch(appReducer.actions.hideClick())}/>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.body
    )
}
