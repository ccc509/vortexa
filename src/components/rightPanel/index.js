const __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get() {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
const __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o.default = v;
      });
const __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null)
      for (const k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
require("./style.css");
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_vis_1 = require("react-vis");
const boatMapActions_1 = require("../../redux/actions/boatMapActions");
const helper_functions_1 = require("../../constants/helper-functions");

const RightPanel = function () {
  const _a = react_1.useState([]);
  const selectedAttributes = _a[0];
  const setSelectedAttributes = _a[1];
  const selectedMaterials = react_redux_1.useSelector(
    (state) => state.selectedMaterials
  );
  const selectedSizes = react_redux_1.useSelector(
    (state) => state.selectedSizes
  );
  const bounds = react_redux_1.useSelector((state) => state.bounds);
  const ramps = react_redux_1.useSelector((state) => state.ramps);
  const materials = react_redux_1.useSelector((state) => state.materials);
  const sizeIntervals = react_redux_1.useSelector(
    (state) => state.sizeIntervals
  );
  const rampsInTheView = helper_functions_1.getRampsToDisplay(
    ramps,
    selectedMaterials,
    selectedSizes,
    bounds
  );
  const dispatch = react_redux_1.useDispatch();
  const handleMaterialPropertyClick = function (property) {
    dispatch(boatMapActions_1.selectMaterial(property));
    const updatedSelectedAttributes = __spreadArrays(selectedAttributes, [
      property,
    ]);
    setSelectedAttributes(updatedSelectedAttributes);
  };
  const handleSizePropertyClick = function (property) {
    dispatch(boatMapActions_1.selectSize(property));
    const updatedSelectedAttributes = __spreadArrays(selectedAttributes, [
      property,
    ]);
    setSelectedAttributes(updatedSelectedAttributes);
  };
  const clearPropertySelection = function () {
    dispatch(boatMapActions_1.clearSelection());
    setSelectedAttributes([]);
  };
  const numOfRampsMaterialLookUp = new Map();
  const getNumOfRampsWithMaterial = function (material) {
    return rampsInTheView.features.filter(
      (r) => r.properties.material === material
    ).length;
  };
  const pieChartDataForRampMaterial = [];
  materials.forEach((material) => {
    const count = getNumOfRampsWithMaterial(material);
    numOfRampsMaterialLookUp.set(material, count);
    pieChartDataForRampMaterial.push({ angle: count });
  });
  const getNumOfRampsInRange = function (min, max) {
    return rampsInTheView.features.filter(
      (r) => r.properties.area_ >= min && r.properties.area_ < max
    ).length;
  };
  const numOfRampsSizeLookUp = new Map();
  const pieChartDataForRampSize = [];
  sizeIntervals.forEach((interval) => {
    const count = getNumOfRampsInRange(interval[0], interval[1]);
    numOfRampsSizeLookUp.set(`${interval[0]}-${interval[1]}`, count);
    pieChartDataForRampSize.push({ angle: count });
  });
  return react_1.default.createElement(
    "div",
    { className: "right-panel" },
    react_1.default.createElement(
      "table",
      { className: "ramps-table" },
      react_1.default.createElement(
        "thead",
        null,
        react_1.default.createElement(
          "tr",
          null,
          react_1.default.createElement("th", null, "Construction material"),
          react_1.default.createElement("th", null, "Number of ramps")
        )
      ),
      react_1.default.createElement(
        "tbody",
        null,
        materials.map((constructionMaterial) =>
          react_1.default.createElement(
            "tr",
            null,
            react_1.default.createElement(
              "th",
              {
                className: selectedAttributes.includes(constructionMaterial)
                  ? "selected"
                  : "unselected",
                onClick() {
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
          )
        )
      )
    ),
    react_1.default.createElement(react_vis_1.RadialChart, {
      data: pieChartDataForRampMaterial,
      width: 300,
      height: 300,
    }),
    react_1.default.createElement(
      "table",
      { className: "ramps-table" },
      react_1.default.createElement(
        "thead",
        null,
        react_1.default.createElement(
          "tr",
          null,
          react_1.default.createElement("th", null, "Size category"),
          react_1.default.createElement("th", null, "Number of ramps")
        )
      ),
      react_1.default.createElement(
        "tbody",
        null,
        Array.from(sizeIntervals).map((interval) =>
          react_1.default.createElement(
            "tr",
            null,
            react_1.default.createElement(
              "th",
              {
                className: selectedAttributes.includes(
                  `${interval[0]}-${interval[1]}`
                )
                  ? "selected"
                  : "unselected",
                onClick() {
                  return handleSizePropertyClick(
                    `${interval[0]}-${interval[1]}`
                  );
                },
              },
              `${interval[0]}-${interval[1]}`
            ),
            react_1.default.createElement(
              "th",
              null,
              numOfRampsSizeLookUp.get(`${interval[0]}-${interval[1]}`)
            )
          )
        )
      )
    ),
    react_1.default.createElement(react_vis_1.RadialChart, {
      data: pieChartDataForRampSize,
      width: 300,
      height: 300,
    }),
    react_1.default.createElement(
      "button",
      {
        onClick() {
          return clearPropertySelection();
        },
      },
      "Clear Selection"
    )
  );
};
exports.default = react_redux_1.connect()(RightPanel);
