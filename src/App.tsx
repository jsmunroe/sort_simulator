import { useEffect, useState } from 'react';
import Algorithms from './algorithms/Algorithms';
import ArrayViewer from './components/ArrayViewer';
import { useAlgorithm } from './hooks';
import { random } from './utils/generators';
import type ISortAlgorithm from './contracts/ISortAlgorithm';
import './App.css'

function App() {
	const [algorithms] = useState(Algorithms.all());
	const [algorithm, setAlgorithm] = useState<ISortAlgorithm>(Algorithms.BubbleSort);
	const { state, step, reset } =  useAlgorithm(algorithm, random(100));

	const [speed, setSpeed] = useState(99.5); // 99.5 gives a delay of 10ms between frames.

	useEffect(() => {
        if (speed <= 0) {
            return;
        }
        
		const delay = Math.floor(1000 * (1 - Math.pow(speed / 100, 0.25))); // Ease out speed curve

		setTimeout(() => step(), delay);
	}, [state, algorithm]);

	const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const index = parseInt(event.target.value, 10);

		setAlgorithm(algorithms[index]);
	}

	const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseInt(event.target.value, 10);
		setSpeed(newSpeed);

        if (speed === 0 && newSpeed > 0) {
            step();
        }
	}

	const handleStepClick = () => {
		step();
	}

    const handlePauseClick = () => {
        setSpeed(0);
    }

    const handleReplayClick = () => {
        reset();
    }

	return (
		<div className="App">
			<ArrayViewer state={state} />
			<form>
                <div className="card">
                    <div>
                        <label htmlFor="algorithm">Algorithm</label>
                        <select id="algorithm" name="algorithm" onChange={handleAlgorithmChange} value={algorithms.findIndex(a => a.name === algorithm.name)}>
                            {algorithms.map((algorithm, index) => (
                                <option key={algorithm.name} value={index}>{algorithm.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="speed">Speed</label>
                        <input type="range" id="speed" name="speed" min="0" max="100" value={speed} onChange={handleSpeedChange} />
                    </div>
                </div>

                <div className="buttons">
                    {speed <= 0 
                        ? <button type="button" onClick={handleStepClick}>Step</button>
                        : <button type="button" onClick={handlePauseClick}>Pause</button>
                    }
                    <button type="button" onClick={handleReplayClick}>Replay</button>
                </div>
			</form>
		</div>
	)
}

export default App
