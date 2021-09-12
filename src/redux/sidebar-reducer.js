let initialState = {
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
};

const sidebarReducer = (state=initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }        
};

export default sidebarReducer;
