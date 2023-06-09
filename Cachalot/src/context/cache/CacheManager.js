import {createContext, useContext, useEffect} from "react";

// Firebase config
import firebaseConfigClient from "../../services/firebase.config.js";
import {doc, onSnapshot} from "firebase/firestore";

const { auth, db } = firebaseConfigClient();


// Context
const CacheContext = createContext(undefined);

export const useCache = () => {
    return useContext(CacheContext);
}

export const CacheProvider = ({ children }) => {

    let friendsCache = {
        following: [],
        follower: [],
    }

    /*useEffect(() => {
        const onFollowingChange = async () => {
            const user = auth.currentUser;
            const userFollowing = doc(db, "users", user.uid + '/following');
            await onSnapshot(userFollowing, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        return {
                            username: change.doc.data().username,
                            photo: change.doc.data().photo,
                        };
                    }
                    if (change.type === "removed") {
                        return {
                            username: change.doc.data().username,
                            photo: change.doc.data().photo,
                        };
                    }
                })
            })
        }

        return onFollowingChange;

    }, []);*/


    function isFollowerCached(username){
        return friendsCache.follower.find(follower => follower.username === username);
    }
    function isFollowingCached(username){
        return friendsCache.following.find(following => following.username === username);
    }





    const functions = {
        addFollower: (followerList) => {
            //console.log(followerList);
            followerList.forEach(follower => {
                if(!isFollowerCached(follower.username)){
                    friendsCache.follower.push({
                        username: follower.username,
                        photo: follower.photo,
                    });
                } else {
                    console.info("L'abonné est déjà dans le cache");
                }
            });
        },

        addFollowing: (followingList) => {
            //console.log(followingList);
            followingList.forEach(follower => {
                if(!isFollowingCached(follower.username)){
                    friendsCache.following.push({
                        username: follower.username,
                        photo: follower.photo,
                    });
                } else {
                    console.info("L'abonné est déjà dans le cache");
                }
            });
        },

        getFriendsCache: () => friendsCache,

        isFriendsCacheEmpty: () => friendsCache.follower.length === 0 && friendsCache.following.length === 0,

        clearFriendsCache: () => {
            friendsCache = {
                following: [],
                follower: [],
            };
        }
    }

    return (
        <CacheContext.Provider value={functions}>
            {children}
        </CacheContext.Provider>
    )
}
