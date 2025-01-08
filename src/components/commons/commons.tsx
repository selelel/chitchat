'use client'
import styled from '@emotion/styled'
import { DM_Serif_Display } from 'next/font/google'

const dm_serif_display = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400',
})

export const ccl = ({ className }: { className?: string }) => (
    <h4
        className={`whitespace-nowrap text-2xl break-n font-normal text-custom-black ${dm_serif_display.className} ${className}`}
    >
        ChitChat
    </h4>
)

// Main layout component
export const Main = styled.main`
    padding: var(--space-unit) var(--space-unit * 2); // 8px left/right, 16px top/bottom
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
`

// Container component
export const Container = styled.div`
    padding: var(--space-unit * 3) var(--space-unit * 2);
    width: 100%;
    max-width: 1200px; // Optional, can be adjusted for design needs
    margin: 0 auto;
    box-sizing: border-box;
`

// Section component, used to break up content into logical blocks
export const Section = styled.section`
    padding: var(--space-unit * 3) 0; // 24px top/bottom padding
    margin-bottom: var(
        --space-unit * 4
    ); // 32px bottom margin to separate sections
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
`

// Row component, useful for row-based layouts (flexbox)
export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(
        var(--space-unit) / 2
    ); // Negative margin for gutter space
    margin-right: calc(var(--space-unit) / 2);
`

// Column component, useful for grid system (flexbox columns)
export const Column = styled.div`
    flex: 1;
    padding-left: calc(var(--space-unit) / 2); // Gutter padding (4px)
    padding-right: calc(var(--space-unit) / 2);
    box-sizing: border-box;

    // For larger screens, you can add media queries to control column widths
    @media (min-width: 768px) {
        flex-basis: calc(33.33% - var(--space-unit)); // 3 equal-width columns
    }
    @media (min-width: 1024px) {
        flex-basis: calc(
            25% - var(--space-unit)
        ); // 4 equal-width columns on larger screens
    }
`
