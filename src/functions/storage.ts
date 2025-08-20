import { DEFAULT_SETTINGS, type Settings } from '../types/settings';

export async function getSettings(): Promise<Settings> {
  try {
    const result = await chrome.storage.sync.get('settings');
    if (result.settings) {
      return { ...DEFAULT_SETTINGS, ...result.settings };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('[nicopip] 設定の取得に失敗しました', error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await chrome.storage.sync.set({ settings });
  } catch (error) {
    console.error('[nicopip] 設定の保存に失敗しました', error);
  }
}
