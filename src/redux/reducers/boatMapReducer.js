var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
const __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const actionTypes_1 = require("../actionTypes");

function boatMapReducer(state, action) {
  switch (action.type) {
    case actionTypes_1.ZOOM_MAP:
      return { ...state, bounds: action.bounds };
    case actionTypes_1.SELECT_MATERIAL:
      var updatedSelectedMaterials = state.selectedMaterials;
      updatedSelectedMaterials.push(action.material);
      console.log({ updatedSelectedMaterials });
      return {
        ...state,
        selectedMaterials: __spreadArrays(state.selectedMaterials, [
          action.material,
        ]),
      };
    case actionTypes_1.SELECT_SIZE:
      var min = action.size.split("-")[0];
      var max = action.size.split("-")[1];
      return {
        ...state,
        selectedSizes: __spreadArrays(state.selectedSizes, [[+min, +max]]),
      };
    case actionTypes_1.CLEAR_SELECTION:
      return { ...state, selectedMaterials: [], selectedSizes: [] };
    default:
      return state;
  }
}
exports.default = boatMapReducer;
