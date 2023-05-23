export const Theme = {
    validTheme: ["light", "dark"],
    loadTheme: () => {
        let theme = window.localStorage.getItem("theme");
        if(theme == null){
            window.localStorage.setItem("theme", "light");
            return "light";
        }
        return theme;
    },

    setTheme: (str) => {
        window.localStorage.setItem("theme", Theme.validTheme.includes(str) ? str : "light");
    }
}



export const themeLight = {
    name: "light",
    text: "#000",
    background: "#fff",
    buttonText: "#000",
    buttonTextHover: "#fff",
    buttonBorder: "#000",
    buttonBg: "rgba(0, 0, 0, 0)",
    buttonBgHover: "rgba(0, 0, 0, 1)",
};

export const themeDark = {
    name: "dark",
    text: "#fff",
    background: "#121212",
    buttonText: "#fff",
    buttonTextHover: "#000",
    buttonBorder: "#fff",
    buttonBg: "rgba(255, 255, 255, 0)",
    buttonBgHover: "rgba(255, 255, 255, 1)",
};