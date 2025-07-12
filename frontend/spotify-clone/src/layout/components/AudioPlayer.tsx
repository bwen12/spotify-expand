import { useAudio } from "@/hooks/useAudio";
//TODO REFACTOR THE LOGIC HERE INTO A CUSTOM HOOK 
const AudioPlayer = () => {
  const { audioRef } = useAudio();

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
