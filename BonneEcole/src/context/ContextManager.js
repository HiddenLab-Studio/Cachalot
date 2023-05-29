import React from 'react';
import AuthContext from "./AuthContext.js";

export class ContextManager {
    context = undefined;

    constructor() {
        this.context = React.createContext({
            getContext: (key) => this.getContext(key)
        })
    }

    getC(){ return this.context; }

    getContext(key) {
        switch (key) {
            case "AuthContext":
                return AuthContext;
            default:
                return null;
        }
    }
}
