export default function handler(req, res) {
    const { q } = req.query;
  
    // Simulação de resultados de pesquisa
    const results = fetch("http://localhost:3003/agendados")
  
    // Filtrar resultados com base na consulta
    const filteredResults = results.filter((result) =>
      result.toLowerCase().includes(q.toLowerCase())
    );
  
    res.status(200).json({ results: filteredResults });
  }
  