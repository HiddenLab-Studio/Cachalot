import { createContext, useContext } from "react";

// Context
const CacheContext = createContext(undefined);

export const useCache = () => {
    return useContext(CacheContext);
}

export const CacheProvider = ({ children }) => {

    let friendsCache = { following: [], follower: [] };
    function isFollowerCached(username){ return friendsCache.follower.find(follower => follower.username === username); }
    function isFollowingCached(username){ return friendsCache.following.find(following => following.username === username); }

    const functions = {
        // Friends cache
        setFriendsCache: (followerList, followingList) => {
            //console.log({followerList, followingList});
            followerList.forEach(follower => {
                if(!isFollowerCached(follower.username)){
                    friendsCache.follower.push({
                        displayName: follower.displayName,
                        username: follower.username,
                        photo: follower.photo,
                    });
                } else {
                    console.info("L'abonné est déjà dans le cache");
                }
            });

            followingList.forEach(following => {
                if(!isFollowingCached(following.username)){
                    friendsCache.following.push({
                        displayName: following.displayName,
                        username: following.username,
                        photo: following.photo,
                    });
                } else {
                    console.info("L'abonné est déjà dans le cache");
                }
            });
        },
        addFriends: (type, object) => {
            console.log(friendsCache);
            console.log({type, object})
            switch (type) {
                case "follower":
                    if(!isFollowerCached(object.username)){
                        console.info("Ajout d'un abonné");
                        friendsCache.follower.push({
                            username: object.username,
                            photo: object.photo,
                        });
                    }
                    break;
                case "following":
                    if(!isFollowingCached(object.username)){
                        console.info("Ajout d'un abonnement");
                        friendsCache.following.push({
                            displayName: object.displayName,
                            username: object.username,
                            photo: object.photo,
                        });
                    } else {
                        console.info("L'abonnement est déjà dans le cache");
                    }
                    break;
                default:
                    break;
            }
        },
        removeFriends: (type, username) => {
            switch (type) {
                case "follower":
                    if(isFollowerCached(username)){
                        console.info("Suppression d'un abonné");
                        friendsCache.follower = friendsCache.follower.filter(follower => follower.username !== username);
                    } else {
                        console.info("L'abonné n'est pas dans le cache");
                    }
                    break;
                case "following":
                    if(isFollowingCached(username)){
                        console.info("Suppression d'un abonnement");
                        friendsCache.following = friendsCache.following.filter(following => following.username !== username);
                    } else {
                        console.info("L'abonnement n'est pas dans le cache");
                    }
                    break;
                default:
                    break;
            }
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
