export type PipMode = 'disabled' | 'canvas';

export interface Settings {
  nicoVideo: PipMode;
  nicoLive: PipMode;
}

export const DEFAULT_SETTINGS: Settings = {
  nicoVideo: 'canvas',
  nicoLive: 'canvas',
};
