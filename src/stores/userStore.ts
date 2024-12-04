import create from 'zustand';
import type { User } from '../types';

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  getUsers: () => User[];
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  getUsers: () => get().users
}));