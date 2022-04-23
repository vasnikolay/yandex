import React, {useEffect, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-tabs.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appReducer} from "../../../store/reducers/ingredientsSlice";

interface TabItem {
    id: string,
    label: string
}

export interface Tabs {
    currentTab: string
    list: TabItem[]
}


export default function BurgerIngredientsTabs({refs}: any) {
    const {tabs} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch()

    const setCurrent = (id: string): void => {
        dispatch(appReducer.actions.setCurrentTab(id))
        refs[id].target.scrollIntoView()
    }

    useEffect(() => {
        const keys = Object.keys(refs)
        const key = keys.find(key => refs[key]?.isIntersecting)
        if(tabs.currentTab !== key){
            dispatch(appReducer.actions.setCurrentTab(key))
        }
    }, [refs])

    return (
        <div className={styles.tabs}>
            {tabs.list.map((tab: TabItem) => {
                return (
                    <Tab
                        value={tab.id}
                        active={tabs.currentTab === tab.id}
                        onClick={() => setCurrent(tab.id)}
                        key={tab.id}>
                        {tab.label}
                    </Tab>
                )
            })}
        </div>
    )
}
