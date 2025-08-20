import { getSettings, saveSettings } from './functions';
import type { PipMode, Settings } from './types/settings';

const nicoVideoRadios = document.querySelectorAll<HTMLInputElement>(
  'input[name="nicoVideo"]',
);
const nicoLiveRadios = document.querySelectorAll<HTMLInputElement>(
  'input[name="nicoLive"]',
);
const saveStatus = document.getElementById('saveStatus') as HTMLDivElement;

async function loadSettings() {
  const settings = await getSettings();

  const nicoVideoRadio = document.querySelector<HTMLInputElement>(
    `input[name="nicoVideo"][value="${settings.nicoVideo}"]`,
  );
  if (nicoVideoRadio) {
    nicoVideoRadio.checked = true;
  }

  const nicoLiveRadio = document.querySelector<HTMLInputElement>(
    `input[name="nicoLive"][value="${settings.nicoLive}"]`,
  );
  if (nicoLiveRadio) {
    nicoLiveRadio.checked = true;
  }
}

let saveStatusTimeout: number | undefined;

function showSaveStatus(success: boolean) {
  if (saveStatusTimeout) {
    clearTimeout(saveStatusTimeout);
  }

  saveStatus.classList.remove('show');

  if (success) {
    saveStatus.textContent = '設定を保存しました';
    saveStatus.className = 'save-status success';
  } else {
    saveStatus.textContent = '設定を保存に失敗しました';
    saveStatus.className = 'save-status error';
  }

  requestAnimationFrame(() => {
    saveStatus.classList.add('show');
  });

  saveStatusTimeout = window.setTimeout(() => {
    saveStatus.classList.remove('show');
    saveStatusTimeout = undefined;
  }, 1000);
}

async function handleSettingChange() {
  const nicoVideoValue = document.querySelector<HTMLInputElement>(
    'input[name="nicoVideo"]:checked',
  )?.value as PipMode;
  const nicoLiveValue = document.querySelector<HTMLInputElement>(
    'input[name="nicoLive"]:checked',
  )?.value as PipMode;

  const settings: Settings = {
    nicoVideo: nicoVideoValue || 'canvas',
    nicoLive: nicoLiveValue || 'canvas',
  };

  try {
    await saveSettings(settings);
    showSaveStatus(true);
  } catch (error) {
    console.error('Failed to save settings:', error);
    showSaveStatus(false);
  }
}

nicoVideoRadios.forEach((radio) => {
  radio.addEventListener('change', handleSettingChange);
});

nicoLiveRadios.forEach((radio) => {
  radio.addEventListener('change', handleSettingChange);
});

loadSettings();
