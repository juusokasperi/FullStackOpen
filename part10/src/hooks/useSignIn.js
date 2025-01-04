import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';

import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [login, result] = useMutation(SIGN_IN);

	const signIn = async ({ username, password }) => {
		const payload = await login({
			variables: {
				credentials: { username, password }
			}
		});

		const { data } = payload;

		if (data?.authenticate) {
			await authStorage.setAccessToken(data.authenticate.accessToken);
			apolloClient.resetStore();
		}
		return payload;
	};

	return [signIn, result];
	};

export default useSignIn;
