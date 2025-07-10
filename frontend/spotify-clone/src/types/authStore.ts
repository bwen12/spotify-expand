export interface AuthStore {
    isAdmin: boolean;
    error : string | null;
    isLoading: boolean;
    checkAdminStatus: () => Promise<void>;
    resetAuthState: () => void;
}
