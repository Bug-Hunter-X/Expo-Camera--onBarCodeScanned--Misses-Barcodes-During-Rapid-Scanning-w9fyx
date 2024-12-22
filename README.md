# Expo Camera Barcode Scan Issue

This repository demonstrates a bug in Expo's Camera component where the `onBarCodeScanned` function may miss barcodes when scanned rapidly. The issue is reproduced using a simple application.  This issue can lead to inaccurate data recording and applications requiring high-speed scanning will be problematic.

## Steps to Reproduce

1. Clone this repository.
2. Run `npm install`.
3. Run the application on a physical device (emulators are less reliable for this issue).
4. Rapidly scan multiple barcodes.  Note that some barcodes may not be recorded.

## Solution

The provided solution implements debouncing to throttle the `onBarCodeScanned` callback, mitigating the problem.  Adjust `debounceTime` as needed. 