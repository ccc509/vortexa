import { ZOOM_MAP } from "../actionTypes";

export function zoomMap(bounds){
    return {
        type: ZOOM_MAP,
        bounds
    }
}