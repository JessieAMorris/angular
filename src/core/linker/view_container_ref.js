'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('angular2/src/facade/collection');
var exceptions_1 = require('angular2/src/facade/exceptions');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createHostView}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via
 * {@link AppViewManager#getViewContainer}.
 *
 * <!-- TODO(i): we are also considering ElementRef#viewContainer api -->
 */
var ViewContainerRef = (function () {
    function ViewContainerRef() {
    }
    Object.defineProperty(ViewContainerRef.prototype, "element", {
        /**
         * Anchor element that specifies the location of this container in the containing View.
         * <!-- TODO: rename to anchorElement -->
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroys all Views in this container.
     */
    ViewContainerRef.prototype.clear = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    };
    Object.defineProperty(ViewContainerRef.prototype, "length", {
        /**
         * Returns the number of Views currently attached to this container.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ViewContainerRef;
})();
exports.ViewContainerRef = ViewContainerRef;
var ViewContainerRef_ = (function (_super) {
    __extends(ViewContainerRef_, _super);
    function ViewContainerRef_(_element) {
        _super.call(this);
        this._element = _element;
    }
    ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: function () {
            var views = this._element.nestedViews;
            return lang_1.isPresent(views) ? views.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: function () { return this._element.ref; },
        enumerable: true,
        configurable: true
    });
    // TODO(rado): profile and decide whether bounds checks should be added
    // to the methods below.
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, index) {
        if (index === void 0) { index = -1; }
        if (index == -1)
            index = this.length;
        var vm = this._element.parentView.viewManager;
        return vm.createEmbeddedViewInContainer(this._element.ref, index, templateRef);
    };
    ViewContainerRef_.prototype.createHostView = function (hostViewFactoryRef, index, dynamicallyCreatedProviders, projectableNodes) {
        if (index === void 0) { index = -1; }
        if (dynamicallyCreatedProviders === void 0) { dynamicallyCreatedProviders = null; }
        if (projectableNodes === void 0) { projectableNodes = null; }
        if (index == -1)
            index = this.length;
        var vm = this._element.parentView.viewManager;
        return vm.createHostViewInContainer(this._element.ref, index, hostViewFactoryRef, dynamicallyCreatedProviders, projectableNodes);
    };
    // TODO(i): refactor insert+remove into move
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        if (index === void 0) { index = -1; }
        if (index == -1)
            index = this.length;
        var vm = this._element.parentView.viewManager;
        return vm.attachViewInContainer(this._element.ref, index, viewRef);
    };
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return collection_1.ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
    };
    // TODO(i): rename to destroy
    ViewContainerRef_.prototype.remove = function (index) {
        if (index === void 0) { index = -1; }
        if (index == -1)
            index = this.length - 1;
        var vm = this._element.parentView.viewManager;
        return vm.destroyViewInContainer(this._element.ref, index);
        // view is intentionally not returned to the client.
    };
    // TODO(i): refactor insert+remove into move
    ViewContainerRef_.prototype.detach = function (index) {
        if (index === void 0) { index = -1; }
        if (index == -1)
            index = this.length - 1;
        var vm = this._element.parentView.viewManager;
        return vm.detachViewInContainer(this._element.ref, index);
    };
    return ViewContainerRef_;
})(ViewContainerRef);
exports.ViewContainerRef_ = ViewContainerRef_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19jb250YWluZXJfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1hN0FJY0FQVS50bXAvYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZi50cyJdLCJuYW1lcyI6WyJWaWV3Q29udGFpbmVyUmVmIiwiVmlld0NvbnRhaW5lclJlZi5jb25zdHJ1Y3RvciIsIlZpZXdDb250YWluZXJSZWYuZWxlbWVudCIsIlZpZXdDb250YWluZXJSZWYuY2xlYXIiLCJWaWV3Q29udGFpbmVyUmVmLmxlbmd0aCIsIlZpZXdDb250YWluZXJSZWZfIiwiVmlld0NvbnRhaW5lclJlZl8uY29uc3RydWN0b3IiLCJWaWV3Q29udGFpbmVyUmVmXy5nZXQiLCJWaWV3Q29udGFpbmVyUmVmXy5sZW5ndGgiLCJWaWV3Q29udGFpbmVyUmVmXy5lbGVtZW50IiwiVmlld0NvbnRhaW5lclJlZl8uY3JlYXRlRW1iZWRkZWRWaWV3IiwiVmlld0NvbnRhaW5lclJlZl8uY3JlYXRlSG9zdFZpZXciLCJWaWV3Q29udGFpbmVyUmVmXy5pbnNlcnQiLCJWaWV3Q29udGFpbmVyUmVmXy5pbmRleE9mIiwiVmlld0NvbnRhaW5lclJlZl8ucmVtb3ZlIiwiVmlld0NvbnRhaW5lclJlZl8uZGV0YWNoIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJCQUEwQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzNELDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTdELHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBZTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFBQUE7SUFrRkFDLENBQUNBO0lBN0VDRCxzQkFBSUEscUNBQU9BO1FBSlhBOzs7V0FHR0E7YUFDSEEsY0FBNEJFLE1BQU1BLENBQWFBLDBCQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7O09BQUFGO0lBRWpFQTs7T0FFR0E7SUFDSEEs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RUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDM0RBLG9EQUFvREE7SUFDdERBLENBQUNBO0lBRURULDRDQUE0Q0E7SUFDNUNBLGtDQUFNQSxHQUFOQSxVQUFPQSxLQUFrQkE7UUFBbEJVLHFCQUFrQkEsR0FBbEJBLFNBQWlCQSxDQUFDQTtRQUN2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBO1FBQzlDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQzVEQSxDQUFDQTtJQUNIVix3QkFBQ0E7QUFBREEsQ0FBQ0EsQUFyREQsRUFBdUMsZ0JBQWdCLEVBcUR0RDtBQXJEWSx5QkFBaUIsb0JBcUQ3QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UmVzb2x2ZWRQcm92aWRlciwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7QXBwRWxlbWVudH0gZnJvbSAnLi9lbGVtZW50JztcblxuaW1wb3J0IHtFbGVtZW50UmVmLCBFbGVtZW50UmVmX30gZnJvbSAnLi9lbGVtZW50X3JlZic7XG5pbXBvcnQge1RlbXBsYXRlUmVmLCBUZW1wbGF0ZVJlZl99IGZyb20gJy4vdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7XG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSG9zdFZpZXdSZWYsXG4gIEhvc3RWaWV3RmFjdG9yeVJlZixcbiAgSG9zdFZpZXdGYWN0b3J5UmVmXyxcbiAgVmlld1JlZixcbiAgVmlld1JlZl9cbn0gZnJvbSAnLi92aWV3X3JlZic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbnRhaW5lciB3aGVyZSBvbmUgb3IgbW9yZSBWaWV3cyBjYW4gYmUgYXR0YWNoZWQuXG4gKlxuICogVGhlIGNvbnRhaW5lciBjYW4gY29udGFpbiB0d28ga2luZHMgb2YgVmlld3MuIEhvc3QgVmlld3MsIGNyZWF0ZWQgYnkgaW5zdGFudGlhdGluZyBhXG4gKiB7QGxpbmsgQ29tcG9uZW50fSB2aWEge0BsaW5rICNjcmVhdGVIb3N0Vmlld30sIGFuZCBFbWJlZGRlZCBWaWV3cywgY3JlYXRlZCBieSBpbnN0YW50aWF0aW5nIGFuXG4gKiB7QGxpbmsgVGVtcGxhdGVSZWYgRW1iZWRkZWQgVGVtcGxhdGV9IHZpYSB7QGxpbmsgI2NyZWF0ZUVtYmVkZGVkVmlld30uXG4gKlxuICogVGhlIGxvY2F0aW9uIG9mIHRoZSBWaWV3IENvbnRhaW5lciB3aXRoaW4gdGhlIGNvbnRhaW5pbmcgVmlldyBpcyBzcGVjaWZpZWQgYnkgdGhlIEFuY2hvclxuICogYGVsZW1lbnRgLiBFYWNoIFZpZXcgQ29udGFpbmVyIGNhbiBoYXZlIG9ubHkgb25lIEFuY2hvciBFbGVtZW50IGFuZCBlYWNoIEFuY2hvciBFbGVtZW50IGNhbiBvbmx5XG4gKiBoYXZlIGEgc2luZ2xlIFZpZXcgQ29udGFpbmVyLlxuICpcbiAqIFJvb3QgZWxlbWVudHMgb2YgVmlld3MgYXR0YWNoZWQgdG8gdGhpcyBjb250YWluZXIgYmVjb21lIHNpYmxpbmdzIG9mIHRoZSBBbmNob3IgRWxlbWVudCBpblxuICogdGhlIFJlbmRlcmVkIFZpZXcuXG4gKlxuICogVG8gYWNjZXNzIGEgYFZpZXdDb250YWluZXJSZWZgIG9mIGFuIEVsZW1lbnQsIHlvdSBjYW4gZWl0aGVyIHBsYWNlIGEge0BsaW5rIERpcmVjdGl2ZX0gaW5qZWN0ZWRcbiAqIHdpdGggYFZpZXdDb250YWluZXJSZWZgIG9uIHRoZSBFbGVtZW50LCBvciB5b3Ugb2J0YWluIGl0IHZpYVxuICoge0BsaW5rIEFwcFZpZXdNYW5hZ2VyI2dldFZpZXdDb250YWluZXJ9LlxuICpcbiAqIDwhLS0gVE9ETyhpKTogd2UgYXJlIGFsc28gY29uc2lkZXJpbmcgRWxlbWVudFJlZiN2aWV3Q29udGFpbmVyIGFwaSAtLT5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdDb250YWluZXJSZWYge1xuICAvKipcbiAgICogQW5jaG9yIGVsZW1lbnQgdGhhdCBzcGVjaWZpZXMgdGhlIGxvY2F0aW9uIG9mIHRoaXMgY29udGFpbmVyIGluIHRoZSBjb250YWluaW5nIFZpZXcuXG4gICAqIDwhLS0gVE9ETzogcmVuYW1lIHRvIGFuY2hvckVsZW1lbnQgLS0+XG4gICAqL1xuICBnZXQgZWxlbWVudCgpOiBFbGVtZW50UmVmIHsgcmV0dXJuIDxFbGVtZW50UmVmPnVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbGwgVmlld3MgaW4gdGhpcyBjb250YWluZXIuXG4gICAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy5yZW1vdmUoaSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHtAbGluayBWaWV3UmVmfSBmb3IgdGhlIFZpZXcgbG9jYXRlZCBpbiB0aGlzIGNvbnRhaW5lciBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0KGluZGV4OiBudW1iZXIpOiBWaWV3UmVmO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgVmlld3MgY3VycmVudGx5IGF0dGFjaGVkIHRvIHRoaXMgY29udGFpbmVyLlxuICAgKi9cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIgeyByZXR1cm4gPG51bWJlcj51bmltcGxlbWVudGVkKCk7IH07XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhbiBFbWJlZGRlZCBWaWV3IGJhc2VkIG9uIHRoZSB7QGxpbmsgVGVtcGxhdGVSZWYgYHRlbXBsYXRlUmVmYH0gYW5kIGluc2VydHMgaXRcbiAgICogaW50byB0aGlzIGNvbnRhaW5lciBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIElmIGBpbmRleGAgaXMgbm90IHNwZWNpZmllZCwgdGhlIG5ldyBWaWV3IHdpbGwgYmUgaW5zZXJ0ZWQgYXMgdGhlIGxhc3QgVmlldyBpbiB0aGUgY29udGFpbmVyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSB7QGxpbmsgVmlld1JlZn0gZm9yIHRoZSBuZXdseSBjcmVhdGVkIFZpZXcuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmLCBpbmRleD86IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgc2luZ2xlIHtAbGluayBDb21wb25lbnR9IGFuZCBpbnNlcnRzIGl0cyBIb3N0IFZpZXcgaW50byB0aGlzIGNvbnRhaW5lciBhdCB0aGVcbiAgICogc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIFRoZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIHVzaW5nIGl0cyB7QGxpbmsgUHJvdG9WaWV3UmVmIGBwcm90b1ZpZXdgfSB3aGljaCBjYW4gYmVcbiAgICogb2J0YWluZWQgdmlhIHtAbGluayBDb21waWxlciNjb21waWxlSW5Ib3N0fS5cbiAgICpcbiAgICogSWYgYGluZGV4YCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgbmV3IFZpZXcgd2lsbCBiZSBpbnNlcnRlZCBhcyB0aGUgbGFzdCBWaWV3IGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBzcGVjaWZ5IGBkeW5hbWljYWxseUNyZWF0ZWRQcm92aWRlcnNgLCB3aGljaCBjb25maWd1cmUgdGhlIHtAbGluayBJbmplY3Rvcn1cbiAgICogdGhhdCB3aWxsIGJlIGNyZWF0ZWQgZm9yIHRoZSBIb3N0IFZpZXcuXG4gICAqXG4gICAqIFJldHVybnMgdGhlIHtAbGluayBIb3N0Vmlld1JlZn0gb2YgdGhlIEhvc3QgVmlldyBjcmVhdGVkIGZvciB0aGUgbmV3bHkgaW5zdGFudGlhdGVkIENvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUhvc3RWaWV3KGhvc3RWaWV3RmFjdG9yeVJlZjogSG9zdFZpZXdGYWN0b3J5UmVmLCBpbmRleD86IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY2FsbHlDcmVhdGVkUHJvdmlkZXJzPzogUmVzb2x2ZWRQcm92aWRlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0YWJsZU5vZGVzPzogYW55W11bXSk6IEhvc3RWaWV3UmVmO1xuXG4gIC8qKlxuICAgKiBJbnNlcnRzIGEgVmlldyBpZGVudGlmaWVkIGJ5IGEge0BsaW5rIFZpZXdSZWZ9IGludG8gdGhlIGNvbnRhaW5lciBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIElmIGBpbmRleGAgaXMgbm90IHNwZWNpZmllZCwgdGhlIG5ldyBWaWV3IHdpbGwgYmUgaW5zZXJ0ZWQgYXMgdGhlIGxhc3QgVmlldyBpbiB0aGUgY29udGFpbmVyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRoZSBpbnNlcnRlZCB7QGxpbmsgVmlld1JlZn0uXG4gICAqL1xuICBhYnN0cmFjdCBpbnNlcnQodmlld1JlZjogRW1iZWRkZWRWaWV3UmVmLCBpbmRleD86IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIFZpZXcsIHNwZWNpZmllZCB2aWEge0BsaW5rIFZpZXdSZWZ9LCB3aXRoaW4gdGhlIGN1cnJlbnQgY29udGFpbmVyIG9yXG4gICAqIGAtMWAgaWYgdGhpcyBjb250YWluZXIgZG9lc24ndCBjb250YWluIHRoZSBWaWV3LlxuICAgKi9cbiAgYWJzdHJhY3QgaW5kZXhPZih2aWV3UmVmOiBWaWV3UmVmKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhIFZpZXcgYXR0YWNoZWQgdG8gdGhpcyBjb250YWluZXIgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgLlxuICAgKlxuICAgKiBJZiBgaW5kZXhgIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBsYXN0IFZpZXcgaW4gdGhlIGNvbnRhaW5lciB3aWxsIGJlIHJlbW92ZWQuXG4gICAqL1xuICBhYnN0cmFjdCByZW1vdmUoaW5kZXg/OiBudW1iZXIpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVc2UgYWxvbmcgd2l0aCB7QGxpbmsgI2luc2VydH0gdG8gbW92ZSBhIFZpZXcgd2l0aGluIHRoZSBjdXJyZW50IGNvbnRhaW5lci5cbiAgICpcbiAgICogSWYgdGhlIGBpbmRleGAgcGFyYW0gaXMgb21pdHRlZCwgdGhlIGxhc3Qge0BsaW5rIFZpZXdSZWZ9IGlzIGRldGFjaGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgZGV0YWNoKGluZGV4PzogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmO1xufVxuXG5leHBvcnQgY2xhc3MgVmlld0NvbnRhaW5lclJlZl8gZXh0ZW5kcyBWaWV3Q29udGFpbmVyUmVmIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogQXBwRWxlbWVudCkgeyBzdXBlcigpOyB9XG5cbiAgZ2V0KGluZGV4OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWYgeyByZXR1cm4gdGhpcy5fZWxlbWVudC5uZXN0ZWRWaWV3c1tpbmRleF0ucmVmOyB9XG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICB2YXIgdmlld3MgPSB0aGlzLl9lbGVtZW50Lm5lc3RlZFZpZXdzO1xuICAgIHJldHVybiBpc1ByZXNlbnQodmlld3MpID8gdmlld3MubGVuZ3RoIDogMDtcbiAgfVxuXG4gIGdldCBlbGVtZW50KCk6IEVsZW1lbnRSZWZfIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnQucmVmOyB9XG5cbiAgLy8gVE9ETyhyYWRvKTogcHJvZmlsZSBhbmQgZGVjaWRlIHdoZXRoZXIgYm91bmRzIGNoZWNrcyBzaG91bGQgYmUgYWRkZWRcbiAgLy8gdG8gdGhlIG1ldGhvZHMgYmVsb3cuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWYsIGluZGV4OiBudW1iZXIgPSAtMSk6IEVtYmVkZGVkVmlld1JlZiB7XG4gICAgaWYgKGluZGV4ID09IC0xKSBpbmRleCA9IHRoaXMubGVuZ3RoO1xuICAgIHZhciB2bSA9IHRoaXMuX2VsZW1lbnQucGFyZW50Vmlldy52aWV3TWFuYWdlcjtcbiAgICByZXR1cm4gdm0uY3JlYXRlRW1iZWRkZWRWaWV3SW5Db250YWluZXIodGhpcy5fZWxlbWVudC5yZWYsIGluZGV4LCB0ZW1wbGF0ZVJlZik7XG4gIH1cblxuICBjcmVhdGVIb3N0Vmlldyhob3N0Vmlld0ZhY3RvcnlSZWY6IEhvc3RWaWV3RmFjdG9yeVJlZiwgaW5kZXg6IG51bWJlciA9IC0xLFxuICAgICAgICAgICAgICAgICBkeW5hbWljYWxseUNyZWF0ZWRQcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSA9IG51bGwsXG4gICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM6IGFueVtdW10gPSBudWxsKTogSG9zdFZpZXdSZWYge1xuICAgIGlmIChpbmRleCA9PSAtMSkgaW5kZXggPSB0aGlzLmxlbmd0aDtcbiAgICB2YXIgdm0gPSB0aGlzLl9lbGVtZW50LnBhcmVudFZpZXcudmlld01hbmFnZXI7XG4gICAgcmV0dXJuIHZtLmNyZWF0ZUhvc3RWaWV3SW5Db250YWluZXIodGhpcy5fZWxlbWVudC5yZWYsIGluZGV4LCBob3N0Vmlld0ZhY3RvcnlSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY2FsbHlDcmVhdGVkUHJvdmlkZXJzLCBwcm9qZWN0YWJsZU5vZGVzKTtcbiAgfVxuXG4gIC8vIFRPRE8oaSk6IHJlZmFjdG9yIGluc2VydCtyZW1vdmUgaW50byBtb3ZlXG4gIGluc2VydCh2aWV3UmVmOiBWaWV3UmVmLCBpbmRleDogbnVtYmVyID0gLTEpOiBFbWJlZGRlZFZpZXdSZWYge1xuICAgIGlmIChpbmRleCA9PSAtMSkgaW5kZXggPSB0aGlzLmxlbmd0aDtcbiAgICB2YXIgdm0gPSB0aGlzLl9lbGVtZW50LnBhcmVudFZpZXcudmlld01hbmFnZXI7XG4gICAgcmV0dXJuIHZtLmF0dGFjaFZpZXdJbkNvbnRhaW5lcih0aGlzLl9lbGVtZW50LnJlZiwgaW5kZXgsIHZpZXdSZWYpO1xuICB9XG5cbiAgaW5kZXhPZih2aWV3UmVmOiBWaWV3UmVmKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTGlzdFdyYXBwZXIuaW5kZXhPZih0aGlzLl9lbGVtZW50Lm5lc3RlZFZpZXdzLCAoPFZpZXdSZWZfPnZpZXdSZWYpLmludGVybmFsVmlldyk7XG4gIH1cblxuICAvLyBUT0RPKGkpOiByZW5hbWUgdG8gZGVzdHJveVxuICByZW1vdmUoaW5kZXg6IG51bWJlciA9IC0xKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09IC0xKSBpbmRleCA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICB2YXIgdm0gPSB0aGlzLl9lbGVtZW50LnBhcmVudFZpZXcudmlld01hbmFnZXI7XG4gICAgcmV0dXJuIHZtLmRlc3Ryb3lWaWV3SW5Db250YWluZXIodGhpcy5fZWxlbWVudC5yZWYsIGluZGV4KTtcbiAgICAvLyB2aWV3IGlzIGludGVudGlvbmFsbHkgbm90IHJldHVybmVkIHRvIHRoZSBjbGllbnQuXG4gIH1cblxuICAvLyBUT0RPKGkpOiByZWZhY3RvciBpbnNlcnQrcmVtb3ZlIGludG8gbW92ZVxuICBkZXRhY2goaW5kZXg6IG51bWJlciA9IC0xKTogRW1iZWRkZWRWaWV3UmVmIHtcbiAgICBpZiAoaW5kZXggPT0gLTEpIGluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIHZhciB2bSA9IHRoaXMuX2VsZW1lbnQucGFyZW50Vmlldy52aWV3TWFuYWdlcjtcbiAgICByZXR1cm4gdm0uZGV0YWNoVmlld0luQ29udGFpbmVyKHRoaXMuX2VsZW1lbnQucmVmLCBpbmRleCk7XG4gIH1cbn1cbiJdfQ==