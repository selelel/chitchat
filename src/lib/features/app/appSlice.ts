import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";import { fecthServerStatus } from "./fetchServerStatus";
import { ServerTypes } from "@/lib/types/appInitialStateType";

const initialState: ServerTypes = {
  server_status: { status: 'DOWN' }
};

export const counterSlice = createAppSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    isServerOnline: create.asyncThunk(
      async () => {
        return await fecthServerStatus();
        
      }, 
      {
        fulfilled: (state, actions) => {
          state.server_status = {status: actions.payload}
        }
      }
    ),
  }),
  selectors: {
    selectSeverStatus: (counter) => counter.server_status,
  },
});

export const { isServerOnline } =
  counterSlice.actions;

export const { selectSeverStatus } = counterSlice.selectors;

export const ServerStatus = (): AppThunk => async (dispatch, getState) => {
  const intervalId = setInterval(async () => {
    const state = getState();
    const { status } = selectSeverStatus(state);

    console.log(`Current status: ${status}`); // Debugging log

    if (status === 'DOWN') {
      console.log("The server is down!");
      await dispatch(isServerOnline());
    } else {
      console.log("The server is online!");
      clearInterval(intervalId);
    }
  }, 10000);
  
  console.log("Checking server status...");
};

