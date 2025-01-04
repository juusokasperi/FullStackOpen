import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import theme from '../theme';
import Text from "./Text";
import useAuthStorage from '../hooks/useAuthStorage'
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight,
	backgroundColor: theme.colors.appBar,
  },
  tab: {
	padding: 5,
  },
  flexRow: {
	flexDirection: 'row',
  },
});

const AppBarTab = ({ buttonName, link, ...props }) => {
		const content = (
				<Text style={styles.tab} fontWeight="bold" fontSize="subheading" color="textInvert">
					{buttonName}
				</Text>
		);

		return link ? (
			<Link to={link} {...props}>
				{content}
			</Link>
		) : (
			<Pressable {...props}>{content}</Pressable>
		);
	};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const { data } = useQuery(ME);
  const isLoggedIn = data?.me;

  const onSignOut = async() => {
	await authStorage.removeAccessToken();
	apolloClient.resetStore();
	navigate("/");
  }

  return (
  	<View style={styles.appBar}>
		<ScrollView horizontal style={styles.flexRow}>
		<AppBarTab buttonName="Repositories" link="/"/>

		{isLoggedIn ? (
			<>
			<AppBarTab buttonName="Create a review" link="/create-review" />
			<AppBarTab buttonName="My reviews" link="/my-reviews" />
			<AppBarTab buttonName="Sign out" onPress={onSignOut} />
			</>
			) : (
			<>
			<AppBarTab buttonName="Sign in" link="/login" />
			<AppBarTab buttonName="Sign up" link="/signup" />
			</>
		)}
		</ScrollView>
	</View>
  )
};

export default AppBar;
