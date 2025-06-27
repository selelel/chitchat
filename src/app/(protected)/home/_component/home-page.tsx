'use client'
import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import RecommendedPosts from './recommended-posts'
import FollowingPosts from './following-posts'

function HomePage() {
    const [activeTab, setActiveTab] = useState<'recommended' | 'following'>(
        'recommended'
    )

    return (
        <Layout>
            {/* Toggle UI */}
            <div className="max-w-4xl mx-auto mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('recommended')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                            activeTab === 'recommended'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Recommended
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                            activeTab === 'following'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Following
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'recommended' ? (
                <RecommendedPosts />
            ) : (
                <FollowingPosts />
            )}
        </Layout>
    )
}

export default HomePage
