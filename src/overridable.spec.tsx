import { render } from '@testing-library/react';
import { overridable, override, createOverrides, OverridesProvider } from './';

const TestComponent: React.FunctionComponent = overridable(() => {
	return <span>Test component</span>;
});

const OverridenComponent: React.FunctionComponent = () => {
	return <span>Overriden component</span>;
};

describe('Given overrides are not provided', () => {
	it('should render original component', () => {
		const { queryByText } = render(<TestComponent />);
		expect(queryByText('Test component')).toBeTruthy();
	});
});

describe('Given overrides are provided', () => {
	it('should render overriden component', () => {
		const overrides = createOverrides([
			override(TestComponent, OverridenComponent)
		]);

		const { queryByText } = render(
			<OverridesProvider overrides={overrides}>
				<TestComponent />
			</OverridesProvider>
		);

		expect(queryByText('Overriden component')).toBeTruthy();
		expect(queryByText('Test component')).not.toBeTruthy();
	});

	it('should resolve original component when override is using it', () => {
		const overrides = createOverrides([
			override(TestComponent, props => <TestComponent {...props} />)
		]);

		const { queryByText } = render(
			<OverridesProvider overrides={overrides}>
				<span>Overriden component</span>
				<TestComponent />
			</OverridesProvider>
		);

		expect(queryByText('Test component')).toBeTruthy();
		expect(queryByText('Overriden component')).toBeTruthy();
	});
});

