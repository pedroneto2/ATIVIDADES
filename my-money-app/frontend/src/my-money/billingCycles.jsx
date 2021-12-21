import React from "react";
import Register from "../common/template/register";
import { useSelector } from "react-redux";

export default function billingCycles() {
  const state = useSelector((state) => state.billingCycles);

  return (
    <Register
      editTab={
        state.edit
          ? {
              lastTab: (
                <div>
                  <i className="fas fa-pen"></i> Alterar
                </div>
              ),
              hide: true,
              listActive: "",
              includeOrEditActive: "active",
            }
          : {
              lastTab: (
                <div>
                  <i className="fas fa-plus"></i> Incluir
                </div>
              ),
              hide: false,
              listActive: "active",
              includeOrEditActive: "",
            }
      }
    />
  );
}
