"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boatMapx = exports.unselectedProp = exports.selectedProp = exports.rampsTableHeader = exports.rampsTable = exports.rightPanel = exports.clearButton = void 0;
var typestyle_1 = require("typestyle");
exports.clearButton = typestyle_1.style({
  color: "black",
  marginTop: 5,
});
exports.rightPanel = typestyle_1.style({
  width: 300,
  float: "right",
  textAlign: "left",
});
exports.rampsTable = typestyle_1.style({
  borderCollapse: "collapse",
});
exports.rampsTableHeader = typestyle_1.style({
  backgroundColor: "#ffbf00",
  textAlign: "left",
  fontWeight: "bold",
  width: 150,
  color: "white",
  marginTop: 5,
});
exports.selectedProp = typestyle_1.style({
  backgroundColor: "chartreuse",
});
exports.unselectedProp = typestyle_1.style({
  backgroundColor: "white",
});
exports.boatMapx = typestyle_1.style({
  width: 1000,
  height: 1000,
  float: "left",
});
