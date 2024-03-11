import { firebaseApp } from '../firebase-config';

import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';

//fetching all docs from firebase
export const getAllFeeds = async (firestoreDb) => {
    const feeds = await getDocs(query(
        collection(firestoreDb, 'videos'), orderBy("id", "desc")
    ));

    return feeds.docs.map(doc => doc.data());
};

// categorywise feeds
export const categoryFeeds = async (firestoreDb, categoryId) => {
    const feeds = await getDocs(
        query(collection(firestoreDb, 'videos'),
            where('category', '==', categoryId),
            orderBy('id', 'desc')
        ));

    return feeds.docs.map(doc => doc.data());
};

//fetching recommended feeds from firebase
export const recommendedFeed = async (firestoreDb, categoryId, videoId) => {
    const feeds = await getDocs(
        query(collection(firestoreDb, 'videos'),
            where('category', '==', categoryId),
            where('id', '!=', videoId),
            orderBy('id', 'desc')
        ));

    return feeds.docs.map(doc => doc.data());
};

// User uploaded videos
export const userUploadedVideos = async (firestoreDb, userId) => {
    const feeds = await getDocs(query(
        collection(firestoreDb, 'videos'),
        where('userId', '==', userId),
        orderBy("id", "desc")
    ));

    return feeds.docs.map(doc => doc.data());
};

//fetch the user information user userId
export const getUserInfo = async (firestoreDb, userId) => {
    const userRef = doc(firestoreDb, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    }
    else {
        return "No such document";
    }
};

//fetch the specific video
export const getSpecificVideo = async (firestoreDb, videoId) => {
    const videoRef = doc(firestoreDb, 'videos', videoId);
    const videoSnap = await getDoc(videoRef);
    if (videoSnap.exists()) {
        return videoSnap.data();
    }
    else {
        return "No such video";
    }
};

//Delete the video
export const deleteVideo = async (firestoreDb, videoId) => {
    await deleteDoc(doc(firestoreDb, "videos", videoId));
};