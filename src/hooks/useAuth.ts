import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  } = useAuthStore();

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  };
};