import { useContext } from 'react';

import { MessengerContext } from '../../../context/MessengerContext';

import styles from './Search.module.css';

const Search = () => {
	const { searchInput, setSearchInput } = useContext(MessengerContext);

	return (
		<div className={styles.search}>
			<input
				type='text'
				placeholder='Поиск или новый чат'
				value={searchInput}
				onChange={(event) => setSearchInput(event.target.value)}
			/>
		</div>
	);
};

export default Search;
