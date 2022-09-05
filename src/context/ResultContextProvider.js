import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Life of pie');

    const getResults = async (type) => {
        setisLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': 'c9a8940714mshaee33c8056f9a93p156d64jsn4af672489bc8',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
        });
        const data = await response.json();

        if (type.includes('/news')) {
            setResults(data.entries);
        }
        else if (type.includes('/image')) {
            setResults(data.image_results);
        }
        else {
            setResults(data.results);
        }

        setisLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);