alert("This is an injected script!")

const audioContext = new AudioContext()

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    setRecording(true)
    const mediaRecorder = new MediaRecorder(stream)
    setMediaRecorder(mediaRecorder)
    mediaRecorder.addEventListener("dataavailable", handleDataAvailable)
 
    mediaRecorder.start()

    // create a new MediaStreamAudioSourceNode object from the MediaStream
    const sourceNode = audioContext.createMediaStreamSource(stream)
    setSourceNode(sourceNode)

    // create a new AnalyserNode object
    const analyserNode = audioContext.createAnalyser()
    setAnalyserNode(analyserNode)
    analyserNode.fftSize = 256

    // connect the sourceNode to the analyserNode
    sourceNode.connect(analyserNode)
  })
  .catch((error) => {
    console.log(error)
  })
