import axios from 'axios';

const superherosApi = axios.create({
  baseURL: 'https://superhero-back-62be.onrender.com/api/superheros',
});

export default class SuperheroService {
  static async getAllSuperheros(page: number, limit: number) {
    try {
      const response = await superherosApi.get('/', {
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      console.error('Internal error: GET_ALL_SUPERHEROS', error);
      throw error;
    }
  }

  static async getSuperhero(id: number) {
    try {
      const response = await superherosApi.get(`/${id}`);

      return response.data;
    } catch (error) {
      console.error('Internal error: GET_SUPERHERO', error);
      throw error;
    }
  }

  static async createSuperhero(data: FormData) {
    try {
      console.log(JSON.stringify(data));
      const response = await superherosApi.post('/', data);

      return response.data;
    } catch (error) {
      console.error('Internal error: POST_SUPERHERO', error);
      throw error;
    }
  }

  static async editSuperhero(id: number, data: FormData) {
    try {
      console.log(JSON.stringify(data));
      const response = await superherosApi.put(`/${id}`, data);

      return response.data;
    } catch (error) {
      console.error('Internal error: EDIT_SUPERHERO', error);
      throw error;
    }
  }

  static async deleteSuperhero(id: number) {
    try {
      const response = await superherosApi.delete(`/${id}`);
    } catch (error) {
      console.error('Internal error: DELETE_SUPERHERO', error);
      throw error;
    }
  }
}
