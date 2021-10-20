import profileReducer, { addPost, deletePost } from "./profile-reducer";

// set initial data
const state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 10},
        {id: 2, message: "It's myfirst post", likesCount: 5}
    ]
};

// test: message should be added     
it('new post should be added', () => {
    // set initial data
    const message = 'new post string'; 
    const action = addPost(message);
    // call function
    const newState = profileReducer(state, action);
    // check result
    expect(newState.posts.length).toBe(3);    
});
// test: added correct message
it('new post should be correct', () => {
    // set initial data
    const message = 'new post string'; 
    const action = addPost(message);
    const newPost = {id: 3, message, likesCount: 0};
    // call function
    const newState = profileReducer(state, action);
    // check result
    expect(newState.posts[2]).toEqual(newPost);
});
// test: message was deleted
it('post should be deleted', () => {
    // set initial data
    const state = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 10},
            {id: 2, message: "It's myfirst post", likesCount: 5},
            {id: 3, message: 'new post string', likesCount: 0}
        ]
    };
    const postId = 3;
    const action = deletePost(postId);
    // call function
    const newState = profileReducer(state, action);
    // check result
    expect(newState.posts.length).toBe(2);
});
// test: post should not be deleted with wrong id
it('post should not be deleted with wrong id', () => {
    // set initial data
    const state = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 10},
            {id: 2, message: "It's myfirst post", likesCount: 5},
            {id: 3, message: 'new post string', likesCount: 0}
        ]
    };
    const postId = 4;
    const action = deletePost(postId);
    // call function
    const newState = profileReducer(state, action);
    // check result
    expect(newState.posts.length).toBe(3);
});
