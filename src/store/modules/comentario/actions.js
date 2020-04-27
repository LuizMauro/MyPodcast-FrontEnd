export function createComentarioRequest(cmt_conteudo, pod_id, usu_id) {
  return {
    type: "@ctg/CREATE_COMENTARIO_REQUEST",
    payload: { cmt_conteudo, pod_id, usu_id },
  };
}

export function updateComentarioRequest(pod_id, cmt_id, cmt_conteudo) {
  return {
    type: "@ctg/UPDATE_COMENTARIO_REQUEST",
    payload: { pod_id, cmt_id, cmt_conteudo },
  };
}

export function deleteComentarioRequest(pod_id, cmt_id) {
  return {
    type: "@ctg/DELETE_COMENTARIO_REQUEST",
    payload: { pod_id, cmt_id },
  };
}
