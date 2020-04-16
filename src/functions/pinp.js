const FRAME_RATE = 60;

let isHidden = false;
let canvas;
let context;
let video;
let uid = 0;

export function initPinP() {
  if (canvas) return;

  document.addEventListener(
    'visibilitychange',
    () => {
      isHidden = document.hidden;
    },
    false
  );

  canvas = document.createElement('canvas');
  canvas.setAttribute('width', 800);
  canvas.setAttribute('height', 450);
  context = canvas.getContext('2d');
  context.fillRect(0, 0, canvas.width, canvas.height);
  video = document.createElement('video');
  video.autoplay = true;
  video.srcObject = canvas.captureStream(FRAME_RATE);
  video.addEventListener('leavepictureinpicture', () => {
    ++uid;
  });
}

function nextCall(func) {
  if (isHidden) {
    window.setTimeout(func, 1000 / FRAME_RATE);
  } else {
    window.requestAnimationFrame(func);
  }
}

function calcSize(srcWidth, srcHeight, dstWidth, dstHeight) {
  const wr = dstWidth / srcWidth;
  const hr = dstHeight / srcHeight;
  const rate = Math.min(wr, hr);
  const w = Math.floor(srcWidth * rate);
  const h = Math.floor(srcHeight * rate);

  return { width: w, height: h };
}

export function handleVideo() {
  const myId = ++uid;
  const comment = document.querySelector('#CommentRenderer canvas, [class^=___comment-layer___] canvas');
  const targetVideo = document.querySelector('#MainVideoPlayer video, [class^=___video-layer___] video');

  function update() {
    if (myId != uid) {
      targetVideo.style.visibility = 'visible';
      console.log('[PinP] PinP用画面の更新処理を停止しました');
      return;
    }

    if (canvas && targetVideo && targetVideo.videoWidth) {
      targetVideo.style.visibility = isHidden ? 'hidden' : 'visible';

      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // video
      const videoSize = calcSize(targetVideo.videoWidth, targetVideo.videoHeight, canvas.width, canvas.height);
      const isPlayable = !targetVideo.src.includes('https://smile-');
      if (isPlayable) {
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
      }

      // comment
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

export function startPinP() {
  isHidden = document.hidden;
  video.play();
  video
    .requestPictureInPicture()
    .then(() => {
      handleVideo();
    })
    .catch(e => {
      console.error(e);
    });
}
