export default function AudioVisualizer() {
  let animationRequestId;
  let stream;
  let context;

  async function initVisualizer() {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const canvas = document.getElementById("audio-visualizer");
    context = canvas.getContext("2d");
    canvas.height = 300;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 128;
    const data = new Uint8Array(analyser.frequencyBinCount);

    requestAnimationFrame(loopingFunction);

    function loopingFunction() {
      analyser.getByteFrequencyData(data);
      draw(data);

      // Continue the animation loop
      animationRequestId = requestAnimationFrame(loopingFunction);
    }

    function draw(data) {
      data = [...data];
      context.clearRect(0, 0, canvas.width, canvas.height);
      let space = canvas.width / data.length;
      data.forEach((value, i) => {
        context.beginPath();
        context.moveTo(space * i, canvas.height);
        context.lineTo(space * i, canvas.height - value);
        context.strokeStyle = "#268CF2";
        context.stroke();
      });
    }
  }

  function stopVisualizer() {
    // Stop the audio stream
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    // Cancel the animation loop
    cancelAnimationFrame(animationRequestId);
  }

  return (
    <div id="canvas-container">
      <canvas id="audio-visualizer"></canvas>
    </div>
  );
}
