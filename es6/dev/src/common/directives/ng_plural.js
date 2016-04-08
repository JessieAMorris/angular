var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ViewContainerRef, TemplateRef, ContentChildren, QueryList, Attribute, Input } from 'angular2/core';
import { isPresent, NumberWrapper } from 'angular2/src/facade/lang';
import { Map } from 'angular2/src/facade/collection';
import { SwitchView } from './ng_switch';
const _CATEGORY_DEFAULT = 'other';
export class NgLocalization {
}
/**
 * `ngPlural` is an i18n directive that displays DOM sub-trees that match the switch expression
 * value, or failing that, DOM sub-trees that match the switch expression's pluralization category.
 *
 * To use this directive, you must provide an extension of `NgLocalization` that maps values to
 * category names. You then define a container element that sets the `[ngPlural]` attribute to a
 * switch expression.
 *    - Inner elements defined with an `[ngPluralCase]` attribute will display based on their
 * expression.
 *    - If `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
 * matches the switch expression exactly.
 *    - Otherwise, the view will be treated as a "category match", and will only display if exact
 * value matches aren't found and the value maps to its category using the `getPluralCategory`
 * function provided.
 *
 * If no matching views are found for a switch expression, inner elements marked
 * `[ngPluralCase]="other"` will be displayed.
 *
 * ```typescript
 * class MyLocalization extends NgLocalization {
 *    getPluralCategory(value: any) {
 *       if(value < 5) {
 *          return 'few';
 *       }
 *    }
 * }
 *
 * @Component({
 *    selector: 'app',
 *    providers: [provide(NgLocalization, {useClass: MyLocalization})]
 * })
 * @View({
 *   template: `
 *     <p>Value = {{value}}</p>
 *     <button (click)="inc()">Increment</button>
 *
 *     <div [ngPlural]="value">
 *       <template ngPluralCase="=0">there is nothing</template>
 *       <template ngPluralCase="=1">there is one</template>
 *       <template ngPluralCase="few">there are a few</template>
 *       <template ngPluralCase="other">there is some number</template>
 *     </div>
 *   `,
 *   directives: [NgPlural, NgPluralCase]
 * })
 * export class App {
 *   value = 'init';
 *
 *   inc() {
 *     this.value = this.value === 'init' ? 0 : this.value + 1;
 *   }
 * }
 *
 * ```
 */
export let NgPluralCase = class {
    constructor(value, template, viewContainer) {
        this.value = value;
        this._view = new SwitchView(viewContainer, template);
    }
};
NgPluralCase = __decorate([
    Directive({ selector: '[ngPluralCase]' }),
    __param(0, Attribute('ngPluralCase')), 
    __metadata('design:paramtypes', [String, TemplateRef, ViewContainerRef])
], NgPluralCase);
export let NgPlural = class {
    constructor(_localization) {
        this._localization = _localization;
        this._caseViews = new Map();
        this.cases = null;
    }
    set ngPlural(value) {
        this._switchValue = value;
        this._updateView();
    }
    ngAfterContentInit() {
        this.cases.forEach((pluralCase) => {
            this._caseViews.set(this._formatValue(pluralCase), pluralCase._view);
        });
        this._updateView();
    }
    /** @internal */
    _updateView() {
        this._clearViews();
        var view = this._caseViews.get(this._switchValue);
        if (!isPresent(view))
            view = this._getCategoryView(this._switchValue);
        this._activateView(view);
    }
    /** @internal */
    _clearViews() {
        if (isPresent(this._activeView))
            this._activeView.destroy();
    }
    /** @internal */
    _activateView(view) {
        if (!isPresent(view))
            return;
        this._activeView = view;
        this._activeView.create();
    }
    /** @internal */
    _getCategoryView(value) {
        var category = this._localization.getPluralCategory(value);
        var categoryView = this._caseViews.get(category);
        return isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
    }
    /** @internal */
    _isValueView(pluralCase) { return pluralCase.value[0] === "="; }
    /** @internal */
    _formatValue(pluralCase) {
        return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
    }
    /** @internal */
    _stripValue(value) { return NumberWrapper.parseInt(value.substring(1), 10); }
};
__decorate([
    ContentChildren(NgPluralCase), 
    __metadata('design:type', QueryList)
], NgPlural.prototype, "cases", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Number), 
    __metadata('design:paramtypes', [Number])
], NgPlural.prototype, "ngPlural", null);
NgPlural = __decorate([
    Directive({ selector: '[ngPlural]' }), 
    __metadata('design:paramtypes', [NgLocalization])
], NgPlural);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcGx1cmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1zWXhrN3dnVC50bXAvYW5ndWxhcjIvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX3BsdXJhbC50cyJdLCJuYW1lcyI6WyJOZ0xvY2FsaXphdGlvbiIsIk5nUGx1cmFsQ2FzZSIsIk5nUGx1cmFsQ2FzZS5jb25zdHJ1Y3RvciIsIk5nUGx1cmFsIiwiTmdQbHVyYWwuY29uc3RydWN0b3IiLCJOZ1BsdXJhbC5uZ1BsdXJhbCIsIk5nUGx1cmFsLm5nQWZ0ZXJDb250ZW50SW5pdCIsIk5nUGx1cmFsLl91cGRhdGVWaWV3IiwiTmdQbHVyYWwuX2NsZWFyVmlld3MiLCJOZ1BsdXJhbC5fYWN0aXZhdGVWaWV3IiwiTmdQbHVyYWwuX2dldENhdGVnb3J5VmlldyIsIk5nUGx1cmFsLl9pc1ZhbHVlVmlldyIsIk5nUGx1cmFsLl9mb3JtYXRWYWx1ZSIsIk5nUGx1cmFsLl9zdHJpcFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7T0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLGVBQWUsRUFDZixTQUFTLEVBQ1QsU0FBUyxFQUVULEtBQUssRUFDTixNQUFNLGVBQWU7T0FDZixFQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUMsTUFBTSwwQkFBMEI7T0FDMUQsRUFBQyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDM0MsRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhO0FBRXRDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDO0FBRWxDO0FBQXVGQSxDQUFDQTtBQUV4Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0RHO0FBRUg7SUFJRUMsWUFBOENBLEtBQWFBLEVBQUVBLFFBQXFCQSxFQUN0RUEsYUFBK0JBO1FBREdDLFVBQUtBLEdBQUxBLEtBQUtBLENBQVFB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QWdCQTtJQUNoQkEsWUFBWUEsQ0FBQ0EsVUFBd0JBLElBQWFRLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO0lBRXZGUixnQkFBZ0JBO0lBQ2hCQSxZQUFZQSxDQUFDQSxVQUF3QkE7UUFDbkNTLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBO0lBQy9GQSxDQUFDQTtJQUVEVCxnQkFBZ0JBO0lBQ2hCQSxXQUFXQSxDQUFDQSxLQUFhQSxJQUFZVSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUMvRlYsQ0FBQ0E7QUF4REM7SUFBQyxlQUFlLENBQUMsWUFBWSxDQUFDOztHQUFDLDJCQUFLLFVBQWlDO0FBSXJFO0lBQUMsS0FBSyxFQUFFOzs7R0FDSiw4QkFBUSxRQUdYO0FBYkg7SUFBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFDLENBQUM7O2FBNkRuQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEF0dHJpYnV0ZSxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgSW5wdXRcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgTnVtYmVyV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTd2l0Y2hWaWV3fSBmcm9tICcuL25nX3N3aXRjaCc7XG5cbmNvbnN0IF9DQVRFR09SWV9ERUZBVUxUID0gJ290aGVyJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nTG9jYWxpemF0aW9uIHsgYWJzdHJhY3QgZ2V0UGx1cmFsQ2F0ZWdvcnkodmFsdWU6IGFueSk6IHN0cmluZzsgfVxuXG4vKipcbiAqIGBuZ1BsdXJhbGAgaXMgYW4gaTE4biBkaXJlY3RpdmUgdGhhdCBkaXNwbGF5cyBET00gc3ViLXRyZWVzIHRoYXQgbWF0Y2ggdGhlIHN3aXRjaCBleHByZXNzaW9uXG4gKiB2YWx1ZSwgb3IgZmFpbGluZyB0aGF0LCBET00gc3ViLXRyZWVzIHRoYXQgbWF0Y2ggdGhlIHN3aXRjaCBleHByZXNzaW9uJ3MgcGx1cmFsaXphdGlvbiBjYXRlZ29yeS5cbiAqXG4gKiBUbyB1c2UgdGhpcyBkaXJlY3RpdmUsIHlvdSBtdXN0IHByb3ZpZGUgYW4gZXh0ZW5zaW9uIG9mIGBOZ0xvY2FsaXphdGlvbmAgdGhhdCBtYXBzIHZhbHVlcyB0b1xuICogY2F0ZWdvcnkgbmFtZXMuIFlvdSB0aGVuIGRlZmluZSBhIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgc2V0cyB0aGUgYFtuZ1BsdXJhbF1gIGF0dHJpYnV0ZSB0byBhXG4gKiBzd2l0Y2ggZXhwcmVzc2lvbi5cbiAqICAgIC0gSW5uZXIgZWxlbWVudHMgZGVmaW5lZCB3aXRoIGFuIGBbbmdQbHVyYWxDYXNlXWAgYXR0cmlidXRlIHdpbGwgZGlzcGxheSBiYXNlZCBvbiB0aGVpclxuICogZXhwcmVzc2lvbi5cbiAqICAgIC0gSWYgYFtuZ1BsdXJhbENhc2VdYCBpcyBzZXQgdG8gYSB2YWx1ZSBzdGFydGluZyB3aXRoIGA9YCwgaXQgd2lsbCBvbmx5IGRpc3BsYXkgaWYgdGhlIHZhbHVlXG4gKiBtYXRjaGVzIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbiBleGFjdGx5LlxuICogICAgLSBPdGhlcndpc2UsIHRoZSB2aWV3IHdpbGwgYmUgdHJlYXRlZCBhcyBhIFwiY2F0ZWdvcnkgbWF0Y2hcIiwgYW5kIHdpbGwgb25seSBkaXNwbGF5IGlmIGV4YWN0XG4gKiB2YWx1ZSBtYXRjaGVzIGFyZW4ndCBmb3VuZCBhbmQgdGhlIHZhbHVlIG1hcHMgdG8gaXRzIGNhdGVnb3J5IHVzaW5nIHRoZSBgZ2V0UGx1cmFsQ2F0ZWdvcnlgXG4gKiBmdW5jdGlvbiBwcm92aWRlZC5cbiAqXG4gKiBJZiBubyBtYXRjaGluZyB2aWV3cyBhcmUgZm91bmQgZm9yIGEgc3dpdGNoIGV4cHJlc3Npb24sIGlubmVyIGVsZW1lbnRzIG1hcmtlZFxuICogYFtuZ1BsdXJhbENhc2VdPVwib3RoZXJcImAgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgTXlMb2NhbGl6YXRpb24gZXh0ZW5kcyBOZ0xvY2FsaXphdGlvbiB7XG4gKiAgICBnZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZTogYW55KSB7XG4gKiAgICAgICBpZih2YWx1ZSA8IDUpIHtcbiAqICAgICAgICAgIHJldHVybiAnZmV3JztcbiAqICAgICAgIH1cbiAqICAgIH1cbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnYXBwJyxcbiAqICAgIHByb3ZpZGVyczogW3Byb3ZpZGUoTmdMb2NhbGl6YXRpb24sIHt1c2VDbGFzczogTXlMb2NhbGl6YXRpb259KV1cbiAqIH0pXG4gKiBAVmlldyh7XG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPHA+VmFsdWUgPSB7e3ZhbHVlfX08L3A+XG4gKiAgICAgPGJ1dHRvbiAoY2xpY2spPVwiaW5jKClcIj5JbmNyZW1lbnQ8L2J1dHRvbj5cbiAqXG4gKiAgICAgPGRpdiBbbmdQbHVyYWxdPVwidmFsdWVcIj5cbiAqICAgICAgIDx0ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCI9MFwiPnRoZXJlIGlzIG5vdGhpbmc8L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIj0xXCI+dGhlcmUgaXMgb25lPC90ZW1wbGF0ZT5cbiAqICAgICAgIDx0ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCJmZXdcIj50aGVyZSBhcmUgYSBmZXc8L3RlbXBsYXRlPlxuICogICAgICAgPHRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIm90aGVyXCI+dGhlcmUgaXMgc29tZSBudW1iZXI8L3RlbXBsYXRlPlxuICogICAgIDwvZGl2PlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbTmdQbHVyYWwsIE5nUGx1cmFsQ2FzZV1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgdmFsdWUgPSAnaW5pdCc7XG4gKlxuICogICBpbmMoKSB7XG4gKiAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPT09ICdpbml0JyA/IDAgOiB0aGlzLnZhbHVlICsgMTtcbiAqICAgfVxuICogfVxuICpcbiAqIGBgYFxuICovXG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nUGx1cmFsQ2FzZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ1BsdXJhbENhc2Uge1xuICAvKiogQGludGVybmFsICovXG4gIF92aWV3OiBTd2l0Y2hWaWV3O1xuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCduZ1BsdXJhbENhc2UnKSBwdWJsaWMgdmFsdWU6IHN0cmluZywgdGVtcGxhdGU6IFRlbXBsYXRlUmVmLFxuICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBTd2l0Y2hWaWV3KHZpZXdDb250YWluZXIsIHRlbXBsYXRlKTtcbiAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nUGx1cmFsXSd9KVxuZXhwb3J0IGNsYXNzIE5nUGx1cmFsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHByaXZhdGUgX3N3aXRjaFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX2FjdGl2ZVZpZXc6IFN3aXRjaFZpZXc7XG4gIHByaXZhdGUgX2Nhc2VWaWV3cyA9IG5ldyBNYXA8YW55LCBTd2l0Y2hWaWV3PigpO1xuICBAQ29udGVudENoaWxkcmVuKE5nUGx1cmFsQ2FzZSkgY2FzZXM6IFF1ZXJ5TGlzdDxOZ1BsdXJhbENhc2U+ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhbGl6YXRpb246IE5nTG9jYWxpemF0aW9uKSB7fVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ1BsdXJhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3dpdGNoVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5jYXNlcy5mb3JFYWNoKChwbHVyYWxDYXNlOiBOZ1BsdXJhbENhc2UpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2Nhc2VWaWV3cy5zZXQodGhpcy5fZm9ybWF0VmFsdWUocGx1cmFsQ2FzZSksIHBsdXJhbENhc2UuX3ZpZXcpO1xuICAgIH0pO1xuICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY2xlYXJWaWV3cygpO1xuXG4gICAgdmFyIHZpZXc6IFN3aXRjaFZpZXcgPSB0aGlzLl9jYXNlVmlld3MuZ2V0KHRoaXMuX3N3aXRjaFZhbHVlKTtcbiAgICBpZiAoIWlzUHJlc2VudCh2aWV3KSkgdmlldyA9IHRoaXMuX2dldENhdGVnb3J5Vmlldyh0aGlzLl9zd2l0Y2hWYWx1ZSk7XG5cbiAgICB0aGlzLl9hY3RpdmF0ZVZpZXcodmlldyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9jbGVhclZpZXdzKCkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fYWN0aXZlVmlldykpIHRoaXMuX2FjdGl2ZVZpZXcuZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYWN0aXZhdGVWaWV3KHZpZXc6IFN3aXRjaFZpZXcpIHtcbiAgICBpZiAoIWlzUHJlc2VudCh2aWV3KSkgcmV0dXJuO1xuICAgIHRoaXMuX2FjdGl2ZVZpZXcgPSB2aWV3O1xuICAgIHRoaXMuX2FjdGl2ZVZpZXcuY3JlYXRlKCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZXRDYXRlZ29yeVZpZXcodmFsdWU6IG51bWJlcik6IFN3aXRjaFZpZXcge1xuICAgIHZhciBjYXRlZ29yeTogc3RyaW5nID0gdGhpcy5fbG9jYWxpemF0aW9uLmdldFBsdXJhbENhdGVnb3J5KHZhbHVlKTtcbiAgICB2YXIgY2F0ZWdvcnlWaWV3OiBTd2l0Y2hWaWV3ID0gdGhpcy5fY2FzZVZpZXdzLmdldChjYXRlZ29yeSk7XG4gICAgcmV0dXJuIGlzUHJlc2VudChjYXRlZ29yeVZpZXcpID8gY2F0ZWdvcnlWaWV3IDogdGhpcy5fY2FzZVZpZXdzLmdldChfQ0FURUdPUllfREVGQVVMVCk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9pc1ZhbHVlVmlldyhwbHVyYWxDYXNlOiBOZ1BsdXJhbENhc2UpOiBib29sZWFuIHsgcmV0dXJuIHBsdXJhbENhc2UudmFsdWVbMF0gPT09IFwiPVwiOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZm9ybWF0VmFsdWUocGx1cmFsQ2FzZTogTmdQbHVyYWxDYXNlKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faXNWYWx1ZVZpZXcocGx1cmFsQ2FzZSkgPyB0aGlzLl9zdHJpcFZhbHVlKHBsdXJhbENhc2UudmFsdWUpIDogcGx1cmFsQ2FzZS52YWx1ZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N0cmlwVmFsdWUodmFsdWU6IHN0cmluZyk6IG51bWJlciB7IHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KHZhbHVlLnN1YnN0cmluZygxKSwgMTApOyB9XG59XG4iXX0=