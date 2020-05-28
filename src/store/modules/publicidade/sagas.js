import { takeLatest, call, all } from "redux-saga/effects";

import api from "../../../services/api";
import { toast } from "react-toastify";

export function* createPublicidade({ payload }) {
  const { pub_descricao, pub_data_fim, file, pub_link } = payload;

  try {
    yield call(api.post, "/publicidade", {
      pub_descricao,
      pub_data_fim,
      file,
      pub_link,
    });

    toast.success("Publicidade cadastrada!");
  } catch (err) {
    toast.error("Erro ao cadastrar publicidade");
    console.tron.log(err);
  }
}

export function* updatePublicidade({ payload }) {
  try {
    const { pub_id, pub_descricao, pub_data_fim, file, pub_link } = payload;

    yield call(api.put, `/publicidade/${pub_id}`, {
      pub_descricao,
      pub_data_fim,
      file,
      pub_link,
    });
    toast.success("Publicidade editada");
  } catch (err) {
    toast.error("Erro ao atualizar Publicidade");
  }
}

export function* deletePublicidade({ payload }) {
  try {
    const { pub_id } = payload;

    yield call(api.put, `/removerpublicidade/${pub_id}`);

    toast.success("Publicidade removida");
  } catch (err) {
    toast.error("Erro ao remover Publicidade");
  }
}

export default all([
  takeLatest("@podcast/CREATE_PUBLICIDADE_REQUEST", createPublicidade),
  takeLatest("@podcast/UPDATE_PUBLICIDADE_REQUEST", updatePublicidade),
  takeLatest("@podcast/DELETE_PUBLICIDADE_REQUEST", deletePublicidade),
]);
