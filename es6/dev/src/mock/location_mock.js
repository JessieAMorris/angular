var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { EventEmitter, ObservableWrapper } from 'angular2/src/facade/async';
/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 */
export let SpyLocation = class {
    constructor() {
        this.urlChanges = [];
        /** @internal */
        this._path = '';
        /** @internal */
        this._query = '';
        /** @internal */
        this._subject = new EventEmitter();
        /** @internal */
        this._baseHref = '';
        // TODO: remove these once Location is an interface, and can be implemented cleanly
        this.platformStrategy = null;
    }
    setInitialPath(url) { this._path = url; }
    setBaseHref(url) { this._baseHref = url; }
    path() { return this._path; }
    simulateUrlPop(pathname) {
        ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true });
    }
    simulateHashChange(pathname) {
        // Because we don't prevent the native event, the browser will independently update the path
        this.setInitialPath(pathname);
        this.urlChanges.push('hash: ' + pathname);
        ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true, 'type': 'hashchange' });
    }
    prepareExternalUrl(url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._baseHref + url;
    }
    go(path, query = '') {
        path = this.prepareExternalUrl(path);
        if (this._path == path && this._query == query) {
            return;
        }
        this._path = path;
        this._query = query;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push(url);
    }
    replaceState(path, query = '') {
        path = this.prepareExternalUrl(path);
        this._path = path;
        this._query = query;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push('replace: ' + url);
    }
    forward() {
        // TODO
    }
    back() {
        // TODO
    }
    subscribe(onNext, onThrow = null, onReturn = null) {
        return ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    }
    normalize(url) { return null; }
};
SpyLocation = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], SpyLocation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fbW9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtc1l4azd3Z1QudG1wL2FuZ3VsYXIyL3NyYy9tb2NrL2xvY2F0aW9uX21vY2sudHMiXSwibmFtZXMiOlsiU3B5TG9jYXRpb24iLCJTcHlMb2NhdGlvbi5jb25zdHJ1Y3RvciIsIlNweUxvY2F0aW9uLnNldEluaXRpYWxQYXRoIiwiU3B5TG9jYXRpb24uc2V0QmFzZUhyZWYiLCJTcHlMb2NhdGlvbi5wYXRoIiwiU3B5TG9jYXRpb24uc2ltdWxhdGVVcmxQb3AiLCJTcHlMb2NhdGlvbi5zaW11bGF0ZUhhc2hDaGFuZ2UiLCJTcHlMb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwiLCJTcHlMb2NhdGlvbi5nbyIsIlNweUxvY2F0aW9uLnJlcGxhY2VTdGF0ZSIsIlNweUxvY2F0aW9uLmZvcndhcmQiLCJTcHlMb2NhdGlvbi5iYWNrIiwiU3B5TG9jYXRpb24uc3Vic2NyaWJlIiwiU3B5TG9jYXRpb24ubm9ybWFsaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQjtPQUN4QyxFQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQjtBQUl6RTs7R0FFRztBQUNIO0lBQUFBO1FBRUVDLGVBQVVBLEdBQWFBLEVBQUVBLENBQUNBO1FBQzFCQSxnQkFBZ0JBO1FBQ2hCQSxVQUFLQSxHQUFXQSxFQUFFQSxDQUFDQTtRQUNuQkEsZ0JBQWdCQTtRQUNoQkEsV0FBTUEsR0FBV0EsRUFBRUEsQ0FBQ0E7UUFDcEJBLGdCQUFnQkE7UUFDaEJBLGFBQVFBLEdBQXNCQSxJQUFJQSxZQUFZQSxFQUFFQSxDQUFDQTtRQUNqREEsZ0JBQWdCQTtRQUNoQkEsY0FBU0EsR0FBV0EsRUFBRUEsQ0FBQ0E7UUE0RHZCQSxtRkFBbUZBO1FBQ25GQSxxQkFBZ0JBLEdBQVFBLElBQUlBLENBQUNBO0lBRS9CQSxDQUFDQTtJQTdEQ0QsY0FBY0EsQ0FBQ0EsR0FBV0EsSUFBSUUsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFakRGLFdBQVdBLENBQUNBLEdBQVdBLElBQUlHLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO0lBRWxESCxJQUFJQSxLQUFhSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVyQ0osY0FBY0EsQ0FBQ0EsUUFBZ0JBO1FBQzdCSyxpQkFBaUJBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUNBLENBQUNBLENBQUNBO0lBQzVFQSxDQUFDQTtJQUVETCxrQkFBa0JBLENBQUNBLFFBQWdCQTtRQUNqQ00sNEZBQTRGQTtRQUM1RkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBO1FBQzFDQSxpQkFBaUJBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFlBQVlBLEVBQUNBLENBQUNBLENBQUNBO0lBQ2xHQSxDQUFDQTtJQUVETixrQkFBa0JBLENBQUNBLEdBQVdBO1FBQzVCTyxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDbEJBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO0lBQzlCQSxDQUFDQTtJQUVEUCxFQUFFQSxDQUFDQSxJQUFZQSxFQUFFQSxLQUFLQSxHQUFXQSxFQUFFQTtRQUNqQ1EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDL0NBLE1BQU1BLENBQUNBO1FBQ1RBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVwQkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDekRBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVEUixZQUFZQSxDQUFDQSxJQUFZQSxFQUFFQSxLQUFLQSxHQUFXQSxFQUFFQTtRQUMzQ1MsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1FBRXBCQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUN6REEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBRURULE9BQU9BO1FBQ0xVLE9BQU9BO0lBQ1RBLENBQUNBO0lBRURWLElBQUlBO1FBQ0ZXLE9BQU9BO0lBQ1RBLENBQUNBO0lBRURYLFNBQVNBLENBQUNBLE1BQTRCQSxFQUFFQSxPQUFPQSxHQUF5QkEsSUFBSUEsRUFDbEVBLFFBQVFBLEdBQWVBLElBQUlBO1FBQ25DWSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQy9FQSxDQUFDQTtJQUlEWixTQUFTQSxDQUFDQSxHQUFXQSxJQUFZYSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNqRGIsQ0FBQ0E7QUF6RUQ7SUFBQyxVQUFVLEVBQUU7O2dCQXlFWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb24nO1xuXG4vKipcbiAqIEEgc3B5IGZvciB7QGxpbmsgTG9jYXRpb259IHRoYXQgYWxsb3dzIHRlc3RzIHRvIGZpcmUgc2ltdWxhdGVkIGxvY2F0aW9uIGV2ZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNweUxvY2F0aW9uIGltcGxlbWVudHMgTG9jYXRpb24ge1xuICB1cmxDaGFuZ2VzOiBzdHJpbmdbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIF9wYXRoOiBzdHJpbmcgPSAnJztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcXVlcnk6IHN0cmluZyA9ICcnO1xuICAvKiogQGludGVybmFsICovXG4gIF9zdWJqZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYmFzZUhyZWY6IHN0cmluZyA9ICcnO1xuXG4gIHNldEluaXRpYWxQYXRoKHVybDogc3RyaW5nKSB7IHRoaXMuX3BhdGggPSB1cmw7IH1cblxuICBzZXRCYXNlSHJlZih1cmw6IHN0cmluZykgeyB0aGlzLl9iYXNlSHJlZiA9IHVybDsgfVxuXG4gIHBhdGgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BhdGg7IH1cblxuICBzaW11bGF0ZVVybFBvcChwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgeyd1cmwnOiBwYXRobmFtZSwgJ3BvcCc6IHRydWV9KTtcbiAgfVxuXG4gIHNpbXVsYXRlSGFzaENoYW5nZShwYXRobmFtZTogc3RyaW5nKSB7XG4gICAgLy8gQmVjYXVzZSB3ZSBkb24ndCBwcmV2ZW50IHRoZSBuYXRpdmUgZXZlbnQsIHRoZSBicm93c2VyIHdpbGwgaW5kZXBlbmRlbnRseSB1cGRhdGUgdGhlIHBhdGhcbiAgICB0aGlzLnNldEluaXRpYWxQYXRoKHBhdGhuYW1lKTtcbiAgICB0aGlzLnVybENoYW5nZXMucHVzaCgnaGFzaDogJyArIHBhdGhuYW1lKTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zdWJqZWN0LCB7J3VybCc6IHBhdGhuYW1lLCAncG9wJzogdHJ1ZSwgJ3R5cGUnOiAnaGFzaGNoYW5nZSd9KTtcbiAgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHVybC5sZW5ndGggPiAwICYmICF1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICB1cmwgPSAnLycgKyB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9iYXNlSHJlZiArIHVybDtcbiAgfVxuXG4gIGdvKHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyA9ICcnKSB7XG4gICAgcGF0aCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHBhdGgpO1xuICAgIGlmICh0aGlzLl9wYXRoID09IHBhdGggJiYgdGhpcy5fcXVlcnkgPT0gcXVlcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcblxuICAgIHZhciB1cmwgPSBwYXRoICsgKHF1ZXJ5Lmxlbmd0aCA+IDAgPyAoJz8nICsgcXVlcnkpIDogJycpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKHVybCk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUocGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICBwYXRoID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwocGF0aCk7XG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcblxuICAgIHZhciB1cmwgPSBwYXRoICsgKHF1ZXJ5Lmxlbmd0aCA+IDAgPyAoJz8nICsgcXVlcnkpIDogJycpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKCdyZXBsYWNlOiAnICsgdXJsKTtcbiAgfVxuXG4gIGZvcndhcmQoKSB7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgYmFjaygpIHtcbiAgICAvLyBUT0RPXG4gIH1cblxuICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25UaHJvdzogKGVycm9yOiBhbnkpID0+IHZvaWQgPSBudWxsLFxuICAgICAgICAgICAgb25SZXR1cm46ICgpID0+IHZvaWQgPSBudWxsKTogT2JqZWN0IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX3N1YmplY3QsIG9uTmV4dCwgb25UaHJvdywgb25SZXR1cm4pO1xuICB9XG5cbiAgLy8gVE9ETzogcmVtb3ZlIHRoZXNlIG9uY2UgTG9jYXRpb24gaXMgYW4gaW50ZXJmYWNlLCBhbmQgY2FuIGJlIGltcGxlbWVudGVkIGNsZWFubHlcbiAgcGxhdGZvcm1TdHJhdGVneTogYW55ID0gbnVsbDtcbiAgbm9ybWFsaXplKHVybDogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIG51bGw7IH1cbn1cbiJdfQ==