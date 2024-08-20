'use client';

import { createContext, ReactNode, useContext } from 'react';

type UserData = {
    id: string | null,
    emp_id: string | null;
    emp_name: string | null;
    emp_surname: string | null;
    role: string | null;
};

export const UserSessionContext = createContext<{
    user: UserData;
} | undefined>(undefined);

export const SessionProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const user = { id: null, emp_id: null, emp_name: null, emp_surname: null, role: null };
    return <UserSessionContext.Provider value={{ user }}>{children}</UserSessionContext.Provider>;
};

export const useSession = () => {
    const context = useContext(UserSessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a UserSessionProvider');
    }
    return context;
};
