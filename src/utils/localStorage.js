export const localStorageKey = 'dappToken'

export function get_local_storage_data(key = localStorageKey) {
  return localStorage.getItem(key);
}
export function set_local_storage_data(key = localStorageKey, data) {
    localStorage.setItem(key, data);
}
export function remove_local_storage_data(key = localStorageKey) {
    localStorage.removeItem(key);
}
