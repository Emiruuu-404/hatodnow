// Web-specific implementation - shows a placeholder instead of maps
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define props interface
interface MapViewWrapperProps {
    style?: any;
    initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    children?: React.ReactNode;
}

interface MarkerWrapperProps {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title?: string;
}

// Web fallback component - shows a placeholder
const MapViewWrapper: React.FC<MapViewWrapperProps> = ({ style, initialRegion }) => {
    return (
        <View style={[styles.webFallback, style]}>
            <View style={styles.webFallbackContent}>
                <Ionicons name="map" size={64} color="#6366f1" />
                <Text style={styles.webFallbackTitle}>Map View</Text>
                <Text style={styles.webFallbackText}>
                    Map is available on mobile devices
                </Text>
                {initialRegion && (
                    <Text style={styles.webFallbackCoords}>
                        📍 {initialRegion.latitude.toFixed(4)}, {initialRegion.longitude.toFixed(4)}
                    </Text>
                )}
            </View>
        </View>
    );
};

// Web marker fallback (does nothing on web)
const MarkerWrapper: React.FC<MarkerWrapperProps> = () => null;

const styles = StyleSheet.create({
    webFallback: {
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        flex: 1,
    },
    webFallbackContent: {
        alignItems: 'center',
        padding: 24,
    },
    webFallbackTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: 16,
        marginBottom: 8,
    },
    webFallbackText: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
    },
    webFallbackCoords: {
        fontSize: 12,
        color: '#6366f1',
        marginTop: 12,
    },
});

export { MapViewWrapper, MarkerWrapper };
export default MapViewWrapper;
