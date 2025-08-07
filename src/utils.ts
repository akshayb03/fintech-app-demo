import { BASE_URL } from './constants';
import { Account } from './types';

export const fetchAccounts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/accounts`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeCardStatus = async (name: string, isActive: boolean) => {
  try {
    const res = await fetch(`${BASE_URL}/accounts/${name}/active`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive: isActive }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewAccount = async (accountData: Account) => {
  try {
    const res = await fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    });

    if (!res.ok) {
      throw new Error('Failed to create account');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Create account error:', err);
    throw err;
  }
};
