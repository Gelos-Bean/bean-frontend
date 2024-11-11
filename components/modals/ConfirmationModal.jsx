import { Modal, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const ConfirmationModal = ({ visible, onDismiss, title, body, onSelect }) => {

  const handleSelect = () => {
    onSelect(true);
    onDismiss();
  };

  const handleCancel = () => {
    onSelect(false);
    onDismiss();
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <Text variant='headlineMedium' style={styles.modalText}>{title}</Text>
          <Text variant="bodyLarge">{body}</Text>
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon='window-close'
              mode="contained"
              onPress={handleCancel}>
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon='check'
              mode="contained"
              onPress={handleSelect}>
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
