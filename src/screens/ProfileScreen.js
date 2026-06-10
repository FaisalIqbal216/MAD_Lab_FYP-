import React from 'react';
import { View, Text, StyleSheet, Dimensions, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../redux/taskSlice';
import { Themes } from '../styles/GlobalStyles';
// Vector Icon Injection Node
import { Ionicon, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const isDark = useSelector(state => state.taskData.isDarkMode);
  const theme = isDark ? Themes.dark : Themes.light;

  const toggleThemeSwitch = () => {
    dispatch(setThemeMode(!isDark));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.profileCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {/* TOP PROFILES ROW */}
        <View style={styles.profileRow}>

          {/* FAISAL */}
          <View style={styles.profileBox}>
            <View style={[styles.avatarShell, { backgroundColor: theme.accent + '20', borderColor: theme.accent }]}>
              <Text style={[styles.avatarText, { color: theme.accent }]}>FI</Text>
            </View>
            <Text style={[styles.userName, { color: theme.textMain }]}>Faisal Iqbal</Text>
            <Text style={[styles.userRole, { color: theme.textMuted }]}>Frontend Developer</Text>
            <Text style={[styles.userRole, { color: theme.textMuted }]}>BSIT-011</Text>
          </View>

          {/* FAIZAN */}
          <View style={styles.profileBox}>
            <View style={[styles.avatarShell, { backgroundColor: theme.accent + '20', borderColor: theme.accent }]}>
              <Text style={[styles.avatarText, { color: theme.accent }]}>FA</Text>
            </View>
            <Text style={[styles.userName, { color: theme.textMain }]}>Faizan Adnan</Text>
            <Text style={[styles.userRole, { color: theme.textMuted }]}>Frontend Developer</Text>
            <Text style={[styles.userRole, { color: theme.textMuted }]}>BSIT-012</Text>
          </View>

        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        {/* EMAILS (VERTICAL - FIXED) */}
        <View style={styles.metaContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Feather name="mail" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
            <Text style={[styles.metaLabel, { color: theme.textMuted, marginBottom: 0 }]}>Registered Emails</Text>
          </View>
          <Text style={[styles.metaValue, { color: theme.textMain }]}>faisaliqbl2160@gmail.com</Text>
          <Text style={[styles.metaValue, { color: theme.textMain, marginTop: 6 }]}>faizanadnan212@gmail.com</Text>
        </View>

        {/* ACADEMIC INFO */}
        <View style={styles.metaContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <MaterialIcons name="school" size={16} color={theme.textMuted} style={{ marginRight: 4 }} />
            <Text style={[styles.metaLabel, { color: theme.textMuted, marginBottom: 0 }]}>Academic Workspace Terminal</Text>
          </View>
          <Text style={[styles.metaValue, { color: theme.textMain }]}>Foundation University Islamabad</Text>
        </View>

        {/* THEME SWITCH */}
        <View style={[styles.toggleContainer, { borderColor: theme.border }]}>
          <View>
            <Text style={[styles.toggleLabel, { color: theme.textMain }]}>Console Appearance</Text>
            <Text style={[styles.toggleSubLabel, { color: theme.textMuted }]}>
              {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E2E8F0', true: theme.accent + '60' }}
            thumbColor={isDark ? theme.accent : '#F1F5F9'}
            ios_backgroundColor="#E2E8F0"
            onValueChange={toggleThemeSwitch}
            value={isDark}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  profileCard: { width: width > 500 ? 500 : '100%', padding: 25, borderRadius: 24, borderWidth: 1, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 4 },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  profileBox: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  avatarShell: { width: 75, height: 75, borderRadius: 37.5, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 24, fontWeight: '700' },
  userName: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  userRole: { fontSize: 12, fontWeight: '500', textAlign: 'center', marginTop: 2 },
  separator: { width: '100%', height: 1, marginVertical: 20 },
  metaContainer: { width: '100%', marginTop: 12, marginBottom: 10, alignItems: 'center' },
  metaLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, textAlign: 'center' },
  metaValue: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  toggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 20, paddingTop: 16, borderTopWidth: 1 }
});