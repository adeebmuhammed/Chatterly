import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserSearchResultResponse } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnChanges {
  searchQuery = '';
  isLoading = false;

  private searchSubject = new Subject<string>();

  @Input() searchResults: UserSearchResultResponse[] = [];
  @Output() search = new EventEmitter<string>();
  @Output() userSelected = new EventEmitter<UserSearchResultResponse>();

  onResultClick(result: UserSearchResultResponse) {
    this.userSelected.emit(result);
    this.searchQuery = '';
  }

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.isLoading = true;
        this.search.emit(query);
      });
  }

  onSearchInput(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  ngOnChanges() {
    // When parent sends new results, stop loading
    this.isLoading = false;
  }
}
