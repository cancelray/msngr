import type { SearchResultListElementProps } from '../../../types/props/SearchResultListElementProps.type';
import styles from './SearchResultListElement.module.css';

const SearchResultListElement = (props: SearchResultListElementProps) => {
	const { searchResult, searchResultListClickHandler, dataChatId } = props;

	return (
		<div
			className={styles.SearchResultListElement}
			onClick={searchResultListClickHandler}
			data-user-id={searchResult.id}
			data-chat-id={dataChatId}
		>
			{searchResult.avatar && searchResult.avatar.length > 0 ? (
				<img
					className={styles.avatar}
					src={searchResult.avatar}
					alt='avatar'
				></img>
			) : (
				<div className={styles.avatarAlt}>
					{searchResult.name ? searchResult.name[0] : ''}
				</div>
			)}
			<div className={styles.contact}>
				<p
					className={styles.name}
				>{`${searchResult.name} ${searchResult.lastName || ''} ${searchResult.login ? '(@' + searchResult.login + ')' : '(group)'}`}</p>
			</div>
		</div>
	);
};

export default SearchResultListElement;
