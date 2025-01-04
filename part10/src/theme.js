import { Platform } from 'react-native';

const theme = {
	colors: {
	  mainBg: '#e1e4e8',
	  repositoryBg: '#FFFFFF',
	  appBar: '#24292e',
	  textPrimary: '#24292e',
	  textSecondary: '#586069',
	  textInvert: '#FFFFFF',
	  primary: '#0366d6',
	  error: '#d73a4a',
	},
	fontSizes: {
	  body: 14,
	  subheading: 16,
	},
	fonts: {
	  main: Platform.select({
		android: 'Roboto',
		ios: 'Arial',
		default: 'System',
	  }),
	},
	fontWeights: {
	  normal: '400',
	  bold: '700',
	},
  };

  export default theme;
