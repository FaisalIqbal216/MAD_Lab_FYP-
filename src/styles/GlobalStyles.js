import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Professional Soft UI Semantic Colors Palette (For Runtime Theme Injections)
export const Themes = {
  light: {
    background: '#F8FAFC',   // Soft, clean background color
    cardBg: '#FFFFFF',       // Crisp white cards
    textMain: '#0F172A',     // Deep slate for readability
    textMuted: '#64748B',    // Soft muted text
    border: '#E2E8F0',       // Smooth borders
    accent: '#4F46E5',       // Professional Indigo accent
  },
  dark: {
    background: '#0F172A',   // Deep midnight slate
    cardBg: '#1E293B',       // Slate grey for cards
    textMain: '#F8FAFC',     // Clear white text
    textMuted: '#94A3B8',    // Soft silver muted text
    border: '#334155',       // Dark theme sharp outlines
    accent: '#818CF8',       // Light Indigo accent for dark mode
  }
};

// Dynamic Priority Tags Matrix (Background, Text & Border matching maps)
export const Priorities = {
  High: { bg: '#FEE2E2', text: '#EF4444', border: '#FCA5A5' },    // Pastel Red
  Medium: { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' },  // Pastel Amber
  Low: { bg: '#D1FAE5', text: '#059669', border: '#A7F3D0' },    // Pastel Emerald
};

export const GlobalStyles = StyleSheet.create({
  // Layout & Containers
  container: {
    flex: 1,
    paddingHorizontal: width > 500 ? 32 : 20, // Adaptive responsive padding bounds
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Typography & Visual Hierarchy
  mainHeading: {
    fontSize: width > 500 ? 32 : 26,
    fontWeight: '700',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: width > 500 ? 16 : 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
  },

  // Form Formatting (Label + Input)
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  // Card UI Design (Soft UI Style)
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: 13,
    marginTop: 4,
  },

  // Buttons & Feedback
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Direct Status Badges (Mapped directly for legacy and instant usage)
  badgePending: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badgePendingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeDone: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badgeDoneText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Interactive Filter Tabs Layer Styles
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterChipActive: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  // Interactive Selection Tags (Add Task Form Screen)
  priorityChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityChipText: {
    fontWeight: '700',
    fontSize: 13,
  },
  
  // Custom Sleek Linear Bin Container (Matching Minimalist Vector Look)
  trashContainer: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});