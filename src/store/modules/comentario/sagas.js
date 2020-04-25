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

export function* deleteComentario({ payload }) {
  try {
    const { pod_id, cmt_id } = payload;

    yield call(api.put, `deletarcomentario/${pod_id}/${cmt_id}`);
    toast.success("Comentário deletado.");
  } catch (err) {
    toast.error("Falha ao deletar comentário");
    console.tron.log(err);
  }
}

export default all([
  takeLatest("@ctg/CREATE_COMENTARIO_REQUEST", createComentario),
  takeLatest("@ctg/DELETE_COMENTARIO_REQUEST", deleteComentario),
]);
