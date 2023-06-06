export async function checkFields(data, result){
    if (data.username.length < 3) result.code = "Votre pseudo doit contenir au moins 3 caractères";
}