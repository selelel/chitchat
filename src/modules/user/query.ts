import graphqlClient from "@/services/graphqlClient"

export const fetchUserQuery = `
    query TestQuery {
        testQuery {
            _id
            email
            tags
            status
            isPrivate
        }
    }
`