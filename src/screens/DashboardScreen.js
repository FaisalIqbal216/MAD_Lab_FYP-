import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyles, Themes } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;
  
  const tasks = useSelector(state => state.taskData.tasks);
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status === 'Pending').length;

  return (
    <ScrollView style={[GlobalStyles.container, { backgroundColor: theme.background, padding: 20 }]}>
      <Text style={[GlobalStyles.mainHeading, { color: theme.textMain, fontSize: 28, fontWeight: '700', marginBottom: 4 }]}>
        Dashboard
      </Text>
      <Text style={[GlobalStyles.subHeading, { color: theme.textMuted, fontSize: 14, marginBottom: 24 }]}>
        Overview your ongoing academic milestones and tasks.
      </Text>
      
      {/* Metrics Row Grid layout alignment node */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
        
        {/* Pending Card Module Grid Block */}
        <View style={[styles.dashboardCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <MaterialCommunityIcons name="clock-alert-outline" size={24} color="#EF4444" style={{ marginBottom: 6 }} />
          <Text style={{ fontSize: 36, fontWeight: '700', color: '#EF4444', marginBottom: 4 }}>{pending}</Text>
          <Text style={{ color: theme.textMuted, fontSize: 14, fontWeight: '600' }}>Pending</Text>
        </View>
        
        {/* Completed Card Module Grid Block */}
        <View style={[styles.dashboardCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Ionicons name="checkmark-circle-outline" size={26} color="#10B981" style={{ marginBottom: 4 }} />
          <Text style={{ fontSize: 36, fontWeight: '700', color: '#10B981', marginBottom: 4 }}>{completed}</Text>
          <Text style={{ color: theme.textMuted, fontSize: 14, fontWeight: '600' }}>Completed</Text>
        </View>

      </View>

      {/* Primary Call to Action Router Trigger Button */}
      <TouchableOpacity 
        style={[GlobalStyles.primaryButton, { backgroundColor: theme.accent, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
        onPress={() => navigation.navigate('Add New Task')}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={20} color="#FFF" style={{ marginRight: 6 }} />
        <Text style={[GlobalStyles.buttonText, { color: '#FFF', fontSize: 16, fontWeight: '600' }]}>
          Create Task Entry
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2
  }
});