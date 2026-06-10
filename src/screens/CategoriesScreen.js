import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyles, Themes } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { MaterialIcons } from '@expo/vector-icons';

export default function CategoriesScreen() {
  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;
  const divisions = ['Lab Assessments', 'Theory Assignments', 'Quiz Preparations', 'Semester Final Projects'];

  // Map category names to distinct professional indicator icons
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Lab Assessments': return 'code';
      case 'Theory Assignments': return 'assignment';
      case 'Quiz Preparations': return 'extension';
      case 'Semester Final Projects': return 'account-tree';
      default: return 'folder-open';
    }
  };

  return (
    <View style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 4 }}>
        <MaterialIcons name="apps" size={30} color={theme.accent} style={{ marginRight: 8 }} />
        <Text style={[GlobalStyles.mainHeading, { color: theme.textMain, marginBottom: 0 }]}>Classifications</Text>
      </View>
      <Text style={[GlobalStyles.subHeading, { color: theme.textMuted }]}>Academic sorting domains.</Text>
      
      <FlatList
        data={divisions}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={[GlobalStyles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }]}>
            <View style={{ backgroundColor: theme.accent + '15', pading: 10, borderRadius: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
              <MaterialIcons name={getCategoryIcon(item)} size={22} color={theme.accent} />
            </View>
            <Text style={[GlobalStyles.cardTitle, { color: theme.textMain, flex: 1 }]}>{item}</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.textMuted} />
          </View>
        )}
      />
    </View>
  );
}