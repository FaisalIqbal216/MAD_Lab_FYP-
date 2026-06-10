import React, { useState } from 'react';
import { View as RNView, Text as RNText, FlatList as RNFlatList, Pressable as RNPressable, TextInput as RNTextInput, Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../redux/taskSlice'; 
import { GlobalStyles, Themes, Priorities } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

export default function TaskListScreen({ navigation }) {
const isDark = useSelector(state => state.taskData.isDarkMode);
 const theme = isDark ? Themes.dark : Themes.light;
  const tasks = useSelector(state => state.taskData.tasks);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleDeletePress = (taskId, taskTitle) => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm(`Are you sure you want to remove "${taskTitle}" from your academic workspace?`);
      if (confirmDelete) {
        dispatch(deleteTask(taskId));
      }
    } else {
      Alert.alert(
        'Delete Task',
        `Are you sure you want to remove "${taskTitle}" from your academic workspace?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTask(taskId)) },
        ]
      );
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Pending') return matchesSearch && task.status === 'Pending';
    if (activeFilter === 'Completed') return matchesSearch && task.status === 'Completed';
    return matchesSearch && task.priority === activeFilter;
  });

  return (
    <RNView style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      <RNText style={[GlobalStyles.mainHeading, { color: theme.textMain }]}>Academic Workspace</RNText>
      <RNText style={[GlobalStyles.subHeading, { color: theme.textMuted }]}>Search and refine tasks with active criteria tags.</RNText>
      
      <RNView style={{ position: 'relative', justifyContent: 'center', marginBottom: 15 }}>
        <RNTextInput 
          style={[GlobalStyles.input, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMain, marginBottom: 0, paddingLeft: 40 }]} 
          placeholder="Search assignments..." 
          placeholderTextColor={theme.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <Feather name="search" size={16} color={theme.textMuted} style={{ position: 'absolute', left: 14 }} />
      </RNView>

      <RNView style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 15 }}>
        {['All', 'Pending', 'Completed', 'High', 'Medium', 'Low'].map(filter => (
          <RNPressable 
            key={filter} 
            style={({ pressed }) => [
              GlobalStyles.filterChip, 
              { 
                backgroundColor: activeFilter === filter ? theme.accent : theme.cardBg,
                borderColor: activeFilter === filter ? theme.accent : theme.border,
                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1
              },
              activeFilter === filter && GlobalStyles.filterChipActive, 
              { opacity: pressed ? 0.75 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] }
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <RNText style={{ color: activeFilter === filter ? '#FFF' : theme.textMuted, fontWeight: '700', fontSize: 12 }}>
              {filter}
            </RNText>
          </RNPressable>
        ))}
      </RNView>

      <RNFlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const pStyle = Priorities[item.priority] || Priorities.Medium || { border: '#E2E8F0' };
          
          return (
            <RNPressable 
              style={({ pressed }) => [
                GlobalStyles.card, 
                { 
                  backgroundColor: theme.cardBg, borderColor: theme.border, borderLeftWidth: 6, borderLeftColor: pStyle.border,
                  marginBottom: 12, padding: 16, borderRadius: 16, borderWidth: 1
                },
                { transform: [{ scale: pressed ? 0.99 : 1 }] }
              ]}
              onPress={() => {
                navigation.navigate('Workspace', {
                  screen: 'Task Details',
                  params: { task: item }
                });
              }}
            >
              <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <RNView style={{ flex: 1, marginRight: 10 }}>
                  <RNText style={[GlobalStyles.cardTitle, { color: theme.textMain, fontSize: 16, fontWeight: '600' }]}>
                    {item.title}
                  </RNText>
                  <RNText style={[GlobalStyles.cardMeta, { color: theme.textMuted, fontSize: 13, marginTop: 4 }]}>
                    Due Metric: {item.dueDate}
                  </RNText>
                </RNView>
                
                <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RNPressable 
                    style={({ pressed }) => [
                      {
                        backgroundColor: item.status === 'Completed' ? '#DCFCE7' : '#FEF3C7',
                        borderColor: item.status === 'Completed' ? '#BBF7D0' : '#FDE68A',
                        borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginRight: 10,
                        flexDirection: 'row', alignItems: 'center'
                      },
                      { transform: [{ scale: pressed ? 0.95 : 1 }], opacity: pressed ? 0.8 : 1 }
                    ]}
                    onPress={() => dispatch(toggleTaskStatus(item.id))}
                  >
                    <Ionicons 
                      name={item.status === 'Completed' ? "checkmark-done" : "ellipse-outline"} 
                      size={14} 
                      color={item.status === 'Completed' ? '#15803D' : '#B45309'} 
                      style={{ marginRight: 4 }} 
                    />
                    <RNText style={{ color: item.status === 'Completed' ? '#15803D' : '#B45309', fontSize: 12, fontWeight: '700' }}>
                      {item.status}
                    </RNText>
                  </RNPressable>

                  <RNPressable 
                    style={({ pressed }) => [
                      { backgroundColor: pressed ? '#FCA5A5' : '#FEE2E2', borderColor: '#FCA5A5', borderWidth: 1, padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
                      { transform: [{ scale: pressed ? 0.9 : 1 }] }
                    ]}
                    onPress={() => handleDeletePress(item.id, item.title)}
                  >
                    <Feather name="trash-2" size={14} color="#EF4444" />
                  </RNPressable>
                </RNView>
              </RNView>
            </RNPressable>
          );
        }}
      />
    </RNView>
  );
}