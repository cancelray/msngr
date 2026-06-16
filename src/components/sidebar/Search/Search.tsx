import useUIContext from '../../../hooks/context/useUIContext';

import styles from './Search.module.css';

const Search = () => {
	const { search, searchInput, setSearchInput } = useUIContext();

	return (
		<div className={styles.search}>
			<input
				type='text'
				placeholder='Поиск или новый чат'
				value={searchInput}
				onChange={(event) => {
					search(event);
					setSearchInput(event.target.value);
				}}
			/>
		</div>
	);
};

export default Search;
