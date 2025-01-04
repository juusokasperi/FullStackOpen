import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
	query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy,
		$orderDirection: OrderDirection, $searchKeyword: String) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection,
			searchKeyword: $searchKeyword, after: $after, first: $first) {
			edges {
				node {
					...repositoryBaseFields
					reviewCount
					ratingAverage
				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
  		}
	}

	${REPOSITORY_BASE_FIELDS}
`;

export const ME = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			...userBaseFields
			reviews @include(if: $includeReviews) {
				edges {
					node {
						text
						rating
						createdAt
						id
						repository {
							id
							fullName
						}
					}
				}
			}
		}
	}
	${USER_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
	query Repository($first: Int, $after: String, $repositoryId: ID!) {
		repository(id: $repositoryId) {
			...repositoryBaseFields
			reviewCount
			ratingAverage
			...reviewFields
		}
	}

	${REPOSITORY_BASE_FIELDS}
	${REVIEW_FIELDS}
`;
