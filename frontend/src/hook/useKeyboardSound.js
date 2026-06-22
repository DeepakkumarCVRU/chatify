import keySound1 from "../assets/keystroke1.mp3";
import keySound2 from "../assets/keystroke2.mp3";
import keySound3 from "../assets/keystroke3.mp3";


const keyStrokeSound = [
    new Audio(keySound1),
    new Audio(keySound2),
    new Audio(keySound3),
]

function useKeyBoardSound() {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSound[Math.floor(Math.random() * keyStrokeSound.length)];
        randomSound.currentTime = 0; // this is for better UX , def add this
        randomSound.play().catch((err) => console.log("audio play field", err));
    }

    return { playRandomKeyStrokeSound }
}

export default useKeyBoardSound