import React, {useState, useEffect} from 'react';
import ToggleButton from './ToggleButton';
import './Option.scss';

type optionProps = {
    title: string,
    optionName: string,
}

function Option({title, optionName}: optionProps) {

    const [optionState, setOptionState] = useState(false);
     useEffect(() => {
        chrome.storage.sync.get([optionName], options => {
            setOptionState(options[optionName]);
        })
    }, [])

    const toggleHandler = () => {
        setOptionState(!optionState);
        const item = {};
        item[optionName] = !optionState;
        chrome.storage.sync.set(item, () => {
            chrome.runtime.sendMessage({loadOptions: true});
        });
    }

    return (
        <div className="option">
            <label>{title}</label>
            <ToggleButton toggleHandler={toggleHandler} isActive={optionState}/>
        </div>
    )
}

export default Option
