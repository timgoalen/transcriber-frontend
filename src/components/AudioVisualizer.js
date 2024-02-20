import { useEffect } from "react";

/**
 * Displays a real-time visualization of the user's microphone input.
 */
export default function AudioVisualizer() {
  // Start audio visualizer when the component mounts (parent component state 'isRecording')
  useEffect(() => {
    let animationRequestId;
    let stream;
    let context;
    let source;

    async function initVisualizer() {
      // Get stream from the browser
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Set up canvas element
      const canvas = document.getElementById("audio-visualizer");
      context = canvas.getContext("2d");
      canvas.height = 300;

      // Create an audio context
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Create an analyser
      const analyser = audioContext.createAnalyser();
      // Use the browser media stream as the source
      source = audioContext.createMediaStreamSource(stream);
      // Connect the source to the analyser
      source.connect(analyser);
      // Set the required detail of the analyser
      analyser.fftSize = 128;
      // Create an array of the frequency data
      const data = new Uint8Array(analyser.frequencyBinCount);

      // Set the `requestAnimationFrame` API to call the `loopingFunction` on the next re-paint
      requestAnimationFrame(loopingFunction);

      function loopingFunction() {
        analyser.getByteFrequencyData(data);
        // Call the `draw` function to draw the frequency data
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

    initVisualizer();

    // Clean up resources when the component unmounts
    return () => {
      stopVisualizer();
    };
  }, []);

  return (
    <div id="canvas-container">
      <canvas id="audio-visualizer"></canvas>
    </div>
  );
}
