import { Alert } from "react-native";

let lastAlertTime = 0;

const ShowError = (errorMessage) => {
    const now = Date.now();
    if (now - lastAlertTime > 5000) { // Limit alerts to only once every 5 seconds
        Alert.alert('Error', errorMessage);
        lastAlertTime = now;
    }
};

export default ShowError;