import api from './api'

export const crisisService = {
  async getResources() {
    const response = await api.get('/crisis/resources')
    return response.data
  },

  async getCountries() {
    const response = await api.get('/crisis/countries')
    return response.data.countries
  }
}

