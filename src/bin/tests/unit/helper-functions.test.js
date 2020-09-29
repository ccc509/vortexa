"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_functions_1 = require("../../constants/helper-functions");
var mapForTesting = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.29237339772322, -27.897575560605485],
                            [153.29240999654635, -27.897600934719307],
                            [153.29243164508424, -27.897612892477547],
                            [153.29242807749804, -27.89762571619733],
                            [153.2924182348173, -27.897642434997323],
                            [153.29240518208437, -27.89764887031301],
                            [153.29238402481764, -27.897632940370542],
                            [153.29236010912982, -27.897619001393466],
                            [153.29233897564296, -27.8976119164061],
                            [153.29237339772322, -27.897575560605485],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 36.079,
                material: "Gravel",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.29237339772322, -27.897575560605485],
                            [153.29240999654635, -27.897600934719307],
                            [153.29243164508424, -27.897612892477547],
                            [153.29242807749804, -27.89762571619733],
                            [153.2924182348173, -27.897642434997323],
                            [153.29240518208437, -27.89764887031301],
                            [153.29238402481764, -27.897632940370542],
                            [153.29236010912982, -27.897619001393466],
                            [153.29233897564296, -27.8976119164061],
                            [153.29237339772322, -27.897575560605485],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 56.079,
                material: "Concrete",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.29237339772322, -27.897575560605485],
                            [153.29240999654635, -27.897600934719307],
                            [153.29243164508424, -27.897612892477547],
                            [153.29242807749804, -27.89762571619733],
                            [153.2924182348173, -27.897642434997323],
                            [153.29240518208437, -27.89764887031301],
                            [153.29238402481764, -27.897632940370542],
                            [153.29236010912982, -27.897619001393466],
                            [153.29233897564296, -27.8976119164061],
                            [153.29237339772322, -27.897575560605485],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 136.079,
                material: "Bitumen",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.4248808701714, -27.950485094146234],
                            [153.42473695713448, -27.950446187694055],
                            [153.42476959313436, -27.95036765577499],
                            [153.42490712641677, -27.950404325983815],
                            [153.4248808701714, -27.950485094146234],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 236.079,
                material: "Interlock Conc Block",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.33932342111396, -27.989818490211835],
                            [153.33926646075432, -27.989892007604396],
                            [153.3391880629736, -27.989841116831467],
                            [153.33909857422066, -27.989783033387397],
                            [153.33915348402147, -27.989724323958132],
                            [153.339233619602, -27.98976771877442],
                            [153.33932342111396, -27.989818490211835],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 256.079,
                material: "Other",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [153.47662436298404, -28.135636995480628],
                            [153.47658025517137, -28.135669368728024],
                            [153.47650294508517, -28.135599332066892],
                            [153.47652531914588, -28.13558887509994],
                            [153.47655803884513, -28.135563581580286],
                            [153.47662436298404, -28.135636995480628],
                        ],
                    ],
                ],
            },
            properties: {
                area_: 436.079,
                material: "Earth",
            },
        },
    ],
};
describe("Helper functions", function () {
    describe("Function getNumOfRampsWithMaterial", function () {
        it("Should return correct number of ramps with material gravel", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Gravel");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with material concrete", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Concrete");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with material bitumen", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Bitumen");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with material interlock conc block", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Interlock Conc Block");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with other material", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Other");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with material earth", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Earth");
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with material Gravel", function () {
            var num = helper_functions_1.getNumOfRampsWithMaterial(mapForTesting, "Gravel");
            expect(num).toBe(1);
        });
    });
    describe("Function getNumOfRampsInRange", function () {
        it("Should return correct number of ramps with size between 0 and 50", function () {
            var num = helper_functions_1.getNumOfRampsInRange(mapForTesting, { min: 0, max: 50 });
            expect(num).toBe(1);
        });
        it("Should return correct number of ramps with size between 50 and 200", function () {
            var num = helper_functions_1.getNumOfRampsInRange(mapForTesting, { min: 50, max: 200 });
            expect(num).toBe(2);
        });
        it("Should return correct number of ramps with size between 200 and 526", function () {
            var num = helper_functions_1.getNumOfRampsInRange(mapForTesting, { min: 200, max: 526 });
            expect(num).toBe(3);
        });
    });
    describe("Function getCentreOfView", function () {
        it("Should return correct centre of map", function () {
            var centre = helper_functions_1.getCentreOfView(mapForTesting);
            expect(centre.length).toBe(2);
            expect(centre[0]).toBe(-27.961444543609193);
            expect(centre[1]).toBe(153.35299147457317);
        });
    });
    describe("Function getRampsToDisplay", function () {
        it("Should return a geo object with correct type and feature list", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, [], []);
            expect(result.type).toBe("FeatureCollection");
            expect(result.features).toBeDefined;
        });
        it("Should return ramp with selected materil", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, ["Gravel"], []);
            expect(result.features.length).toBe(1);
            expect(result.features[0].properties && result.features[0].properties.material).toBe("Gravel");
        });
        it("Should return ramp with selected materils", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, ["Gravel", "Concrete"], []);
            expect(result.features.length).toBe(2);
            expect(result.features.some(function (f) { return f.properties && f.properties.material === "Gravel"; })).toBeTruthy;
            expect(result.features.some(function (f) { return f.properties && f.properties.material === "Concrete"; })).toBeTruthy;
        });
        it("Should return ramp between selected size interval", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, [], [{ min: 0, max: 50 }]);
            expect(result.features.length).toBe(1);
            result.features.forEach(function (f) {
                return expect(f.properties && f.properties.area_ >= 0 && f.properties.area_ < 50);
            });
        });
        it("Should return ramps between selected size intervals", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, [], [
                { min: 0, max: 50 },
                { min: 50, max: 200 },
            ]);
            expect(result.features.length).toBe(3);
            result.features.forEach(function (f) {
                return expect(f.properties && f.properties.area_ >= 0 && f.properties.area_ < 200);
            });
        });
        it("Should return ramp with selected material and between selected size intervals", function () {
            var result = helper_functions_1.getRampsToDisplay(mapForTesting, ["Gravel"], [{ min: 0, max: 50 }]);
            expect(result.features.length).toBe(1);
            result.features.forEach(function (f) {
                return expect(f.properties &&
                    f.properties.area_ >= 0 &&
                    f.properties.area_ < 50 &&
                    f.properties.material === "Gravel");
            });
        });
    });
});
