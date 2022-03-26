import React, {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-tabs.module.css'

interface TabItem {
    id:string,
    label:string
}

interface Tabs {
    currentTab: string
    list: TabItem[]
}

interface BurgerIngredientsTabProps {
    tabs: Tabs
}

const BurgerIngredientsTabs = ({tabs}:  BurgerIngredientsTabProps) => {
    const [current, setCurrent] = useState(tabs.currentTab)
    return (
        <div className={styles.tabs}>
            {tabs.list.map((tab: TabItem)=>{
                return (
                    <Tab
                        value={tab.id}
                        active={current === tab.id}
                        onClick={setCurrent}
                        key={tab.id}>
                        {tab.label}
                    </Tab>
                )
            })}
        </div>
    )
}

export default BurgerIngredientsTabs
