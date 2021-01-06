/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoundDetails = /* GraphQL */ `
  query GetRoundDetails($id: ID!) {
    getRoundDetails(id: $id) {
      id
      companyName
      email
      url
      direction
      youtube
      companyDescription
      membersNumber
      membersNames
      membersLinkedin
      bussinesModel
      roundPurpose
      tokenValue
      createdAt
      updatedAt
    }
  }
`;
export const listRoundDetailss = /* GraphQL */ `
  query ListRoundDetailss(
    $filter: ModelRoundDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoundDetailss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyName
        email
        url
        direction
        youtube
        companyDescription
        membersNumber
        membersNames
        membersLinkedin
        bussinesModel
        roundPurpose
        tokenValue
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
