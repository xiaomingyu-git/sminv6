import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import maintableReducer from '../features/maintable/maintableSlice';
import formReducer from '../features/form/formSlice';
import testmodalReducer from '../features/posttestmodel/testmodalSlice';
import createmodalReducer from '../features/createtestmodel/createmodalSlice';
import sidetableReducer from '@/features/sidetable/sidetableSlice';
import createsideReducer from '@/features/createsidemodel/createsideSlice';
import sidemodalReducer from '@/features/postsidemodel/sidemodalSlice';
import leaderformReducer from '@/features/leaderform/leaderformSlice';
import statusformReducer from '@/features/statusform/statusformSlice';
import delaymodalReducer from  '@/features/postDelaymodel/delaymodalSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    maintable: maintableReducer,
    form: formReducer,
    testmodal: testmodalReducer,
    createmodal: createmodalReducer,
    sidetable: sidetableReducer,
    createside: createsideReducer,
    sidemodal:sidemodalReducer,
    leaderform:leaderformReducer,
    statusform:statusformReducer,
    delaymodal:delaymodalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
