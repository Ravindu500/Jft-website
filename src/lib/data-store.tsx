import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  GrammarItem, VocabularyItem, KanjiItem, Lesson, Paper, Game,
  Popup, Announcement, NavItem, DashboardCard, GameAttempt, Transaction, WithdrawalRequest
} from '../types';
import {
  GRAMMAR_ITEMS, VOCABULARY_ITEMS, KANJI_ITEMS, LESSONS, PAPERS, GAMES,
  POPUPS, ANNOUNCEMENTS, NAV_ITEMS, DASHBOARD_CARDS
} from '../data/seed';

interface DataStore {
  grammar: GrammarItem[];
  vocabulary: VocabularyItem[];
  kanji: KanjiItem[];
  lessons: Lesson[];
  papers: Paper[];
  games: Game[];
  popups: Popup[];
  announcements: Announcement[];
  navItems: NavItem[];
  dashboardCards: DashboardCard[];
  attempts: GameAttempt[];
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  // CRUD helpers
  updateGrammar: (items: GrammarItem[]) => void;
  updateVocabulary: (items: VocabularyItem[]) => void;
  updateKanji: (items: KanjiItem[]) => void;
  updateLessons: (items: Lesson[]) => void;
  updatePapers: (items: Paper[]) => void;
  updateGames: (items: Game[]) => void;
  updatePopups: (items: Popup[]) => void;
  updateAnnouncements: (items: Announcement[]) => void;
  updateNavItems: (items: NavItem[]) => void;
  updateDashboardCards: (items: DashboardCard[]) => void;
  addAttempt: (attempt: GameAttempt) => void;
  addTransaction: (tx: Transaction) => void;
  addWithdrawal: (w: WithdrawalRequest) => void;
  updateWithdrawal: (id: string, updates: Partial<WithdrawalRequest>) => void;
}

const DataContext = createContext<DataStore | null>(null);

const KEYS = {
  grammar: 'jft_grammar',
  vocabulary: 'jft_vocabulary',
  kanji: 'jft_kanji',
  lessons: 'jft_lessons',
  papers: 'jft_papers',
  games: 'jft_games',
  popups: 'jft_popups',
  announcements: 'jft_announcements',
  navItems: 'jft_nav',
  dashboardCards: 'jft_cards',
  attempts: 'jft_attempts',
  transactions: 'jft_transactions',
  withdrawals: 'jft_withdrawals',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [grammar, setGrammar] = useState<GrammarItem[]>(() => load(KEYS.grammar, GRAMMAR_ITEMS));
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(() => load(KEYS.vocabulary, VOCABULARY_ITEMS));
  const [kanji, setKanji] = useState<KanjiItem[]>(() => load(KEYS.kanji, KANJI_ITEMS));
  const [lessons, setLessons] = useState<Lesson[]>(() => load(KEYS.lessons, LESSONS));
  const [papers, setPapers] = useState<Paper[]>(() => load(KEYS.papers, PAPERS));
  const [games, setGames] = useState<Game[]>(() => load(KEYS.games, GAMES));
  const [popups, setPopups] = useState<Popup[]>(() => load(KEYS.popups, POPUPS));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => load(KEYS.announcements, ANNOUNCEMENTS));
  const [navItems, setNavItems] = useState<NavItem[]>(() => load(KEYS.navItems, NAV_ITEMS));
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>(() => load(KEYS.dashboardCards, DASHBOARD_CARDS));
  const [attempts, setAttempts] = useState<GameAttempt[]>(() => load(KEYS.attempts, []));
  const [transactions, setTransactions] = useState<Transaction[]>(() => load(KEYS.transactions, []));
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => load(KEYS.withdrawals, []));

  const updateGrammar = (items: GrammarItem[]) => { setGrammar(items); save(KEYS.grammar, items); };
  const updateVocabulary = (items: VocabularyItem[]) => { setVocabulary(items); save(KEYS.vocabulary, items); };
  const updateKanji = (items: KanjiItem[]) => { setKanji(items); save(KEYS.kanji, items); };
  const updateLessons = (items: Lesson[]) => { setLessons(items); save(KEYS.lessons, items); };
  const updatePapers = (items: Paper[]) => { setPapers(items); save(KEYS.papers, items); };
  const updateGames = (items: Game[]) => { setGames(items); save(KEYS.games, items); };
  const updatePopups = (items: Popup[]) => { setPopups(items); save(KEYS.popups, items); };
  const updateAnnouncements = (items: Announcement[]) => { setAnnouncements(items); save(KEYS.announcements, items); };
  const updateNavItems = (items: NavItem[]) => { setNavItems(items); save(KEYS.navItems, items); };
  const updateDashboardCards = (items: DashboardCard[]) => { setDashboardCards(items); save(KEYS.dashboardCards, items); };

  const addAttempt = (attempt: GameAttempt) => {
    const next = [...attempts, attempt];
    setAttempts(next);
    save(KEYS.attempts, next);
  };

  const addTransaction = (tx: Transaction) => {
    const next = [...transactions, tx];
    setTransactions(next);
    save(KEYS.transactions, next);
  };

  const addWithdrawal = (w: WithdrawalRequest) => {
    const next = [...withdrawals, w];
    setWithdrawals(next);
    save(KEYS.withdrawals, next);
  };

  const updateWithdrawal = (id: string, updates: Partial<WithdrawalRequest>) => {
    const next = withdrawals.map(w => w.id === id ? { ...w, ...updates } : w);
    setWithdrawals(next);
    save(KEYS.withdrawals, next);
  };

  return (
    <DataContext.Provider value={{
      grammar, vocabulary, kanji, lessons, papers, games,
      popups, announcements, navItems, dashboardCards,
      attempts, transactions, withdrawals,
      updateGrammar, updateVocabulary, updateKanji, updateLessons,
      updatePapers, updateGames, updatePopups, updateAnnouncements,
      updateNavItems, updateDashboardCards,
      addAttempt, addTransaction, addWithdrawal, updateWithdrawal,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
