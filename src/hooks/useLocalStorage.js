import { useState, useEffect } from "react";

const LOCAL_STORAGE_PREFIX = "project-manager-";

const getOrCreateLocalStorage = (key, initialValue) => {
    const data = localStorage.getItem(key);
    if(!data || initialValue) localStorage.setItem(key, initialValue || '{}');
    return JSON.parse(localStorage.getItem(key));
}

export const deleteLocalStorage = (key) => localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);


export function useLocalStorage(key, initialValue){
    const storageKey = `${LOCAL_STORAGE_PREFIX}${key}`;
    const localStorageData = getOrCreateLocalStorage(storageKey, initialValue)
    const [storageValue, setStorageValue] = useState(localStorageData);
    
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
    }, [storageValue])

    return [storageValue, setStorageValue]
}