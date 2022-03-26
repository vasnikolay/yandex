import AppHeaderItem, {IconNames} from "./app-header-item/app-header-item"
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className='pt-4 pb-4'>
            <nav className={styles.nav}>
                <div className={styles.item}>
                    <AppHeaderItem iconName={IconNames.Burger} type={'primary'} text={'Конструктор'}/>
                    <AppHeaderItem iconName={IconNames.List} type={'primary'} text={'Лента заказов'}/>
                </div>
                <div className={styles.item_center}>
                    <Logo/>
                </div>
                <div className={styles.item_right}>
                    <AppHeaderItem iconName={IconNames.Profile} type={'primary'} text={'Личный кабинет'}/>
                </div>
            </nav>
        </header>
    )
}
export default AppHeader
