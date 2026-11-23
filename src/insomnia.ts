import { execFile } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const execFileAsync = promisify(execFile);

function resolveBinary(): string {
  const candidates = [
    path.join(os.homedir(), "Applications", "Insomnia.app", "Contents", "MacOS", "Insomnia"),
    path.join("/Applications", "Insomnia.app", "Contents", "MacOS", "Insomnia"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return candidates[0];
}

const INSOMNIA_BIN = resolveBinary();

export interface InsomniaResult {
  success: boolean;
  output?: string;
  error?: string;
}

export async function runInsomniaCommand(subcommand: string, ...args: (string | number)[]): Promise<InsomniaResult> {
  try {
    const { stdout } = await execFileAsync(INSOMNIA_BIN, ["--session", subcommand, ...args.map(String)]);
    return { success: true, output: stdout.trim() };
  } catch (err: any) {
    return { success: false, error: (err?.stderr || err?.message || "Unknown error").toString().trim() };
  }
}

export async function getStatus(): Promise<InsomniaResult> {
  return runInsomniaCommand("status");
}
