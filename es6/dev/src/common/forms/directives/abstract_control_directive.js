import { isPresent } from 'angular2/src/facade/lang';
import { unimplemented } from 'angular2/src/facade/exceptions';
/**
 * Base class for control directives.
 *
 * Only used internally in the forms module.
 */
export class AbstractControlDirective {
    get control() { return unimplemented(); }
    get value() { return isPresent(this.control) ? this.control.value : null; }
    get valid() { return isPresent(this.control) ? this.control.valid : null; }
    get errors() {
        return isPresent(this.control) ? this.control.errors : null;
    }
    get pristine() { return isPresent(this.control) ? this.control.pristine : null; }
    get dirty() { return isPresent(this.control) ? this.control.dirty : null; }
    get touched() { return isPresent(this.control) ? this.control.touched : null; }
    get untouched() { return isPresent(this.control) ? this.control.untouched : null; }
    get path() { return null; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXNZeGs3d2dULnRtcC9hbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUudHMiXSwibmFtZXMiOlsiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlIiwiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLmNvbnRyb2wiLCJBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUudmFsdWUiLCJBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUudmFsaWQiLCJBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUuZXJyb3JzIiwiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLnByaXN0aW5lIiwiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLmRpcnR5IiwiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLnRvdWNoZWQiLCJBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUudW50b3VjaGVkIiwiQWJzdHJhY3RDb250cm9sRGlyZWN0aXZlLnBhdGgiXSwibWFwcGluZ3MiOiJPQUNPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzNDLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO0FBRTVEOzs7O0dBSUc7QUFDSDtJQUNFQSxJQUFJQSxPQUFPQSxLQUFzQkMsTUFBTUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFMURELElBQUlBLEtBQUtBLEtBQVVFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBRWhGRixJQUFJQSxLQUFLQSxLQUFjRyxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVwRkgsSUFBSUEsTUFBTUE7UUFDUkksTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDOURBLENBQUNBO0lBRURKLElBQUlBLFFBQVFBLEtBQWNLLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBRTFGTCxJQUFJQSxLQUFLQSxLQUFjTSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVwRk4sSUFBSUEsT0FBT0EsS0FBY08sTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFeEZQLElBQUlBLFNBQVNBLEtBQWNRLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBRTVGUixJQUFJQSxJQUFJQSxLQUFlUyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUN2Q1QsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBjb250cm9sIGRpcmVjdGl2ZXMuXG4gKlxuICogT25seSB1c2VkIGludGVybmFsbHkgaW4gdGhlIGZvcm1zIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZSB7XG4gIGdldCBjb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cblxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRyb2wpID8gdGhpcy5jb250cm9sLnZhbHVlIDogbnVsbDsgfVxuXG4gIGdldCB2YWxpZCgpOiBib29sZWFuIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRyb2wpID8gdGhpcy5jb250cm9sLnZhbGlkIDogbnVsbDsgfVxuXG4gIGdldCBlcnJvcnMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250cm9sKSA/IHRoaXMuY29udHJvbC5lcnJvcnMgOiBudWxsO1xuICB9XG5cbiAgZ2V0IHByaXN0aW5lKCk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udHJvbCkgPyB0aGlzLmNvbnRyb2wucHJpc3RpbmUgOiBudWxsOyB9XG5cbiAgZ2V0IGRpcnR5KCk6IGJvb2xlYW4geyByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udHJvbCkgPyB0aGlzLmNvbnRyb2wuZGlydHkgOiBudWxsOyB9XG5cbiAgZ2V0IHRvdWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250cm9sKSA/IHRoaXMuY29udHJvbC50b3VjaGVkIDogbnVsbDsgfVxuXG4gIGdldCB1bnRvdWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250cm9sKSA/IHRoaXMuY29udHJvbC51bnRvdWNoZWQgOiBudWxsOyB9XG5cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10geyByZXR1cm4gbnVsbDsgfVxufVxuIl19