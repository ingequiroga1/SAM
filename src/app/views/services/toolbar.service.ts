import { Injectable , EventEmitter } from '@angular/core';
import {ToolbarData} from '../Models/ToolbarData.mode';
@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public toolbarDataEvent:EventEmitter<ToolbarData> = new EventEmitter<ToolbarData>();

  emit(data :ToolbarData) {
    this.toolbarDataEvent.emit(data);
  }
}
