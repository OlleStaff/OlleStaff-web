import { Capacitor } from "@capacitor/core";

export const isApp = Capacitor.isNativePlatform();
export const TOKEN_KEY = "APP_AUTH_TOKEN";

export async function saveAppToken(token?: string | null) {
    if (!isApp || !token) return;
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.set({ key: TOKEN_KEY, value: token });
}

export async function getAppToken(): Promise<string | null> {
    if (!isApp) return null;
    const { Preferences } = await import("@capacitor/preferences");
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value ?? null;
}

export async function clearAppToken() {
    if (!isApp) return;
    const { Preferences } = await import("@capacitor/preferences");
    await Preferences.remove({ key: TOKEN_KEY });
}
