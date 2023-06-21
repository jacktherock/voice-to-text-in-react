import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const VoiceRecorder = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  if (note)
    console.log(note.split(" "));

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="row">

        <div className="column">
          <h2>Start Speaking !</h2>

          <div className="btn">

            <button className="btn_2" onClick={() => setIsListening((prevState) => !prevState)}>
              {isListening ? "Stop" : "Start"}
            </button>

            <button className="btn_1" onClick={handleSaveNote} disabled={!note}>
              Save Note
            </button>
          </div>

          <p>
            {isListening ? <span>Listening...</span> : <span>Stopped</span>}
          </p>

          <p className="note">{note}</p>
        </div>

        <div className="column">
          <h2>Saved Voice Notes</h2>

          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}

        </div>
      </div>
    </>
  );
}

export default VoiceRecorder;
