"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTable = void 0;
var styles_1 = require("../../constants/styles");
var react_vis_1 = require("react-vis");
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var CategoryTable = function (props) {
    var categoryLookUp = props.categoryLookUp, title = props.title, selectAction = props.selectAction, selectedAttributes = props.selectedAttributes;
    var dispatch = react_redux_1.useDispatch();
    var pieChartData = categoryLookUp.map(function (i) { return ({ angle: i.count }); });
    return (react_1.default.createElement("div", { className: styles_1.rightPanel },
        react_1.default.createElement("table", { className: styles_1.rampsTable },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: styles_1.rampsTableHeader }, title),
                    react_1.default.createElement("th", { className: styles_1.rampsTableHeader }, "Number of ramps"))),
            react_1.default.createElement("tbody", null, categoryLookUp.map(function (i) { return (react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { className: selectedAttributes.includes(i.name)
                        ? styles_1.selectedProp
                        : styles_1.unselectedProp, onClick: function () { return dispatch(selectAction(i.name)); } }, i.name),
                react_1.default.createElement("th", null, i.count))); }))),
        react_1.default.createElement(react_vis_1.RadialChart, { data: pieChartData, width: 280, height: 280 })));
};
exports.CategoryTable = CategoryTable;
