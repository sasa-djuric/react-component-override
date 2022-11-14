import React, { createContext, useContext, useMemo } from 'react';
import { Override } from './types';

interface OverridesContextValue {
	overrides: Override;
}

const OverridesContext = createContext<OverridesContextValue | null>(null);

interface OverrideProviderProps {
	overrides: Array<Override>;
	children: React.ReactNode;
}

export const OverridesProvider: React.FunctionComponent<
	OverrideProviderProps
> = ({ overrides, children }) => {
	const overridesMap = useMemo(
		() =>
			overrides.reduce((map, override) => {
				return { ...map, ...override };
			}, {} as Override),
		[overrides]
	);

	return (
		<OverridesContext.Provider value={{ overrides: overridesMap }}>
			{children}
		</OverridesContext.Provider>
	);
};

export function useOverrides() {
	return useContext(OverridesContext);
}
