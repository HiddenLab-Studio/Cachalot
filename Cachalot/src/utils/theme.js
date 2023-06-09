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
    cachalotColor: "#0a78ff",
    text: "#3c3c3c",
    subText: "#afafaf",
    background: "#fdfdfd",
    //background: "#121212",

    // Profile page
    iconColor: "#cdcdcd",
    textWithIcon: "#777777",

    // SignInUp form
    inputBg: "#f7f7f7",
    inputBorder: "#e5e5e5",
    buttonBg: "#1cb0f6",
    buttonText: "#fff",
    buttonBorder: "#1899d6",
    whereColor: "#afafaf",

    // Navbar
    navbarText: "#777777",
    borderRightColor: "#e5e5e5",
    buttonBgHover: "#f1f1f1",
    buttonBgOnCurrent: "#ddf4ff",
    buttonBorderOnCurrent: "#84d8ff",

    // Error
    errorText: "#e74c3c",
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

