import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from './sidebar-reducer';

let store = {
    _state:  {
        dialogPage: {
            dialogs: [
                { id: 1, name: "Sergey" },
                { id: 2, name: "Andrey" },
                { id: 3, name: "Irina" },
                { id: 4, name: "Victor" },
                { id: 5, name: "Alexandr" },
                { id: 6, name: "Egeny" }
            ],
            messages: [
                { id: 1, message: "Hello, friends!" },
                { id: 2, message: "Hi everybody!" },
                { id: 3, message: "Good day!" },
                { id: 4, message: "How are you?" },
                { id: 5, message: "Hi!" },
                { id: 6, message: "How do you do?" }
            ],
            textValue: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 10},
                {id: 2, message: "It's myfirst post", likesCount: 5}
            ],
            newPostText: 'it-kamasutra.com'
        },
        sidebar: {
            menuItems: [
                { id: 1, itemName: "Profile", to: "/profile" },
                { id: 2, itemName: "Messages", to: "/dialogs" },
                { id: 3, itemName: "News", to: "/news" },
                { id: 4, itemName: "Music", to: "/music" },
                { id: 5, itemName: "Settings", to: "/settings" }
            ],
            names: [
                { id: 1, name: "Andrew" },
                { id: 2, name: "Sasha" },
                { id: 3, name: "Sveta" }
            ]
        }
    },
    
    getState() {
        return this._state;
    },

    _callSubscriber() {},

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { 
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        
        this._callSubscriber(this._state);
    } 
};

export default store;

window.state = store;
