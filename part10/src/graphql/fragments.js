import { gql } from '@apollo/client';

export const REPOSITORY_BASE_FIELDS = gql`
	fragment repositoryBaseFields on Repository {
		id
		name
		ownerName
		fullName
		stargazersCount
		forksCount
		url
		ownerAvatarUrl
		description
		language
		createdAt
	}
`;

export const REVIEW_FIELDS = gql`
	fragment reviewFields on Repository {
		reviews(first: $first, after: $after) {
			edges {
				node {
					user {
						username
					}
					rating
					text
					createdAt
				}
				cursor
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;

export const USER_BASE_FIELDS = gql`
	fragment userBaseFields on User {
		id
		username
		createdAt
	}
`;
