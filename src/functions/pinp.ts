const FRAME_RATE = 60;

let isHidden = false;
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
let video: HTMLVideoElement | null = null;
let uid = 0;

export function initPinP(): void {
  if (canvas) return;

  document.addEventListener(
    'visibilitychange',
    () => {
      isHidden = document.hidden;
    },
    false
  );

  canvas = document.createElement('canvas');
  canvas.setAttribute('width', '800');
  canvas.setAttribute('height', '450');

  context = canvas.getContext('2d');
  if (!context) return;

  context.fillRect(0, 0, canvas.width, canvas.height);
  video = document.createElement('video');
  video.autoplay = true;
  video.srcObject = (canvas as any).captureStream(FRAME_RATE);
  video.addEventListener('leavepictureinpicture', () => {
    ++uid;
  });
}

function nextCall(func: () => void) {
  if (isHidden) {
    window.setTimeout(func, 1000 / FRAME_RATE);
  } else {
    window.requestAnimationFrame(func);
  }
}

function calcSize(srcWidth: number, srcHeight: number, dstWidth: number, dstHeight: number) {
  const wr = dstWidth / srcWidth;
  const hr = dstHeight / srcHeight;
  const rate = Math.min(wr, hr);
  const w = Math.floor(srcWidth * rate);
  const h = Math.floor(srcHeight * rate);

  return { width: w, height: h };
}

export function handleVideo(): void {
  const myId = ++uid;
  const comment = document.querySelector<HTMLCanvasElement>(
    '.CommentRenderer canvas, [class^=___comment-layer___] canvas'
  );
  const targetVideo = document.querySelector<HTMLVideoElement>(
    '#MainVideoPlayer video, [class^=___video-layer___] video'
  );
  const uadView = document.querySelector<HTMLDivElement>('#UadPlayer .UadView');
  const uadCanvas = document.getElementById('UadView-canvas') as HTMLCanvasElement;

  function update() {
    if (!comment || !targetVideo || !context || myId != uid) {
      if (targetVideo) targetVideo.style.visibility = 'visible';
      console.log('[PinP] PinP用画面の更新処理を停止しました');
      return;
    }

    if (canvas && targetVideo && targetVideo.videoWidth) {
      targetVideo.style.visibility = isHidden ? 'hidden' : 'visible';

      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // video
      const videoSize = calcSize(targetVideo.videoWidth, targetVideo.videoHeight, canvas.width, canvas.height);
      context.drawImage(
        targetVideo,
        0,
        0,
        targetVideo.videoWidth,
        targetVideo.videoHeight,
        (canvas.width - videoSize.width) / 2,
        (canvas.height - videoSize.height) / 2,
        videoSize.width,
        videoSize.height
      );

      // uad
      if (uadView?.style.display !== 'none' && uadCanvas) {
        const uadSize = calcSize(uadCanvas.width, uadCanvas.height, canvas.width, canvas.height);
        context.drawImage(
          uadCanvas,
          0,
          0,
          uadCanvas.width,
          uadCanvas.height,
          (canvas.width - uadSize.width) / 2,
          (canvas.height - uadSize.height) / 2,
          uadSize.width,
          uadSize.height
        );
      }

      // comment
      if (comment) {
        const commentSize = calcSize(comment.width, comment.height, canvas.width, canvas.height);
        context.drawImage(
          comment,
          0,
          0,
          comment.width,
          comment.height,
          (canvas.width - commentSize.width) / 2,
          (canvas.height - commentSize.height) / 2,
          commentSize.width,
          commentSize.height
        );
      }

      // for debug
      if (process.env.NODE_ENV != 'production') {
        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(0, 0, 300, 55);
        context.fillStyle = '#fff';
        context.font = '36px serif';
        context.fillText(`${Date.now()}`, 10, 40);
      }
    }
    nextCall(update);
  }

  nextCall(update);
}

export function startPinP(): void {
  if (!video) return;

  isHidden = document.hidden;
  video.play();
  (video as any)
    .requestPictureInPicture()
    .then(() => {
      handleVideo();
    })
    .catch((e: Error) => {
      console.error(e);
    });
}
