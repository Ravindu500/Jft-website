export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string;
  referredBy?: string;
  profilePhoto?: string;
  role: 'student' | 'admin';
  level: string;
  xp: number;
  streak: number;
  lastStudyDate?: string;
  memberSince: string;
  isActive: boolean;
  completedLessons: string[];
  favorites: {
    vocabulary: string[];
    kanji: string[];
    grammar: string[];
  };
  learned: {
    vocabulary: string[];
    kanji: string[];
  };
  wallet: {
    available: number;
    pending: number;
    totalEarned: number;
    totalWithdrawn: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  section: 'grammar' | 'vocabulary' | 'kanji' | 'listening' | 'reading' | 'lessons';
  japanese?: string;
  hiragana?: string;
  kanji?: string;
  romaji?: string;
  sinhala?: string;
  content: string;
  images?: string[];
  audio?: string;
  questions?: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export interface GrammarItem {
  id: string;
  pattern: string;
  hiragana: string;
  japanese: string;
  sinhalaMeaning: string;
  sinhalaExplanation: string;
  examples: { jp: string; hi: string; si: string }[];
  questions?: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  isPublished: boolean;
}

export interface VocabularyItem {
  id: string;
  japanese: string;
  hiragana: string;
  romaji: string;
  sinhala: string;
  audio?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  reading: string;
  hiragana: string;
  romaji: string;
  sinhala: string;
  examples: { word: string; reading: string; meaning: string }[];
  audio?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
}

export interface Question {
  id: string;
  question: string;
  japaneseText?: string;
  hiragana?: string;
  kanji?: string;
  image?: string;
  audio?: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
}

export interface Paper {
  id: string;
  title: string;
  description: string;
  category: 'daily-games' | 'kanji' | 'jft-past' | 'model' | 'practice' | 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'mock';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  passingScore: number;
  questions: Question[];
  totalMarks: number;
  status: 'draft' | 'published' | 'scheduled' | 'live' | 'closed';
  isPublished: boolean;
  createdAt: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  paperId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: number;
  marks: number;
  numberOfWinners: number;
  rewardPerWinner: number;
  winnerRule: 'highest-score' | 'highest-score-fastest' | 'top-n';
  status: 'scheduled' | 'live' | 'closed';
}

export interface GameAttempt {
  id: string;
  gameId: string;
  userId: string;
  score: number;
  correct: number;
  wrong: number;
  startTime: string;
  submitTime: string;
  completionTime: number; // seconds
  answers: Record<string, string>;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'referral' | 'game-reward' | 'withdrawal' | 'admin-adjustment';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  description: string;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  method: 'bank' | 'mobile';
  bankDetails?: {
    bank: string;
    accountHolder: string;
    accountNumber: string;
    branch: string;
  };
  mobileDetails?: {
    number: string;
    network: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  adminNote?: string;
  createdAt: string;
}

export interface Popup {
  id: string;
  type: 'welcome' | 'whatsapp' | 'announcement' | 'promotion' | 'update' | 'section-intro' | 'game';
  title: string;
  message: string;
  image?: string;
  video?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonAction?: string;
  displayFrequency: 'once' | 'daily' | 'always' | 'session';
  startDate?: string;
  endDate?: string;
  section?: string;
  isEnabled: boolean;
  order: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  link: string;
  order: number;
  isEnabled: boolean;
  showInMobile: boolean;
}

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  image?: string;
  order: number;
  isEnabled: boolean;
  progressKey?: string;
}

export interface ProgressRecord {
  userId: string;
  section: string;
  itemId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
