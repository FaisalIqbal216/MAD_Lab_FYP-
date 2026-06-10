import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  tasks: [],
  isDarkMode: false, // Tracks the Soft UI layout appearance state
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setThemeMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      AsyncStorage.setItem('STUDENT_TASKS', JSON.stringify(state.tasks));
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
        AsyncStorage.setItem('STUDENT_TASKS', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      AsyncStorage.setItem('STUDENT_TASKS', JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks, setThemeMode, addTask, toggleTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;