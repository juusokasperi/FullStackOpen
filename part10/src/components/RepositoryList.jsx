import { FlatList, Pressable, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from '../hooks/useRepositories';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const { onOrderChange, orderBy } = this.props;
		return (
			<HeaderComponent onOrderChange={onOrderChange} orderBy={orderBy}/>
		);
	};

	render() {
		const { repositories, onEndReach, navigate } = this.props;
		const repositoryNodes = repositories
			? repositories.edges.map(edge => edge.node)
			: [];

		return (
			<FlatList
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
			data={repositoryNodes}
			ListHeaderComponent={this.renderHeader}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({item}) => (
				<Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
					<RepositoryItem data={item} />
				</Pressable>
				)}
		/>
		)
	}
};

const RepositoryList = () => {
	const [orderBy, setOrderBy] = useState({
		label: 'Latest repositories', value: 'CREATED_AT', dir: 'DESC', keyword: ''});
	const { repositories, fetchMore } = useRepositories(orderBy.value, orderBy.dir, orderBy.keyword, 8);
	const navigate = useNavigate();

	const onOrderChange = (newOrder) => setOrderBy(newOrder);
	const onEndReach = () => fetchMore();

	return <RepositoryListContainer
		repositories={repositories}
		onEndReach={onEndReach}
		navigate={navigate}
		onOrderChange={onOrderChange}
		orderBy={orderBy}
		/>;
};

export default RepositoryList;
