export type PipMode = 'disabled' | 'canvas' | 'document';

export interface Settings {
  nicoVideo: PipMode;
  nicoLive: PipMode;
}

export const DEFAULT_SETTINGS: Settings = {
  nicoVideo: 'canvas',
  nicoLive: 'canvas',
};
