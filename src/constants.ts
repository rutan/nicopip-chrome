export const EXTENSION_LABEL = '[非公式] PinP';

/*
 * video タグのセレクタ
 */
// ニコニコ動画
export const NICO_VIDEO_VIDEO_TAG_SELECTOR = '#MainVideoPlayer video';
// ニコニコ動画（Re:仮）
export const NICO_VIDEO_TMP_VIDEO_TAG_SELECTOR = 'main [data-name="content"] video';
// ニコニコ生放送
export const NICO_LIVE_VIDEO_TAG_SELECTOR = '[class^=___video-layer___] video';

export const VIDEO_TAG_SELECTOR = [
  NICO_VIDEO_VIDEO_TAG_SELECTOR,
  NICO_VIDEO_TMP_VIDEO_TAG_SELECTOR,
  NICO_LIVE_VIDEO_TAG_SELECTOR,
].join(',');

/*
 * コメント用 canvas のセレクタ
 */
// ニコニコ動画
export const NICO_VIDEO_COMMENT_CANVAS_TAG_SELECTOR = '.CommentRenderer canvas';
// ニコニコ動画（Re:仮）
export const NICO_VIDEO_TMP_COMMENT_CANVAS_TAG_SELECTOR = 'main [data-name="comment"] > canvas';
// ニコニコ生放送
export const NICO_LIVE_COMMENT_CANVAS_TAG_SELECTOR = '[class^=___comment-layer___] canvas';

export const COMMENT_CANVAS_TAG_SELECTOR = [
  NICO_VIDEO_COMMENT_CANVAS_TAG_SELECTOR,
  NICO_VIDEO_TMP_COMMENT_CANVAS_TAG_SELECTOR,
  NICO_LIVE_COMMENT_CANVAS_TAG_SELECTOR,
].join(',');

/*
 * コピー元とするボタンのセレクタ
 */
// ニコニコ動画
export const NICO_VIDEO_TARGET_BUTTON_SELECTOR = '.ControllerContainer .EnableFullScreenButton';
// ニコニコ動画（Re:仮）
export const NICO_VIDEO_TMP_TARGET_BUTTON_SELECTOR = 'main .w_24px:not(.p_2px)';
// ニコニコ生放送
export const NICO_LIVE_TARGET_BUTTON_SELECTOR = '[class^=___addon-controller___] [class^=___fullscreen-button___]';

export const TARGET_BUTTON_SELECTOR = [
  NICO_VIDEO_TARGET_BUTTON_SELECTOR,
  NICO_VIDEO_TMP_TARGET_BUTTON_SELECTOR,
  NICO_LIVE_TARGET_BUTTON_SELECTOR,
].join(',');

/**
 * 提供画面の HTML のセレクタ（ニコニコ動画のみ）
 */
export const NICO_VIDEO_SUPPORTER_VIEW_SELECTOR = '#UadPlayer .SupporterView';
export const NICO_VIDEO_TMP_SUPPORTER_VIEW_SELECTOR = 'main [data-name="supporter-content"]';

export const SUPPORTER_VIEW_SELECTOR = [
  NICO_VIDEO_SUPPORTER_VIEW_SELECTOR,
  NICO_VIDEO_TMP_SUPPORTER_VIEW_SELECTOR,
].join(',');

/**
 * 提供画面の Canvas のセレクタ（ニコニコ動画のみ）
 */
export const NICO_VIDEO_SUPPORTER_VIEW_CANVAS_SELECTOR = '#SupporterView-canvas';
export const NICO_VIDEO_TMP_SUPPORTER_VIEW_CANVAS_SELECTOR = 'main [data-name="supporter-content"] canvas';

export const SUPPORTER_VIEW_CANVAS_SELECTOR = [
  NICO_VIDEO_SUPPORTER_VIEW_CANVAS_SELECTOR,
  NICO_VIDEO_TMP_SUPPORTER_VIEW_CANVAS_SELECTOR,
].join(',');

/**
 * Akashic のゲーム画面の canvas のセレクタ（ニコニコ生放送のみ）
 */
export const NICO_LIVE_AKASHIC_CANVAS_SELECTOR = '#akashic-gameview canvas';

export const AKASHIC_CANVAS_SELECTOR = [NICO_LIVE_AKASHIC_CANVAS_SELECTOR].join(',');
