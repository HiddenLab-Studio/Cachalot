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
    text: "#3c3c3c",
    background: "#fdfdfd",

    // Navbar
    navbarText: "#777777",
    borderRightColor: "#e5e5e5",
    buttonBgHover: "#f1f1f1",
    buttonBgOnCurrent: "#ddf4ff",
    buttonBorderOnCurrent: "#84d8ff",

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