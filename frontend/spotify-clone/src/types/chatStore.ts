import type { Users } from "@/types/users";

export interface ChatStore {
    users: Users[]; // Array of user objects
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    error : string | null;
}

