const DEVICES_URL = "https://api.restful-api.dev/objects";

export async function fetchDevices() {
  const response = await fetch(DEVICES_URL);
  return await response.json();
}
