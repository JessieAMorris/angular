var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/core';
import { ListWrapper } from 'angular2/src/facade/collection';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { isPresent, isString, RegExpWrapper, StringWrapper } from 'angular2/src/facade/lang';
export let Log = class {
    constructor() {
        this.logItems = [];
    }
    add(value) { this.logItems.push(value); }
    fn(value) {
        return (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => {
            this.logItems.push(value);
        };
    }
    clear() { this.logItems = []; }
    result() { return this.logItems.join("; "); }
};
Log = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], Log);
export var browserDetection = null;
export class BrowserDetection {
    constructor(ua) {
        if (isPresent(ua)) {
            this._ua = ua;
        }
        else {
            this._ua = isPresent(DOM) ? DOM.getUserAgent() : '';
        }
    }
    static setup() { browserDetection = new BrowserDetection(null); }
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1;
    }
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1;
    }
    get isIOS7() {
        return this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1;
    }
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    // The Intl API is only properly supported in recent Chrome and Opera.
    // Note: Edge is disguised as Chrome 42, so checking the "Edge" part is needed,
    // see https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
    get supportsIntlApi() {
        return this._ua.indexOf('Chrome/4') > -1 && this._ua.indexOf('Edge') == -1;
    }
}
export function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
}
export function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
}
var _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
var _ESCAPE_RE = RegExpWrapper.create(`[\\${_RE_SPECIAL_CHARS.join('\\')}]`);
export function containsRegexp(input) {
    return RegExpWrapper.create(StringWrapper.replaceAllMapped(input, _ESCAPE_RE, (match) => `\\${match[0]}`));
}
export function normalizeCSS(css) {
    css = StringWrapper.replaceAll(css, /\s+/g, ' ');
    css = StringWrapper.replaceAll(css, /:\s/g, ':');
    css = StringWrapper.replaceAll(css, /'/g, '"');
    css = StringWrapper.replaceAll(css, / }/g, '}');
    css = StringWrapper.replaceAllMapped(css, /url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (match) => `url("${match[2]}")`);
    css = StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, (match) => `[${match[1]}="${match[2]}"]`);
    return css;
}
var _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
        var tagName = DOM.tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        var attributeMap = DOM.attributeMap(el);
        var keys = [];
        attributeMap.forEach((v, k) => keys.push(k));
        ListWrapper.sort(keys);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = attributeMap.get(key);
            if (!isString(attValue)) {
                result += ` ${key}`;
            }
            else {
                result += ` ${key}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        var childrenRoot = DOM.templateAwareRoot(el);
        var children = isPresent(childrenRoot) ? DOM.childNodes(childrenRoot) : [];
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!ListWrapper.contains(_singleTagWhitelist, tagName)) {
            result += `</${tagName}>`;
        }
    }
    else if (DOM.isCommentNode(el)) {
        result += `<!--${DOM.nodeValue(el)}-->`;
    }
    else {
        result += DOM.getText(el);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXNZeGs3d2dULnRtcC9hbmd1bGFyMi9zcmMvdGVzdGluZy91dGlscy50cyJdLCJuYW1lcyI6WyJMb2ciLCJMb2cuY29uc3RydWN0b3IiLCJMb2cuYWRkIiwiTG9nLmZuIiwiTG9nLmNsZWFyIiwiTG9nLnJlc3VsdCIsIkJyb3dzZXJEZXRlY3Rpb24iLCJCcm93c2VyRGV0ZWN0aW9uLmNvbnN0cnVjdG9yIiwiQnJvd3NlckRldGVjdGlvbi5zZXR1cCIsIkJyb3dzZXJEZXRlY3Rpb24uaXNGaXJlZm94IiwiQnJvd3NlckRldGVjdGlvbi5pc0FuZHJvaWQiLCJCcm93c2VyRGV0ZWN0aW9uLmlzRWRnZSIsIkJyb3dzZXJEZXRlY3Rpb24uaXNJRSIsIkJyb3dzZXJEZXRlY3Rpb24uaXNXZWJraXQiLCJCcm93c2VyRGV0ZWN0aW9uLmlzSU9TNyIsIkJyb3dzZXJEZXRlY3Rpb24uaXNTbG93IiwiQnJvd3NlckRldGVjdGlvbi5zdXBwb3J0c0ludGxBcGkiLCJkaXNwYXRjaEV2ZW50IiwiZWwiLCJjb250YWluc1JlZ2V4cCIsIm5vcm1hbGl6ZUNTUyIsInN0cmluZ2lmeUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZTtPQUNqQyxFQUFDLFdBQVcsRUFBYSxNQUFNLGdDQUFnQztPQUMvRCxFQUFDLEdBQUcsRUFBQyxNQUFNLHVDQUF1QztPQUNsRCxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBUyxNQUFNLDBCQUEwQjtBQUVsRztJQUlFQTtRQUFnQkMsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFBQ0EsQ0FBQ0E7SUFFckNELEdBQUdBLENBQUNBLEtBQUtBLElBQVVFLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNB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LENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3JDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsQkEsSUFBSUEsUUFBUUEsR0FBR0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4QkEsTUFBTUEsSUFBSUEsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdEJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNOQSxNQUFNQSxJQUFJQSxJQUFJQSxHQUFHQSxLQUFLQSxRQUFRQSxHQUFHQSxDQUFDQTtZQUNwQ0EsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFDREEsTUFBTUEsSUFBSUEsR0FBR0EsQ0FBQ0E7UUFFZEEsV0FBV0E7UUFDWEEsSUFBSUEsWUFBWUEsR0FBR0EsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM3Q0EsSUFBSUEsUUFBUUEsR0FBR0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDM0VBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3pDQSxNQUFNQSxJQUFJQSxnQkFBZ0JBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzFDQSxDQUFDQTtRQUVEQSxjQUFjQTtRQUNkQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxtQkFBbUJBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hEQSxNQUFNQSxJQUFJQSxLQUFLQSxPQUFPQSxHQUFHQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakNBLE1BQU1BLElBQUlBLE9BQU9BLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNOQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7SUFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7QUFDaEJBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNTdHJpbmcsIFJlZ0V4cFdyYXBwZXIsIFN0cmluZ1dyYXBwZXIsIFJlZ0V4cH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZyB7XG4gIGxvZ0l0ZW1zOiBhbnlbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5sb2dJdGVtcyA9IFtdOyB9XG5cbiAgYWRkKHZhbHVlKTogdm9pZCB7IHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7IH1cblxuICBmbih2YWx1ZSkge1xuICAgIHJldHVybiAoYTE6IGFueSA9IG51bGwsIGEyOiBhbnkgPSBudWxsLCBhMzogYW55ID0gbnVsbCwgYTQ6IGFueSA9IG51bGwsIGE1OiBhbnkgPSBudWxsKSA9PiB7XG4gICAgICB0aGlzLmxvZ0l0ZW1zLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQgeyB0aGlzLmxvZ0l0ZW1zID0gW107IH1cblxuICByZXN1bHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubG9nSXRlbXMuam9pbihcIjsgXCIpOyB9XG59XG5cbmV4cG9ydCB2YXIgYnJvd3NlckRldGVjdGlvbjogQnJvd3NlckRldGVjdGlvbiA9IG51bGw7XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyRGV0ZWN0aW9uIHtcbiAgcHJpdmF0ZSBfdWE6IHN0cmluZztcblxuICBzdGF0aWMgc2V0dXAoKSB7IGJyb3dzZXJEZXRlY3Rpb24gPSBuZXcgQnJvd3NlckRldGVjdGlvbihudWxsKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHVhOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNQcmVzZW50KHVhKSkge1xuICAgICAgdGhpcy5fdWEgPSB1YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdWEgPSBpc1ByZXNlbnQoRE9NKSA/IERPTS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0ZpcmVmb3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdGaXJlZm94JykgPiAtMTsgfVxuXG4gIGdldCBpc0FuZHJvaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdBbmRyb2lkJykgPiAtMSAmJlxuICAgICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNFZGdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID4gLTE7IH1cblxuICBnZXQgaXNJRSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ1RyaWRlbnQnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzV2Via2l0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignaVBob25lIE9TIDcnKSA+IC0xIHx8IHRoaXMuX3VhLmluZGV4T2YoJ2lQYWQgT1MgNycpID4gLTE7XG4gIH1cblxuICBnZXQgaXNTbG93KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0FuZHJvaWQgfHwgdGhpcy5pc0lFIHx8IHRoaXMuaXNJT1M3OyB9XG5cbiAgLy8gVGhlIEludGwgQVBJIGlzIG9ubHkgcHJvcGVybHkgc3VwcG9ydGVkIGluIHJlY2VudCBDaHJvbWUgYW5kIE9wZXJhLlxuICAvLyBOb3RlOiBFZGdlIGlzIGRpc2d1aXNlZCBhcyBDaHJvbWUgNDIsIHNvIGNoZWNraW5nIHRoZSBcIkVkZ2VcIiBwYXJ0IGlzIG5lZWRlZCxcbiAgLy8gc2VlIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGg4NjkzMDEodj12cy44NSkuYXNweFxuICBnZXQgc3VwcG9ydHNJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvNCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQsIGV2ZW50VHlwZSk6IHZvaWQge1xuICBET00uZGlzcGF0Y2hFdmVudChlbGVtZW50LCBET00uY3JlYXRlRXZlbnQoZXZlbnRUeXBlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIHJldHVybiA8SFRNTEVsZW1lbnQ+RE9NLmZpcnN0Q2hpbGQoRE9NLmNvbnRlbnQoRE9NLmNyZWF0ZVRlbXBsYXRlKGh0bWwpKSk7XG59XG5cbnZhciBfUkVfU1BFQ0lBTF9DSEFSUyA9XG4gICAgWyctJywgJ1snLCAnXScsICcvJywgJ3snLCAnfScsICdcXFxcJywgJygnLCAnKScsICcqJywgJysnLCAnPycsICcuJywgJ14nLCAnJCcsICd8J107XG52YXIgX0VTQ0FQRV9SRSA9IFJlZ0V4cFdyYXBwZXIuY3JlYXRlKGBbXFxcXCR7X1JFX1NQRUNJQUxfQ0hBUlMuam9pbignXFxcXCcpfV1gKTtcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1JlZ2V4cChpbnB1dDogc3RyaW5nKTogUmVnRXhwIHtcbiAgcmV0dXJuIFJlZ0V4cFdyYXBwZXIuY3JlYXRlKFxuICAgICAgU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsTWFwcGVkKGlucHV0LCBfRVNDQVBFX1JFLCAobWF0Y2gpID0+IGBcXFxcJHttYXRjaFswXX1gKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDU1MoY3NzOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvXFxzKy9nLCAnICcpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvOlxccy9nLCAnOicpO1xuICBjc3MgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoY3NzLCAvJy9nLCAnXCInKTtcbiAgY3NzID0gU3RyaW5nV3JhcHBlci5yZXBsYWNlQWxsKGNzcywgLyB9L2csICd9Jyk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChjc3MsIC91cmxcXCgoXFxcInxcXHMpKC4rKShcXFwifFxccylcXCkoXFxzKikvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXRjaCkgPT4gYHVybChcIiR7bWF0Y2hbMl19XCIpYCk7XG4gIGNzcyA9IFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbE1hcHBlZChjc3MsIC9cXFsoLispPShbXlwiXFxdXSspXFxdL2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobWF0Y2gpID0+IGBbJHttYXRjaFsxXX09XCIke21hdGNoWzJdfVwiXWApO1xuICByZXR1cm4gY3NzO1xufVxuXG52YXIgX3NpbmdsZVRhZ1doaXRlbGlzdCA9IFsnYnInLCAnaHInLCAnaW5wdXQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFbGVtZW50KGVsKTogc3RyaW5nIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAoRE9NLmlzRWxlbWVudE5vZGUoZWwpKSB7XG4gICAgdmFyIHRhZ05hbWUgPSBET00udGFnTmFtZShlbCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgdmFyIGF0dHJpYnV0ZU1hcCA9IERPTS5hdHRyaWJ1dGVNYXAoZWwpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgYXR0cmlidXRlTWFwLmZvckVhY2goKHYsIGspID0+IGtleXMucHVzaChrKSk7XG4gICAgTGlzdFdyYXBwZXIuc29ydChrZXlzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgdmFyIGF0dFZhbHVlID0gYXR0cmlidXRlTWFwLmdldChrZXkpO1xuICAgICAgaWYgKCFpc1N0cmluZyhhdHRWYWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtrZXl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7a2V5fT1cIiR7YXR0VmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJz4nO1xuXG4gICAgLy8gQ2hpbGRyZW5cbiAgICB2YXIgY2hpbGRyZW5Sb290ID0gRE9NLnRlbXBsYXRlQXdhcmVSb290KGVsKTtcbiAgICB2YXIgY2hpbGRyZW4gPSBpc1ByZXNlbnQoY2hpbGRyZW5Sb290KSA/IERPTS5jaGlsZE5vZGVzKGNoaWxkcmVuUm9vdCkgOiBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5naWZ5RWxlbWVudChjaGlsZHJlbltqXSk7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2luZyB0YWdcbiAgICBpZiAoIUxpc3RXcmFwcGVyLmNvbnRhaW5zKF9zaW5nbGVUYWdXaGl0ZWxpc3QsIHRhZ05hbWUpKSB7XG4gICAgICByZXN1bHQgKz0gYDwvJHt0YWdOYW1lfT5gO1xuICAgIH1cbiAgfSBlbHNlIGlmIChET00uaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICByZXN1bHQgKz0gYDwhLS0ke0RPTS5ub2RlVmFsdWUoZWwpfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IERPTS5nZXRUZXh0KGVsKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=