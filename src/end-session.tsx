import { showToast, Toast } from "@raycast/api";
import { runInsomniaCommand } from "./insomnia";

export default async function Command() {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Ending Insomnia session..." });
  const result = await runInsomniaCommand("end");

  if (result.success) {
    toast.style = Toast.Style.Success;
    toast.title = "Insomnia session ended";
    toast.message = result.output;
  } else {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to end session";
    toast.message = result.error;
  }
}
