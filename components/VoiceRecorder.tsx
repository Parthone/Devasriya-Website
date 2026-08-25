"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Records a spoken design requirement in the browser using MediaRecorder.
 * No third-party service — the audio stays in memory until the enquiry is
 * submitted, and then travels with it as a normal file upload.
 *
 * Requires a secure context (https, or http://localhost during development).
 */
export default function VoiceRecorder({
  onChange,
}: {
  onChange: (blob: Blob | null) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const MAX_SECONDS = 180;

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      typeof window.MediaRecorder !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia;
    setSupported(ok);
  }, []);

  // Clean up the stream, timer and object URL on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (url) URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopTracks() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType =
        typeof MediaRecorder.isTypeSupported === "function" &&
        MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : undefined;

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (url) URL.revokeObjectURL(url);
        setUrl(URL.createObjectURL(blob));
        onChange(blob);
        stopTracks();
      };

      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            stop();
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError(
        "Microphone access was blocked. Allow it in your browser, or type your requirement instead."
      );
      stopTracks();
    }
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    setRecording(false);
  }

  function discard() {
    if (url) URL.revokeObjectURL(url);
    setUrl(null);
    setSeconds(0);
    onChange(null);
  }

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  if (!supported) {
    return (
      <div className="rec">
        <p className="rec__err">
          Voice recording is not available in this browser. Please type your
          requirement above or attach a file instead.
        </p>
      </div>
    );
  }

  return (
    <div className="rec">
      <div className="rec__row">
        {!recording && !url && (
          <button type="button" className="rec__btn" onClick={start}>
            <span aria-hidden="true">●</span> Record a voice note
          </button>
        )}

        {recording && (
          <>
            <button type="button" className="rec__btn rec__btn--stop" onClick={stop}>
              <span className="rec__dot" aria-hidden="true" /> Stop recording
            </button>
            <span className="rec__time" aria-live="polite">{mmss}</span>
          </>
        )}

        {!recording && url && (
          <>
            <span className="rec__time">{mmss}</span>
            <button type="button" className="rec__btn rec__btn--ghost" onClick={discard}>
              Delete &amp; re-record
            </button>
          </>
        )}
      </div>

      {url && <audio src={url} controls preload="metadata" />}

      {recording && (
        <p className="hint">Maximum 3 minutes. Speak naturally — sizes, colours, wording, anything.</p>
      )}

      {error && <p className="rec__err">{error}</p>}
    </div>
  );
}
