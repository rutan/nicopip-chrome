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
  video.srcObject = canvas.captureStream(60);
  video.addEventListener('leavepictureinpicture', () => {
    ++uid;
  });
}

function nextCall(func) {
  if (isHidden) {
    setTimeout(func, 0);
  } else {
    window.requestAnimationFrame(func);
  }
}

export function handleVideo() {
  const myId = ++uid;
  const comment = document.querySelector('#CommentRenderer canvas');
  const targetVideo = document.querySelector('#MainVideoPlayer video');

  function update() {
    if (myId != uid) {
      console.log('[PinP] PinP用画面の更新処理を停止しました');
      return;
    }

    targetVideo.style.visibility = isHidden ? 'hidden' : 'visible';

    if (canvas && targetVideo.videoWidth) {
      // video
      {
        const wr = canvas.width / targetVideo.videoWidth;
        const hr = canvas.height / targetVideo.videoHeight;
        const rate = Math.min(wr, hr);
        const w = Math.floor(targetVideo.videoWidth * rate);
        const h = Math.floor(targetVideo.videoHeight * rate);
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const isPlayable = !targetVideo.src.includes('https://smile-');
        if (isPlayable) {
          context.drawImage(
            targetVideo,
            0,
            0,
            targetVideo.videoWidth,
            targetVideo.videoHeight,
            (canvas.width - w) / 2,
            (canvas.height - h) / 2,
            w,
            h
          );
        }
      }

      // comment
      {
        const wr = canvas.width / comment.width;
        const hr = canvas.height / comment.height;
        const rate = Math.min(wr, hr);
        const w = comment.width * rate;
        const h = comment.height * rate;
        context.drawImage(
          comment,
          0,
          0,
          comment.width,
          comment.height,
          (canvas.width - w) / 2,
          (canvas.height - h) / 2,
          w,
          h
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

export function startPinP() {
  isHidden = document.hidden;
  video.play();
  video
    .requestPictureInPicture()
    .then(() => {
      handleVideo();
      console.log('success');
    })
    .catch(e => {
      console.error(e);
    });
  console.log('start!!');
}
