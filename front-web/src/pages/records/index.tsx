import React, { useEffect, useState } from "react";
import "./styles.css";
import { RecordsResponse } from "./types";
import { formatDate } from "./helpers";
import Pagination from "./pagination";
import Filters from "../filters";
import api from "../../settings/api";

const Records = () => {
  const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
  const [activePage, setActivePage] = useState(0);

  // Executa quando o componente é iniciado e quando o activePage for alterado ele vai executar
  useEffect(() => {
    api
      .get(`/records?linesPerPage=12&page=${activePage}`)
      .then((response) => setRecordsResponse(response.data));
  }, [activePage]);

  const handlePageChange = (index: number) => {
    setActivePage(index);
  };

  return (
    <div className="page-container">
      <Filters link="/charts" linkText="VER GRÁFICO" />
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Instante</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Plataforma</th>
            <th>Gênero</th>
            <th>Título do Game</th>
          </tr>
        </thead>
        <tbody>
          {recordsResponse?.content.map((record) => (
            <tr key={record.id}>
              <td>{formatDate(record.moment)}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td className="text-secondary">{record.platform}</td>
              <td>{record.genreName}</td>
              <td className="text-primary">{record.gameTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={recordsResponse?.totalPages}
        activePage={activePage}
        goToPage={handlePageChange}
      />
    </div>
  );
};

export default Records;
