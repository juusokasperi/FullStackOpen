import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
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
		marginTop: 5,
		alignItems: 'center'
	},
})

const initialValues = {
	username: '',
	password: '',
};

export const SignInForm = ({ onSubmit }) => {
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
					placeholder="Username"
					autoCapitalize='none'
					value={formik.values.username}
					onChangeText={formik.handleChange('username')}
				/>
			</View>
			{formik.touched.username && formik.errors.username && (
				<Text style={{ color: theme.colors.error, paddingBottom: 5 }}>{formik.errors.username}</Text>
			)}
			<View style={[
				styles.inputContainer,
				formik.touched.username && formik.errors.username && styles.inputErrorContainer
			]}>
				<TextInput
					placeholder="Password"
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
					secureTextEntry
				/>
			</View>
			{formik.touched.password && formik.errors.password && (
				<Text style={{ color: theme.colors.error, paddingBottom: 5 }}>{formik.errors.password}</Text>
			)}
			<Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">Sign in</Text>
			</Pressable>
		</View>
	)
}

const signInHandler = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const handleSignIn = async (values) => {
		const { username, password } = values;
		await signIn({ username, password });
		navigate("/");
	};

	return handleSignIn;
}

const SignIn = () => {
	const handleSignIn = signInHandler();

	return <SignInForm onSubmit={handleSignIn} />;
};

export default SignIn;
