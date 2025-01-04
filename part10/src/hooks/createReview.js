import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const createReview = () => {
	const [repository, result] = useMutation(CREATE_REVIEW);

	const review = async ({ repoOwner, repoName, rating, review }) => {
		const payload = await repository({
			variables: {
				review: {
					ownerName: repoOwner,
					repositoryName: repoName,
					rating: parseInt(rating),
					text: review,
				}
			}
		});
		return payload;
	};

	return [review, result];
	};

export default createReview;
