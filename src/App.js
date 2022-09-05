import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Routing } from "./components/Routing";

const App = () => {

    const [darkTheme, setDarkTheme] = useState(false);

    return (

        <div className={darkTheme ? 'dark' : ''}>
            <div className="light:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <Routing />

            </div>
        </div >
    )
}

export default App;