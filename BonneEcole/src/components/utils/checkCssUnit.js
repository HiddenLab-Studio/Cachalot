const validUnit = ["px", "vh", "rem", "rm"];

export function checkCssUnit(str){
    let letters = "";
    for (const letter of str) {
        if(isNaN(parseInt(letter))){
            letters += letter.toString();
        }
    }

    if(validUnit.includes(letters)){
        console.info("valid unit!");
        return true;
    } else {
        console.info("invalid unit!");
        return false;
    }
}

