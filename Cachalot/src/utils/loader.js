export const cacheLoader = {
    isCacheLoaded: false,
    init: () => {
        cacheLoader.getIsCacheLoader();

        if(cacheLoader.isCacheLoaded) return;
        cacheLoader.isCacheLoaded = true;
        console.log("[INFO] cacheLoader initialized!");
    },
    getIsCacheLoader: () => {
        let isCacheLoaded = window.localStorage.getItem("isCacheLoaded");
        if(isCacheLoaded == null){
            window.localStorage.setItem("isCacheLoaded", "true");
            return true;
        }
        return theme;
    },

    setTheme: (str) => {
        window.localStorage.setItem("theme", Theme.validTheme.includes(str) ? str : "light");
    }
}