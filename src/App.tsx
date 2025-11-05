import { useEffect } from 'react';
import Algorithms from './algorithms/Algorithms';
import ArrayViewer from './components/ArrayViewer';
import { useAlgorithm } from './hooks';
import { random } from './utils/generators';
import './App.css'

function App() {
	const [state, step] =  useAlgorithm(Algorithms.MergeSort, random(100));

	useEffect(() => {
		setTimeout(() => step(), 10);
	}, [state]);

	return (
		<ArrayViewer array={state.array} />
	)
}

export default App
