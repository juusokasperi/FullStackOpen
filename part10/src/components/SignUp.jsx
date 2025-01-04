import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(5, 'Length must be between 5 and 30')
		.max(30, 'Length must be between 5 and 30'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Length must be between 5 and 50')
		.max(30, 'Length must be between 5 and 50'),
	passwordConfirm: yup
		.string()
		.required('Password confirm is required')
		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.repositoryBg,
		padding: 20,
		alignSelf: 'stretch',
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: '#000000',
		borderRadius: 5,
		marginBottom: 5,
		padding: 10,
	},
	inputErrorContainer: {
		borderColor: theme.colors.error,
	},
	buttonContainer: {
		borderRadius: 5,
		borderColor: '#000000',
		backgroundColor: theme.colors.primary,
		padding: 15,
		marginTop: 10,
		alignItems: 'center',
	},
})

const initialValues = {
	username: '',
	password: '',
	passwordConfirm: '',
};

export const SignUpForm = ({ onSubmit }) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<View style={styles.container}>
			<View style={[
				styles.inputContainer,
				formik.touched.username && formik.errors.username && styles.inputErrorContainer
			]}>
				<TextInput
					autoCapitalize="none"
					placeholder="Username"
					value={formik.values.username}
					onChangeText={formik.handleChange('username')}
				/>
			</View>
			{formik.touched.username && formik.errors.username && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.username}</Text>
			)}

			<View style={[
				styles.inputContainer,
				formik.touched.password && formik.errors.password && styles.inputErrorContainer
			]}>
				<TextInput
					secureTextEntry
					autoCapitalize="none"
					placeholder="Password"
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
				/>
			</View>
			{formik.touched.password && formik.errors.password && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.password}</Text>
			)}

			<View style={[
				styles.inputContainer,
				formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.inputErrorContainer
			]}>
				<TextInput
					secureTextEntry
					autoCapitalize="none"
					placeholder="Password confirmation"
					value={formik.values.passwordConfirm}
					onChangeText={formik.handleChange('passwordConfirm')}
				/>
			</View>
			{formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.passwordConfirm}</Text>
			)}


			<Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">
					Sign up
				</Text>
			</Pressable>
		</View>
	)
}

const signUpHandler = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const handleSignUp = async (values) => {
		const { username, password } = values;
		const { data } = await signUp({ username, password });
		if (data && data.createUser) {
			await signIn({ username, password })
			navigate("/");
		}
	};

	return handleSignUp;
}

const CreateReview = () => {
	const handleSignUp = signUpHandler();

	return <SignUpForm onSubmit={handleSignUp} />;
};

export default CreateReview;
