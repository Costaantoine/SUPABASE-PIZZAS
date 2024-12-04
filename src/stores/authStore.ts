import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import toast from 'react-hot-toast';
import { validateEmail, validatePassword } from '../lib/validation';
import { sendPasswordResetEmail } from '../lib/email';

interface SignUpData {
  full_name: string;
  phone: string;
  address: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  users: User[];
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

// Comptes de démonstration
const DEMO_USERS: User[] = [
  {
    id: 'demo-1',
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin',
    full_name: 'Admin Demo',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Demo, 75001 Paris',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'demo-2',
    email: 'pizzeria@demo.com',
    password: 'demo123',
    role: 'pizzeria',
    full_name: 'Pizzeria Demo',
    phone: '+33 6 98 76 54 32',
    address: '456 Avenue de la Pizzeria, 75002 Paris',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'demo-3',
    email: 'client@demo.com',
    password: 'demo123',
    role: 'client',
    full_name: 'Client Demo',
    phone: '+33 6 11 22 33 44',
    address: '789 Boulevard du Client, 75003 Paris',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      users: [],

      signIn: async (email: string, password: string) => {
        if (!validateEmail(email)) {
          throw new Error('Format d\'email invalide');
        }

        if (!validatePassword(password)) {
          throw new Error('Mot de passe invalide');
        }

        // Vérifier d'abord les comptes de démonstration
        const demoUser = DEMO_USERS.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (demoUser) {
          const { password: _, ...userWithoutPassword } = demoUser;
          set({ user: userWithoutPassword });
          toast.success('Connexion réussie !');
          return;
        }

        // Ensuite vérifier les comptes utilisateur normaux
        const { users } = get();
        const user = users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword });
          toast.success('Connexion réussie !');
        } else {
          throw new Error('Email ou mot de passe incorrect');
        }
      },

      signUp: async (email: string, password: string, data: SignUpData) => {
        if (!validateEmail(email)) {
          throw new Error('Format d\'email invalide');
        }

        if (!validatePassword(password)) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères');
        }

        const { users } = get();
        const allUsers = [...DEMO_USERS, ...users];

        if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          throw new Error('Cet email est déjà utilisé');
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          password,
          role: 'client',
          full_name: data.full_name,
          phone: data.phone,
          address: data.address,
          created_at: new Date().toISOString()
        };

        set(state => ({
          users: [...state.users, newUser],
          user: { ...newUser, password: undefined }
        }));

        toast.success('Inscription réussie !');
      },

      signOut: async () => {
        set({ user: null });
        toast.success('Déconnexion réussie');
      },

      updateProfile: async (data: Partial<User>) => {
        const { user, users } = get();
        if (!user) return;

        const updatedUser = { ...user, ...data };

        set({
          user: updatedUser,
          users: users.map(u => 
            u.id === user.id ? { ...u, ...data } : u
          )
        });

        toast.success('Profil mis à jour avec succès');
      },

      requestPasswordReset: async (email: string) => {
        if (!validateEmail(email)) {
          throw new Error('Format d\'email invalide');
        }

        const { users } = get();
        const allUsers = [...DEMO_USERS, ...users];
        const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
          // Pour des raisons de sécurité, simuler un délai même si l'utilisateur n'existe pas
          await new Promise(resolve => setTimeout(resolve, 1000));
          return;
        }

        if (user.id.startsWith('demo-')) {
          throw new Error('Les comptes de démonstration ne peuvent pas être modifiés');
        }

        const resetToken = Math.random().toString(36).substring(2, 15);
        await sendPasswordResetEmail(email, user.full_name || 'Utilisateur', resetToken);

        toast.success('Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation');
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        users: state.users.map(({ password, ...rest }) => rest)
      })
    }
  )
);