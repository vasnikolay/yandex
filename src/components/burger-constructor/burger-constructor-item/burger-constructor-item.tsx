import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {appReducer} from "../../../store/reducers/ingredientsSlice";
import {useDrag} from "react-dnd";

export default function BurgerConstructorItem({ingredient, showIcon, isLocked, type}:any){

    const dispatch = useAppDispatch()
    const [{isDrag}, dragRef] = useDrag({
        type: "constructorIngredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    return(
        !isDrag ? <div ref={dragRef} className={styles.item} key={ingredient._id}>
                    {showIcon && <DragIcon type="primary"/>}
                    <ConstructorElement
                        type={type}
                        text={ingredient.name}
                        isLocked={isLocked}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={()=>dispatch(appReducer.actions.deleteDraggedElements({code:ingredient.code, id:ingredient._id}))}
                    />
                </div> : null
    )
}
