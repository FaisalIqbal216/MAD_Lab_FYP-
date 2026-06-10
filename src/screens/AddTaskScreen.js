import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { GlobalStyles, Themes, Priorities } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen({ navigation }) {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSave = () => {
    if (!title || !desc || !date) {
      Alert.alert('Incomplete Fields', 'Please complete all structured asset parameters.');
      return;
    }
    const newTask = { id: Date.now().toString(), title, desc, dueDate: date, priority, status: 'Pending' };
    dispatch(addTask(newTask));
    Alert.alert('Success', 'Task entry synced with Redux System.');
    setTitle(''); setDesc(''); setDate('');
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>
        <MaterialIcons name="playlist-add" size={32} color={theme.accent} style={{ marginRight: 8 }} />
        <Text style={[GlobalStyles.mainHeading, { color: theme.textMain, marginBottom: 0 }]}>Create Task</Text>
      </View>
      <Text style={[GlobalStyles.subHeading, { color: theme.textMuted }]}>Publish an assignment or project milestone to your ledger.</Text>
      
      <View style={GlobalStyles.formGroup}>
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Task Title</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput style={[GlobalStyles.input, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMain, flex: 1 }]} value={title} onChangeText={setTitle} placeholder="e.g., MAD Lab Project V2" placeholderTextColor={theme.textMuted} />
        </View>
      </View>

      <View style={GlobalStyles.formGroup}>
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Technical Description</Text>
        <TextInput style={[GlobalStyles.input, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMain }]} value={desc} onChangeText={setDesc} placeholder="Enter operational notes" placeholderTextColor={theme.textMuted} />
      </View>

      <View style={GlobalStyles.formGroup}>
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Due Date</Text>
        <View style={{ position: 'relative', justifyContent: 'center' }}>
          <TextInput style={[GlobalStyles.input, { backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.textMain, paddingLeft: 40 }]} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={theme.textMuted} />
          <Ionicons name="calendar-outline" size={18} color={theme.textMuted} style={{ position: 'absolute', left: 14 }} />
        </View>
      </View>

      <View style={GlobalStyles.formGroup}>
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Priority Tier</Text>
        <View style={{ flexDirection: 'row' }}>
          {['High', 'Medium', 'Low'].map(p => {
            const isSelected = priority === p;
            return (
              <TouchableOpacity 
                key={p} 
                style={[GlobalStyles.priorityChip, { backgroundColor: isSelected ? Priorities[p].bg : theme.cardBg, borderColor: isSelected ? Priorities[p].border : theme.border }]}
                onPress={() => setPriority(p)}
              >
                <Text style={[GlobalStyles.priorityChipText, { color: isSelected ? Priorities[p].text : theme.textMuted }]}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={[GlobalStyles.primaryButton, { backgroundColor: theme.accent, marginBottom: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]} onPress={handleSave}>
        <Ionicons name="cloud-upload-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={GlobalStyles.buttonText}>Publish Task Sheet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}