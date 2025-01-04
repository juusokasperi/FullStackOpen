import { StyleSheet, Pressable, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../theme';

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	search: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 15,
		marginHorizontal: 15,
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 5,
	},
	input: {
		flex: 1,
		flexGrow: 1,
		color: theme.colors.textSecondary,
		paddingLeft: 5,
		minWidth: 100,
		minHeight: 20,
	}
})

const Search = ({onOrderChange, orderBy}) => {
	const handleSearch = (keyword) => {
		const newOrder = {
			label: orderBy.label,
			value: orderBy.value,
			dir: orderBy.dir,
			keyword
		}
		onOrderChange(newOrder);
	}

	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<MaterialIcons name="search" size={24} color={theme.colors.textSecondary} />
					<TextInput
						style={styles.input}
						value={orderBy.keyword}
						placeholder="Search"
						onChangeText={handleSearch}
					/>
				<Pressable onPress={() => handleSearch('')}>
					<MaterialIcons name="close" size={24} color={theme.colors.textSecondary} />
				</Pressable>
			</View>
		</View>
	)
};

export default Search;
