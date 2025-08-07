import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CardBottomSheet from '../components/CardBottomSheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../assets/home-icon.svg';
import { fetchAccounts } from '../utils';
import NewAccountModal from '../components/NewAccountModal';
import { Colors } from '../constants';
import { Account } from '../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.85;

const AccountScreen = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAccounts();
      setAccounts(result);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Debit Card</Text>
          <Text style={styles.subheading}>Available balance</Text>
          <View style={styles.balanceContainer}>
            <View style={styles.currencyBox}>
              <Text style={styles.currencyText}>S$</Text>
            </View>
            <Text style={styles.balanceText}>
              {accounts[currentIndex]?.balance}
            </Text>
          </View>
        </View>
        <HomeIcon color={Colors.primary} />
      </View>

      <CardBottomSheet
        accounts={accounts}
        setAccounts={setAccounts}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setIsModalVisible={setIsModalVisible}
      />
      <NewAccountModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setAccounts={setAccounts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    color: Colors.light1,
    fontWeight: 'bold',
  },
  subheading: {
    marginTop: 24,
    fontSize: 14,
    color: Colors.light1,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currencyBox: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  currencyText: {
    color: Colors.light1,
    fontWeight: 'bold',
  },
  balanceText: {
    color: Colors.light1,
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardWrapper: {
    position: 'absolute',
    top: 180,
    left: (Dimensions.get('window').width - CARD_WIDTH) / 2,
    zIndex: 10,
    elevation: 10,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    width: CARD_WIDTH,
    padding: 20,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light1,
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 16,
    color: Colors.light1,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMeta: {
    color: Colors.light1,
  },
  cardBrand: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light1,
    textAlign: 'right',
  },
});

export default AccountScreen;
