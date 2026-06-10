import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/redux/store';
import { setTasks } from './src/redux/taskSlice';
import { Themes } from './src/styles/GlobalStyles';

import DashboardScreen from './src/screens/DashboardScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack navigation configuration for dashboard sub-routing
function DashboardStack() {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;

  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: theme.cardBg, borderBottomWidth: 0, shadowOpacity: 0 }, 
      headerTintColor: theme.textMain,
      headerTitleStyle: { fontWeight: '600' }
    }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Task Details" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}

// Clean minimalist bottom tab workspace
function BottomTabNavigator() {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;

  return (
    <Tab.Navigator screenOptions={{ 
      tabBarActiveTintColor: theme.accent, 
      tabBarInactiveTintColor: theme.textMuted, 
      tabBarStyle: { backgroundColor: theme.cardBg, borderTopColor: theme.border, height: 65, paddingBottom: 10, paddingTop: 5 },
      headerStyle: { backgroundColor: theme.cardBg, borderBottomWidth: 0 },
      headerTintColor: theme.textMain,
      headerTitleStyle: { fontWeight: '600' }
    }}>
      <Tab.Screen name="Workspace" component={DashboardStack} options={{ headerShown: false }} />
      <Tab.Screen name="Task Sheet" component={TaskListScreen} />
      <Tab.Screen name="Add New Task" component={AddTaskScreen} />
    </Tab.Navigator>
  );
}

// Enterprise-tier Side Drawer Shell Architecture
function MainAppShell() {
  const dispatch = useDispatch();
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;

  useEffect(() => {
    const bootstrap = async () => {
      const stored = await AsyncStorage.getItem('STUDENT_TASKS');
      if (stored) dispatch(setTasks(JSON.parse(stored)));
    };
    bootstrap();
  }, []);

  return (
    <Drawer.Navigator screenOptions={{ 
      drawerStyle: { backgroundColor: theme.cardBg, width: 270 },
      drawerActiveTintColor: theme.accent,
      drawerInactiveTintColor: theme.textMuted,
      headerStyle: { backgroundColor: theme.cardBg, borderBottomWidth: 0, shadowOpacity: 0 },
      headerTintColor: theme.textMain,
      headerTitleStyle: { fontWeight: '600' }
    }}>
      <Drawer.Screen name="Core Hub" component={BottomTabNavigator} options={{ title: 'Main Dashboard' }} />
      <Drawer.Screen name="Statistical Analytics" component={AnalyticsScreen} />
      <Drawer.Screen name="Module Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Console Settings" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainAppShell />
      </NavigationContainer>
    </Provider>
  );
}