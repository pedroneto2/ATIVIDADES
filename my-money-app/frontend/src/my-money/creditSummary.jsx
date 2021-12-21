import React, { useState, useEffect } from "react";
import DashBoard from "../common/template/dashBoard";
import axios from "axios";

const INITIAL_STATE = {
  totalCreditos: 0,
  totalDebitos: 0,
  valorConsolidado: 0,
};

URL = "http://localhost:3003/api/billingCycles/summary";

function retrieveCredits(credits, setCredits) {
  axios.get(URL).then((resp) =>
    setCredits({
      totalCreditos: resp.data.credit,
      totalDebitos: resp.data.debt,
      valorConsolidado: resp.data.credit - resp.data.debt,
    })
  );
}

export default function creditSummary(props) {
  const [credits, setCredits] = useState({ ...INITIAL_STATE });

  useEffect(() => retrieveCredits(credits, setCredits), []);

  return (
    <DashBoard
      totalCreditos={credits.totalCreditos}
      totalDebitos={credits.totalDebitos}
      valorConsolidado={credits.valorConsolidado}
    />
  );
}
