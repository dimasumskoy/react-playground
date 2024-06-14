import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchDevices } from "./devicesAPI"; // Fix the import statement to match the file name

export interface Device {
  id: number;
  name: string;
  data: {
    Color?: string;
    Description?: string;
    price?: number;
    capacity?: number;
    generation?: string;
    "CPU model"?: string;
    "Hard disk size"?: string;
    "Screen size"?: number;
    "Strap Colour"?: string;
    "Case Size"?: string;
  };
}

export interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: [],
};

export const fetchDevicesAsync: AsyncThunk<Device[], void, {}> =
  createAsyncThunk("deices/fetch", async (): Promise<Device[]> => {
    const response: Device[] = await fetchDevices();
    return response;
  });

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state: DeviceState, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state: DeviceState, action: PayloadAction<number>) => {
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDevicesAsync.fulfilled,
      (state: DeviceState, action: PayloadAction<Device[]>): DeviceState => {
        return {
          ...state,
          devices: action.payload,
        };
      }
    );
  },
});
