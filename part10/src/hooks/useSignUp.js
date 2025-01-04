import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
	const [createdUser, result] = useMutation(SIGN_UP);

	const signUp = async ({ username, password }) => {
		const payload = await createdUser({
			variables: {
				user: { username, password }
			}
		});
		return payload;
	};

	return [signUp, result];
	};

export default useSignUp;
