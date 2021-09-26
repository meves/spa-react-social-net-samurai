import * as axios from 'axios';

const ax = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "a4367af1-edc7-4a2a-bdcc-eb84478de1f8"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

});

export const usersAPI = {
    getUsers (pageSize=10, currentPage=1) {
        return  ax.get(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data);
    },
    getAuthMe () {
        return ax.get('auth/me').then(response => response.data);
    },
    getUserProfile (userId) {
        return  ax.get(`profile/${userId}`).then(response => response.data);
    },
    unfollowUser (userId) {
        return ax.delete(`follow/${userId}`).then(response => response.data);
    },
    followUser (userId) {
        return ax.post(`follow/${userId}`).then(response => response.data);
    }
};
