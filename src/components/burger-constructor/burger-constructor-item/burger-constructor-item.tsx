import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {appReducer} from "../../../store/reducers/ingredientsSlice";
import {useDrag, useDrop} from "react-dnd";
import {IngredientsType} from "../../app/app";


export default function BurgerConstructorItem({ingredient, showIcon, isLocked, type, moveCard, index}:any){

    const dispatch = useAppDispatch()
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            console.log('item',item)
            if (!ref.current) {
                return;
            }
            // @ts-ignore
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // @ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            // @ts-ignore
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: ingredient.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    if (ingredient.type !== IngredientsType.Bun) drag(drop(ref));
    const preventDefault = (e:any) => e.preventDefault();

    const style = ingredient.type === IngredientsType.Bun ? `${styles.item} pl-6` : styles.item
    return(
         <div className={style}
              ref={ref}
              style={{ opacity }}
              key={ingredient._id}
              onDrop={preventDefault}>
                    {showIcon && <DragIcon type="primary"/>}
                    <ConstructorElement
                        type={type}
                        text={ingredient.name}
                        isLocked={isLocked}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={()=>dispatch(appReducer.actions.deleteDraggedElements({code:ingredient.code, id:ingredient._id}))}
                    />
                </div>
    )
}
