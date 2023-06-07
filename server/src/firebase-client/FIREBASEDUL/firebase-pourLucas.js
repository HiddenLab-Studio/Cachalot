/***** SEND MESSAGE */
export async function sendMessage(message) {
    let value = false;
    //On recupere l'utilisateur connecté
    const user = auth.currentUser;
    //On recupere le username de l'utilisateur

    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            //On prend la date 
            const date = new Date();
            //On recupere l'heure et la date  
            const hour = date.toLocaleDateString() + " | " + date.toLocaleTimeString();
            //On ajoute les info dans un objet
            const data = {
                message: message,
                user: doc.data().username,
                date: hour,
                like: 0,
            }

            //On ajoute le message dans la collection messages
            addDoc(collection(db, room()), data).then(() => {
                document.getElementById('inputMessage').value = "";
            }).then(() => {
                value = true;
            })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
    return value;
}

//on recupere les messages envoyé 
export async function getMessage() {
    //On recupere la collection messages en fonction de le room
    const messagesCollection = collection(db, room());
    //On recupere les messages par date croissante
    const message = query(messagesCollection, orderBy("like", 'desc'));

    //On regarde le changement dans la collection
    await onSnapshot(message, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            //Si le changement est un ajout
            if (change.type === "added") {
                //On recupere les données du message
                //data main du message
                const data = change.doc.data();

                const dataMessage = {
                    message: data.message,
                    user: data.user,
                    date: data.date,
                    like: data.like,

                }

                return dataMessage;

            }
            if (change.type === "modified") {
                //On recupere les données du message
            }
        });
    });
}