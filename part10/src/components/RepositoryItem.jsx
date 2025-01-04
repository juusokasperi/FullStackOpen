import { Pressable, View, StyleSheet, Image } from 'react-native';
import Text from "./Text";
import theme from '../theme';
import * as Linking from 'expo-linking';

const formatCount = (count) => {
	if (count >= 1000000) {
		return `${(count / 1000000).toFixed(1)}m`;
	}
	else if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count.toString();
}

const styles = StyleSheet.create({
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
	image: {
		width: 65,
		height: 65,
		marginRight: 10,
		borderRadius: 5,
	},
	languageContainer: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		marginTop: 4,
		padding: 5,
		alignSelf: 'flex-start',
	},
	linkContainer: {
		backgroundColor: theme.colors.primary,
		borderRadius: 25,
		marginTop: 15,
		padding: 15,
		alignItems: 'center',
	},
})

const BasicInfo = ({ data }) => (
	<View style={styles.flexRow}>
		<Image source={{ uri: data.ownerAvatarUrl }} style={styles.image} />
		<View style={styles.flexColumn}>
			<Text fontSize="subheading" fontWeight="bold" >{data.fullName}</Text>
			<Text>{data.description}</Text>
			<View style={styles.languageContainer}>
					<Text color="textInvert">{data.language}</Text>
			</View>
		</View>
	</View>
)

const DetailedInfo = ({ data }) => (
	<View style={styles.flexRow}>
		<View style={styles.flexColumn}>
			<Text fontSize="subheading" fontWeight="bold">{formatCount(data.stargazersCount)}</Text>
			<Text>Stars</Text>
		</View>
		<View style={styles.flexColumn}>
			<Text fontSize="subheading" fontWeight="bold">{formatCount(data.forksCount)}</Text>
			<Text>Forks</Text>
		</View>
		<View style={styles.flexColumn}>
			<Text fontSize="subheading" fontWeight="bold">{formatCount(data.reviewCount)}</Text>
			<Text>Reviews</Text>
		</View>
		<View style={styles.flexColumn}>
			<Text fontSize="subheading" fontWeight="bold">{formatCount(data.ratingAverage)}</Text>
			<Text>Rating</Text>
		</View>
	</View>
)

const GitLink = ({ url }) => (
		<View style={styles.linkContainer}>
			<Pressable onPress={() => Linking.openURL(url)}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">
					Open in GitHub
				</Text>
			</Pressable>
		</View>
)

const RepositoryItem = ({ data, singleView }) => (
	<View testID="repositoryItem" style={styles.flexContainer}>
		<BasicInfo data={data} />
		<DetailedInfo data={data} />
		{ singleView && (
			<GitLink url={data.url} />
		)}
	</View>
);

export default RepositoryItem;
