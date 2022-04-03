import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header-item.module.css'
import PropTypes from 'prop-types';

type IconTypes = 'secondary' | 'primary' | 'error' | 'success';

export enum IconNames {
    Burger,
    List,
    Profile
}

interface ItemProps {
    iconName: IconNames;
    type: IconTypes
    text: string
}

AppHeaderItem.propTypes = {
    iconName:PropTypes.number,
    type:PropTypes.string,
    text:PropTypes.string
}

export default function AppHeaderItem  ({iconName,type,text}: ItemProps) {
    const displayIcon = (iconName: IconNames, type: IconTypes): JSX.Element => {
        switch (iconName) {
            case IconNames.Burger:
                return (<BurgerIcon type={type}/>);
            case IconNames.List:
                return (<ListIcon type={type}/>);
            case IconNames.Profile:
                return (<ProfileIcon type={type} />);
            default:
                return (<BurgerIcon type={type}/>);
        }
    }

    return(
        <a className={`${styles.item} p-5`}>
            {displayIcon(iconName,type)}
            <span className='ml-2 text text_type_main-default'>{text}</span>
        </a>

    )
}


