import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

import { useParams } from 'react-router-native'

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	flexContainer: {
		padding: 10,
		backgroundColor: theme.colors.repositoryBg,
	},
	flexRow: {
		flexDirection: 'row',
	},
	flexColumn: {
		flexShrink: 1,
		flex: 1,
		flexDirection: 'column',
	},
	ratingContainer: {
		borderColor: theme.colors.primary,
		height: 40,
		width: 40,
		borderRadius: 20,
		borderWidth: 3,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	return format(date, 'dd.MM.yyyy');
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
	<>
	<RepositoryItem data={repository} singleView/>
	<ItemSeparator />
	</>
)

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.flexContainer}>
			<View style={styles.flexRow}>
				<View style={styles.ratingContainer}>
					<Text color="primary" fontSize="subheading" fontWeight="bold">{review.rating}</Text>
				</View>
				<View style={styles.flexColumn}>
					<Text fontSize="subheading" fontWeight="bold" >{review.user.username}</Text>
					<Text color="textSecondary" style={{ paddingTop: 2, paddingBottom: 5 }}>{formatDate(review.createdAt)}</Text>
					<Text>{review.text}</Text>
				</View>
			</View>
		</View>
	)
}

const SingleRepository = () => {
	const { id } = useParams();
	const { repository, loading, error, fetchMore } = useRepository(id, 8);
	const onEndReach = () => fetchMore();

	const reviews = repository
		? repository.reviews.edges.map(edge => edge.node)
		: [];

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return (
			<FlatList
				data={reviews}
				renderItem={({ item }) => <ReviewItem review={item} />}
				ItemSeparatorComponent={ItemSeparator}
				ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
	)
}

export default SingleRepository;
