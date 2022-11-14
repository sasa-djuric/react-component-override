import React, { useMemo } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useOverrides } from './overrides.context';
import { idGenerator } from './utils';
import {
	OverridableComponent,
	OverridableComponentType,
	Override
} from './types';
import { OverrideProvider, useCurrentOverride } from './override.context';

const overridableGeneratorId = idGenerator();

export function overridable<ComponentType extends OverridableComponentType>(
	Component: ComponentType
) {
	const overridableId = overridableGeneratorId.next().value;

	const OverridableComponent = function (
		props: React.ComponentProps<ComponentType>
	) {
		const { overrides } = useOverrides() ?? {};
		const currentOverrideId = useCurrentOverride();

		const RenderComponent = useMemo(() => {
			const Override = overrides?.[overridableId];
			const isOverriddenWithItSelf = currentOverrideId === overridableId;

			if (isOverriddenWithItSelf) {
				return Component;
			}

			return Override ?? Component;
		}, [currentOverrideId, overrides]);

		return <RenderComponent {...props} />;
	};

	(OverridableComponent as OverridableComponent).overridableId =
		overridableId;

	hoistNonReactStatics(OverridableComponent, Component);

	return OverridableComponent;
}

export function override(
	Current: OverridableComponentType,
	Override: OverridableComponentType
): Override {
	const EnhancedOverride = function (props: any) {
		return (
			<OverrideProvider
				value={{
					overrideId: (Current as OverridableComponent).overridableId
				}}
			>
				<Override {...props} />
			</OverrideProvider>
		);
	};

	hoistNonReactStatics(EnhancedOverride, Override);

	return {
		[(Current as OverridableComponent).overridableId]: EnhancedOverride
	};
}

export function createOverrides(overrides: Array<Override>) {
	return overrides;
}

