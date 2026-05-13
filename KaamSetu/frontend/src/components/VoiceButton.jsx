import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceButton({
  setVoiceText,
}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <p>
        Browser doesn't support speech
        recognition.
      </p>
    );
  }

  const startListening = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "hi-IN",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    setVoiceText(transcript);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={startListening}
        className="bg-green-600 text-white px-4 py-2 rounded mr-3"
      >
        🎤 Start
      </button>

      <button
        type="button"
        onClick={stopListening}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Stop
      </button>

      <p className="mt-3">
        {listening
          ? "Listening..."
          : "Microphone Off"}
      </p>

      <div className="bg-gray-100 p-3 rounded mt-2">
        {transcript}
      </div>
    </div>
  );
}