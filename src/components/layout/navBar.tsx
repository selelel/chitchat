import React, { useMemo, useEffect, useState } from 'react';
import DesktopNavBar from './navs/desktop_navbar';

function NavBar() {
  return (
    <>
      {true && <DesktopNavBar/>}
    </>
  );
}
export default NavBar;