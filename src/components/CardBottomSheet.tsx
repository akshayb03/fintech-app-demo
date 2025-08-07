import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  Pressable,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import HomeIcon from '../assets/home-icon.svg';
import Carousel from 'react-native-reanimated-carousel';
import { changeCardStatus } from '../utils';
import { Colors } from '../constants';
import { Account } from '../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.9;

const CardBottomSheet = ({
  accounts,
  setAccounts,
  currentIndex,
  setCurrentIndex,
  setIsModalVisible,
}: {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const snapPoints = useMemo(() => ['70%', '90%'], []);

  const renderCarousel = () => (
    <>
      <Carousel
        loop={false}
        width={CARD_WIDTH}
        height={240}
        autoPlay={false}
        data={accounts}
        scrollAnimationDuration={500}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>{renderCard(item)}</View>
        )}
      />
      <View style={styles.paginationWrapper}>
        {accounts.map((_, index) => (
          <View
            key={index}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: currentIndex === index ? 10 : 8,
              height: currentIndex === index ? 10 : 8,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: currentIndex === index ? '#01D167' : '#D0D0D0',
            }}
          />
        ))}
      </View>
    </>
  );

  const renderCard = (item: Account) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: accounts[currentIndex].isActive
            ? Colors.primary
            : Colors.grey1,
        },
      ]}
    >
      <View style={styles.cardLogo}>
        <HomeIcon color={Colors.light1} />
        <Text style={styles.orgName}>aspire</Text>
      </View>
      <Text style={styles.cardName}>{item.name}</Text>
      <View style={styles.cardNumberWrapper}>
        {item.cardNumber.match(/.{1,4}/g)?.map((chunk, index) => (
          <Text key={index} style={styles.cardNumber}>
            {chunk}
          </Text>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardMeta}>
          {`Thru: ${item.expiryMonth}/${item.expiryYear.slice(2)}`}
        </Text>
        <Text style={styles.cardMeta}>{`CVV: ${item.cvv || 456}`}</Text>
      </View>
      <Text style={styles.cardBrand}>VISA</Text>
    </View>
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.cardContainer}>{renderCarousel()}</View>
        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Top-up account</Text>
              <Text style={styles.settingDesc}>
                Deposit money to your account to use with card
              </Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Weekly spending limit</Text>
              <Text style={styles.settingDesc}>
                You haven’t set any spending limit on card
              </Text>
            </View>
            <Switch />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Freeze card</Text>
              <Text style={styles.settingDesc}>
                Your debit card is currently active
              </Text>
            </View>
            <Switch
              value={accounts ? !accounts[currentIndex]?.isActive : false}
              onValueChange={async value => {
                const updatedAccount = await changeCardStatus(
                  accounts[currentIndex].name,
                  value,
                );
                setAccounts((prevAccounts: Account[]) =>
                  prevAccounts.map((acc, index) =>
                    index === currentIndex
                      ? { ...acc, isActive: updatedAccount.isActive }
                      : acc,
                  ),
                );
              }}
            />
          </View>

          <View style={styles.settingItem}>
            <Pressable
              style={styles.settingContent}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.settingTitle}>Get a new card</Text>
              <Text style={styles.settingDesc}>
                This will create a new debit card for you
              </Text>
            </Pressable>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Deactivated cards</Text>
              <Text style={styles.settingDesc}>
                Your previously deactivated cards
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.light1,
    paddingHorizontal: 20,
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  card: {
    position: 'relative',
    borderRadius: 16,
    width: CARD_WIDTH - 16,
    padding: 20,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  cardNumber: {
    fontSize: 14,
    marginRight: 24,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
  },
  cardMeta: {
    color: '#fff',
    marginRight: 32,
    fontSize: 13,
    fontWeight: 600,
  },
  cardBrand: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'right',
  },
  settingsContainer: {
    paddingBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#25345F',
  },
  settingDesc: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.light1,
  },
  cardContainer: {
    paddingVertical: 20,
  },
  settingContent: {
    flex: 1,
  },
  paginationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orgName: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
    marginLeft: 4,
  },
  cardLogo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardWrapper: { alignItems: 'center' },
  cardNumberWrapper: { flexDirection: 'row' },
});

export default CardBottomSheet;
