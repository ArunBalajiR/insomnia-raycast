import { ActionPanel, Action, List, showToast, Toast, Icon } from "@raycast/api";
import { runInsomniaCommand } from "./insomnia";

const PRESETS = [
  { title: "15 Minutes", seconds: 15 * 60 },
  { title: "30 Minutes", seconds: 30 * 60 },
  { title: "1 Hour", seconds: 60 * 60 },
  { title: "2 Hours", seconds: 2 * 60 * 60 },
];

export default function Command() {
  async function extend(seconds: number, title: string) {
    const toast = await showToast({ style: Toast.Style.Animated, title: `Extending by ${title}...` });
    const result = await runInsomniaCommand("extend", seconds);

    if (result.success) {
      toast.style = Toast.Style.Success;
      toast.title = `Extended: ${title}`;
      toast.message = result.output;
    } else {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to extend session";
      toast.message = result.error;
    }
  }

  return (
    <List>
      <List.Section title="Extend Active Session">
        {PRESETS.map((preset) => (
          <List.Item
            key={preset.seconds}
            title={preset.title}
            icon={Icon.Plus}
            actions={
              <ActionPanel>
                <Action title={`Extend (${preset.title})`} onAction={() => extend(preset.seconds, preset.title)} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
