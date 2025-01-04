import { gql } from '@apollo/client';
import { USER_BASE_FIELDS } from './fragments';

export const SIGN_IN = gql`
	mutation SignIn($credentials: AuthenticateInput!) {
		authenticate(credentials: $credentials) {
			accessToken
			user {
				...userBaseFields
			}
		}
	}

	${USER_BASE_FIELDS}
`;


export const SIGN_UP = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput!) {
		createReview(review: $review) {
			repository {
				id
			}
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
