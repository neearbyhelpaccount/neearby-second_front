import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


export default createStore({
    plugins: [vuexLocal.plugin],
    state: {
        authorizedProfile: {},
        authorized: !!localStorage.getItem('token'),
        currentProfile: {},
        registrationData: {},
        recoveryEmail: '',
        subdomain: '',
        unreadChats: [],
        notifications: [],
        unreadNotifications: [],
    },
    mutations: {
        setAuthorizedProfile(state, profile) {
            state.authorizedProfile = profile;
        },
        setAuthorized(state, status) {
          state.authorized = status;
        },
        setCurrentProile(state, profile) {
            state.currentProfile = profile;
        },
        setRegistrationData(state, data){
            state.registrationData = data;
        },
        setRecoveryEmail(state, data){
            state.recoveryEmail = data;
        },
        setSubdomain(state, data){
            state.subdomain = data;
        },
        setUnreadChats(state, data){
            state.unreadChats = data;
        },
        setNotifications(state, data){
            state.notifications = data;
        },
        setUnreadNotifications(state, data){
            state.unreadNotifications = data;
        }
    },
    getters: {
        getAuthorizedProfile(state) {
            return state.authorizedProfile;
        },
        getAuthorizedStatus(state){
            return state.authorized
        },
        getCurrentProfile(state) {
            return state.currentProfile
        },
        getRegistrationData(state){
            return state.registrationData
        },
        getRecoveryEmail(state){
            return state.recoveryEmail
        },
        getSubdomain(state){
            return state.subdomain
        },
        getUnreadChats(state){
            return state.unreadChats
        },
        getNotifications(state){
            return state.notifications
        },
        getUnreadNotifications(state){
            return state.unreadNotifications;
        }
    }
});