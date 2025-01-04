import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import createReview from '../hooks/createReview';
import theme from '../theme';

const validationSchema = yup.object().shape({
	repoOwner: yup.string().required('Repository owner name is required'),
	repoName: yup.string().required('Repository name is required'),
	rating: yup
		.number()
		.required('Rating is required')
		.min(0, 'Rating must be at least 0')
		.max(100, 'Rating cannot exceed 100')
		.integer('Rating must be an integer'),
	review: yup.string(),
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
	repoOwner: '',
	repoName: '',
	rating: '',
	review: '',
};

export const ReviewForm = ({ onSubmit }) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<View style={styles.container}>
			<View style={[
				styles.inputContainer,
				formik.touched.repoOwner && formik.errors.repoOwner && styles.inputErrorContainer
			]}>
				<TextInput
					autoCapitalize="none"
					placeholder="Repository owner name"
					value={formik.values.repoOwner}
					onChangeText={formik.handleChange('repoOwner')}
				/>
			</View>
			{formik.touched.repoOwner && formik.errors.repoOwner && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.repoOwner}</Text>
			)}

			<View style={[
				styles.inputContainer,
				formik.touched.repoName && formik.errors.repoName && styles.inputErrorContainer
			]}>
				<TextInput
					autoCapitalize="none"
					placeholder="Repository name"
					value={formik.values.repoName}
					onChangeText={formik.handleChange('repoName')}
				/>
			</View>
			{formik.touched.repoName && formik.errors.repoName && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.repoName}</Text>
			)}

			<View style={[
				styles.inputContainer,
				formik.touched.rating && formik.errors.rating && styles.inputErrorContainer
			]}>
				<TextInput
					placeholder="Rating between 0 and 100"
					value={formik.values.rating}
					onChangeText={formik.handleChange('rating')}
				/>
			</View>
			{formik.touched.rating && formik.errors.rating && (
				<Text style={{ color: theme.colors.error, paddingBottom: 10 }}>{formik.errors.rating}</Text>
			)}

			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Review"
					value={formik.values.review}
					onChangeText={formik.handleChange('review')}
					multiline
				/>
			</View>

			<Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
				<Text fontSize="subheading" fontWeight="bold" color="textInvert">
					Create a review
				</Text>
			</Pressable>
		</View>
	)
}

const createReviewHandler = () => {
	const [createdReview] = createReview();
	const navigate = useNavigate();

	const handleCreateReview = async (values) => {
		const { repoOwner, repoName, rating, review } = values;
		const { data } = await createdReview({ repoOwner, repoName, rating, review });
		if (data && data.createReview && data.createReview.repository.id) {
			navigate(`/repositories/${data.createReview.repository.id}`);
		}
	};

	return handleCreateReview;
}

const CreateReview = () => {
	const handleReview = createReviewHandler();

	return <ReviewForm onSubmit={handleReview} />;
};

export default CreateReview;
