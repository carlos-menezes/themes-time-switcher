// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import { applyThemes } from "./lib";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"themes-time-switcher.reload",
		() => {
			applyThemes();
		},
	);

	const interval = setInterval(applyThemes, 60_000);
	context.subscriptions.push({
		dispose: () => {
			if (interval) {
				clearInterval(interval);
			}
		},
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
