export default (httpClient) => ({
    getFilmes: async () => {
      const response = await httpClient.get("/Filmes");
  
      return {
        data: response.data,
      };
    },
    getFilmePorId: async (id) => {
      const response = await httpClient.get(`/Filmes/${id}`);
  
      return {
        data: response.data,
      };
    },
    createFilme: async (filme) => {
      const response = await httpClient.post("/Filmes", filme, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return {
        data: response.data,
      };
    },
    updateFilme: async (filme) => {
      const response = await httpClient.put(`/Filmes/${filme.id}`, filme);
  
      return {
        data: response.data,
      };
    },
    deleteFilme: async (id) => {
      await httpClient.delete(`/Filmes/${id}`);
    }
  });
  