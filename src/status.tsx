import { showToast, Toast } from "@raycast/api";
import { getStatus } from "./insomnia";

export default async function Command() {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Checking Insomnia status..." });
  const result = await getStatus();

  if (result.success) {
    toast.style = Toast.Style.Success;
    toast.title = "Insomnia Status";
    toast.message = result.output;
  } else {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to get status";
    toast.message = result.error;
  }
}
