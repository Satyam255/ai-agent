// "use client";
// import { useEffect, useState } from "react";

// interface SpeechRecognitionEvent extends Event {
//   results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   error: string;
// }

// interface SpeechRecognition extends EventTarget {
//   lang: string;
//   continuous: boolean;
//   interimResults: boolean;
//   start(): void;
//   stop(): void;
//   onresult: (event: SpeechRecognitionEvent) => void;
//   onerror: (event: SpeechRecognitionErrorEvent) => void;
//   onend: () => void;
// }

// interface Window {
//   SpeechRecognition: new () => SpeechRecognition;
//   webkitSpeechRecognition: new () => SpeechRecognition;
// }

// interface SpeechRecognitionProps {
//   onResult: (text: string) => void;
// }

// export default function SpeechRecognition({ onResult }: SpeechRecognitionProps) {
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("Speech Recognition API is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const text = event.results[0][0].transcript;
//       console.log("Recognized Speech:", text); // ✅ Logs the recognized text
//       onResult(text);
//       setIsListening(false);
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error("Speech recognition error:", event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     if (isListening) {
//       recognition.start();
//       console.log("Speech recognition started..."); // ✅ Indicates that recording has started
//     }

//     return () => {
//       recognition.stop();
//       console.log("Speech recognition stopped."); // ✅ Indicates that recording has stopped
//     };
//   }, [isListening, onResult]);

//   const toggleListening = () => {
//     setIsListening((prev) => !prev);
//   };

//   return (
//     <button
//       className={`mt-4 px-4 py-2 rounded ${
//         isListening ? "bg-red-500" : "bg-blue-500"
//       } text-black`}
//       onClick={toggleListening}
//       disabled={isListening}
//     >
//       {isListening ? "Listening..." : "Start Listening"}
//     </button>
//   );
// }
"use client";
import { useEffect, useState } from "react";

// Add type definitions to resolve the errors
interface CustomSpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex?: number;
}

interface CustomSpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionProps {
  onResult: (text: string) => void;
  autoStart?: boolean;
}

export default function SpeechRecognition({ 
  onResult, 
  autoStart = false 
}: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(autoStart);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: CustomSpeechRecognitionEvent) => {
      const results = event.results;
      const text = results[results.length - 1][0].transcript;
      console.log("Recognized Speech:", text);
      onResult(text);
      setIsListening(false);
    };

    recognition.onerror = (event: CustomSpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
      console.log("Speech recognition started...");
    }

    return () => {
      recognition.stop();
      console.log("Speech recognition stopped.");
    };
  }, [isListening, onResult, autoStart]);

  // If autoStart is true, no manual toggle is needed
  if (autoStart) return null;

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <button
      className={`mt-4 px-4 py-2 rounded ${
        isListening ? "bg-red-500" : "bg-blue-500"
      } text-black`}
      onClick={toggleListening}
      disabled={isListening}
    >
      {isListening ? "Listening..." : "Start Listening"}
    </button>
  );
}