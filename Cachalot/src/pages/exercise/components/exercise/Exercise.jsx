import React, {useEffect, useState} from "react";

// Context
import { useAuth } from "../../../../context/AuthContext.js";
import { useCache } from "../../../../context/manager/cache/CacheProvider.js";

// Components
import ConnectionHomePage from "../../../connection/ConnectionHomePage.jsx";
import FullLoading from "../../../../components/utils/loading/FullLoading.jsx";
import CreateExercise from "./subComponents/create/createExercise.jsx";

const Exercise = () => {
    // Context
    const auth = useAuth();
    const cache = useCache();

    // State
    const [isLoading, setIsLoading] = useState(!cache.isUserCached);
    const [path, setPath] = useState(null);

    useEffect( () => {
        let path = window.location.pathname.split("/")[2];
        setPath(path)
    }, []);

    if(typeof auth.currentUser === "number") {
        return <ConnectionHomePage />
    } else {
        if(isLoading){
            return <FullLoading setIsLoading={setIsLoading} />
        } else {
            switch (path) {
                case "create":
                    return <CreateExercise auth={auth} />
                case "catalog":
                    return (
                        <div>
                            <h1>catalog</h1>
                        </div>
                    )
                default:
                    return (
                        <div>
                            <h1>default</h1>
                        </div>
                    )
            }
        }
    }
}

export default Exercise;