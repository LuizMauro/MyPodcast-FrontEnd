import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";
import { toast } from "react-toastify";

export function* createComentario({ payload }) {
  try {
    const { cmt_conteudo, pod_id, usu_id } = payload;

    const response = yield call(api.post, `comentar/${pod_id}/${usu_id}`, {
      cmt_conteudo,
    });
    toast.success("Comentário publicado");
  } catch (err) {
    toast.error("Falha ao publicar comentário");
    console.tron.log(err);
  }
}

export default all([
  takeLatest("@ctg/CREATE_COMENTARIO_REQUEST", createComentario),
]);
