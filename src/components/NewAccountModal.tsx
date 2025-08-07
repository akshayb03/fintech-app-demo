import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { createNewAccount } from '../utils';
import { Colors } from '../constants';
import { Account } from '../types';

const NewAccountModal = ({
  isModalVisible,
  setIsModalVisible,
  setAccounts,
}: {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}) => {
  const [accountName, setAccountName] = useState('');

  const createAccount = async () => {
    const randomDigits = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

    const cardNumber = randomDigits(16);
    const expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      '0',
    );
    const expiryYear = String(2026 + Math.floor(Math.random() * 5));
    const limit = Math.floor(Math.random() * 100000) + 10000;
    const cvv = randomDigits(3);
    const balance = Math.floor(Math.random() * 9001) + 1000;

    const newAccount = {
      name: accountName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      balance,
      isActive: true,
      limit,
    };

    const result = await createNewAccount(newAccount);

    if (result) {
      setAccounts((prev: Account[]) => [...prev, newAccount]);
      setAccountName('');
      setIsModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Account Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Account Name"
                value={accountName}
                onChangeText={setAccountName}
              />
              <Pressable style={styles.createButton} onPress={createAccount}>
                <Text style={styles.createButtonText}>Create</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewAccountModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.light1,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    zIndex: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#25345F',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 6,
  },
  createButtonText: {
    color: Colors.light1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
