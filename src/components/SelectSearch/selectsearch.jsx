import React, { useRef, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import "./selectsearch.scss";

function SelectSearch({ data, onSelect, onInputChange }){
    
    const inputRef = useRef(null);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filter, setFilter] = useState('');

    const onInputFocus = () => { setShowSuggestions(true); }
    const onInputBlur = () => {
        setShowSuggestions(false);
        inputRef.current.blur();
    }

    const onInputChangeLocal = (event) => {
        const { value } = event.target;
        setFilter(value.toLowerCase());
        onInputChange(value.toLowerCase());
    }

    const onClickSuggestion = (_suggestion) => {
        setFilter(_suggestion);
        console.log(inputRef.current);
        inputRef.current.innerHTML = _suggestion;
        setShowSuggestions(false);
        onSelect(_suggestion);
    }

    return(
        <div>
            <FormControl
                type="text"
                ref={inputRef}
                placeholder="search for pokemon"
                className={`select-search ${showSuggestions ? "open":""}`}
                onFocus={onInputFocus}
                onChange={onInputChangeLocal}
                onBlur={onInputBlur}
                value={filter}
            />
            {showSuggestions &&
                <div className="suggestions-box">
                    {Object.keys(data).filter(e => e.indexOf(filter) > -1).slice(0,10).map((suggestion) => (
                        <span
                            className="suggestion"
                            onClick={() => onClickSuggestion(suggestion)}
                        >{suggestion}</span>
                    ))}
                </div>
            }
        </div>
    )
};

export default SelectSearch;