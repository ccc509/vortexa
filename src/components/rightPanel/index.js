"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var boatMapActions_1 = require("../../redux/actions/boatMapActions");
var react_redux_1 = require("react-redux");
var react_vis_1 = require("react-vis");
var helper_functions_1 = require("../../constants/helper-functions");
var styles_1 = require("../../constants/styles");
var getNumOfRampsWithMaterial = function (rampsInTheView, material) {
  return rampsInTheView.features.filter(function (r) {
    return r.properties.material === material;
  }).length;
};
var getNumOfRampsInRange = function (rampsInTheView, min, max) {
  return rampsInTheView.features.filter(function (r) {
    return r.properties.area_ >= min && r.properties.area_ < max;
  }).length;
};
var RightPanel = function () {
  var _a = react_1.useState([]),
    selectedAttributes = _a[0],
    setSelectedAttributes = _a[1];
  var selectedMaterials = react_redux_1.useSelector(function (state) {
    return state.selectedMaterials;
  });
  var selectedSizes = react_redux_1.useSelector(function (state) {
    return state.selectedSizes;
  });
  var bounds = react_redux_1.useSelector(function (state) {
    return state.bounds;
  });
  var ramps = react_redux_1.useSelector(function (state) {
    return state.ramps;
  });
  var materials = react_redux_1.useSelector(function (state) {
    return state.materials;
  });
  var sizeIntervals = react_redux_1.useSelector(function (state) {
    return state.sizeIntervals;
  });
  var rampsInTheView = helper_functions_1.getRampsToDisplay(
    ramps,
    selectedMaterials,
    selectedSizes,
    bounds
  );
  var dispatch = react_redux_1.useDispatch();
  var handleMaterialPropertyClick = function (property) {
    dispatch(boatMapActions_1.selectMaterial(property));
    var updatedSelectedAttributes = __spreadArrays(selectedAttributes, [
      property,
    ]);
    setSelectedAttributes(updatedSelectedAttributes);
  };
  var handleSizePropertyClick = function (property) {
    dispatch(boatMapActions_1.selectSize(property));
    var updatedSelectedAttributes = __spreadArrays(selectedAttributes, [
      property,
    ]);
    setSelectedAttributes(updatedSelectedAttributes);
  };
  var clearPropertySelection = function () {
    dispatch(boatMapActions_1.clearSelection());
    setSelectedAttributes([]);
  };
  var numOfRampsMaterialLookUp = new Map();
  var pieChartDataForRampMaterial = [];
  materials.forEach(function (material) {
    var count = getNumOfRampsWithMaterial(rampsInTheView, material);
    numOfRampsMaterialLookUp.set(material, count);
    pieChartDataForRampMaterial.push({ angle: count });
  });
  var numOfRampsSizeLookUp = new Map();
  var pieChartDataForRampSize = [];
  sizeIntervals.forEach(function (interval) {
    var count = getNumOfRampsInRange(rampsInTheView, interval[0], interval[1]);
    numOfRampsSizeLookUp.set(interval[0] + "-" + interval[1], count);
    pieChartDataForRampSize.push({ angle: count });
  });
  return react_1.default.createElement(
    "div",
    { className: styles_1.rightPanel },
    react_1.default.createElement(
      "table",
      { className: styles_1.rampsTable },
      react_1.default.createElement(
        "thead",
        null,
        react_1.default.createElement(
          "tr",
          null,
          react_1.default.createElement(
            "th",
            { className: styles_1.rampsTableHeader },
            "Material"
          ),
          react_1.default.createElement(
            "th",
            { className: styles_1.rampsTableHeader },
            "Number of ramps"
          )
        )
      ),
      react_1.default.createElement(
        "tbody",
        null,
        materials.map(function (constructionMaterial) {
          return react_1.default.createElement(
            "tr",
            null,
            react_1.default.createElement(
              "th",
              {
                className: selectedAttributes.includes(constructionMaterial)
                  ? styles_1.selectedProp
                  : styles_1.unselectedProp,
                onClick: function () {
                  return handleMaterialPropertyClick(constructionMaterial);
                },
              },
              constructionMaterial
            ),
            react_1.default.createElement(
              "th",
              null,
              numOfRampsMaterialLookUp.get(constructionMaterial)
            )
          );
        })
      )
    ),
    react_1.default.createElement(react_vis_1.RadialChart, {
      data: pieChartDataForRampMaterial,
      width: 280,
      height: 280,
    }),
    react_1.default.createElement(
      "table",
      { className: styles_1.rampsTable },
      react_1.default.createElement(
        "thead",
        null,
        react_1.default.createElement(
          "tr",
          null,
          react_1.default.createElement(
            "th",
            { className: styles_1.rampsTableHeader },
            "Size category"
          ),
          react_1.default.createElement(
            "th",
            { className: styles_1.rampsTableHeader },
            "Number of ramps"
          )
        )
      ),
      react_1.default.createElement(
        "tbody",
        null,
        Array.from(sizeIntervals).map(function (interval) {
          return react_1.default.createElement(
            "tr",
            null,
            react_1.default.createElement(
              "th",
              {
                className: selectedAttributes.includes(
                  interval[0] + "-" + interval[1]
                )
                  ? styles_1.selectedProp
                  : styles_1.unselectedProp,
                onClick: function () {
                  return handleSizePropertyClick(
                    interval[0] + "-" + interval[1]
                  );
                },
              },
              interval[0] + "-" + interval[1]
            ),
            react_1.default.createElement(
              "th",
              null,
              numOfRampsSizeLookUp.get(interval[0] + "-" + interval[1])
            )
          );
        })
      )
    ),
    react_1.default.createElement(react_vis_1.RadialChart, {
      data: pieChartDataForRampSize,
      width: 280,
      height: 280,
    }),
    react_1.default.createElement(
      "button",
      {
        className: styles_1.clearButton,
        onClick: function () {
          return clearPropertySelection();
        },
      },
      "Clear Selection"
    )
  );
};
exports.default = react_redux_1.connect()(RightPanel);
