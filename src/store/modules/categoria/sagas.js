import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";
import { toast } from "react-toastify";

export function* createCategoria({ payload }) {
  try {
    const { ctg_descricao } = payload;

    const response = yield call(api.post, "/categoria", {
      ctg_descricao,
    });

    if (response.data.ctgExists) {
      toast.error("Categoria já cadastrada!");
    } else if (response.data.ctgCreated) {
      toast.success("Categoria cadastrada!");
      history.push("../categorias");
    } else {
      toast.error("Falha no cadastro");
    }
  } catch (err) {
    toast.error("Erro ao cadastrar categoria!");
    console.tron.log(err);
  }
}

export function* updateCategoria({ payload }) {
  try {
    const { ctg_descricao, ctg_id } = payload;

    yield call(api.put, `/categoria/${ctg_id}`, {
      ctg_descricao,
    });
    toast.success("Categoria editada");
  } catch (err) {
    toast.error("Erro ao atualizar categoria");
  }
}

export default all([
  takeLatest("@ctg/CREATE_CATEGORIA_REQUEST", createCategoria),
  takeLatest("@ctg/UPDATE_CATEGORIA_REQUEST", updateCategoria),
]);
