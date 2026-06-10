import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';
import { GlobalStyles, Themes } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params; 
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;
  const dispatch = useDispatch();

  return (
    <View style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>
        <MaterialIcons name="assignment-to-me" size={30} color={theme.accent} style={{ marginRight: 8 }} />
        <Text style={[GlobalStyles.mainHeading, { color: theme.textMain, marginBottom: 0 }]}>{task.title}</Text>
      </View>
      <Text style={[GlobalStyles.subHeading, { color: theme.textMuted }]}>Detailed execution spec and core constraints.</Text>
      
      <View style={[GlobalStyles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, marginTop: 10 }]}>
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Scope Requirements</Text>
        <Text style={{ color: theme.textMain, fontSize: 16, marginBottom: 20, lineHeight: 22 }}>{task.desc}</Text>
        
        <Text style={[GlobalStyles.formLabel, { color: theme.textMuted }]}>Due Metric</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="alert-triangle" size={16} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 15 }}>{task.dueDate} (Critical)</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[GlobalStyles.primaryButton, { backgroundColor: '#EF4444', marginTop: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
        onPress={() => {
          dispatch(deleteTask(task.id));
          navigation.goBack();
        }}
      >
        <MaterialIcons name="delete-sweep" size={20} color="#FFF" style={{ marginRight: 6 }} />
        <Text style={GlobalStyles.buttonText}>Drop Task Entry</Text>
      </TouchableOpacity>
    </View>
  );
}