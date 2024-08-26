'use client';

import styled from '@emotion/styled';

export const AlienMonsterPatternBackground = styled.div`
  position: relative; /* Needed for positioning the pseudo-element */

  background-image: url('/monster_.png'); /* Ensure this path is correct */
  background-size: cover;
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Ensures the image does not repeat */
  overflow: hidden; /* Hides overflow to prevent any visual artifacts */
  transition: background-size 0.5s ease-in-out, transform 0.5s ease-in-out;

  * {
    position: relative;
    z-index: 1;
  }
`;
