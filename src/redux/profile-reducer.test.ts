import profileReducer, { actions, initialState } from "./profile-reducer";

const { addPost, deletePost } = actions;

// test: message should be added     
it('new post should be added', () => {
    // set initial data
    const message = 'new post string'; 
    const action = addPost(message);
    // call function
    const newState = profileReducer(initialState, action);
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
    const newState = profileReducer(initialState, action);
    // check result
    expect(newState.posts[2]).toEqual(newPost);
});
// test: message was deleted
it('post should be deleted', () => {
    // set initial data
    const postId = 3;
    const action = deletePost(postId);
    // call function
    const newState = profileReducer(initialState, action);
    // check result
    expect(newState.posts.length).toBe(2);
});
// test: post should not be deleted with wrong id
it('post should not be deleted with wrong id', () => {
    // set initial data
    const postId = 4;
    const action = deletePost(postId);
    // call function
    const newState = profileReducer(initialState, action);
    // check result
    expect(newState.posts.length).toBe(2);
});
