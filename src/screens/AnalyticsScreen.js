import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyles, Themes } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;
  
  const tasks = useSelector(state => state.taskData.tasks);
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>
        <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={30} color={theme.accent} style={{ marginRight: 8 }} />
        <Text style={[GlobalStyles.mainHeading, { color: theme.textMain, marginBottom: 0 }]}>Performance Metrics</Text>
      </View>
      <Text style={[GlobalStyles.subHeading, { color: theme.textMuted }]}>Real-time processing efficiency metrics.</Text>
      
      <View style={[GlobalStyles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, paddingVertical: 45, marginTop: 15, alignItems: 'center', justifyContent: 'center' }]}>
        <View style={{ backgroundColor: theme.accent + '15', padding: 20, borderRadius: 100, marginBottom: 10 }}>
          <MaterialCommunityIcons name="trophy-outline" size={40} color={theme.accent} />
        </View>
        <Text style={{ fontSize: 68, fontWeight: '800', color: theme.accent, textAlign: 'center' }}>{rate}%</Text>
        <Text style={[GlobalStyles.cardMeta, { textAlign: 'center', color: theme.textMuted, fontSize: 13, textTransform: 'uppercase', fontWeight: '700', marginTop: 12, letterSpacing: 1 }]}>
          Tasks Completion Ratio
        </Text>
      </View>
    </View>
  );
}