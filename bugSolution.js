```javascript
import * as React from 'react';
import { Camera, BarCodeScanner } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    // Debounce function to prevent multiple calls in quick succession
    const debounceTime = 250; // Adjust as needed
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setBarcodeData(data.data);
        setScanned(true);
      }, debounceTime);
    };
  };

  const resetScan = () => {
    setScanned(false);
    setBarcodeData(null);
  };

  if (hasPermission === null) {
    return <View />; 
  } 
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned()}
        style={styles.scanner}
      />
      {scanned && (
        <Button title="Scan Again" onPress={resetScan} />
      )}
      {barcodeData && (
        <Text>Barcode data: {barcodeData}</Text>
      )}
    </View>
  );
};
```