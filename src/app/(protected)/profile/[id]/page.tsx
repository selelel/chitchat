'use client'
import Layout from '@/components/layout/layout'
import React from 'react'
import UserProfileDynamic from '../_component/user-profile-dynamic'

function IndexPage({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <UserProfileDynamic username={params.id} />
        </Layout>
    )
}

export default IndexPage
