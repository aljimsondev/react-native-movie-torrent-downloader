//secure storage for managing data
import EncryptedStorage from 'react-native-encrypted-storage';

interface Storage {
  config: {} | undefined;
}

class Storage {
  constructor(config?: {}) {
    this.config = config;
  }
  /**
   * Set value to the storage
   * @param {string} key - the value key save to the storage
   * @param {string} value - the value of the key in the string format
   * @returns A Promise boolean type indication the status of saving the key
   */
  async setKey(key: string, value: string) {
    let status = false;
    try {
      await EncryptedStorage.setItem(key, value).then(() => {
        status = true;
      });
    } catch (e) {
      status = false;
      throw Error(`An Error occured when saving to Storage, ${e}`);
    }
    return status;
  }
  /**
   *Getting the key value in the storage
   * @param key - A key associated with a value
   * @returns A Promise containing the value of a search key
   */
  async getItem(key: string) {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  /**
   * Delete the given key from the storage
   * @param key - A string that is associated to a value
   * @returns Promise
   */
  async removeKey(key: string) {
    return await EncryptedStorage.removeItem(key);
  }

  /**
   * Clear the storage
   * @returns Void
   */
  async clear() {
    return await EncryptedStorage.clear();
  }
}

export default Storage;
