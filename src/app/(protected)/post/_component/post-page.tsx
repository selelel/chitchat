'use client'
import Layout from '@/components/layout/layout'
import CreatePostComponent from '@/app/(protected)/post/_component/post-create-post-component'
import React from 'react'

export default function PostPage() {
    return (
        <Layout>
            <CreatePostComponent />
        </Layout>
    )
}
