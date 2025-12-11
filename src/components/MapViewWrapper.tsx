// Native-specific implementation - uses react-native-maps
import React from 'react';
import MapView, { Marker, MapViewProps, MarkerProps } from 'react-native-maps';

// Re-export the native MapView and Marker with wrapper names
const MapViewWrapper: React.FC<MapViewProps> = (props) => {
    return <MapView {...props} />;
};

const MarkerWrapper: React.FC<MarkerProps> = (props) => {
    return <Marker {...props} />;
};

export { MapViewWrapper, MarkerWrapper };
export default MapViewWrapper;
