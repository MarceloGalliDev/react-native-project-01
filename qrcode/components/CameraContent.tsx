import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { StyleSheet, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, Camera } from "expo-camera";

const CameraContent = forwardRef(({ onQrCodeScanned }, ref) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useImperativeHandle(ref, () => ({
    resetScanner: () => setScanned(false),
  }));

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    onQrCodeScanned(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ThemedView style={styles.mainContainer}>    
      <ThemedView style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </ThemedView>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    height: 430,
    width: 430,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
  },
  cameraContainer: {
    height: 400,
    width: 400,
  },
});

export default CameraContent;