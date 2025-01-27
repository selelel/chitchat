import { LOCALSTORAGE } from '@/constants/localstorage'
import { GRAPHQL_URI } from '@/config/env'
import { GraphQLClient } from 'graphql-request'
import { localStorageGetItem } from '../helper/localstorage'

export const client = new GraphQLClient(GRAPHQL_URI, {
    credentials: 'include',
    headers: {
        Authorization: `Bearer ${localStorageGetItem(LOCALSTORAGE['ACCESSTOKEN'])}`,
    },
})
