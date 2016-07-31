import {EventEmitter, Injectable} from 'angular2/core';

@Injectable()
export class SearchHistoryService {
        searchHistoryChanged = new EventEmitter<Object>();

		/**
		 * Gets the search history.
		 */
		get SearchNames() : Array<string> {
			return this.GetSearchHistory();
		} 
		
		/**
		 * Delete the given search-name from history, if present.
		 */
		Delete(name : string) {
			var searchHistory = this.GetSearchHistory();
			this.DeleteItem(name, searchHistory);
			this.SaveSearchHistory(searchHistory);
            this.searchHistoryChanged.emit(this.SearchNames);
		}
		
		/**
		 * Adds a search-name to the history.
		 */
		AddSearch(name : string) : void {
			if (name == null) {
				return;
			}

			var searchHistory = this.GetSearchHistory();
			this.DeleteItem(name, searchHistory);
			searchHistory.push(name);
			this.SaveSearchHistory(searchHistory);
            this.searchHistoryChanged.emit(this.SearchNames);
		}
		
		private DeleteItem(name : string, list : Array<string>) {
			var existingIndex = list.indexOf(name);
			if (existingIndex > -1) {
				list.splice(existingIndex, 1);
			}
		}
		
		private GetSearchHistory() : Array<string> {
			var searchHistory : Array<string>;
			var searchHistoryData = sessionStorage.getItem("searchHistory")
			if (searchHistoryData == null) {
				searchHistory = new Array<string>();
				sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
			}
			else {
				searchHistory = JSON.parse(searchHistoryData);
			}
			
			return searchHistory;
		}
		
		private SaveSearchHistory(searchHistory : Array<string>) {
			sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory))
		}
}