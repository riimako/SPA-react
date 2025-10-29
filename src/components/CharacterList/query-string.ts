import { FiltersType } from '../../types'

/**
 * Convert filters to url query params (query string).
 * If the value is not empty.
 *
 * @param {FiltersType} filters
 * @returns {string} formatted 'key=value&key=value...'.
 */
export const objectToQueryString = (filters: FiltersType) => {
  const queryParts: string[] = []

  ;(Object.keys(filters) as Array<keyof FiltersType>).forEach((key) => {
    const value = filters[key]

    // Only include non-empty values
    if (value !== null && value !== undefined && value !== '') {
      // Codify value to be URL safe
      const encodedValue = encodeURIComponent(String(value))
      queryParts.push(`${String(key)}=${encodedValue}`)
    }
  })
  return queryParts.join('&')
}


/**
 * Verify if at least one filter is active (not empty).
 *
 * @param {FiltersType} filters
 * @returns {boolean} true if at least one filter is active, false otherwise.
 */
export const areFiltersActive = (filters: FiltersType): boolean => {
  return Object.values(filters).some(value => value !== '');
};