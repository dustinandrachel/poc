import React, {useState} from 'react';
import {
    add,
    ALLOWED_ACTIONS,
    clearAll,
    getAllMembers,
    getItems,
    getKeys, getMembers,
    isValidAction, KEY,
    keyExists, removeAll, removeValueFromKey, valueExists
} from "../utils/keys.utils";


const Keys = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showData, setShowData] = useState(false);

    document.title = `Key Management`;

    /**
     * Returns the main display component for the page
     * @returns {JSX.Element}
     * @constructor
     */
    const Display = () => {
        const sortResponse = false;
        if (sortResponse) {
            data.sort((a, b) => String(a[0]).localeCompare(b[0]));
        }

        return (<div>
            <div style={{marginTop: '10px'}}>
                {
                    data?.map((d, index) => <div key={index}>{`${d}`}</div>)
                }
            </div>
        </div>);
    };

    /**
     * Returns the localStorage data display component for the page
     * @returns {JSX.Element}
     * @constructor
     */
    const ShowData = ()=> {
        const data = localStorage.getItem(KEY);
        return (
            <div>
                {`${data || 'No data'}`}
            </div>
        );
    };

    /**
     * Handle event when user clicks enter
      * @param event
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !error) {
            setData("");
            let responseData = "";
            const searchValue = event?.target?.value;
            const splitSearchValue = searchValue.split(' ');
            const action = splitSearchValue[0];
            const {value} = ALLOWED_ACTIONS[action];

            switch(value) {
                case ALLOWED_ACTIONS.KEYS.value:
                    responseData = getKeys() || ["No Keys."];
                    break;
                case ALLOWED_ACTIONS.ITEMS.value:
                    responseData = getItems() || ["No Items."];
                    break;
                case ALLOWED_ACTIONS.CLEAR.value:
                    responseData = clearAll();
                    break;
                case ALLOWED_ACTIONS.ALLMEMBERS.value:
                    responseData = getAllMembers();
                    break;
                case ALLOWED_ACTIONS.KEYEXISTS.value:
                    responseData = [`${keyExists(splitSearchValue[1])}`];
                    break;
                case ALLOWED_ACTIONS.VALUEEXISTS.value:
                    responseData = [`${valueExists(splitSearchValue[1], splitSearchValue[2])}`];
                    break;
                case ALLOWED_ACTIONS.MEMBERS.value:
                    responseData = getMembers(splitSearchValue[1]);
                    break;
                case ALLOWED_ACTIONS.ADD.value:
                    responseData = [`${add(splitSearchValue[1], splitSearchValue[2])}`];
                    break;
                case ALLOWED_ACTIONS.REMOVEALL.value:
                    responseData = [removeAll(splitSearchValue[1])];
                    break;
                case ALLOWED_ACTIONS.REMOVE.value:
                    responseData = [removeValueFromKey(splitSearchValue[1], splitSearchValue[2])];
                    break;
                default:
                    responseData = ["NOT IMPLEMENTED"]
            }

            setData(responseData);
        }
    }

    /**
     * Validate changes for an event
     * @param event
     */
    const validateChanges = (event) => {
        setData("");
        const searchValue = event?.target?.value;
        const isValid = isValidAction(searchValue);

        setError(!isValid && searchValue ? 'Invalid Action' : "")
    };

    /**
     * Toggle the showData hook
     */
    const toggleShowData = () => {
        setShowData(!showData);
    };

    return (<div style={{marginTop: '100px'}}>
        <span>Manage Your Keys (click enter): </span>
        <input autoFocus type="text" onKeyDown={handleKeyDown} onChange={validateChanges}/>
        <input type="checkbox" name="showData" value={showData} onClick={toggleShowData}/> <span>Show Data</span>
        {data && !error && (
            <Display/>
        )}
        {error && (<div>
            <span style={{color: "red"}}>Need Help?</span>
            <div>Try one of the below commands:</div>
            <div>
                {Object.keys(ALLOWED_ACTIONS)?.join(", ")}
            </div>
        </div>)}

        {showData && (
            <>
                <hr/>
                <ShowData/>
            </>
        )}
    </div>);
};

export default Keys;