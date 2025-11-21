/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useRef, useState } from 'react';
import { Modality } from '@google/genai';

import { useLiveAPIContext } from '../llm/contexts/LiveAPIContext';
import { useSettings, useTools } from '../llm/lib/state';
import { AudioRecorder } from '../stt/lib/AudioRecorder';

const hasConfig = (config: any) =>
  Boolean(
    config &&
      Array.isArray(config.responseModalities) &&
      config.responseModalities.length > 0,
  );

/**
 * Auto-starts the Live API connection & microphone streaming with no UI chrome.
 */
export default function AutoStreamingRunner() {
  const { client, setConfig, connect, connected, config } = useLiveAPIContext();
  const { systemPrompt, voice } = useSettings();
  const { tools } = useTools();

  const [recorder] = useState(() => new AudioRecorder());
  const connectingRef = useRef(false);

  // configure the session exactly once (and whenever settings/tools change)
  useEffect(() => {
    const enabledTools = tools
      .filter(tool => tool.isEnabled)
      .map(tool => ({
        functionDeclarations: [
          {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters,
          },
        ],
      }));

    const nextConfig: any = {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voice,
          },
        },
      },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      systemInstruction: {
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
      tools: enabledTools,
    };

    setConfig(nextConfig);
  }, [setConfig, systemPrompt, tools, voice]);

  // automatically connect whenever a config is ready & we are disconnected
  useEffect(() => {
    if (!hasConfig(config) || connected || connectingRef.current) {
      return;
    }

    connectingRef.current = true;
    connect()
      .catch(err => {
        console.error('Unable to connect to the Live API', err);
      })
      .finally(() => {
        connectingRef.current = false;
      });
  }, [config, connect, connected]);

  // start/stop microphone streaming when the socket state changes
  useEffect(() => {
    if (!connected) {
      recorder.stop();
      return;
    }

    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: 'audio/pcm;rate=16000',
          data: base64,
        },
      ]);
    };

    recorder.on('data', onData);
    recorder
      .start()
      .catch(err => {
        console.error('Microphone permissions are required', err);
        recorder.off('data', onData);
      });

    return () => {
      recorder.off('data', onData);
      recorder.stop();
    };
  }, [connected, client, recorder]);

  return null;
}
