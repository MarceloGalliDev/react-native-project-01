import React, { useRef, useState, useContext } from "react";
import { StyleSheet, Text, Button, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import XLSX from 'xlsx';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CameraContent from "@/components/CameraContent";

export default function HomeScreen() {
  const cameraContentRef = useRef();
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleQrCodeScanned = (data) => {
    setQrCodeData(data);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Leitor QRCode</ThemedText>
        <CameraContent ref={cameraContentRef} onQrCodeScanned={handleQrCodeScanned} />
      </ThemedView>

      <ThemedView>
        <Button title={"Escanear"} onPress={() => cameraContentRef.current.resetScanner()} />
      </ThemedView>

      {qrCodeData && (
        <ThemedView style={styles.qrCodeContainer}>
          <ThemedText type="default">Conteúdo do QR Code: {qrCodeData}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  qrCodeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
});