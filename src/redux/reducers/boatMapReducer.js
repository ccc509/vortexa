import { ZOOM_MAP } from "../actionTypes";
import boatData from "../../data/boat_ramps.json";

const initialState = {
    rampsInTheMap: boatData.features,
    rampsInTheView: []
}

export default function boatMapReducer(state = initialState, action){
    switch(action.type){
        case ZOOM_MAP:
            const featuresInTheCurrView = [];
            state.rampsInTheMap.forEach(feature => {
                if(feature.geometry.coordinates[0][0].some(c => action.bounds.contains([c[1], c[0]]))){
                     featuresInTheCurrView.push(feature);
                }
            })
            return {
                ...state,
                rampsInTheView: featuresInTheCurrView
            }
        default:
            return state;
    }
}