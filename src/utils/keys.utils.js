export const KEY = 'KEY';

/**
 * Allowed Actions for key management
 * @type {{ADD: {requireParam: boolean, value: string}, ALLMEMBERS: {requireParam: boolean, value: string}, MEMBERS: {requireParam: boolean, value: string}, KEYS: {requireParam: boolean, value: string}, VALUEEXISTS: {requireParam: boolean, value: string}, REMOVE: {requireParam: boolean, value: string}, KEYEXISTS: {requireParam: boolean, value: string}, REMOVEALL: {requireParam: boolean, value: string}, ITEMS: {requireParam: boolean, value: string}, CLEAR: {requireParam: boolean, value: string}}}
 */
export const ALLOWED_ACTIONS = {
    'KEYS': {value: 'KEYS', requireParam: false},
    'ITEMS': {value: 'ITEMS', requireParam: false},
    'CLEAR': {value: 'CLEAR', requireParam: false} , //removes all keys and values completely
    'ALLMEMBERS': {value: 'ALLMEMBERS', requireParam: false}, //returns all values
    'KEYEXISTS': {value: 'KEYEXISTS', requireParam: false},
    'VALUEEXISTS': {value: 'VALUEEXISTS', requireParam: false},
    'MEMBERS': {value: 'MEMBERS', requireParam: false},
    'ADD': {value: 'ADD', requireParam: false},
    'REMOVEALL': {value: 'REMOVEALL', requireParam: false},
    'REMOVE': {value: 'REMOVE', requireParam: false}
};

/**
 * Return json implementation of localStorage key
 * @returns {any|{}}
 */
const getJson = () => {
    const data = localStorage.getItem(KEY);
    const json = data && JSON.parse(data);
    return json || {};
};

/**
 * Get Keys
 * @returns {string[]|null}
 */
export const getKeys = () => {
    const json = getJson();

    if (!json) {
        return null;
    }

    let keys = [];
    keys = Object.keys(json);
    return keys && keys?.length> 0 ? keys : null;
};

/**
 * Get items
 * @returns {[]}
 */
export const getItems = () => {
    const json = getJson();
    if (!json) {
        return null;
    }

    let items = [];

    let j;
    for (j in json) {
        let i;
        for (i in json[j]) {
            items.push(`${[j]}: ${json[j][i]}`);
        }
    }

    return items;
};

/**
 * Get all members
 * @returns {[]}
 */
export const getAllMembers = () => {
    const json = getJson();

    let items = [];

    let j;
    for (j in json) {
        let i;
        for (i in json[j]) {
            items.push(`${json[j][i]}`);
        }
    }

    return items;
};

/**
 * Clear localStorage item
 * @returns {[string]}
 */
export const clearAll = () => {
    localStorage.setItem(KEY, "");
    return ["Cleared"];
};

/**
 * Checks to see if key exists
 * @param key
 * @returns {boolean}
 */
export const keyExists = (key) => {
    const keys = getKeys();
    return keys?.indexOf(key) > -1;
};

/**
 * Checks to see if value exists
 * @param key
 * @param value
 * @returns {boolean}
 */
export const valueExists = (key, value) => {
    const json = getJson();
    const jsonKey = json[key];
    if (!jsonKey) {
        return false;
    }

    return jsonKey?.filter(k => k === value)?.length > 0;
};

/**
 * Get members
 * @param key
 * @returns {*|string[]}
 */
export const getMembers = (key) => {
    const json = getJson();
    const data = json[key]?.map(k => k);
    return data || ["NOT FOUND"];
};

/**
 * Add key/value pair
 * @param key
 * @param value
 * @returns {string}
 */
export const add = (key, value) => {
    if (!value) {
        return "ERROR, missing value";
    }
    const json = getJson();
    if (valueExists(key, value)) {
        return "ERROR, value already exists";
    }
    const jsonKey = json[key];
    if (jsonKey) {
        json[key].push(value);
    }
    else {
        json[key] = [value]
    }

    localStorage.setItem(KEY, JSON.stringify(json))
    return "Added";
};

/**
 * Removes a key if it exists
 * @param key
 * @returns {string}
 */
export const removeAll = (key) => {
    const json = getJson();

    if (!json[key]) {
        return "Error. Key does not exist.";
    }
    delete json[key];
    localStorage.setItem(KEY, JSON.stringify(json));
    return `Removed key ${key}`;
};

/**
 * Removes a value from a key and removes the key when empty
 * @param key
 * @param value
 * @returns {string}
 */
export const removeValueFromKey = (key, value) => {
    const json = getJson();
    if (!json[key]) {
        return "Error. Key does not exist.";
    }

    if (!json[key]?.filter(k => k === value)?.length > 0) {
        return "Error. Value does not exist."
    }
    json[key].splice(json[key].indexOf(value),1);
    if (json[key]?.length === 0) {
        //Cleanup key
        delete json[key];
    }
    localStorage.setItem(KEY, JSON.stringify(json));
    return "Removed";
};

/**
 * Checks to see if the search value is a valid action
 * @param searchValue
 * @returns {*}
 */
export const isValidAction = (searchValue) => {
    const parsedAction = searchValue.split(' ');
    const validAction = ALLOWED_ACTIONS[parsedAction[0]]?.value;
    return validAction;
};
