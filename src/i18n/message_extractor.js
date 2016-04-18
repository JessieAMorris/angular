'use strict';"use strict";
var html_ast_1 = require('angular2/src/compiler/html_ast');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var message_1 = require('./message');
var shared_1 = require('./shared');
/**
 * All messages extracted from a template.
 */
var ExtractionResult = (function () {
    function ExtractionResult(messages, errors) {
        this.messages = messages;
        this.errors = errors;
    }
    return ExtractionResult;
}());
exports.ExtractionResult = ExtractionResult;
/**
 * Removes duplicate messages.
 *
 * E.g.
 *
 * ```
 *  var m = [new Message("message", "meaning", "desc1"), new Message("message", "meaning",
 * "desc2")];
 *  expect(removeDuplicates(m)).toEqual([new Message("message", "meaning", "desc1")]);
 * ```
 */
function removeDuplicates(messages) {
    var uniq = {};
    messages.forEach(function (m) {
        if (!collection_1.StringMapWrapper.contains(uniq, message_1.id(m))) {
            uniq[message_1.id(m)] = m;
        }
    });
    return collection_1.StringMapWrapper.values(uniq);
}
exports.removeDuplicates = removeDuplicates;
/**
 * Extracts all messages from a template.
 *
 * Algorithm:
 *
 * To understand the algorithm, you need to know how partitioning works.
 * Partitioning is required as we can use two i18n comments to group node siblings together.
 * That is why we cannot just use nodes.
 *
 * Partitioning transforms an array of HtmlAst into an array of Part.
 * A part can optionally contain a root element or a root text node. And it can also contain
 * children.
 * A part can contain i18n property, in which case it needs to be extracted.
 *
 * Example:
 *
 * The following array of nodes will be split into four parts:
 *
 * ```
 * <a>A</a>
 * <b i18n>B</b>
 * <!-- i18n -->
 * <c>C</c>
 * D
 * <!-- /i18n -->
 * E
 * ```
 *
 * Part 1 containing the a tag. It should not be translated.
 * Part 2 containing the b tag. It should be translated.
 * Part 3 containing the c tag and the D text node. It should be translated.
 * Part 4 containing the E text node. It should not be translated..
 *
 * It is also important to understand how we stringify nodes to create a message.
 *
 * We walk the tree and replace every element node with a placeholder. We also replace
 * all expressions in interpolation with placeholders. We also insert a placeholder element
 * to wrap a text node containing interpolation.
 *
 * Example:
 *
 * The following tree:
 *
 * ```
 * <a>A{{I}}</a><b>B</b>
 * ```
 *
 * will be stringified into:
 * ```
 * <ph name="e0"><ph name="t1">A<ph name="0"/></ph></ph><ph name="e2">B</ph>
 * ```
 *
 * This is what the algorithm does:
 *
 * 1. Use the provided html parser to get the html AST of the template.
 * 2. Partition the root nodes, and process each part separately.
 * 3. If a part does not have the i18n attribute, recurse to process children and attributes.
 * 4. If a part has the i18n attribute, stringify the nodes to create a Message.
 */
var MessageExtractor = (function () {
    function MessageExtractor(_htmlParser, _parser) {
        this._htmlParser = _htmlParser;
        this._parser = _parser;
    }
    MessageExtractor.prototype.extract = function (template, sourceUrl) {
        this.messages = [];
        this.errors = [];
        var res = this._htmlParser.parse(template, sourceUrl);
        if (res.errors.length > 0) {
            return new ExtractionResult([], res.errors);
        }
        else {
            this._recurse(res.rootNodes);
            return new ExtractionResult(this.messages, this.errors);
        }
    };
    MessageExtractor.prototype._extractMessagesFromPart = function (p) {
        if (p.hasI18n) {
            this.messages.push(p.createMessage(this._parser));
            this._recurseToExtractMessagesFromAttributes(p.children);
        }
        else {
            this._recurse(p.children);
        }
        if (lang_1.isPresent(p.rootElement)) {
            this._extractMessagesFromAttributes(p.rootElement);
        }
    };
    MessageExtractor.prototype._recurse = function (nodes) {
        var _this = this;
        if (lang_1.isPresent(nodes)) {
            var ps = shared_1.partition(nodes, this.errors);
            ps.forEach(function (p) { return _this._extractMessagesFromPart(p); });
        }
    };
    MessageExtractor.prototype._recurseToExtractMessagesFromAttributes = function (nodes) {
        var _this = this;
        nodes.forEach(function (n) {
            if (n instanceof html_ast_1.HtmlElementAst) {
                _this._extractMessagesFromAttributes(n);
                _this._recurseToExtractMessagesFromAttributes(n.children);
            }
        });
    };
    MessageExtractor.prototype._extractMessagesFromAttributes = function (p) {
        var _this = this;
        p.attrs.forEach(function (attr) {
            if (attr.name.startsWith(shared_1.I18N_ATTR_PREFIX)) {
                try {
                    _this.messages.push(shared_1.messageFromAttribute(_this._parser, p, attr));
                }
                catch (e) {
                    if (e instanceof shared_1.I18nError) {
                        _this.errors.push(e);
                    }
                    else {
                        throw e;
                    }
                }
            }
        });
    };
    return MessageExtractor;
}());
exports.MessageExtractor = MessageExtractor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9leHRyYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTJwaUpobmtHLnRtcC9hbmd1bGFyMi9zcmMvaTE4bi9tZXNzYWdlX2V4dHJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEseUJBUU8sZ0NBQWdDLENBQUMsQ0FBQTtBQUN4QyxxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM1RCwyQkFBK0IsZ0NBQWdDLENBQUMsQ0FBQTtBQUVoRSx3QkFBMEIsV0FBVyxDQUFDLENBQUE7QUFDdEMsdUJBU08sVUFBVSxDQUFDLENBQUE7QUFFbEI7O0dBRUc7QUFDSDtJQUNFLDBCQUFtQixRQUFtQixFQUFTLE1BQW9CO1FBQWhELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUN6RSx1QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksd0JBQWdCLG1CQUU1QixDQUFBO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILDBCQUFpQyxRQUFtQjtJQUNsRCxJQUFJLElBQUksR0FBNkIsRUFBRSxDQUFDO0lBQ3hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsNkJBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFSZSx3QkFBZ0IsbUJBUS9CLENBQUE7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBERztBQUNIO0lBSUUsMEJBQW9CLFdBQXVCLEVBQVUsT0FBZTtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFBRyxDQUFDO0lBRXhFLGtDQUFPLEdBQVAsVUFBUSxRQUFnQixFQUFFLFNBQWlCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFFTyxtREFBd0IsR0FBaEMsVUFBaUMsQ0FBTztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNILENBQUM7SUFFTyxtQ0FBUSxHQUFoQixVQUFpQixLQUFnQjtRQUFqQyxpQkFLQztRQUpDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksRUFBRSxHQUFHLGtCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFTyxrRUFBdUMsR0FBL0MsVUFBZ0QsS0FBZ0I7UUFBaEUsaUJBT0M7UUFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSx5QkFBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyx5REFBOEIsR0FBdEMsVUFBdUMsQ0FBaUI7UUFBeEQsaUJBY0M7UUFiQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQztvQkFDSCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyw2QkFBb0IsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxDQUFFO2dCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLGtCQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsQ0FBQztvQkFDVixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBL0RELElBK0RDO0FBL0RZLHdCQUFnQixtQkErRDVCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX3BhcnNlcic7XG5pbXBvcnQge1BhcnNlU291cmNlU3BhbiwgUGFyc2VFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtcbiAgSHRtbEFzdCxcbiAgSHRtbEFzdFZpc2l0b3IsXG4gIEh0bWxFbGVtZW50QXN0LFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbFRleHRBc3QsXG4gIEh0bWxDb21tZW50QXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfYXN0JztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9wYXJzZXInO1xuaW1wb3J0IHtNZXNzYWdlLCBpZH0gZnJvbSAnLi9tZXNzYWdlJztcbmltcG9ydCB7XG4gIEkxOG5FcnJvcixcbiAgUGFydCxcbiAgSTE4Tl9BVFRSX1BSRUZJWCxcbiAgcGFydGl0aW9uLFxuICBtZWFuaW5nLFxuICBkZXNjcmlwdGlvbixcbiAgc3RyaW5naWZ5Tm9kZXMsXG4gIG1lc3NhZ2VGcm9tQXR0cmlidXRlXG59IGZyb20gJy4vc2hhcmVkJztcblxuLyoqXG4gKiBBbGwgbWVzc2FnZXMgZXh0cmFjdGVkIGZyb20gYSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dHJhY3Rpb25SZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZXM6IE1lc3NhZ2VbXSwgcHVibGljIGVycm9yczogUGFyc2VFcnJvcltdKSB7fVxufVxuXG4vKipcbiAqIFJlbW92ZXMgZHVwbGljYXRlIG1lc3NhZ2VzLlxuICpcbiAqIEUuZy5cbiAqXG4gKiBgYGBcbiAqICB2YXIgbSA9IFtuZXcgTWVzc2FnZShcIm1lc3NhZ2VcIiwgXCJtZWFuaW5nXCIsIFwiZGVzYzFcIiksIG5ldyBNZXNzYWdlKFwibWVzc2FnZVwiLCBcIm1lYW5pbmdcIixcbiAqIFwiZGVzYzJcIildO1xuICogIGV4cGVjdChyZW1vdmVEdXBsaWNhdGVzKG0pKS50b0VxdWFsKFtuZXcgTWVzc2FnZShcIm1lc3NhZ2VcIiwgXCJtZWFuaW5nXCIsIFwiZGVzYzFcIildKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhtZXNzYWdlczogTWVzc2FnZVtdKTogTWVzc2FnZVtdIHtcbiAgbGV0IHVuaXE6IHtba2V5OiBzdHJpbmddOiBNZXNzYWdlfSA9IHt9O1xuICBtZXNzYWdlcy5mb3JFYWNoKG0gPT4ge1xuICAgIGlmICghU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh1bmlxLCBpZChtKSkpIHtcbiAgICAgIHVuaXFbaWQobSldID0gbTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci52YWx1ZXModW5pcSk7XG59XG5cbi8qKlxuICogRXh0cmFjdHMgYWxsIG1lc3NhZ2VzIGZyb20gYSB0ZW1wbGF0ZS5cbiAqXG4gKiBBbGdvcml0aG06XG4gKlxuICogVG8gdW5kZXJzdGFuZCB0aGUgYWxnb3JpdGhtLCB5b3UgbmVlZCB0byBrbm93IGhvdyBwYXJ0aXRpb25pbmcgd29ya3MuXG4gKiBQYXJ0aXRpb25pbmcgaXMgcmVxdWlyZWQgYXMgd2UgY2FuIHVzZSB0d28gaTE4biBjb21tZW50cyB0byBncm91cCBub2RlIHNpYmxpbmdzIHRvZ2V0aGVyLlxuICogVGhhdCBpcyB3aHkgd2UgY2Fubm90IGp1c3QgdXNlIG5vZGVzLlxuICpcbiAqIFBhcnRpdGlvbmluZyB0cmFuc2Zvcm1zIGFuIGFycmF5IG9mIEh0bWxBc3QgaW50byBhbiBhcnJheSBvZiBQYXJ0LlxuICogQSBwYXJ0IGNhbiBvcHRpb25hbGx5IGNvbnRhaW4gYSByb290IGVsZW1lbnQgb3IgYSByb290IHRleHQgbm9kZS4gQW5kIGl0IGNhbiBhbHNvIGNvbnRhaW5cbiAqIGNoaWxkcmVuLlxuICogQSBwYXJ0IGNhbiBjb250YWluIGkxOG4gcHJvcGVydHksIGluIHdoaWNoIGNhc2UgaXQgbmVlZHMgdG8gYmUgZXh0cmFjdGVkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogVGhlIGZvbGxvd2luZyBhcnJheSBvZiBub2RlcyB3aWxsIGJlIHNwbGl0IGludG8gZm91ciBwYXJ0czpcbiAqXG4gKiBgYGBcbiAqIDxhPkE8L2E+XG4gKiA8YiBpMThuPkI8L2I+XG4gKiA8IS0tIGkxOG4gLS0+XG4gKiA8Yz5DPC9jPlxuICogRFxuICogPCEtLSAvaTE4biAtLT5cbiAqIEVcbiAqIGBgYFxuICpcbiAqIFBhcnQgMSBjb250YWluaW5nIHRoZSBhIHRhZy4gSXQgc2hvdWxkIG5vdCBiZSB0cmFuc2xhdGVkLlxuICogUGFydCAyIGNvbnRhaW5pbmcgdGhlIGIgdGFnLiBJdCBzaG91bGQgYmUgdHJhbnNsYXRlZC5cbiAqIFBhcnQgMyBjb250YWluaW5nIHRoZSBjIHRhZyBhbmQgdGhlIEQgdGV4dCBub2RlLiBJdCBzaG91bGQgYmUgdHJhbnNsYXRlZC5cbiAqIFBhcnQgNCBjb250YWluaW5nIHRoZSBFIHRleHQgbm9kZS4gSXQgc2hvdWxkIG5vdCBiZSB0cmFuc2xhdGVkLi5cbiAqXG4gKiBJdCBpcyBhbHNvIGltcG9ydGFudCB0byB1bmRlcnN0YW5kIGhvdyB3ZSBzdHJpbmdpZnkgbm9kZXMgdG8gY3JlYXRlIGEgbWVzc2FnZS5cbiAqXG4gKiBXZSB3YWxrIHRoZSB0cmVlIGFuZCByZXBsYWNlIGV2ZXJ5IGVsZW1lbnQgbm9kZSB3aXRoIGEgcGxhY2Vob2xkZXIuIFdlIGFsc28gcmVwbGFjZVxuICogYWxsIGV4cHJlc3Npb25zIGluIGludGVycG9sYXRpb24gd2l0aCBwbGFjZWhvbGRlcnMuIFdlIGFsc28gaW5zZXJ0IGEgcGxhY2Vob2xkZXIgZWxlbWVudFxuICogdG8gd3JhcCBhIHRleHQgbm9kZSBjb250YWluaW5nIGludGVycG9sYXRpb24uXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBUaGUgZm9sbG93aW5nIHRyZWU6XG4gKlxuICogYGBgXG4gKiA8YT5Be3tJfX08L2E+PGI+QjwvYj5cbiAqIGBgYFxuICpcbiAqIHdpbGwgYmUgc3RyaW5naWZpZWQgaW50bzpcbiAqIGBgYFxuICogPHBoIG5hbWU9XCJlMFwiPjxwaCBuYW1lPVwidDFcIj5BPHBoIG5hbWU9XCIwXCIvPjwvcGg+PC9waD48cGggbmFtZT1cImUyXCI+QjwvcGg+XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGlzIHdoYXQgdGhlIGFsZ29yaXRobSBkb2VzOlxuICpcbiAqIDEuIFVzZSB0aGUgcHJvdmlkZWQgaHRtbCBwYXJzZXIgdG8gZ2V0IHRoZSBodG1sIEFTVCBvZiB0aGUgdGVtcGxhdGUuXG4gKiAyLiBQYXJ0aXRpb24gdGhlIHJvb3Qgbm9kZXMsIGFuZCBwcm9jZXNzIGVhY2ggcGFydCBzZXBhcmF0ZWx5LlxuICogMy4gSWYgYSBwYXJ0IGRvZXMgbm90IGhhdmUgdGhlIGkxOG4gYXR0cmlidXRlLCByZWN1cnNlIHRvIHByb2Nlc3MgY2hpbGRyZW4gYW5kIGF0dHJpYnV0ZXMuXG4gKiA0LiBJZiBhIHBhcnQgaGFzIHRoZSBpMThuIGF0dHJpYnV0ZSwgc3RyaW5naWZ5IHRoZSBub2RlcyB0byBjcmVhdGUgYSBNZXNzYWdlLlxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV4dHJhY3RvciB7XG4gIG1lc3NhZ2VzOiBNZXNzYWdlW107XG4gIGVycm9yczogUGFyc2VFcnJvcltdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0bWxQYXJzZXI6IEh0bWxQYXJzZXIsIHByaXZhdGUgX3BhcnNlcjogUGFyc2VyKSB7fVxuXG4gIGV4dHJhY3QodGVtcGxhdGU6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcpOiBFeHRyYWN0aW9uUmVzdWx0IHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5lcnJvcnMgPSBbXTtcblxuICAgIGxldCByZXMgPSB0aGlzLl9odG1sUGFyc2VyLnBhcnNlKHRlbXBsYXRlLCBzb3VyY2VVcmwpO1xuICAgIGlmIChyZXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBuZXcgRXh0cmFjdGlvblJlc3VsdChbXSwgcmVzLmVycm9ycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlY3Vyc2UocmVzLnJvb3ROb2Rlcyk7XG4gICAgICByZXR1cm4gbmV3IEV4dHJhY3Rpb25SZXN1bHQodGhpcy5tZXNzYWdlcywgdGhpcy5lcnJvcnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2V4dHJhY3RNZXNzYWdlc0Zyb21QYXJ0KHA6IFBhcnQpOiB2b2lkIHtcbiAgICBpZiAocC5oYXNJMThuKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gocC5jcmVhdGVNZXNzYWdlKHRoaXMuX3BhcnNlcikpO1xuICAgICAgdGhpcy5fcmVjdXJzZVRvRXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMocC5jaGlsZHJlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlY3Vyc2UocC5jaGlsZHJlbik7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudChwLnJvb3RFbGVtZW50KSkge1xuICAgICAgdGhpcy5fZXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMocC5yb290RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVjdXJzZShub2RlczogSHRtbEFzdFtdKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudChub2RlcykpIHtcbiAgICAgIGxldCBwcyA9IHBhcnRpdGlvbihub2RlcywgdGhpcy5lcnJvcnMpO1xuICAgICAgcHMuZm9yRWFjaChwID0+IHRoaXMuX2V4dHJhY3RNZXNzYWdlc0Zyb21QYXJ0KHApKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWN1cnNlVG9FeHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhub2RlczogSHRtbEFzdFtdKTogdm9pZCB7XG4gICAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGlmIChuIGluc3RhbmNlb2YgSHRtbEVsZW1lbnRBc3QpIHtcbiAgICAgICAgdGhpcy5fZXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMobik7XG4gICAgICAgIHRoaXMuX3JlY3Vyc2VUb0V4dHJhY3RNZXNzYWdlc0Zyb21BdHRyaWJ1dGVzKG4uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMocDogSHRtbEVsZW1lbnRBc3QpOiB2b2lkIHtcbiAgICBwLmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICBpZiAoYXR0ci5uYW1lLnN0YXJ0c1dpdGgoSTE4Tl9BVFRSX1BSRUZJWCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZUZyb21BdHRyaWJ1dGUodGhpcy5fcGFyc2VyLCBwLCBhdHRyKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEkxOG5FcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSJdfQ==