interface OverridableStatics {
	overridableId: string;
}

export type OverridableComponentType =
	| React.FunctionComponent
	| React.ComponentClass;

export type OverridableComponent = OverridableComponentType &
	OverridableStatics;

export interface Override {
	[key: string]: React.FunctionComponent | React.ComponentClass;
}
