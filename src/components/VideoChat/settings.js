import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "a1be50e6bdc4485292b3d143bfa94f67";
const token = "006a1be50e6bdc4485292b3d143bfa94f67IAC1W1zWy+kZPMzDw0QrDSr+UneRXIWu9NZ5/90vQEZfTGTNKL8AAAAAEAAtDEjTZZLdYgEAAQBjkt1i";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";