import { createContext, useContext } from 'react';

interface OverrideContextValue {
	overrideId: string;
}

const OverrideContext = createContext<OverrideContextValue | null>(null);

export const OverrideProvider = OverrideContext.Provider;

export function useCurrentOverride() {
	return useContext(OverrideContext)?.overrideId;
}
