import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import CreditScreen from '../screens/CreditScreen';
import ProfileScreen from '../screens/ProfileScreen';

import HomeIcon from '../assets/home-icon.svg';
import AccountIcon from '../assets/account-icon.svg';
import PaymentsIcon from '../assets/payments-icon.svg';
import CreditIcon from '../assets/credit-icon.svg';
import PayIcon from '../assets/pay-icon.svg';
import { Colors } from '../constants';

const Tab = createBottomTabNavigator();

export const getTabBarIcon = (routeName: string, focused: boolean) => {
  const icons: Record<string, React.FC<any>> = {
    Home: HomeIcon,
    'Debit Card': PayIcon,
    Payments: PaymentsIcon,
    Credit: CreditIcon,
    Profile: AccountIcon,
  };

  const IconComponent = icons[routeName];
  const iconColor = focused ? Colors.primary : Colors.grey2;
  const tintColor = focused ? Colors.primary : Colors.grey2;

  return (
    <IconComponent
      width={24}
      height={24}
      fill={iconColor}
      color={iconColor}
      tintColor={tintColor}
    />
  );
};

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grey2,
            tabBarLabelStyle: styles.tabBarLabel,
            headerShown: false,
            tabBarStyle: styles.tabBar,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Debit Card" component={AccountScreen} />
          <Tab.Screen name="Payments" component={PaymentsScreen} />
          <Tab.Screen name="Credit" component={CreditScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light1,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    height: 86,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default AppNavigator;
