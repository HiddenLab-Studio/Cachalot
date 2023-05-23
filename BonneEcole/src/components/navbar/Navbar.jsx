import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "twin.macro";

// Functions
import { Theme } from "../../assets/theme.js";

// Icons
import { BiMoon, BiSun } from "react-icons/bi";

// Components
// It's more reliable to put a styled component outside another component cause rerender don't recreate and render the component
const Container = styled.div`
  background-color: ${props => props.theme.name === "dark" ? "black" : "#121212"};
`;

const Navbar = (props) => {
    const theme = useTheme();

    function toggleTheme(){
        props.setTheme((theme) => theme === "light" ? "dark" : "light");
        Theme.setTheme(theme.name === "light" ? "dark" : "light");
    }

    return (
        <Container tw="absolute right-0 m-[25px]">
            <div tw="flex flex-col gap-10 p-[25px]">
                <div tw="hover:cursor-pointer">
                    {theme.name === "light" ? <BiMoon onClick={() => toggleTheme()} tw="text-2xl text-white hover:cursor-pointer hover:opacity-80"></BiMoon> : <BiSun onClick={() => toggleTheme()} tw="text-2xl text-white hover:cursor-pointer hover:opacity-80"></BiSun> }
                </div>
            </div>
        </Container>
    )
}

export default Navbar;