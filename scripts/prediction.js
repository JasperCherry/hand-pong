const getCentralHandPoint = (result) => {
  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < result.length; i += 1) {
    sumX += result[i][0];
    sumY += result[i][1];
  }

  const point = {
    x: sumX / result.length,
    y: sumY / result.length,
  };

  return point;
};

const landmarksRealTime = async (video) => {
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  const canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  const frameLandmarks = async () => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const result = predictions[0].landmarks;

      // ctx.strokeStyle = "red";
      // ctx.fillStyle = "red";
      // drawKeypoints(ctx, result, predictions[0].annotations);

      const proportions = getProportionsLimited(result);
      const output = net.run(proportions);
      const { rock, paper } = output;
      const maxResult = Math.max(rock, paper);

      if (maxResult === rock) {
        // todo
      } else if (maxResult === paper && paper > 0.85) {
        const centalHandPoint = getCentralHandPoint(result);
        const newY = (960 * centalHandPoint.y / VIDEO_HEIGHT) - 240;
        myGamePiece.y = newY;

        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(centalHandPoint.x, centalHandPoint.y, 10, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    requestAnimationFrame(frameLandmarks);
  };

  frameLandmarks();
};
