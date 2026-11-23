import { ActionPanel, Action, List, showToast, Toast, Icon } from "@raycast/api";
import { runInsomniaCommand } from "./insomnia";

const PRESETS = [
  { title: "15 Minutes", seconds: 15 * 60 },
  { title: "30 Minutes", seconds: 30 * 60 },
  { title: "1 Hour", seconds: 60 * 60 },
  { title: "2 Hours", seconds: 2 * 60 * 60 },
  { title: "4 Hours", seconds: 4 * 60 * 60 },
  { title: "8 Hours", seconds: 8 * 60 * 60 },
];

export default function Command() {
  async function start(seconds: number, title: string) {
    const toast = await showToast({ style: Toast.Style.Animated, title: `Starting ${title} session...` });
    const result = await runInsomniaCommand("start", seconds);

    if (result.success) {
      toast.style = Toast.Style.Success;
      toast.title = `Insomnia active: ${title}`;
      toast.message = result.output;
    } else {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to start session";
      toast.message = result.error;
    }
  }

  async function end() {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Ending session..." });
    const result = await runInsomniaCommand("end");
    if (result.success) {
      toast.style = Toast.Style.Success;
      toast.title = "Insomnia session ended";
    } else {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to end session";
      toast.message = result.error;
    }
  }

  return (
    <List>
      <List.Section title="Start Awake Session">
        {PRESETS.map((preset) => (
          <List.Item
            key={preset.seconds}
            title={preset.title}
            icon={Icon.Clock}
            actions={
              <ActionPanel>
                <Action title={`Start (${preset.title})`} onAction={() => start(preset.seconds, preset.title)} />
                <Action title="End Current Session" style={Action.Style.Destructive} onAction={end} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
