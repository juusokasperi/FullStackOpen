import { View } from 'react-native';
import OrderBy from './OrderBy';
import Search from './Search';

const HeaderComponent = ({onOrderChange, orderBy}) => {
	return (
		<View>
			<Search onOrderChange={onOrderChange} orderBy={orderBy} />
			<OrderBy onOrderChange={onOrderChange} orderBy={orderBy} />
		</View>
	)
}

export default HeaderComponent;
