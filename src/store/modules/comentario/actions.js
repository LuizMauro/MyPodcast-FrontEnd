export function createComentarioRequest(cmt_conteudo, pod_id, tag_id) {
  return {
    type: "@ctg/CREATE_COMENTARIO_REQUEST",
    payload: { cmt_conteudo, pod_id, tag_id },
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

export function answerComentarioRequest(
  pod_id,
  tag_id,
  id_comentario_pai,
  cmt_conteudo
) {
  return {
    type: "@ctg/ANSWER_COMENTARIO_REQUEST",
    payload: { pod_id, tag_id, id_comentario_pai, cmt_conteudo },
  };
}
