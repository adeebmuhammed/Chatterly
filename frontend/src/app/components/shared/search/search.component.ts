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

  @Input() searchResults: any[] = [];
  @Input() searchType: 'user' | 'group' = 'user'; // add type input
  @Output() search = new EventEmitter<{
    query: string;
    type: 'user' | 'group';
  }>();
  @Output() itemSelected = new EventEmitter<any>();
  @Output() joinGroup = new EventEmitter<any>();
  loggedInUserId = localStorage.getItem("userId")

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.isLoading = true;
        this.search.emit({ query, type: this.searchType });
      });
  }

  onSearchInput(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  onResultClick(item: any) {
    this.itemSelected.emit(item);
    this.searchQuery = '';
  }

  onJoinGroup(group: any, event: Event) {
    event.stopPropagation(); // prevent onResultClick
    this.joinGroup.emit(group);
  }

  ngOnChanges() {
    this.isLoading = false;
  }
}
