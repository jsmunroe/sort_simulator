import { useEffect, useState } from 'react';
import Algorithms from './algorithms/Algorithms';
import ArrayViewer from './components/ArrayViewer';
import { useAlgorithm } from './hooks';
import { random } from './utils/generators';
import type ISortAlgorithm from './contracts/ISortAlgorithm';
import HistoryViewer from './components/HistoryViewer';
import './App.css'

function App() {
	const [algorithms] = useState(Algorithms.all());
	const [algorithm, setAlgorithm] = useState<ISortAlgorithm>(Algorithms.BubbleSort);
	const { state, next, previous, reset, setGenerator, stateHistory } =  useAlgorithm(algorithm, random(100));

	const [speed, setSpeed] = useState(99.5); // 99.5 gives a delay of 10ms between frames.

    const [viewerTab, setViewerTab] = useState<'array' | 'history'>('array');

	useEffect(() => {
        if (speed <= 0) {
            return;
        }
        
		const delay = Math.floor(1000 * (1 - Math.pow(speed / 100, 0.25))); // Ease out speed curve

		setTimeout(() => next(), delay);
	}, [state, algorithm]);

	const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const index = parseInt(event.target.value, 10);

		setAlgorithm(algorithms[index]);

        setViewerTab('array');
	}

	const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseInt(event.target.value, 10);
		setSpeed(newSpeed);

        if (speed === 0 && newSpeed > 0) {
            next();
        }
	}

	const handleElementsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newElements = parseInt(event.target.value, 10);
		
        setGenerator(() => random(newElements));
	}

    const handleElementsBlur = () => {
        reset();
    }

	const handleNextClick = () => {
		next();
	}

    const handlePreviousClick = () => {
        previous();
    }

    const handlePauseClick = () => {
        setSpeed(0);
    }

    const handleReplayClick = () => {
        reset();
    }

	return (
		<div className="App">
            <div className="viewer-tabs">
                <button className={viewerTab === 'array' ? 'active' : ''} onClick={() => setViewerTab('array')}>Array View</button>
                <button className={viewerTab === 'history' ? 'active' : ''} onClick={() => setViewerTab('history')}>History View</button>
            </div>
			{viewerTab === 'array' && <ArrayViewer state={state} />}
			{viewerTab === 'history' && <HistoryViewer history={stateHistory} />}
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

                    <div>
                        <label htmlFor="elements">Elements</label>
                        <input type="number" id="elements" name="elements" min="5" max="500" defaultValue={100} onChange={handleElementsChange} onBlur={handleElementsBlur} />
                    </div>
                </div>

                <div className="buttons">
                    {speed <= 0 
                        ? <>
                            <button type="button" onClick={handlePreviousClick}>Previous</button>
                            <button type="button" onClick={handleNextClick}>Next</button>
                        </>
                        : <button type="button" onClick={handlePauseClick}>Pause</button>
                    }
                    <button type="button" onClick={handleReplayClick}>Replay</button>
                </div>
			</form>
		</div>
	)
}

export default App
