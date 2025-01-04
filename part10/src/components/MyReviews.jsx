import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { FlatList, Pressable, View, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	return format(date, 'dd.MM.yyyy');
};

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	flexContainer: {
		padding: 10,
		gap: 5,
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
	buttonContainer: {
		borderRadius: 5,
		borderColor: '#000000',
		backgroundColor: theme.colors.primary,
		padding: 15,
		margin: 5,
		alignItems: 'center',
	},
	deleteContainer: {
		borderRadius: 5,
		borderColor: '#000000',
		backgroundColor: '#d6394c',
		padding: 15,
		margin: 5,
		alignItems: 'center',
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
	const navigate = useNavigate();
	const [deleteReview] = useMutation(DELETE_REVIEW);

	const handleDelete = (id) => {
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				onPress: () => {
					deleteReview({
						variables: { 'deleteReviewId': id },
						onCompleted: () => { refetch(); },
					})
				},
			},
		]);
	}

	return (
	<View style={styles.flexContainer}>
		<View style={styles.flexRow}>
			<View style={styles.ratingContainer}>
				<Text color="primary" fontSize="subheading" fontWeight="bold">{review.rating}</Text>
			</View>
			<View style={styles.flexColumn}>
				<Text fontSize="subheading" fontWeight="bold" >{review.repository.fullName}</Text>
				<Text color="textSecondary" style={{ paddingTop: 2, paddingBottom: 5 }}>{formatDate(review.createdAt)}</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
		<View style={styles.flexRow}>
			<Pressable style={styles.buttonContainer} onPress={() => navigate(`/repositories/${review.repository.id}`)}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">
					View repository
				</Text>
			</Pressable>
			<Pressable style={styles.deleteContainer} onPress={() => handleDelete(review.id)}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">
					Delete review
				</Text>
			</Pressable>
		</View>
	</View>
)};

const MyReviewsList = ({ myReviews, refetch }) => {
	const reviewNodes = myReviews
		? myReviews.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({item}) => (
				<ReviewItem review={item} refetch={refetch} />
				)}
		/>
	);
}


const MyReviews = () => {
	const { data, loading, error, refetch } = useQuery(ME, {
		variables: { "includeReviews": true },
		fetchPolicy: 'cache-and-network',
	});

	if (loading)
		return <Text>Loading...</Text>;
	if (error)
		return <Text>Error loading reviews</Text>;
	const myReviews = data?.me?.reviews;

	return <MyReviewsList myReviews={myReviews} refetch={refetch}/>;
};

export default MyReviews;
