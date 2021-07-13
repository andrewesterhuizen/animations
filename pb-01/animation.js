const distances = [];
const urlSearchParams = new URLSearchParams(window.location.search);
const durationQueryParam = urlSearchParams.get("duration");
const durationSeconds = durationQueryParam ? parseInt(durationQueryParam) : 5;
const durationMS = durationSeconds * 1000;
const maxDistancePixels = 1000;

const coverObject = document.querySelector("#cover");

coverObject.addEventListener("load", () => {
  const paths = coverObject.contentDocument.querySelectorAll("path");

  paths.forEach((_, i) => {
    distances[i] = {
      x: (Math.random() * 2 - 1) * maxDistancePixels,
      y: (Math.random() * 2 - 1) * maxDistancePixels,
    };
  });

  // set initial positions
  paths.forEach((p, i) => {
    const s = distances[i];
    p.style.transform = `translate(${s.x}px,${s.y}px)`;
  });

  let animationStartTime;

  const draw = (currentTime) => {
    if (animationStartTime === undefined) {
      animationStartTime = currentTime;
    }

    const elapsed = currentTime - animationStartTime;
    let amountCompleted = elapsed / durationMS;
    amountCompleted = Math.min(1, amountCompleted);
    const amountRemaining = 1 - amountCompleted;

    paths.forEach((p, i) => {
      const d = distances[i];
      let x = d.x * amountRemaining;
      let y = d.y * amountRemaining;
      p.style.transform = `translate(${x}px,${y}px)`;
    });

    if (elapsed < durationMS) {
      requestAnimationFrame(draw);
    }
  };

  requestAnimationFrame(draw);
});
