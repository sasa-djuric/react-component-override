module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t|j)sx?$': [
		  '@swc/jest',
		  {
			jsc: {
			  transform: {
				react: {
				  runtime: 'automatic',
				},
			  },
			},
		  },
		],
	  },
  }
