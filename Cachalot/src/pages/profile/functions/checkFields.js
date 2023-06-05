export async function checkFields(data, result){
    if (data.username.length < 3) result.code = "Le nom d'utilisateur doit contenir au moins 3 caractères";
}